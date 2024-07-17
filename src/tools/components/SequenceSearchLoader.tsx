import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  ClipboardEvent,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { EllipsisReveal, SearchInput } from 'franklin-sites';
import { SequenceObject } from 'franklin-sites/dist/types/sequence-utils/sequence-processor';

import useMessagesDispatch from '../../shared/hooks/useMessagesDispatch';
import useDataApi from '../../shared/hooks/useDataApi';

import { addMessage } from '../../messages/state/messagesActions';

import apiUrls from '../../shared/config/apiUrls/apiUrls';

import entryToFASTAWithHeaders from '../../shared/utils/entryToFASTAWithHeaders';
import {
  reUniParc,
  reUniProtKBAccession,
  reUniRefAccession,
} from '../../uniprotkb/utils/regexes';
import fetchData from '../../shared/utils/fetchData';
import { stringifyUrl } from '../../shared/utils/url';
import * as logging from '../../shared/utils/logging';

import {
  MessageFormat,
  MessageLevel,
} from '../../messages/types/messagesTypes';
import { Namespace } from '../../shared/types/namespaces';
import { APISequenceData } from '../blast/types/apiSequenceData';
import {
  getEntryTypeFromString,
  EntryType,
} from '../../shared/components/entry/EntryTypeIcon';
import { SearchResults } from '../../shared/types/results';

const getURLForAccessionOrID = (input: string) => {
  const cleanedInput = input.trim();
  if (!cleanedInput) {
    return null;
  }

  // UniRef accession
  if (reUniRefAccession.test(cleanedInput)) {
    return apiUrls.entry.entry(cleanedInput, Namespace.uniref);
  }

  // UniParc accession
  if (reUniParc.test(cleanedInput)) {
    return apiUrls.entry.entry(cleanedInput.toUpperCase(), Namespace.uniparc);
  }

  // UniProtKB accession
  if (reUniProtKBAccession.test(cleanedInput)) {
    return apiUrls.entry.entry(cleanedInput.toUpperCase(), Namespace.uniprotkb);
  }

  // UniProtKB ID
  return stringifyUrl(apiUrls.search.searchPrefix(), {
    query: `id:${cleanedInput.toUpperCase()}`,
    fields:
      'sequence,id,reviewed,protein_name,organism_name,protein_existence,sequence_version',
  });
};

// name as a NCBI ID formatted UniProt-style
const nameFromEntry = (entry: APISequenceData) =>
  entry.uniProtkbId
    ? `${
        getEntryTypeFromString(entry.entryType) === EntryType.REVIEWED
          ? 'sp'
          : 'tr'
      }|${entry.primaryAccession}|${entry.uniProtkbId}`
    : '';

type NetworkResponses = SearchResults<APISequenceData> | APISequenceData;

export interface SequenceSearchLoaderInterface {
  reset: () => void;
}

const ERROR_MESSAGE_THRESHOLD = 150;

const SequenceSearchLoader = forwardRef<
  SequenceSearchLoaderInterface,
  { onLoad: (event: SequenceObject[]) => void }
