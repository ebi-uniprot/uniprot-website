import { type ReactNode, useEffect, useRef } from 'react';

import { addTooltip } from '../utils/tooltip';

type WithTooltipProps = {
  tooltip: string;
  children: ReactNode;
};

const WithTooltip = ({ tooltip, children }: WithTooltipProps) => {
  const wrapperRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }
    const cleanup = addTooltip(wrapperRef.current, tooltip);
    return cleanup;
  }, [tooltip]);

  return (
    <span
      ref={wrapperRef}
      style={{ display: 'inline-block' }} // ensures the span can receive mouse events & sizing
    >
      {children}
    </span>
  );
};

export default WithTooltip;
