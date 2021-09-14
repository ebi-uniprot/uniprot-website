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
  const [firstValue, ...restOfValues] = new Set(
    deepFindAllByKey(data, keyPredicate)
  );
  return (
    <>
      <span
        style={{
          fontWeight: bolderFirst ? 'bolder' : 'initial',
        }}
      >
        {firstValue}
      </span>
      {restOfValues.length !== 0 && (
        <EllipsisReveal>
          {', '}
          {restOfValues.join(', ')}
        </EllipsisReveal>
      )}
    </>
  );
};

export default CSVView;