>(({ onLoad }, ref) => {
  const [accessionOrID, setAccessionOrID] = useState('');
  // flag, abused to store previous value of the field
  const [pasteLoading, setPasteLoading] = useState(false);
  const dispatch = useMessagesDispatch();

  useImperativeHandle(ref, () => ({
    reset: () => setAccessionOrID(''),
  }));

  // used to keep a reference to the previously generated sequence string
  const sequenceRef = useRef('');

  const urlForAccessionOrID = getURLForAccessionOrID(accessionOrID);
  const { data, loading } = useDataApi<NetworkResponses>(urlForAccessionOrID);

  let entry: APISequenceData | null = null;
  if (data) {
    if ('results' in data) {
      [entry] = data.results;
    } else {
      entry = data;
    }
  }

  // no entry found, probably invalid query, reset ref
  if (!entry) {
    sequenceRef.current = '';
  }

  useEffect(() => {
    if (
      !entry ||
      getEntryTypeFromString(entry.entryType) === EntryType.INACTIVE
    ) {
      return;
    }

    if (!urlForAccessionOrID) {
      onLoad([
        {
          raw: '',
          header: '',
          sequence: '',
          valid: false,
          name: '',
        },
      ]);
      return;
    }

    const sequence = `${entryToFASTAWithHeaders(entry)}\n`;

    if (sequence === sequenceRef.current) {
      // if the new generated sequence would be the same than the previously
      // generated one, don't do anything
      // we must have end up here because something else update (e.g. the user
      // manually updated the sequence)
      return;
    }

    // set ref to the value of the sequence we are about to set
    sequenceRef.current = sequence;

    onLoad([
      {
        raw: sequence,
        // no need to fill the rest, it will be parsed again later
        header: '',
        sequence: '',
        valid: true,
        name: nameFromEntry(entry),
      },
    ]);
  }, [entry, onLoad, urlForAccessionOrID, accessionOrID]);

  const handlePaste = useCallback(
    async (event: ClipboardEvent) => {
      // clipboard data not supported, just ignore that paste event and let the
      // browser handle it as a change
      if (!('clipboardData' in event)) {
        return;
      }
      const pastedContent = event.clipboardData.getData('text/plain');
      // use a Set to remove duplicate
      const potentialAccessions = new Set(
        pastedContent.split(/[\s,;]+/).map((text) => text.toUpperCase())
      );
      if (!potentialAccessions.size) {
        return;
      }

      // prevent displaying the content of the clipboard and empty the input
      event.preventDefault();
      setAccessionOrID('');
      setPasteLoading(true);

      try {
        const parsedSequences = [];
        const errors = [];
        for (const acc of potentialAccessions) {
          try {
            const url = getURLForAccessionOrID(acc);
            if (!url) {
              continue; // eslint-disable-line no-continue
            }
            // eslint-disable-next-line no-await-in-loop
            let { data } = await fetchData<NetworkResponses>(url);
            if ('results' in data) {
              [data] = data.results;
            }

            if (getEntryTypeFromString(data.entryType) === EntryType.INACTIVE) {
              throw new Error('inactive, no sequence available');
            }

            parsedSequences.push({
              raw: `${entryToFASTAWithHeaders(data)}\n`,
              // no need to fill the rest, it will be parsed again later
              header: '',
              sequence: '',
              valid: true,
              name: nameFromEntry(data),
            });
          } catch (_) {
            errors.push(acc);
          }
        }
        onLoad(parsedSequences);
        if (errors.length) {
          const error = errors.join(', ');
          dispatch(
            addMessage({
              content: (
                <div style={{ wordBreak: 'break-all' }}>
                  There was an issue retrieving sequence data for:{' '}
                  {error.length > ERROR_MESSAGE_THRESHOLD ? (
                    <>
                      {error.substring(0, ERROR_MESSAGE_THRESHOLD)}
                      <EllipsisReveal>
                        {error.substring(ERROR_MESSAGE_THRESHOLD)}
                      </EllipsisReveal>
                    </>
                  ) : (
                    error
                  )}
                </div>
              ),
              format: MessageFormat.POP_UP,
              level: MessageLevel.FAILURE,
            })
          );
        }
      } catch (error) {
        if (error instanceof Error || typeof error === 'string') {
          logging.error(error);
        }
      } finally {
        setAccessionOrID(accessionOrID); // reset to previous value
        setPasteLoading(false);
      }
    },
    [onLoad, dispatch, accessionOrID, setAccessionOrID]
  );

  return (
    <SearchInput
      isLoading={loading || pasteLoading}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setAccessionOrID(event.target.value)
      }
      onPaste={handlePaste}
      placeholder={pasteLoading ? 'loading from pasted text' : 'UniProt IDs'}
      value={accessionOrID}
      disabled={pasteLoading}
    />
  );
});

export default SequenceSearchLoader;
