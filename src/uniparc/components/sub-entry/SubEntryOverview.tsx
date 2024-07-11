import { memo } from 'react';
import { Link } from 'react-router-dom';
import { InfoList } from 'franklin-sites';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';

import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';
import { TabLocation } from '../entry/Entry';
import { TabLocation as UniprotkbTabLocation } from '../../../uniprotkb/types/entry';
import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';

type Props = {
  data: UniParcSubEntryUIModel;
};

const SubEntryOverview = ({ data }: Props) => {
  const [proteomeId, component] =
    (data.subEntry.isSource &&
      data.subEntry.proteomeId &&
      data.subEntry.component && [
        data.subEntry.proteomeId,
        data.subEntry.component,
      ]) ||
    (data.subEntry.source &&
      data.subEntry.source.proteomeId &&
      data.subEntry.source.component && [
        data.subEntry.source.proteomeId,
        data.subEntry.source.component,
      ]) ||
    [];

  const infoData = [
    {
      title: <span data-article-id="protein_names">Protein</span>,
      content: data.subEntry.proteinName && (
        <strong>{data.subEntry.proteinName}</strong>
      ),
    },
    {
      title: <span data-article-id="gene_name">Gene</span>,
      content: data.subEntry.geneName && (
        <strong>{data.subEntry.geneName}</strong>
      ),
    },
    {
      title: <span data-article-id="accession">Database</span>,
      content: !data.subEntry.isUniprotkbEntry && data.subEntry.database,
    },
    {
      title: <span data-article-id="accession">UniProtKB accession</span>,
      content: data.subEntry.id && data.subEntry.isUniprotkbEntry && (
        <Link
          to={{
            pathname: getEntryPath(
              Namespace.uniprotkb,
              data.subEntry.id,
              data.subEntry.active
                ? UniprotkbTabLocation.Entry
                : UniprotkbTabLocation.History
            ),
          }}
        >
          {data.subEntry.id}
        </Link>
      ),
    },
    {
      title: 'Sequence source',
      content: data.subEntry.source?.database,
    },
    {
      title: <span data-article-id="organism-name">Organism</span>,
      content: (data.subEntry.organism?.scientificName ||
        data.subEntry.organism?.taxonId) && (
        <TaxonomyView data={data.subEntry.organism} />
      ),
    },
    {
      // TODO: add link to sequence section
      title: 'Amino acids',
      content: data.entry.sequence && (
        <span>{data.entry.sequence?.length} </span>
      ),
    },
    {
      title: 'Proteome',
      content: proteomeId && component && (
        <Link
          to={{
            pathname: getEntryPath(Namespace.proteomes, proteomeId),
          }}
        >
          {proteomeId} ({component})
        </Link>
      ),
    },
  ];

  return <InfoList columns infoData={infoData} />;
};

export default memo(SubEntryOverview);
