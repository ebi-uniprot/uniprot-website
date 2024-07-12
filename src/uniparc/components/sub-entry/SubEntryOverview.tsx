import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, InfoList, Loader } from 'franklin-sites';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';

import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';
import { TabLocation as UniprotkbTabLocation } from '../../../uniprotkb/types/entry';
import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import { UniParcXRef } from '../../adapters/uniParcConverter';
import useDataApi from '../../../shared/hooks/useDataApi';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import { DataDBModel } from '../entry/XRefsSection';

type ExternalXrefLinkProps = { xref: UniParcXRef; dataDB: DataDBModel };

const ExternalXrefLink = ({ xref, dataDB }: ExternalXrefLinkProps) => {
  let { id } = xref;
  if (!id || !xref.database) {
    return null;
  }
  const template = dataDB.find(
    ({ displayName }) => displayName === xref.database
  )?.uriLink;
  if (!template) {
    return null;
  }
  // NOTE: exception for FusionGDB we need to remove the underscore number
  if (xref.database === 'FusionGDB') {
    id = id.replace(/_\d+$/, '');
  }
  return (
    <ExternalLink url={template.replace('%id', id)}>
      {xref.id}
      {xref.chain && ` (chain ${xref.chain})`}
    </ExternalLink>
  );
};

type Props = {
  data: UniParcSubEntryUIModel;
};

const SubEntryOverview = ({ data }: Props) => {
  const dataDB = useDataApi<DataDBModel>(
    apiUrls.configure.allDatabases(Namespace.uniparc)
  );
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

  if (dataDB.loading || !dataDB.data) {
    return <Loader />;
  }

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
      title: 'Database',
      content: !data.subEntry.isUniprotkbEntry && data.subEntry.database,
    },
    {
      title: 'Identifier',
      content: !data.subEntry.isUniprotkbEntry && (
        <ExternalXrefLink xref={data.subEntry} dataDB={dataDB.data} />
      ),
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
