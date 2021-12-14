import { useEffect } from 'react';
import { useHistory, RouteChildrenProps } from 'react-router-dom';
import { Loader, Card, InfoList } from 'franklin-sites';
import cn from 'classnames';

import HTMLHead from '../../../../shared/components/HTMLHead';
import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import EntryDownload from '../../../../shared/components/entry/EntryDownload';
import { MapToDropdown } from '../../../../shared/components/MapTo';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import apiUrls from '../../../../shared/config/apiUrls';

import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import { KeywordsAPIModel } from '../../adapters/keywordsConverter';
import KeywordsColumnConfiguration, {
  KeywordsColumn,
} from '../../config/KeywordsColumnConfiguration';

import helper from '../../../../shared/styles/helper.module.scss';
import entryPageStyles from '../../../shared/styles/entry-page.module.scss';
import { getEntryPathFor } from '../../../../app/config/urls';

const columns = [
  KeywordsColumn.definition,
  KeywordsColumn.synonyms,
  KeywordsColumn.category,
  KeywordsColumn.geneOntologies,
  KeywordsColumn.parents,
  KeywordsColumn.children,
  KeywordsColumn.links,
];

const KeywordsEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const history = useHistory();
  const accession = props.match?.params.accession;

  useEffect(() => {
    // If accession is a number only, add KW- prefix
    if (accession?.match(/^\d+$/)) {
      history.push({
        pathname: getEntryPathFor(Namespace.keywords)(`KW-${accession}`),
      });
    }
  }, [accession, history]);

  const { data, loading, error, status, progress, isStale } =
    useDataApiWithStale<KeywordsAPIModel>(
      apiUrls.entry(accession, Namespace.keywords)
    );

  if (error || !accession || (!loading && !data)) {
    return <ErrorHandler status={status} />;
  }

  if (!data) {
    return <Loader progress={progress} />;
  }

  const infoData =
    data &&
    columns.map((column) => {
      const renderer = KeywordsColumnConfiguration.get(column);
      return {
        title: renderer?.label,
        content: renderer?.render(data),
      };
    });

  return (
    <SingleColumnLayout>
      <HTMLHead
        title={[
          data.keyword.name,
          searchableNamespaceLabels[Namespace.keywords],
        ]}
      >
        <meta name="description" content={data.definition} />
      </HTMLHead>
      <h1 className="big">
        {searchableNamespaceLabels[Namespace.keywords]} - {data.keyword.name}
      </h1>
      <Card className={cn(entryPageStyles.card, { [helper.stale]: isStale })}>
        <div className="button-group">
          <EntryDownload />
          <MapToDropdown statistics={data.statistics} />
        </div>
        {infoData && <InfoList infoData={infoData} isCompact />}
      </Card>
    </SingleColumnLayout>
  );
};

export default KeywordsEntry;
