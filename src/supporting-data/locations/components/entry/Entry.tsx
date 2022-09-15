import { Loader, Card, InfoList } from 'franklin-sites';
import { Redirect, RouteChildrenProps } from 'react-router-dom';
import cn from 'classnames';
import { LocationDescriptor } from 'history';

import HTMLHead from '../../../../shared/components/HTMLHead';
import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import EntryDownload from '../../../../shared/components/entry/EntryDownload';
import { MapToDropdown } from '../../../../shared/components/MapTo';
import RelatedResults from '../../../../shared/components/results/RelatedResults';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import apiUrls from '../../../../shared/config/apiUrls';
import { getEntryPathFor } from '../../../../app/config/urls';

import {
  Namespace,
  searchableNamespaceLabels,
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

const reNumber = /^\d+$/;

const LocationsEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  let redirectTo: LocationDescriptor | null = null;
  // If the accession is a number not prefixed with "SL-"
  if (accession && reNumber.test(accession)) {
    redirectTo = {
      pathname: getEntryPathFor(Namespace.locations)(
        `SL-${accession.padStart(4, '0')}`
      ),
    };
  }

  const { data, loading, error, status, progress, isStale } =
    useDataApiWithStale<LocationsAPIModel>(
      redirectTo ? undefined : apiUrls.entry(accession, Namespace.locations)
    );

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

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

  const hasRelated = Boolean(
    data.statistics?.reviewedProteinCount ||
      data.statistics?.unreviewedProteinCount
  );

  const relatedQuery = `(cc_scl_term:${accession})`;

  return (
    <SingleColumnLayout>
      <HTMLHead
        title={[data.name, searchableNamespaceLabels[Namespace.locations]]}
      >
        <meta name="description" content={data.definition} />
        <link rel="canonical" href={window.location.href} />
      </HTMLHead>
      {/* Here we don't want to use the exact label atm */}
      <h1>Cellular component - {data.name}</h1>
      <Card className={cn(entryPageStyles.card, { [helper.stale]: isStale })}>
        <div className="button-group">
          <EntryDownload />
          <MapToDropdown statistics={data.statistics} />
        </div>
        <InfoList infoData={infoData} />
      </Card>
      {hasRelated && <RelatedResults relatedQuery={relatedQuery} />}
    </SingleColumnLayout>
  );
};

export default LocationsEntry;
