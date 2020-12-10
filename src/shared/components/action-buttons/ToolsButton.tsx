import React, { FC, useRef, useCallback, useEffect } from 'react';
import { v1 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import fetchData from '../../utils/fetchData';

import useSafeState from '../../hooks/useSafeState';

import uniProtKBApiUrls from '../../config/apiUrls';
import { LocationToPath, Location } from '../../../app/config/urls';

import entryToFASTAWithHeaders from '../../utils/entryToFASTAWithHeaders';

import { addMessage } from '../../../messages/state/messagesActions';

import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { UniRefAPIModel } from '../../../uniref/adapters/uniRefConverter';

import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';

type ToolsButtonProps = {
  selectedEntries: string[];
  disabled: boolean;
  title: string;
  location: Location;
};

export const getFastaFromAccession = async (
  accession?: string
): Promise<string | void> => {
  if (!accession) {
    return;
  }
  let url;
  if (accession.startsWith('UniRef')) {
    // UniRef
    // Find representative sequence and use it instead
    const uniRefURL = uniProtKBApiUrls.uniref.entry(accession);
    if (!uniRefURL) {
      return;
    }
    const uniRefResponse = await fetchData<undefined | UniRefAPIModel>(
      uniRefURL
    );
    // might be either a UniProtKB or UniParc entry,
    // so just send it through this same function again recursively to process
    // eslint-disable-next-line consistent-return
    return getFastaFromAccession(
      uniRefResponse.data?.representativeMember.accessions?.[0]
    );
  }
  if (accession.startsWith('UPI')) {
    // UniParc
    url = uniProtKBApiUrls.uniparc.entry(accession);
  } else {
    // UniProtKB
    url = uniProtKBApiUrls.entry(accession);
  }
  if (!url) {
    return;
  }
  const response = await fetchData<
    undefined | UniProtkbAPIModel | UniParcAPIModel
  >(url);
  if (!response.data) {
    return;
  }
  // eslint-disable-next-line consistent-return
  return entryToFASTAWithHeaders(response.data);
};

const ToolsButton: FC<ToolsButtonProps> = ({
  selectedEntries,
  disabled,
  title,
  location,
  children,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const entriesRef = useRef(selectedEntries);
  entriesRef.current = selectedEntries;

  const [loading, setLoading] = useSafeState(false);

  const handleClick = useCallback(async () => {
    setLoading(true);

    const entries = entriesRef.current;

    try {
      const sequences = await Promise.all(entries.map(getFastaFromAccession));

      if (entries !== entriesRef.current) {
        // it means that by the time we get here, the selection has changed
        return;
      }
      history.push(LocationToPath[location], {
        parameters: { sequence: sequences.filter(Boolean).join('\n\n') },
      });
    } catch (err) {
      if (entries !== entriesRef.current) {
        // it means that by the time we get here, the selection has changed
        return;
      }

      setLoading(false);

      if (!(err instanceof Error)) {
        return;
      }
      dispatch(
        addMessage({
          id: v1(),
          content: err.message,
          format: MessageFormat.POP_UP,
          level: MessageLevel.FAILURE,
        })
      );
    }
  }, [dispatch, history, location, setLoading]);

  useEffect(() => {
    // reset loading state every time the selection changes
    setLoading(false);
  }, [selectedEntries, setLoading]);

  return (
    <button
      type="button"
      className="button tertiary"
      title={title}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default ToolsButton;
