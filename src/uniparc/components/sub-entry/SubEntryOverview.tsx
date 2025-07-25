import { InfoList, Loader } from 'franklin-sites';
import { memo } from 'react';
import { Link } from 'react-router';

import { getEntryPath } from '../../../app/config/urls';
import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import ExternalLink from '../../../shared/components/ExternalLink';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { Namespace } from '../../../shared/types/namespaces';
import { TabLocation as UniprotkbTabLocation } from '../../../uniprotkb/types/entry';
import { UniParcXRef } from '../../adapters/uniParcConverter';
import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import EntrySection from '../../types/subEntrySection';
import { DataDBModel } from '../entry/XRefsSection';
import SubEntryInactive from './SubEntryInactive';

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
  let [proteomeId, component]: (string | null)[] = [null, null];
  if (
    data.subEntry.isSource &&
    data.subEntry.proteomeId &&
    data.subEntry.component
  ) {
    [proteomeId, component] = [
      data.subEntry.proteomeId,
      data.subEntry.component,
    ];
  }
  if (
    data.subEntry.source &&
    data.subEntry.source.proteomeId &&
    data.subEntry.source.component
  ) {
    [proteomeId, component] = [
      data.subEntry.source.proteomeId,
      data.subEntry.source.component,
    ];
  }

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
      title: 'Status',
      content: !data.subEntry.active && <SubEntryInactive data={data} />,
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
          {data.subEntry.id} {data.subEntry.active ? '' : ' (History)'}
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
      title: 'Amino acids',
      content: data.entry.sequence && (
        <>
          {`${data.entry.sequence?.length} `}
          <Link to={`#${EntrySection.Sequence}`}>(go to sequence)</Link>
        </>
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
