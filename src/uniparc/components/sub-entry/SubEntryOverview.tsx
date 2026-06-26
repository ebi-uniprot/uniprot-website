import { InfoList } from 'franklin-sites';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import { type UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import EntrySection from '../../types/subEntrySection';

type Props = {
  uniparcData: UniParcSubEntryUIModel;
};

const SubEntryOverview = ({ uniparcData }: Props) => {
  const infoData = [
    {
      title: <span data-article-id="protein_names">Protein</span>,
      content: uniparcData.subEntry.proteinName ? (
        <strong>{uniparcData.subEntry.proteinName}</strong>
      ) : (
        <i>Unassigned</i>
      ),
    },
    {
      title: <span data-article-id="organism-name">Organism</span>,
      content:
        uniparcData.subEntry.organism?.scientificName ||
        uniparcData.subEntry.organism?.taxonId ? (
          <TaxonomyView data={uniparcData.subEntry.organism} />
        ) : (
          <i>Unassigned</i>
        ),
    },
    {
      title: <span data-article-id="gene_name">Gene</span>,
      content: uniparcData.subEntry.geneName ? (
        <strong>{uniparcData.subEntry.geneName}</strong>
      ) : (
        <i>Unassigned</i>
      ),
    },
    {
      title: 'Amino acids',
      content: uniparcData.entry.sequence && (
        <>
          {`${uniparcData.entry.sequence?.length} `}
          <Link to={`#${EntrySection.Sequence}`}>(go to sequence)</Link>
        </>
      ),
    },
  ];

  return <InfoList columns infoData={infoData} />;
};

export default memo(SubEntryOverview);
