import { useEffect, useCallback, useRef, ReactElement } from 'react';

import useDragNDropFile from './useDragNDropFile';

type UseTextFileInputProps = {
  input: HTMLInputElement | null;
  onFileContent: (content: string) => void;
  onError?: (error: TypeError) => void;
  dndOverlay: ReactElement;
};

// Magic regular expression to catch some non-writable characters
// Avoid handling unicode for now as might not be supported enough
const writableRE = /[\w\s-=+*;><"'/\\.#:;|,]/gi;

/**
 * given a file input element, sets up all event handlers to handle drag-n-drop
 * of files on it and normal file handling on click, parse content
 */
const useTextFileInput = ({
  input,
  onFileContent,
  onError,
  dndOverlay,
}: UseTextFileInputProps) => {
  const onFileContentRef = useRef(onFileContent);
  onFileContentRef.current = onFileContent;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const handleNewFile = useCallback((file?: File) => {
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
  }, []);

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
    if (!input || input.type !== 'file') {
      return;
    }

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
  }, [input, handleNewFile]);
};

export default useTextFileInput;
