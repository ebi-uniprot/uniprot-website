import { createContext, type RefObject } from 'react';

// A ref to the page's primary scroll container, published by BaseLayout so
// descendants (eg. EntryTabLink) can scroll it without depending on a CSS
// class name. Null when rendered outside BaseLayout (eg. unit tests with no
// provider).
export const ScrollableContainerContext =
  createContext<RefObject<HTMLElement | null> | null>(null);
