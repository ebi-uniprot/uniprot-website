import { FC, useRef, useCallback, useEffect } from 'react';
import { v1 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useSafeState from '../../hooks/useSafeState';

import getFASTAFromAccession from '../../utils/getFASTAFromAccession';

import { LocationToPath, Location } from '../../../app/config/urls';

import { addMessage } from '../../../messages/state/messagesActions';

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
      const sequences = await Promise.all(entries.map(getFASTAFromAccession));

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
