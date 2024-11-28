import { HTMLAttributes, useContext } from 'react';
import { Message } from 'franklin-sites';

import { AFDBOutOfSyncContext } from '../../../shared/contexts/AFDBOutOfSync';

export const AFDBOutOfSync = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const isAFDBOutOfSync = useContext(AFDBOutOfSyncContext);

  if (!isAFDBOutOfSync) {
    return null;
  }

  return (
    <Message level="warning" {...props}>
      Caution: This AlphaFold model was generated using a prior version of the
      UniProt sequence that differs from that now shown
    </Message>
  );
};
