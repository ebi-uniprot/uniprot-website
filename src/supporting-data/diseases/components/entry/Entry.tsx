import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card, InfoList } from 'franklin-sites';
import cn from 'classnames';

import HTMLHead from '../../../../shared/components/HTMLHead';
import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import EntryDownload from '../../../../shared/components/entry/EntryDownload';
import { MapToDropdown } from '../../../../shared/components/MapTo';
import MedicalDisclaimer from '../../../../shared/components/MedicalDisclaimer';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import apiUrls from '../../../../shared/config/apiUrls';

import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import { DiseasesAPIModel } from '../../adapters/diseasesConverter';
import DiseasesColumnConfiguration, {
  DiseasesColumn,
} from '../../config/DiseasesColumnConfiguration';

import helper from '../../../../shared/styles/helper.module.scss';
import entryPageStyles from '../../../shared/styles/entry-page.module.scss';

const columns = [
  DiseasesColumn.definition,
  DiseasesColumn.acronym,
  DiseasesColumn.alternativeNames,
  DiseasesColumn.crossReferences,
];

const DiseasesEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const { data, loading, error, status, progress, isStale } =
    useDataApiWithStale<DiseasesAPIModel>(
      apiUrls.entry(accession, Namespace.diseases)
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
      const renderer = DiseasesColumnConfiguration.get(column);
      return {
        title: renderer?.label,
        content: renderer?.render(data),
      };
    });

  return (
    <SingleColumnLayout>
      <HTMLHead
        title={[data.name, searchableNamespaceLabels[Namespace.diseases]]}
      >
        <meta name="description" content={data.definition} />
      </HTMLHead>
      {/* Here we don't want to use the full label atm */}
      <h1>Disease - {data.name}</h1>
      <Card className={cn(entryPageStyles.card, { [helper.stale]: isStale })}>
        <div className="button-group">
          <EntryDownload />
          <MapToDropdown statistics={data.statistics} />
        </div>
        {infoData && <InfoList infoData={infoData} isCompact />}
        <MedicalDisclaimer />
      </Card>
    </SingleColumnLayout>
  );
};

export default DiseasesEntry;
