import { groupBy } from 'lodash-es';

import { Xref } from '../../shared/types/apiModel';
import { UniProtKBColumn } from '../types/columnTypes';
import { AlternativeProductsComment } from '../types/commentTypes';
import EntrySection from '../types/entrySection';
import { StructureFeatures } from '../types/featureType';
import { DatabaseInfoMaps } from '../utils/database';
import { convertSection, UIModel } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';

type GroupedStructureInfo = { [key: string]: Xref[] };
type IsoformSequences = {
  isoformId: string;
  sequence: string;
  length: number;
}[];

export type StructureUIModel = {
  structures?: GroupedStructureInfo;
  isoforms?: IsoformSequences;
} & UIModel;

export const structureFeaturesToColumns: Readonly<
  Record<StructureFeatures, UniProtKBColumn>
> = {
  Helix: UniProtKBColumn.ftHelix,
  'Beta strand': UniProtKBColumn.ftStrand,
  Turn: UniProtKBColumn.ftTurn,
};

const featuresCategories = Object.keys(
  structureFeaturesToColumns
) as StructureFeatures[];

const convertStructure = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps,
  uniProtKBCrossReferences?: Xref[]
) => {
  const structureData: StructureUIModel = convertSection(
    data,
    databaseInfoMaps,
    ['ALTERNATIVE PRODUCTS'],
    undefined,
    [...featuresCategories, 'Alternative sequence'],
    EntrySection.Structure,
    uniProtKBCrossReferences
  );

  const canonicalSequence = data.sequence?.value || '';

  let isoforms: IsoformSequences = [];
  if (structureData.commentsData.size) {
    const alternativeProducts = structureData.commentsData.get(
      'ALTERNATIVE PRODUCTS'
    ) as AlternativeProductsComment[] | undefined;
    const variantSequences = structureData.featuresData.filter(
      (feature) => feature.type === 'Alternative sequence'
    );

    isoforms =
      alternativeProducts?.[0]?.isoforms?.map((isoform) => {
        const isoformSequence: string[] = [];
        let tailIndex = 0;
        if (isoform.sequenceIds && variantSequences.length !== 0) {
          isoform.sequenceIds.forEach((sequenceId) => {
            const variantSeq = variantSequences.find(
              (varSeq) => varSeq.featureId === sequenceId
            );
            if (variantSeq) {
              isoformSequence.push(
                canonicalSequence.slice(
                  tailIndex,
                  variantSeq.location.start.value - 1
                )
              );
              if (
                variantSeq.alternativeSequence?.originalSequence &&
                variantSeq.alternativeSequence?.alternativeSequences?.length
              ) {
                variantSeq.alternativeSequence?.alternativeSequences.forEach(
                  (altSeq) => isoformSequence.push(altSeq)
                );
              }
              tailIndex = variantSeq.location.end.value;
            }
          });
          if (tailIndex < canonicalSequence.length) {
            isoformSequence.push(
              canonicalSequence.slice(tailIndex, canonicalSequence.length)
            );
          }
        }

        return {
          isoformId: isoform.isoformIds[0],
          sequence: isoformSequence.join(''),
          length: isoformSequence.join('').length,
        };
      }) ?? [];
  }

  if (isoforms.length > 0) {
    structureData.isoforms = isoforms;
  }

  // Extract xrefs to PDB
  if (uniProtKBCrossReferences) {
    const structureInfo = uniProtKBCrossReferences
      .filter((ref) => ref.database === 'PDB')
      .map((item) => {
        const method = item.properties && item.properties.Method;
        return { ...item, method };
      });
    const groupedStructureInfo = groupBy(structureInfo, (item) => item.method);
    structureData.structures = groupedStructureInfo as GroupedStructureInfo;
  }
  return structureData;
};

export default convertStructure;
