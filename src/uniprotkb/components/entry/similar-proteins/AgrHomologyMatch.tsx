import styles from './styles/agr-homology.module.scss';

type Props<T> = {
  method: string;
  matched?: T[];
  notMatched?: T[];
};

function AgrHomologyMatch<T extends { name: string }>({
  method,
  matched,
  notMatched,
}: Props<T>) {
  const predictionMethodsMatchedSet = new Set(matched?.map((m) => m.name));
  const predictionMethodsNotMatchedSet = new Set(
    notMatched?.map((m) => m.name)
  );
  let symbol: string, title: string;
  if (predictionMethodsMatchedSet.has(method)) {
    symbol = '●';
    title = `Match by ${method} method`;
  } else if (predictionMethodsNotMatchedSet.has(method)) {
    symbol = '○';
    title = `No match by ${method} method`;
  } else {
    symbol = '-';
    title = `Comparison not available for ${method} method`;
  }
  return (
    <span key={method} title={title} className={styles['method-render']}>
      {symbol}
    </span>
  );
}

export default AgrHomologyMatch;
