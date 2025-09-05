import { createContext } from 'react';
import { NavigateFunction } from 'react-router';

type Ctx = {
  articlePath?: string;
  onClose: (reason: 'outside' | 'x-button' | 'navigation' | 'escape') => void;
  globalPathname: string;
  globalNavigate: NavigateFunction;
};

export const ContextualHelpContext = createContext<Ctx>(undefined);
