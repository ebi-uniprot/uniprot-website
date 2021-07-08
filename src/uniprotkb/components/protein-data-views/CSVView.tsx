import { FC } from 'react';
import { uniq } from 'lodash-es';
import { EllipsisReveal } from 'franklin-sites';

import { deepFindAllByKey } from '../../../shared/utils/utils';

type CSVViewProps = {
  data?: Record<string, unknown> | Record<string, unknown>[];
  bolderFirst: boolean;
  keyPredicate: string;
};

const CSVView: FC<CSVViewProps> = ({ data, bolderFirst, keyPredicate }) => {
  if (!data) {
    return null;
  }
  const uniqueValues = uniq(deepFindAllByKey(data, keyPredicate));
  return (
    <>
      <span
        style={{
          fontWeight: bolderFirst ? 'bolder' : 'initial',
        }}
      >
        {uniqueValues[0]}
      </span>
      {uniqueValues.length > 1 && (
        <EllipsisReveal>
          {', '}
          {uniqueValues.splice(1).join(', ')}
        </EllipsisReveal>
      )}
    </>
  );
};

export default CSVView;
