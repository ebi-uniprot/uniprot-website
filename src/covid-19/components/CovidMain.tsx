import { Loader } from 'franklin-sites';
import { ChangeEvent, useEffect, useRef } from 'react';

import useDataApi from '../../shared/hooks/useDataApi';
import useNSQuery from '../../shared/hooks/useNSQuery';
import { Namespace } from '../../shared/types/namespaces';
import Response from '../../uniprotkb/types/responseTypes';
import covidIdList from '../config/covid-list';
import CovidCard from './CovidCard';

import '../deps/minerva-widget';

import styles from './style/covid-main.module.scss';
import { MinervaEventDetail } from '../types/MinervaEvent';

const CovidMain = () => {
  const url = useNSQuery({
    accessions: covidIdList,
    overrideNS: Namespace.uniprotkb,
    withFacets: false,
  });
  const { loading, data } = useDataApi<Response['data']>(url);
  const minervaContainerRef = useRef<HTMLDivElement | null>(null);

  const highlightCard = (accession: string) => {
    const highlightElt = document.getElementById(`acc_${accession}`);
    highlightElt?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    highlightElt?.focus();
  };

  setTimeout(() => {
    highlightCard('P02649');
  }, 5000);

  useEffect(() => {
    if (!minervaContainerRef.current) {
      return;
    }

    const processMinervaEvent = (event: Event) => {
      const customMinervaEvent = event as CustomEvent<MinervaEventDetail>;
      const minervaEvent = customMinervaEvent.detail;
      const reference = minervaEvent.references.find(
        (ref) => ref.type === 'UNIPROT'
      );
      if (reference?.resource) {
        highlightCard(reference?.resource);
      }
    };

    const currentMinervaRef = minervaContainerRef.current;
    currentMinervaRef.addEventListener('minerva-event', processMinervaEvent);
    // eslint-disable-next-line consistent-return
    return () => {
      currentMinervaRef.removeEventListener(
        'minerva-event',
        processMinervaEvent
      );
    };
  }, [minervaContainerRef]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Covid-19</h1>
      <div className={styles['panel-layout']}>
        <div className={styles['panel-layout__left']} ref={minervaContainerRef}>
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
