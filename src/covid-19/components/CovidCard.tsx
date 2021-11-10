/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'franklin-sites';
import { useDispatch } from 'react-redux';
import { v1 } from 'uuid';

import EntryTitle from '../../shared/components/entry/EntryTitle';
import { KeywordList } from '../../uniprotkb/components/protein-data-views/KeywordView';
import ProteinOverview from '../../uniprotkb/components/protein-data-views/ProteinOverviewView';

import getProteinHighlights from '../../uniprotkb/adapters/proteinHighlights';
import { getKeywordsForCategories } from '../../uniprotkb/utils/KeywordsUtil';
import { getIdKeyFor } from '../../shared/utils/getIdKeyForNamespace';
import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { getEntryPath } from '../../app/config/urls';
import { addMessage } from '../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
} from '../../messages/types/messagesTypes';

import { Namespace } from '../../shared/types/namespaces';
import { BioEntity } from '../types/MinervaEvent';

import styles from './style/covid-card.module.scss';

interface HTMLMinervaElement extends HTMLElement {
  search: {
    bioEntities: (
      model: string,
      options: { params: { query: string } }
    ) => BioEntity[];
  };
  overlay: { clear: () => void; addOverlays: (results: any) => void };
}

const getIdKey = getIdKeyFor(Namespace.uniprotkb);

const CovidCard = ({ data }: { data: UniProtkbAPIModel }) => {
  const id = getIdKey(data);
  const dispatch = useDispatch();

  const highlights = useMemo(() => getProteinHighlights(data), [data]);

  const keywordsNode = useMemo(() => {
    if (!data.keywords) {
      return null;
    }

    const categorisedKeywords = getKeywordsForCategories(data.keywords, [
      'Molecular function',
      'Biological process',
      'Disease',
    ]);

    return categorisedKeywords.map((keywordCategory, index) => (
      <Fragment key={keywordCategory.category}>
        {index > 0 && ' · '}
        <KeywordList keywords={keywordCategory.keywords} inline />
      </Fragment>
    ));
  }, [data.keywords]);

  const handleCardClick = async (id: string) => {
    const minerva = document.getElementById(
      'minerva-widget'
    ) as HTMLMinervaElement;
    try {
      const results = await minerva.search.bioEntities('*', {
        params: { query: `UNIPROT:${id}` },
      });
      if (!results.length) {
        dispatch(
          addMessage({
            id: v1(),
            content: `No entity found for ${id}`,
            format: MessageFormat.POP_UP,
            level: MessageLevel.INFO,
          })
        );
      }
      minerva.overlay.clear();
      minerva.overlay.addOverlays(results);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card
      id={`acc_${data.primaryAccession}`}
      tabIndex={0}
      className={styles['covid-card']}
      header={
        <>
          <h2 className="tiny">
            <Link to={getEntryPath(Namespace.uniprotkb, data.primaryAccession)}>
              <EntryTitle
                mainTitle={id}
                optionalTitle={data.uniProtkbId}
                entryType={data.entryType}
              />
            </Link>
          </h2>
        </>
      }
      headerSeparator={false}
      onClick={() => handleCardClick(id)}
      links={highlights}
    >
      <ProteinOverview data={data} />
      <small>{keywordsNode}</small>
    </Card>
  );
};

export default CovidCard;
