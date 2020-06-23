import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
} from 'react';
import queryString from 'query-string';
import { SearchInput } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';

import uniProtKBApiUrls from '../../../uniprotkb/config/apiUrls';

import entryToFASTAWithHeaders from '../../../uniprotkb/adapters/entryToFASTAWithHeaders';
import { uniProtKBAccessionRegEx } from '../../../uniprotkb/utils';

import { APISequenceData } from '../types/apiSequenceData';

const getURLForAccessionOrID = (input: string) => {
  const cleanedInput = input.trim();
  if (!cleanedInput) {
    return null;
  }

  const query = queryString.stringify({
    query: uniProtKBAccessionRegEx.test(cleanedInput)
      ? `accession:${cleanedInput}`
      : `id:${cleanedInput}`,
    fields:
      'sequence,id,reviewed,protein_name,organism_name,protein_existence,sequence_version',
  });

  return `${uniProtKBApiUrls.search}?${query}`;
};

export type SequenceSubmissionOnChangeEvent = {
  sequence: string;
  valid: boolean;
  likelyType: 'na' | 'aa' | null;
  message: string | null;
  name?: string;
};

const SequenceSearchLoader = forwardRef<
  { reset: () => void },
  { onLoad: (event: SequenceSubmissionOnChangeEvent) => void }
>(({ onLoad }, ref) => {
  const [accessionOrID, setAccessionOrID] = useState('');

  useImperativeHandle(ref, () => ({
    reset: () => setAccessionOrID(''),
  }));

  // used to keep a reference to the previously generated sequence string
  const sequenceRef = useRef('');

  const urlForAccessionOrID = getURLForAccessionOrID(accessionOrID);
  const { data, loading } = useDataApi<{ results: APISequenceData[] }>(
    urlForAccessionOrID || ''
  );

  const topResult = data?.results?.[0];

  // no new result, probably invalid query, reset ref
  if (!topResult) {
    sequenceRef.current = '';
  }

  useEffect(() => {
    if (!topResult) {
      return;
    }

    if (!urlForAccessionOrID) {
      onLoad({
        sequence: '',
        valid: false,
        likelyType: null,
        message: null,
      });
      return;
    }

    const sequence = entryToFASTAWithHeaders(topResult);

    if (sequence === sequenceRef.current) {
      // if the new generated sequence would be the same than the previously
      // generated one, don't do anything
      // we must have end up here because something else update (e.g. the user
      // manually updated the sequence)
      return;
    }

    // set ref to the value of the sequence we are about to set
    sequenceRef.current = sequence;

    onLoad({
      sequence,
      valid: true,
      likelyType: null,
      message: null,
      name: topResult.primaryAccession || accessionOrID,
    });
  }, [topResult, onLoad, urlForAccessionOrID, accessionOrID]);

  return (
    <SearchInput
      isLoading={loading}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setAccessionOrID(e.target.value)
      }
      placeholder="P05067, A4_HUMAN, UPI0000000001"
      value={accessionOrID}
    />
  );
});

export default SequenceSearchLoader;
