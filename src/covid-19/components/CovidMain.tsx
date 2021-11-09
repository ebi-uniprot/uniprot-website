import { Loader } from 'franklin-sites';
import { useEffect } from 'react';

import useDataApi from '../../shared/hooks/useDataApi';
import useNSQuery from '../../shared/hooks/useNSQuery';
import { Namespace } from '../../shared/types/namespaces';
import Response from '../../uniprotkb/types/responseTypes';
import covidIdList from '../config/covid-list';
import CovidCard from './CovidCard';

import '../deps/minerva-widget';

import styles from './style/covid-main.module.scss';
import { MinervaEvent } from '../types/MinervaEvent';

const CovidMain = () => {
  const url = useNSQuery({
    accessions: covidIdList,
    overrideNS: Namespace.uniprotkb,
    withFacets: false,
  });
  const { loading, data } = useDataApi<Response['data']>(url);

  const highlightCard = (accession: string) => {
    const highlightElt = document.getElementById(`acc_${accession}`);
    highlightElt?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    highlightElt?.focus();
  };

  setTimeout(() => {
    highlightCard('P02649');
  }, 5000);

  const processMinervaEvent = (event: MinervaEvent) => {
    const reference = event.references.find((ref) => ref.type === 'UNIPROT');
    if (reference?.resource) {
      highlightCard(reference?.resource);
    }
  };

  useEffect(() => {
    document.addEventListener('minerva-event', processMinervaEvent);

    return () => {
      document.removeEventListener('minerva-event', processMinervaEvent);
    };
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Covid-19</h1>
      <div className={styles['panel-layout']}>
        <div className={styles['panel-layout__left']}>
          {data?.results.map((datum) => (
            <CovidCard data={datum} key={datum.primaryAccession} />
          ))}
        </div>
        <div>
          <minerva-widget
            style={{ height: '100%' }}
            src="https://pdmap.uni.lu/minerva/"
          />
        </div>
      </div>
    </div>
  );
};

export default CovidMain;
