import WithTooltip from '../../../../shared/components/WithTooltip';
import AgrHomologyMatch from './AgrHomologyMatch';
import styles from './styles/agr-homology.module.scss';

const AgrMethodLabel: React.FC<{
  tooltip: string;
  method: React.ReactNode;
}> = ({ tooltip, method }) => (
  <div className={styles['method-label']}>
    <WithTooltip tooltip={tooltip}>{method}</WithTooltip>
  </div>
);

type PredictionMethods = {
  internal: boolean;
  obsolete: boolean;
  name: string;
  notInternalOrObsolete: boolean;
};

type HomologyGetter<T> = (data: T) => {
  predictionMethodsMatched: PredictionMethods[];
  predictionMethodsNotMatched?: PredictionMethods[];
};

function getHomologyMethodColumnConfig<T>(
  index: number,
  method: string,
  tooltip: string,
  methodsTooltip: string,
  homologyGetter: HomologyGetter<T>
) {
  return {
    id: method,
    label:
      index === 0 ? (
        <div className={styles['methods-label-container']}>
          <span className={styles['methods-label']}>
            <WithTooltip tooltip={methodsTooltip}>Method</WithTooltip>
          </span>
          <AgrMethodLabel tooltip={tooltip} method={method} />
        </div>
      ) : (
        <AgrMethodLabel tooltip={tooltip} method={method} />
      ),
    render: (data: T) => (
      <AgrHomologyMatch
        method={method}
        matched={homologyGetter(data).predictionMethodsMatched}
        notMatched={homologyGetter(data).predictionMethodsNotMatched}
      />
    ),
  };
}

export default getHomologyMethodColumnConfig;
