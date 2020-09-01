import { useReducer, useEffect } from 'react';
import fileType from 'file-type/browser';

type State = {
  loading: boolean;
  content?: string;
  error?: SyntaxError;
};

enum ActionType {
  INIT = 'INIT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type Action =
  | { type: ActionType.INIT }
  | { type: ActionType.SUCCESS; content?: string }
  | { type: ActionType.ERROR; error: TypeError };

// eslint-disable-next-line consistent-return
const createReducer = () => (state: State, action: Action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ActionType.INIT:
      return { loading: true };
    case ActionType.SUCCESS:
      return { loading: false, content: action.content };
    case ActionType.ERROR:
      return { loading: false, error: action.error };
  }
};

const useTextFile = (file?: File) => {
  const [state, dispatch] = useReducer(createReducer(), { loading: !!file });

  useEffect(() => {
    let didCancel = false;
    let fr: FileReader;

    if (!file) {
      dispatch({ type: ActionType.SUCCESS });
      return;
    }

    fileType.fromBlob(file).then((fileResult) => {
      if (didCancel) {
        return;
      }
      if (fileResult) {
        dispatch({
          type: ActionType.ERROR,
          error: new TypeError(
            `The file "${file.name}" doesn't appear to be in the correct format. It needs to be a plain text file.`
          ),
        });
        return;
      }

      fr = new FileReader();
      fr.onload = () => {
        if (!didCancel) {
          dispatch({ type: ActionType.SUCCESS, content: fr.result as string });
        }
      };
      fr.readAsText(file);
    });

    // eslint-disable-next-line consistent-return
    return () => {
      didCancel = true;
      if (fr) {
        fr.abort();
      }
    };
  }, [file]);

  return state;
};

export default useTextFile;
