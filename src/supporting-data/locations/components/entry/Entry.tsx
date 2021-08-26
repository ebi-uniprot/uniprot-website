import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card, InfoList } from 'franklin-sites';
import cn from 'classnames';

import HTMLHead from '../../../../shared/components/HTMLHead';
import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import EntryDownload from '../../../shared/components/EntryDownload';
import { MapToDropdown } from '../../../shared/components/MapTo';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import apiUrls from '../../../../shared/config/apiUrls';

import {
  Namespace,
  NamespaceLabels,
} from '../../../../shared/types/namespaces';
import { LocationsAPIModel } from '../../adapters/locationsConverter';
import LocationsColumnConfiguration, {
  LocationsColumn,
} from '../../config/LocationsColumnConfiguration';

import helper from '../../../../shared/styles/helper.module.scss';
import entryPageStyles from '../../../shared/styles/entry-page.module.scss';

const columns = [
  LocationsColumn.definition,
  LocationsColumn.synonyms,
  LocationsColumn.category,
  LocationsColumn.geneOntologies,
  LocationsColumn.content,
  LocationsColumn.isA,
  LocationsColumn.partOf,
  LocationsColumn.keyword,
  LocationsColumn.links,
  LocationsColumn.note,
  LocationsColumn.references,
];

const LocationsEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const { data, loading, error, status, progress, isStale } =
    useDataApiWithStale<LocationsAPIModel>(
      apiUrls.entry(accession, Namespace.locations)
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
      const renderer = LocationsColumnConfiguration.get(column);
      return {
        title: renderer?.label,
        content: renderer?.render(data),
      };
    });

  return (
    <SingleColumnLayout>
      <HTMLHead title={[data.name, NamespaceLabels[Namespace.locations]]}>
        <meta name="description" content={data.definition} />
      </HTMLHead>
      {/* Here we don't want to use the exact label atm */}
      <h1 className="big">Cellular component - {data.name}</h1>
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

export default LocationsEntry;
