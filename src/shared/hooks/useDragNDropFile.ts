import {
  useEffect,
  useCallback,
  useState,
  useRef,
  ReactElement,
  useMemo,
} from 'react';
import { createRoot } from 'react-dom/client';
import { debounce } from 'lodash-es';

const DRAG_OUT_DELAY = 250;

type UseDragNDropFileProps = {
  dndTarget: HTMLElement | null;
  overlay: ReactElement;
  onDrop: (files: FileList) => void;
};

/**
 * given an actual HTML element as a target, sets up all event handlers to
 * handle drag-n-drop of files on it
 */
const useDragNDropFile = ({
  dndTarget,
  overlay,
  onDrop,
}: UseDragNDropFileProps): void => {
  const [isDragging, setIsDragging] = useState(false);

  const onDropRef = useRef(onDrop);
  onDropRef.current = onDrop;

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const root = useMemo(
    () => overlayRef.current && createRoot(overlayRef.current),
    []
  );

  const handleDraggingOut = useMemo(
    () =>
      debounce((event: Event) => {
        const e = event as DragEvent;
        if (!e.dataTransfer?.types.includes('Files')) {
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
      // avoid activating any logic when dragging other things than files
      if (!e.dataTransfer?.types.includes('Files')) {
        return;
      }
      e.preventDefault();
      handleDraggingOut.cancel();
      // style to add a plus sign next to the dragged files
      e.dataTransfer.dropEffect = 'copy';
      e.dataTransfer.effectAllowed = 'copy';
      setIsDragging(true);
    },
    [handleDraggingOut]
  );

  const handleDrop = useCallback(
    (event: Event) => {
      const e = event as DragEvent;
      if (!e.dataTransfer?.types.includes('Files')) {
        return;
      }
      event.preventDefault();
      handleDraggingOut.cancel();
      setIsDragging(false);
      onDropRef.current(e.dataTransfer.files);
    },
    [handleDraggingOut]
  );

  useEffect(() => {
    if (!dndTarget) {
      return;
    }

    overlayRef.current = document.createElement('div');

    overlayRef.current.style.pointerEvents = 'none';
    overlayRef.current.style.visibility = 'hidden';
    overlayRef.current.style.position = 'absolute';
    overlayRef.current.style.display = 'none';
    overlayRef.current.style.alignItems = 'center';
    overlayRef.current.style.justifyContent = 'center';
    overlayRef.current.style.zIndex = '999';
    overlayRef.current.style.background = 'rgba(255, 255, 255, 0.75)';
    if ('backdropFilter' in overlayRef.current.style) {
      (
        overlayRef.current.style as CSSStyleDeclaration & {
          backdropFilter?: string;
        }
      ).backdropFilter = 'blur(5px)';
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

        overlayRef.current.style.display = 'flex';
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
    if (overlayRef.current && root) {
      root.render(overlay);
    }
  }, [overlay, root]);
};

export default useDragNDropFile;
