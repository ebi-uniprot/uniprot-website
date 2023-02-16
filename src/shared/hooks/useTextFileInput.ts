import {
  useEffect,
  useCallback,
  useRef,
  ReactElement,
  MutableRefObject,
} from 'react';

import useDragNDropFile from './useDragNDropFile';

type UseTextFileInputProps = {
  inputRef: MutableRefObject<HTMLInputElement | null>;
  onFileContent: (content: string) => void;
  onError?: (error: TypeError) => void;
  dndOverlay: ReactElement;
};

// Magic regular expression to catch some non-writable characters
// Avoid handling unicode for now as might not be supported enough
const writableRE = /[\w\s-=+*;><"'/\\.#:;|,[\]]/gi;

/**
 * given a file input element, sets up all event handlers to handle drag-n-drop
 * of files on it and normal file handling on click, parse content
 */
const useTextFileInput = ({
  inputRef,
  onFileContent,
  onError,
  dndOverlay,
}: UseTextFileInputProps) => {
  const onFileContentRef = useRef(onFileContent);
  onFileContentRef.current = onFileContent;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const handleNewFile = useCallback(
    (file?: File) => {
      if (!file) {
        return;
      }
      let didCancel = false;

      const fr = new FileReader();
      fr.onload = () => {
        if (!didCancel) {
          const text = fr.result as string;
          const NumberOKCharacters = text.match(writableRE)?.length ?? 0;
          if (NumberOKCharacters / text.length < 0.9) {
            // more than 90% of characters are not writable, bail
            onErrorRef.current?.(
              new TypeError(
                `The file "${file.name}" doesn't appear to be in the correct format. It needs to be a plain text file.`
              )
            );
          } else {
            onFileContentRef.current(text);
            // Reset input ref to handle the case that a user loads the same file twice
            if (inputRef?.current) {
              // eslint-disable-next-line no-param-reassign
              inputRef.current.value = '';
            }
          }
        }
      };
      fr.readAsText(file);

      // eslint-disable-next-line consistent-return
      return () => {
        didCancel = true;
        if (fr) {
          fr.abort();
        }
      };
    },
    [inputRef]
  );

  const handleDrop = useCallback(
    (files: FileList) => {
      handleNewFile(files[0]);
    },
    [handleNewFile]
  );

  useDragNDropFile({
    dndTarget: document.body,
    overlay: dndOverlay,
    onDrop: handleDrop,
  });

  useEffect(() => {
    if (!inputRef.current || inputRef.current.type !== 'file') {
      return;
    }

    const input = inputRef.current;

    const handler = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files?.length) {
        handleNewFile(target.files[0]);
      }
    };

    input.addEventListener('change', handler);

    // eslint-disable-next-line consistent-return
    return () => {
      input.removeEventListener('change', handler);
    };
  }, [inputRef, handleNewFile]);
};

export default useTextFileInput;
