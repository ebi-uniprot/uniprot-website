import { partition } from 'lodash-es';

import EntrySection from '../types/entrySection';
import { type UniProtKBProtNLMAPIModel } from '../types/protNLMAPIModel';
import {
  type UniProtkbAPIModel,
  type UniProtkbUIModel,
  type UniProtKBXref,
} from './uniProtkbConverter';

export const augmentAPIDataWithProtnlmPredictions = (
  protnlmData: UniProtKBProtNLMAPIModel,
  data: UniProtkbAPIModel
): UniProtkbAPIModel => {
  const protnlmFunctionComments =
    protnlmData.comments?.filter(
      (comment) => comment.commentType === 'FUNCTION'
    ) || [];

  const protnlmSubcellularLocationComments =
    protnlmData.comments?.filter(
      (comment) => comment.commentType === 'SUBCELLULAR LOCATION'
    ) || [];

  const addProtNlmGoEvidence = (
    properties: UniProtKBXref['properties'] = []
  ) =>
    properties.some(
      (p) => p.key === 'GoEvidenceType' && p.value === 'IEA:ProtNLM2'
    )
      ? properties
      : [...properties, { key: 'GoEvidenceType', value: 'IEA:ProtNLM2' }];

  const mergeGoXref = (
    uniprotXref: UniProtKBXref,
    protnlmXref: UniProtKBXref
  ): UniProtKBXref => ({
    ...uniprotXref,
    properties: addProtNlmGoEvidence(uniprotXref.properties),
    evidences: [
      ...(uniprotXref.evidences || []),
      ...(protnlmXref.evidences || []),
    ],
  });

  const protnlmFixedXrefs: UniProtKBXref[] =
    (protnlmData.uniProtKBCrossReferences || []) as UniProtKBXref[];

  const protnlmCrossReferences: UniProtKBXref[] = protnlmFixedXrefs
    // Remove Pfam eg A0A444Y2I6
    .filter((xref) => xref.database !== 'Pfam')
    // TODO: currently the ":-" GoEvidenceType breaks getEcoNumberFromGoEvidence Type
    // Whenever this is fixed remove the transformation that is happening here.
    .map((xref) => ({
      ...xref,
      properties: xref.properties?.map((property) =>
        property.key === 'GoEvidenceType' && property.value === ':-'
          ? { key: 'GoEvidenceType', value: 'IEA:ProtNLM2' }
          : property
      ),
    }));

  const [protnlmGoXrefs, protnlmNotGoXrefs] = partition(
    protnlmCrossReferences,
    (xref) => xref.database === 'GO' && !!xref.id
  );

  // We know xref.id exists from the partition above
  const protnlmGoXrefsById = new Map(
    protnlmGoXrefs.map((xref) => [xref.id as string, xref])
  );

  // If GO xref exists in ProtNLM, merge and delete from ProtNLM map to prevent duplication
  const augmentedUniProtXrefs = (data.uniProtKBCrossReferences || []).map(
    (xref) => {
      if (!xref.id || xref.database !== 'GO') {
        return xref;
      }
      const protnlmMatch = protnlmGoXrefsById.get(xref.id);
      if (!protnlmMatch) {
        return xref;
      }
      protnlmGoXrefsById.delete(xref.id);
      return mergeGoXref(xref, protnlmMatch);
    }
  );

  return {
    ...data,
    comments: [
      ...(data.comments || []),
      ...protnlmFunctionComments,
      ...protnlmSubcellularLocationComments,
    ],
    uniProtKBCrossReferences: [
      ...augmentedUniProtXrefs,
      ...protnlmNotGoXrefs,
      ...protnlmGoXrefsById.values(),
    ],
    keywords: [...(data.keywords || []), ...(protnlmData.keywords || [])],
  };
};

export const augmentUIDataWithProtnlmPredictions = (
  protnlmData: UniProtKBProtNLMAPIModel,
  data: UniProtkbUIModel
): UniProtkbUIModel => {
  const uniprotkbNamesAndTaxonomy = { ...data[EntrySection.NamesAndTaxonomy] };
  // Only proteinDescription.recommendedName.fullName at the moment.
  // If there is no evidence, assume it is filler and not actual predicted annotation.
  if (
    protnlmData.proteinDescription?.recommendedName?.fullName?.evidences
      ?.length ||
    protnlmData.proteinDescription?.submissionNames?.length
  ) {
    uniprotkbNamesAndTaxonomy.protnlmProteinNamesData =
      protnlmData.proteinDescription;
  }
  return {
    ...data,
    [EntrySection.NamesAndTaxonomy]: {
      ...uniprotkbNamesAndTaxonomy,
    },
  };
};
