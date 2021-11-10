import { Loader } from 'franklin-sites';
import { useEffect, useRef } from 'react';

import useDataApi from '../../shared/hooks/useDataApi';
import useNSQuery from '../../shared/hooks/useNSQuery';
import { Namespace } from '../../shared/types/namespaces';
import Response from '../../uniprotkb/types/responseTypes';
import covidIdList from '../config/covid-list';
import CovidCard from './CovidCard';

import '../deps/minerva-widget';

import styles from './style/covid-main.module.scss';
import { BioEntity, MinervaClickEventDetail } from '../types/MinervaEvent';

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

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (minervaContainerRef.current) {
      const processMinervaClickEvent = (event: Event) => {
        const customMinervaEvent =
          event as CustomEvent<MinervaClickEventDetail>;
        const minervaEvent = customMinervaEvent.detail;
        minervaEvent[0].entities?.forEach((entity) => {
          const reference = entity.references.find(
            (ref) => ref.type === 'UNIPROT'
          );
          if (reference?.resource) {
            highlightCard(reference?.resource);
          }
        });
      };
      const processMinervaFlyEvent = (event: Event) => {
        const customMinervaEvent = event as CustomEvent<BioEntity[]>;
        const entity = customMinervaEvent.detail[0];
        const reference = entity.references.find(
          (ref) => ref.type === 'UNIPROT'
        );
        if (reference?.resource) {
          highlightCard(reference?.resource);
        }
      };

      const currentMinervaRef = minervaContainerRef.current;
      currentMinervaRef.addEventListener(
        'canvas-click',
        processMinervaClickEvent
      );
      currentMinervaRef.addEventListener('fly', processMinervaFlyEvent);
      // eslint-disable-next-line consistent-return
      return () => {
        currentMinervaRef.removeEventListener(
          'canvas-click',
          processMinervaClickEvent
        );
        currentMinervaRef.removeEventListener('fly', processMinervaFlyEvent);
      };
    }
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
            ref={minervaContainerRef}
            style={{ height: '100%' }}
            src="https://covid19map.elixir-luxembourg.org/minerva/"
          />
        </div>
      </div>
    </div>
  );
};

export default CovidMain;
