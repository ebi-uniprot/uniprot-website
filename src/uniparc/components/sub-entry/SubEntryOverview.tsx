import { InfoList } from 'franklin-sites';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import { type UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import EntrySection from '../../types/subEntrySection';

// type ExternalXrefLinkProps = { xref: UniParcXRef; dataDB: DataDBModel };

// const ExternalXrefLink = ({ xref, dataDB }: ExternalXrefLinkProps) => {
//   let { id } = xref;
//   if (!id || !xref.database) {
//     return null;
//   }
//   const template = dataDB.find(
//     ({ displayName }) => displayName === xref.database
//   )?.uriLink;
//   if (!template) {
//     return null;
//   }
//   // NOTE: exception for FusionGDB we need to remove the underscore number
//   if (xref.database === 'FusionGDB') {
//     id = id.replace(/_\d+$/, '');
//   }
//   return (
//     <ExternalLink url={template.replace('%id', id)}>
//       {xref.id}
//       {xref.chain && ` (chain ${xref.chain})`}
//     </ExternalLink>
//   );
// };

type Props = {
  data: UniParcSubEntryUIModel;
};

const SubEntryOverview = ({ data }: Props) => {
  // Refactor later to avoid multiple calls for dataDB
  // const dataDB = useDataApi<DataDBModel>(
  //   apiUrls.configure.allDatabases(Namespace.uniparc)
  // );

  // if (dataDB.loading || !dataDB.data) {
  //   return <Loader />;
  // }

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
    // TODO: Re-add when we show non-UniProtKB entries in UniParc
    // {
    //   title: 'Database',
    //   content: !data.subEntry.isUniprotkbEntry && data.subEntry.database,
    // },
    // {
    //   title: 'Identifier',
    //   content: !data.subEntry.isUniprotkbEntry && (
    //     <ExternalXrefLink xref={data.subEntry} dataDB={dataDB.data} />
    //   ),
    // },
    // Below is the source of the ID, not of the sequence, so in the case of
    // UPKB it'll be the accession, not the actual sequence source
    // {
    //   title: 'Sequence source',
    //   content: data.subEntry.source?.database,
    // },
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
  ];

  return <InfoList columns infoData={infoData} />;
};

export default memo(SubEntryOverview);
