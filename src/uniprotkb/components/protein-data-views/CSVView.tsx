import { FC } from 'react';
import { EllipsisReveal } from 'franklin-sites';

import { deepFindAllByKey } from '../../../shared/utils/utils';

type CSVViewProps = {
  data?: Record<string, unknown> | Record<string, unknown>[];
  bolderFirst?: boolean;
  keyPredicate?: string;
  contextKey?: string;
  supplementaryData?: Record<string, unknown> | Record<string, unknown>[];
  supplementaryText?: string;
};

const CSVView: FC<CSVViewProps> = ({
  data,
  bolderFirst = false,
  keyPredicate = 'value',
  contextKey,
  supplementaryData,
  supplementaryText,
}) => {
  if (!data) {
    return null;
  }
  const [firstValue, ...restOfValues] = new Set(
    deepFindAllByKey(data, keyPredicate)
  );

  const [firstSupValue, ...restOfSupValues] = new Set(
    deepFindAllByKey(supplementaryData, keyPredicate)
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
      {(restOfValues.length !== 0 || firstSupValue) && (
        <EllipsisReveal contextKey={contextKey}>
          {restOfValues.length ? (
            <>
              {', '}
              {restOfValues.join(', ')}
            </>
          ) : null}
          {firstSupValue && (
            <>
              {`, ${supplementaryText} `}
              <span
                style={{
                  fontWeight: bolderFirst ? 'bolder' : 'initial',
                }}
              >
                {firstSupValue}
              </span>
              {restOfSupValues.length !== 0 && (
                <>
                  {', '}
                  {restOfSupValues.join(', ')}
                </>
              )}
            </>
          )}
        </EllipsisReveal>
      )}
    </>
  );
};

export default CSVView;
