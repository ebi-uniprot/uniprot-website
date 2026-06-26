import { type FC, type MouseEvent, type ReactNode, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ScrollableContainerContext } from '../contexts/ScrollableContainer';
import { useReducedMotion } from '../hooks/useMatchMedia';

type Props = {
  to: string;
  className?: string;
  tabIndex?: number;
  children: ReactNode;
};

// Active-tab clicks smooth-scroll to top instead of being a <Link> no-op.
// Non-active and modifier clicks flow through to <Link> unchanged.
const EntryTabLink: FC<Props> = ({ to, className, tabIndex, children }) => {
  const location = useLocation();
  const scrollContainerRef = useContext(ScrollableContainerContext);
  const reducedMotion = useReducedMotion();
  const currentPath = location.pathname + location.hash;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    if (currentPath !== to) {
      return;
    }
    e.preventDefault();
    scrollContainerRef?.current?.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <Link
      to={to}
      className={className}
      tabIndex={tabIndex}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default EntryTabLink;
