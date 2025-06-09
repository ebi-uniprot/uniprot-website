import { Loader } from 'franklin-sites';

import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { Namespace } from '../../../shared/types/namespaces';
import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';
import UniProtKBCard from '../results/UniProtKBCard';

const EvidenceCard = ({ id }: { id: string }) => {
  const { loading, data, error, progress } = useDataApi<UniProtkbAPIModel>(
    apiUrls.entry.entry(id, Namespace.uniprotkb)
  );

  if (loading || !data) {
    if (error) {
      return null;
    }
    return <Loader progress={progress} />;
  }

  return <UniProtKBCard data={data} isNotSelectable noHighlights />;
};

export default EvidenceCard;
