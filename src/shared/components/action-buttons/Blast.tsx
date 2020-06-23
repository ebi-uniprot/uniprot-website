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

type BlastButtonProps = {
  selectedEntries: string[];
};

const BlastButton: FC<BlastButtonProps> = ({ selectedEntries }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const disabled = selectedEntries.length !== 1;

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
      disabled={disabled || loading}
      onClick={handleClick}
    >
      Blast
    </button>
  );
};

export default BlastButton;
