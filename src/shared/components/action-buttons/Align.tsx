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

const ALIGN_LIMIT = 100;

type AlignButtonProps = {
  selectedEntries: string[];
};

const AlignButton: FC<AlignButtonProps> = ({ selectedEntries }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const n = selectedEntries.length;

  const disabled = n <= 1 || n > ALIGN_LIMIT;

  let title = 'Select at least 2 entries to run an Align job';
  if (n > 1) {
    if (n > ALIGN_LIMIT) {
      title = `Please select a maximum of ${ALIGN_LIMIT} entries to run an Align job`;
    } else {
      title = `Run an Align job against ${n} entries`;
    }
  }

  const handleClick = async () => {
    setLoading(true);

    try {
      const sequences = await Promise.all(
        selectedEntries.map((accession) =>
          fetchData<UniProtkbAPIModel>(
            uniProtKBApiUrls.entry(accession)
          ).then((response) => entryToFASTAWithHeaders(response.data))
        )
      );

      history.push(LocationToPath[Location.Align], {
        parameters: { sequence: sequences.join('\n\n') },
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
      Align
    </button>
  );
};

export default AlignButton;
