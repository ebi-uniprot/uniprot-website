import AgrHomologyMatch from './AgrHomologyMatch';
import styles from './styles/agr-homology.module.scss';

const AgrMethodLabel: React.FC<{
  method: React.ReactNode;
}> = ({ method }) => (
  <div className={styles['method-label']}>
    <span>{method}</span>
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
  homologyGetter: HomologyGetter<T>
) {
  return {
    id: method,
    label:
      index === 0 ? (
        <div className={styles['methods-label-container']}>
          <span className={styles['methods-label']}>Method</span>
          <AgrMethodLabel method={method} />
        </div>
      ) : (
        <AgrMethodLabel method={method} />
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
