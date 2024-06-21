import { memo } from 'react';
import { InfoList } from 'franklin-sites';

import { UniParcXRef } from '../../adapters/uniParcConverter';

type Props = { data: Partial<UniParcXRef> };

const XRefEntryOverview = ({ data }: Props) => {
  const infoData = [
    {
      title: <span data-article-id="protein_names">Protein</span>,
      content: data.proteinName && <strong>{data.proteinName}</strong>,
    },
    {
      title: <span data-article-id="gene_name">Gene</span>,
      content: data.geneName && <strong>{data.geneName}</strong>,
    },
    {
      title: <span data-article-id="organism-name">Organism</span>,
      content: data.organism?.taxonId, // TODO: use uniprotkb code
    },
    // {
    //   title: 'Amino acids',
    //   content: (
    //     <span>
    //       {data.component.?.length}{' '}
    //       {data.primaryAccession && (
    //         <small>
    //           <Link
    //             to={{
    //               pathname: getEntryPath(
    //                 Namespace.uniprotkb,
    //                 data.primaryAccession,
    //                 TabLocation.Entry
    //               ),
    //               hash: EntrySection.Sequence,
    //             }}
    //           >
    //             (go to sequence)
    //           </Link>
    //         </small>
    //       )}
    //     </span>
    //   ),
    // },
    // {
    //   title: <span data-article-id="protein_existence">Protein existence</span>,
    //   content: proteinExistence,
    // },
    // {
    //   title: <span data-article-id="annotation_score">Annotation score</span>,
    //   content: annotationScoreNode,
    // },
  ];

  return <InfoList columns infoData={infoData} />;
};

export default memo(XRefEntryOverview);
