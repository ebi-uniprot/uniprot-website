import {
  useEffect,
  useCallback,
  useState,
  useRef,
  ReactElement,
  useMemo,
} from 'react';
import { render } from 'react-dom';
import { debounce } from 'lodash-es';

const DRAG_OUT_DELAY = 250;

/**
 * given an actual HTML element as a target, sets up all event handlers to
 * handle drag-n-drop of files on it
 * @param {HTMLElement} dndTarget
 * @returns {Array} tuple - return tuple
 * @returns {boolean} tuple[0]
 *          return a boolean denoting if the user is dragging on the page
 * @returns {FileList} tuple[1]
 *          List of files dropped on the target
 */
const useDragNDropFile = (
  dndTarget: HTMLElement | null,
  overlay: ReactElement
): [boolean, FileList | undefined] => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<FileList>();

  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleDraggingOut = useMemo(
    () =>
      debounce((event: Event) => {
        const e = event as DragEvent;
        if (!e.dataTransfer?.files.length) {
          return;
        }
        event.preventDefault();
        setIsDragging(false);
      }, DRAG_OUT_DELAY),
    []
  );

  const handleDraggingIn = useCallback(
    (event: Event) => {
      const e = event as DragEvent;
      if (!e.dataTransfer) {
        return;
      }
      e.preventDefault();
      handleDraggingOut.cancel();
      e.dataTransfer.dropEffect = 'copy';
      e.dataTransfer.effectAllowed = 'copy';
      setIsDragging(true);
    },
    [handleDraggingOut]
  );

  const handleDrop = useCallback(
    (event: Event) => {
      const e = event as DragEvent;
      if (!e.dataTransfer?.files.length) {
        return;
      }
      event.preventDefault();
      handleDraggingOut.cancel();
      setIsDragging(false);
      setFiles(e.dataTransfer.files);
    },
    [handleDraggingOut]
  );

  useEffect(() => {
    if (!dndTarget) {
      return;
    }

    overlayRef.current = document.createElement('div');

    overlayRef.current.style.pointerEvents = 'none';
    overlayRef.current.style.position = 'absolute';
    overlayRef.current.style.display = 'flex';
    overlayRef.current.style.alignItems = 'center';
    overlayRef.current.style.justifyContent = 'center';
    overlayRef.current.style.zIndex = '999';
    overlayRef.current.style.background = 'rgba(255, 255, 255, 0.75)';
    if ('backdropFilter' in overlayRef.current.style) {
      (overlayRef.current.style as CSSStyleDeclaration & {
        backdropFilter?: string;
      }).backdropFilter = 'blur(5px)';
    }

    document.body.appendChild(overlayRef.current);

    // eslint-disable-next-line consistent-return
    return () => {
      if (overlayRef.current) {
        document.body.removeChild(overlayRef.current);
      }
      overlayRef.current = null;
    };
  }, [dndTarget]);

  useEffect(() => {
    if (overlayRef.current && dndTarget) {
      overlayRef.current.style.visibility = isDragging ? 'visible' : 'hidden';
      if (isDragging) {
        const rect = dndTarget.getBoundingClientRect();

        overlayRef.current.style.left = `${rect.left}px`;
        overlayRef.current.style.width = `${rect.width}px`;
        overlayRef.current.style.top = `${rect.top}px`;
        overlayRef.current.style.height = `${rect.height}px`;
      }
    }
  }, [dndTarget, isDragging]);

  useEffect(() => {
    if (!dndTarget) {
      return;
    }
    dndTarget.addEventListener('drag', handleDraggingIn);
    dndTarget.addEventListener('dragstart', handleDraggingIn);
    dndTarget.addEventListener('dragover', handleDraggingIn);
    dndTarget.addEventListener('dragenter', handleDraggingIn);
    dndTarget.addEventListener('dragend', handleDraggingOut);
    dndTarget.addEventListener('dragexit', handleDraggingOut);
    dndTarget.addEventListener('dragleave', handleDraggingOut);
    dndTarget.addEventListener('drop', handleDrop);
    // eslint-disable-next-line consistent-return
    return () => {
      dndTarget.removeEventListener('drag', handleDraggingIn);
      dndTarget.removeEventListener('dragstart', handleDraggingIn);
      dndTarget.removeEventListener('dragover', handleDraggingIn);
      dndTarget.removeEventListener('dragenter', handleDraggingIn);
      dndTarget.removeEventListener('dragend', handleDraggingOut);
      dndTarget.removeEventListener('dragexit', handleDraggingOut);
      dndTarget.removeEventListener('dragleave', handleDraggingOut);
      dndTarget.removeEventListener('drop', handleDrop);
    };
  }, [dndTarget, handleDraggingIn, handleDraggingOut, handleDrop]);

  useEffect(() => {
    if (overlayRef.current) {
      render(overlay, overlayRef.current);
    }
  }, [overlay]);

  return [isDragging, files];
};

export default useDragNDropFile;
