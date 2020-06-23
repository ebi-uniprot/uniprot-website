import React, { FC /* , useState */ } from 'react';
// import { v1 } from 'uuid';
// import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// import fetchData from '../../utils/fetchData';

// import uniProtKBApiUrls from '../../../uniprotkb/config/apiUrls';
// import { LocationToPath, Location } from '../../../app/config/urls';

// import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
// import entryToFASTAWithHeaders from '../../../uniprotkb/adapters/entryToFASTAWithHeaders';

// import { addMessage } from '../../../messages/state/messagesActions';

// import {
//   MessageFormat,
//   MessageLevel,
// } from '../../../messages/types/messagesTypes';

type AlignButtonProps = {
  selectedEntries: string[];
};

const AlignButton: FC<AlignButtonProps> = ({ selectedEntries }) => {
  // const history = useHistory();
  // const dispatch = useDispatch();

  // const [loading, setLoading] = useState(false);

  const disabled = selectedEntries.length <= 1;

  const handleClick = async () => {
    console.log('handle click on align');
    // setLoading(true);
    // try {
    //   // do something to retrieve the sequences from the list of accessions
    //   history.push(LocationToPath[Location.Align], { parameters: {} });
    // } catch (err) {
    //   setLoading(false);
    //   if (!(err instanceof Error)) {
    //     return;
    //   }
    //   dispatch(
    //     addMessage({
    //       id: v1(),
    //       content: err.message,
    //       format: MessageFormat.POP_UP,
    //       level: MessageLevel.FAILURE,
    //     })
    //   );
    // }
  };

  return (
    <button
      type="button"
      className="button tertiary"
      disabled={disabled /* || loading */}
      onClick={handleClick}
    >
      Align
    </button>
  );
};

export default AlignButton;
