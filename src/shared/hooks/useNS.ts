import { useRouteMatch } from 'react-router-dom';

export enum NS {
  UniProtKB = 'uniprotkb',
  UniRef = 'uniref',
  UniParc = 'uniparc',
  Proteomes = 'proteomes',
  Publications = 'publications',
  Keywords = 'keywords',
}

const useNS = (): void | NS => {
  const match = useRouteMatch<{ potentialNS: NS | string }>('/:potentialNS/');

  if (!match) return;

  const potentialNS = match.params.potentialNS.toLowerCase();
  // eslint-disable-next-line consistent-return
  return Object.values(NS).find((ns) => ns === potentialNS);
};

export default useNS;
