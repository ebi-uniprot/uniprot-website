import { FC } from 'react';
import { EllipsisReveal } from 'franklin-sites';

import { deepFindAllByKey } from '../../../shared/utils/utils';

type CSVViewProps = {
  data?: Record<string, unknown> | Record<string, unknown>[];
  bolderFirst?: boolean;
  keyPredicate?: string;
};

const CSVView: FC<CSVViewProps> = ({
  data,
  bolderFirst = false,
  keyPredicate = 'value',
}) => {
  if (!data) {
    return null;
  }
  const uniqueValues = Array.from(
    new Set(deepFindAllByKey(data, keyPredicate))
  );
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
