import { useEffect, useCallback, useRef, ReactElement } from 'react';
import fileType from 'file-type/browser';
import useDragNDropFile from './useDragNDropFile';

type Props = {
  input: HTMLInputElement | null;
  onFileContent: (content: string) => void;
  onError?: (error: TypeError) => void;
  dndOverlay: ReactElement;
};

/**
 * given a file input element, sets up all event handlers to handle drag-n-drop
 * of files on it and normal file handling on click, parse content
 */
const useTextFileInput = ({
  input,
  onFileContent,
  onError,
  dndOverlay,
}: Props) => {
  const onFileContentRef = useRef(onFileContent);
  onFileContentRef.current = onFileContent;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const handleNewFile = useCallback((file?: File) => {
    if (!file) {
      return;
    }
    let didCancel = false;
    let fr: FileReader;
    fileType.fromBlob(file).then((fileResult) => {
      if (didCancel) {
        return;
      }
      // if recognised any kind of specific format, then it's not plain text
      if (fileResult) {
        onErrorRef.current?.(
          new TypeError(
            `The file "${file.name}" doesn't appear to be in the correct format. It needs to be a plain text file.`
          )
        );
        return;
      }

      fr = new FileReader();
      fr.onload = () => {
        if (!didCancel) {
          onFileContentRef.current(fr.result as string);
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
