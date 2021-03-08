import { FC } from 'react';
import { ExternalLink } from 'franklin-sites';
import { GenomeAssembly } from '../adapters/proteomesConverter';

const GenomeAssemblyView: FC<Partial<GenomeAssembly>> = ({
  assemblyId,
  source,
  genomeAssemblyUrl,
}) => {
  if (!assemblyId) {
    return null;
  }
  const text = `${assemblyId}${source ? ` from ${source}` : ''}`;
  if (genomeAssemblyUrl) {
    return <ExternalLink url={genomeAssemblyUrl}>{text}</ExternalLink>;
  }
  return <>{text}</>;
};

export default GenomeAssemblyView;
