import { InfoList } from 'franklin-sites';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import { type UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import EntrySection from '../../types/subEntrySection';

type Props = {
  data: UniParcSubEntryUIModel;
};

const SubEntryOverview = ({ data }: Props) => {
  const infoData = [
    {
      title: <span data-article-id="protein_names">Protein</span>,
      content: data.subEntry.proteinName ? (
        <strong>{data.subEntry.proteinName}</strong>
      ) : (
        <i>Unassigned</i>
      ),
    },
    {
      title: <span data-article-id="organism-name">Organism</span>,
      content:
        data.subEntry.organism?.scientificName ||
        data.subEntry.organism?.taxonId ? (
          <TaxonomyView data={data.subEntry.organism} />
        ) : (
          <i>Unassigned</i>
        ),
    },
    {
      title: <span data-article-id="gene_name">Gene</span>,
      content: data.subEntry.geneName ? (
        <strong>{data.subEntry.geneName}</strong>
      ) : (
        <i>Unassigned</i>
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
