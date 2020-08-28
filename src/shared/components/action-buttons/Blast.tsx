import React, { FC, useState } from 'react';
import { v1 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import fetchData from '../../utils/fetchData';

import uniProtKBApiUrls from '../../../uniprotkb/config/apiUrls';
import { LocationToPath, Location } from '../../../app/config/urls';

import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import entryToFASTAWithHeaders from '../../../uniprotkb/adapters/entryToFASTAWithHeaders';

import { addMessage } from '../../../messages/state/messagesActions';

import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';

const BLAST_LIMIT = 20;

type BlastButtonProps = {
  selectedEntries: string[];
};

const BlastButton: FC<BlastButtonProps> = ({ selectedEntries }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const n = selectedEntries.length;

  const disabled = !n || n > BLAST_LIMIT;

  let title = 'Select at least one entry to run a BLAST job';
  if (n) {
    if (n === 1) {
      title = `Run a BLAST job against ${selectedEntries[0]}`;
    } else if (n > BLAST_LIMIT) {
      title = `Please select a maximum of ${BLAST_LIMIT} entries to run Blast jobs`;
    } else {
      title = `Run ${n} BLAST jobs against the selected entries`;
    }
  }

  const handleClick = async () => {
    setLoading(true);

    const [accession] = selectedEntries;

    try {
      const { data: entry } = await fetchData<UniProtkbAPIModel>(
        uniProtKBApiUrls.entry(accession)
      );

      history.push(LocationToPath[Location.Blast], {
        parameters: { sequence: entryToFASTAWithHeaders(entry) },
      });
    } catch (err) {
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
  };

  return (
    <button
      type="button"
      className="button tertiary"
      title={title}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      Blast
    </button>
  );
};

export default BlastButton;
