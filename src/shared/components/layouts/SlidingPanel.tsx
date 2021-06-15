import { FC, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import ErrorBoundary from '../error-component/ErrorBoundary';

import './styles/sliding-panel.scss';

const SlidingPanel: FC<{
  position: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  yScrollable?: boolean;
  onClose: (arg: void) => void;
}> = ({ children, position, className, onClose, yScrollable = false }) => {
  const node = useRef<HTMLDivElement>(null);

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (node?.current && !node.current.contains(e.target as Node)) {
        e.stopPropagation();
        e.preventDefault();
        onCloseRef.current();
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return createPortal(
    <div
      data-testid="sliding-panel"
      className={cn(`sliding-panel sliding-panel--${position}`, className)}
      style={{ overflowY: yScrollable ? 'auto' : 'initial' }}
      ref={node}
    >
      <ErrorBoundary>
        <div>{children}</div>
      </ErrorBoundary>
    </div>,
    document.body
  );
};

export default SlidingPanel;
