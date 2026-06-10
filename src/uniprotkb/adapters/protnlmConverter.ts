import { partition } from 'lodash-es';

import { type SubcellularLocationComment } from '../types/commentTypes';
import EntrySection from '../types/entrySection';
import {
  protNLM2Evidence,
  type ProtNlmSubcellularLocationComment,
  type UniProtKBProtNLMAPIModel,
} from '../types/protNLMAPIModel';
import { type ProteinNames } from './namesAndTaxonomyConverter';
import {
  type UniProtkbAPIModel,
  type UniProtkbUIModel,
  type UniProtKBXref,
} from './uniProtkbConverter';

// SubcellularLocationView keys the swissbiopics hover-sync off `location.id`
// (e.g. "SL-0086"). The ProtNLM2 endpoint omits id and returns only `value`,
// so we recover the id by matching the location name against any same-page
// UniProt subcellular comment that already carries one.
const normalizeLocationName = (name: string) =>
  name.trim().replace(/\.+$/, '').toLowerCase();

const buildLocationNameToIdMap = (
  comments: UniProtkbAPIModel['comments']
): Map<string, string> => {
  const map = new Map<string, string>();
  for (const comment of comments || []) {
    if (comment.commentType !== 'SUBCELLULAR LOCATION') {
      continue;
    }
    const subcellComment = comment as SubcellularLocationComment;
    for (const entry of subcellComment.subcellularLocations || []) {
      const { value, id } = entry.location;
      if (id && value) {
        map.set(normalizeLocationName(value), id);
      }
    }
  }
  return map;
};

const resolveProtnlmSubcellularIds = (
  protnlmComments: SubcellularLocationComment[],
  nameToId: Map<string, string>
): SubcellularLocationComment[] =>
  protnlmComments.map((comment) => ({
    ...comment,
    subcellularLocations: comment.subcellularLocations?.map((entry) => {
      if (entry.location.id) {
        return entry;
      }
      const matchedId = nameToId.get(
        normalizeLocationName(entry.location.value)
      );
      return matchedId
        ? { ...entry, location: { ...entry.location, id: matchedId } }
        : entry;
    }),
  }));

export const augmentAPIDataWithProtnlmPredictions = (
  protnlmData: UniProtKBProtNLMAPIModel,
  data: UniProtkbAPIModel
): UniProtkbAPIModel => {
  const protnlmFunctionComments =
    protnlmData.comments?.filter(
      (comment) => comment.commentType === 'FUNCTION'
    ) || [];

  const protnlmSubcellularLocationComments = resolveProtnlmSubcellularIds(
    protnlmData.comments?.filter(
      (comment): comment is ProtNlmSubcellularLocationComment =>
        comment.commentType === 'SUBCELLULAR LOCATION'
    ) || [],
    buildLocationNameToIdMap(data.comments)
  );

  const addProtNlmGoEvidence = (
    properties: UniProtKBXref['properties'] = []
  ) =>
    properties.some(
      (p) => p.key === 'GoEvidenceType' && p.value === protNLM2Evidence
    )
      ? properties
      : [...properties, { key: 'GoEvidenceType', value: protNLM2Evidence }];

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

  const protnlmCrossReferences: UniProtKBXref[] = (
    protnlmData.uniProtKBCrossReferences || []
  )
    // Remove Pfam eg A0A444Y2I6
    .filter((xref) => xref.database !== 'Pfam')
    // TODO: currently the ":-" GoEvidenceType breaks getEcoNumberFromGoEvidence Type
    // Whenever this is fixed remove the transformation that is happening here.
    .map((xref) => ({
      ...xref,
      properties: xref.properties?.map((property) =>
        property.key === 'GoEvidenceType' && property.value === ':-'
          ? { key: 'GoEvidenceType', value: protNLM2Evidence }
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
  const aiRecommendedNames: ProteinNames[] = [];
  if (
    protnlmData.proteinDescription?.recommendedName?.fullName?.evidences?.length
  ) {
    aiRecommendedNames.push(protnlmData.proteinDescription.recommendedName);
  }
  for (const name of protnlmData.proteinDescription?.submissionNames || []) {
    if (name.fullName?.evidences?.length) {
      aiRecommendedNames.push(name);
    }
  }
  if (aiRecommendedNames.length) {
    uniprotkbNamesAndTaxonomy.protnlmProteinNamesData = aiRecommendedNames;
  }
  return {
    ...data,
    [EntrySection.NamesAndTaxonomy]: {
      ...uniprotkbNamesAndTaxonomy,
    },
  };
};
