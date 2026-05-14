import { type FC, type MouseEvent, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import baseLayoutStyles from './layouts/styles/base-layout.module.scss';

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
  const currentPath = location.pathname + location.hash;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    if (currentPath !== to) {
      return;
    }
    e.preventDefault();
    document
      .querySelector(`.${baseLayoutStyles['main-content']}`)
      ?.scrollTo({ top: 0, behavior: 'smooth' });
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
