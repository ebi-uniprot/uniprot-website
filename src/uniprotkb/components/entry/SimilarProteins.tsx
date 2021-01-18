import { FC } from 'react';
// import { Tabs } from 'franklin-sites';
import { getClustersForProteins } from '../../../shared/config/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';

const SimilarProteins: FC<{
  isoforms: { isoforms: string[] };
  primaryAccession: string;
}> = ({ isoforms, primaryAccession }) => {
  const searchUrl = getClustersForProteins([
    primaryAccession,
    ...isoforms.isoforms,
  ]);
  const { loading, data, error } = useDataApi(searchUrl);
  console.log(data);

  return <></>;
};

export default SimilarProteins;
