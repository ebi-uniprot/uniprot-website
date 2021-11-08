import { Loader } from 'franklin-sites';
import useDataApi from '../../shared/hooks/useDataApi';
import useNSQuery from '../../shared/hooks/useNSQuery';
import { Namespace } from '../../shared/types/namespaces';
import UniProtKBCard from '../../uniprotkb/components/results/UniProtKBCard';
import Response from '../../uniprotkb/types/responseTypes';
import covidIdList from '../config/covid-list';

import '../deps/minerva-widget';

import styles from './style/covid-main.module.scss';

const CovidMain = () => {
  const url = useNSQuery({
    accessions: covidIdList,
    overrideNS: Namespace.uniprotkb,
    withFacets: false,
  });
  const { loading, data } = useDataApi<Response['data']>(url);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <h1>Covid-19</h1>
      <minerva-widget
        src="https://pdmap.uni.lu/minerva/"
        style={{ height: '100vh' }}
      />
      {data?.results.map((datum) => (
        <UniProtKBCard data={datum} key={datum.primaryAccession} />
      ))}
    </div>
  );
};

export default CovidMain;
