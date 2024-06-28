import { memo } from 'react';
import { InfoList } from 'franklin-sites';

import {
  UniParcAPIModel,
  UniParcXRef,
  databaseToEntryType,
} from '../../../adapters/uniParcConverter';
import TaxonomyView from '../../../../shared/components/entry/TaxonomyView';
import { Link } from 'react-router-dom';
import { getEntryPath } from '../../../../app/config/urls';
import { Namespace } from '../../../../shared/types/namespaces';
import data from '../../../../uniprotkb/__mocks__/ptmExchangeData';
import EntrySection from '../../../types/entrySection';
import { TabLocation } from '../Entry';

type Props = {
  xrefData: Partial<UniParcXRef>;
  uniparcData: Partial<UniParcAPIModel>;
};

const SubEntryOverview = ({ xrefData, uniparcData }: Props) => {
  const isUniprotkbEntry = Boolean(
    xrefData?.database && databaseToEntryType.has(xrefData.database)
  );
  const infoData = [
    {
      title: <span data-article-id="protein_names">Protein</span>,
      content: xrefData.proteinName && <strong>{xrefData.proteinName}</strong>,
    },
    {
      title: <span data-article-id="gene_name">Gene</span>,
      content: xrefData.geneName && <strong>{xrefData.geneName}</strong>,
    },
    {
      title: <span data-article-id="accession">UniProtKB accession</span>,
      content: xrefData.id && isUniprotkbEntry && (
        <Link
          to={{
            pathname: getEntryPath(
              Namespace.uniprotkb,
              xrefData.id,
              TabLocation.Entry
            ),
          }}
        >
          {xrefData.id}
        </Link>
      ),
    },
    {
      title: <span data-article-id="organism-name">Organism</span>,
      content: (xrefData.organism?.scientificName ||
        xrefData.organism?.taxonId) && (
        <TaxonomyView data={xrefData.organism} />
      ),
    },
    {
      // TODO: add link to sequence section
      title: 'Amino acids',
      content: uniparcData.sequence && (
        <span>{uniparcData.sequence?.length} </span>
      ),
    },
  ];

  return <InfoList columns infoData={infoData} />;
};

export default memo(SubEntryOverview);
