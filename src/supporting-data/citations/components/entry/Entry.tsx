import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card } from 'franklin-sites';
import { SetOptional } from 'type-fest';

import HTMLHead from '../../../../shared/components/HTMLHead';
import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import EntryDownload from '../../../shared/components/EntryDownload';
import LiteratureCitation from '../LiteratureCitation';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import apiUrls from '../../../../shared/config/apiUrls';

import {
  Namespace,
  NamespaceLabels,
} from '../../../../shared/types/namespaces';
import { CitationsAPIModel } from '../../adapters/citationsConverter';

import entryPageStyles from '../../../shared/styles/entry-page.module.scss';

const CitationsEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const { data, loading, error, status, progress } = useDataApiWithStale<
    SetOptional<CitationsAPIModel, 'statistics'>
  >(apiUrls.entry(accession, Namespace.citations));

  if (error || !accession || (!loading && !data)) {
    return <ErrorHandler status={status} />;
  }

  if (!data) {
    return <Loader progress={progress} />;
  }

  return (
    <SingleColumnLayout>
      <HTMLHead
        title={[data.citation.title, NamespaceLabels[Namespace.citations]]}
      >
        <meta name="description" content={data.citation.literatureAbstract} />
      </HTMLHead>
      <h1 className="big">{NamespaceLabels[Namespace.citations]}</h1>
      <Card className={entryPageStyles.card}>
        <div className="button-group">
          <EntryDownload />
        </div>
        <LiteratureCitation data={data} displayAll headingLevel="h2" />
      </Card>
    </SingleColumnLayout>
  );
};

export default CitationsEntry;
