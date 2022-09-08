import { groupBy } from 'lodash-es';
import {
  implicitDatabaseDRPresence,
  implicitDatabaseDRAbsence,
  implicitDatabaseAlwaysInclude,
  implicitDatabaseGenePatternOrganism,
  implicitDatabaseSimilarityComment,
  implicitDatabasesEC,
  PDBMirrors,
} from '../config/database';
import EntrySection from '../types/entrySection';
import { DatabaseCategory } from '../types/databaseRefs';
import { FreeTextComment } from '../types/commentTypes';
import { GeneNamesData } from '../adapters/namesAndTaxonomyConverter';
import { flattenGeneNameData } from '.';
import { ValueWithEvidence } from '../types/modelTypes';
import { Xref } from '../../shared/types/apiModel';
import { DatabaseInfoMaps, ImplicitDatabaseXRefs } from './database';

export type XrefsGoupedByDatabase = {
  database: string;
  xrefs: Xref[];
};

export type XrefUIModel = {
  category: DatabaseCategory;
  databases: XrefsGoupedByDatabase[];
};

export const getDRImplicitXrefs = (
  implicitDatabaseXRefs: ImplicitDatabaseXRefs,
  xrefs: Xref[],
  geneNames: string[]
) => {
  // Get DR line contingent-implicit xrefs
  const implicitDatabaseDRPresenceCheck = Object.fromEntries(
    Object.keys(implicitDatabaseDRPresence).map((xref) => [xref, false])
  );
  const implicitDatabaseDRAbsenceCheck = Object.fromEntries(
    Object.keys(implicitDatabaseDRAbsence).map((xref) => [xref, true])
  );
  const implicitDatabaseDRPresenceData: { [key: string]: Xref[] } = {};
  xrefs.forEach((xref) => {
    const { database: name } = xref;
    if (!name) {
      return;
    }
    if (name in implicitDatabaseDRPresenceCheck) {
      implicitDatabaseDRPresenceCheck[name] = true;
      if (name in implicitDatabaseDRPresenceData) {
        implicitDatabaseDRPresenceData[name].push(xref);
      } else {
        implicitDatabaseDRPresenceData[name] = [xref];
      }
    }
    if (name in implicitDatabaseDRAbsenceCheck) {
      implicitDatabaseDRAbsenceCheck[name] = false;
    }
  });
  const geneName = geneNames?.[0];
  const properties: Record<string, string> = {};
  if (geneName) {
    properties.GeneName = geneName;
  }
  const foundXrefs: Xref[] = [];
  [
    [implicitDatabaseDRPresenceCheck, implicitDatabaseDRPresence],
    [implicitDatabaseDRAbsenceCheck, implicitDatabaseDRAbsence],
  ].forEach(([check, ruleMap]) => {
    Object.entries(check).forEach(([name, include]) => {
      if (!include || !(name in ruleMap)) {
        return;
      }
      const implicitNames = ruleMap[name] as string[];
      if (implicitNames) {
        implicitNames.forEach((implicitName) => {
          const xref = implicitDatabaseXRefs.get(implicitName);
          if (xref) {
            // ClinGen and GenCC HGNC-contingent implicit xrefs require the HGNC ids to form URL
            if (
              name === 'HGNC' &&
              (implicitName === 'ClinGen' || implicitName === 'GenCC') &&
              implicitDatabaseDRPresenceData[name]
            ) {
              implicitDatabaseDRPresenceData[name].forEach(({ id }) => {
                if (id) {
                  foundXrefs.push({
                    ...xref,
                    properties: { id },
                  });
                }
              });
            } else {
              foundXrefs.push({
                ...xref,
                properties,
              });
            }
          }
        });
      }
    });
  });
  return foundXrefs;
};

export const getDatabaseSimilarityCommentImplicitXrefs = (
  implicitDatabaseXRefs: ImplicitDatabaseXRefs,
  uniProtkbId: string | undefined,
  similarityComments?: FreeTextComment[]
) => {
  // The implicit database GPCRDB should only be inluded if there exists a
  // similarity comment with "Belongs to the G-protein coupled receptor"
  const foundXrefs: Xref[] = [];
  if (similarityComments && uniProtkbId) {
    Object.entries(implicitDatabaseSimilarityComment).forEach(
      ([implicitName, commentSubstring]) => {
        const foundCommentSubstring = similarityComments.some(
          ({ texts }) =>
            texts && texts.some(({ value }) => value.includes(commentSubstring))
        );
        if (foundCommentSubstring) {
          const xref = implicitDatabaseXRefs.get(implicitName);
          if (xref) {
            const property = {
              uniProtkbId,
            };
            foundXrefs.push({
              ...xref,
              properties: property,
            });
          }
        }
      }
    );
  }
  return foundXrefs;
};

export const getGenePatternOrganismImplicitXrefs = (
  implicitDatabaseXRefs: ImplicitDatabaseXRefs,
  geneNames: string[],
  commonName?: string | null
) => {
  // Implicit databases which require depend on the a gene name pattern
  // and orgnasim pattern
  const foundXrefs: Xref[] = [];
  const { pattern, organism } = implicitDatabaseGenePatternOrganism;
  if (commonName && Object.keys(organism).includes(commonName)) {
    geneNames
      .filter((geneName: { match: (arg: RegExp) => void }) =>
        geneName.match(pattern)
      )
      .forEach((gene: string) => {
        if (commonName in organism) {
          const name = organism[commonName as keyof typeof organism];
          const xref = implicitDatabaseXRefs.get(name);
          if (xref) {
            const property = {
              gene,
            };
            foundXrefs.push({
              ...xref,
              properties: property,
            });
          }
        }
      });
  }
  return foundXrefs;
};

export const getECImplicitXrefs = (
  implicitDatabaseXRefs: ImplicitDatabaseXRefs,
  ecNumbers?: ValueWithEvidence[] | null
) => {
  // EC dependent implicit databases
  const foundXrefs: Xref[] = [];
  if (ecNumbers) {
    implicitDatabasesEC.forEach((name) => {
      const xref = implicitDatabaseXRefs.get(name);
      if (xref) {
        ecNumbers.forEach(({ value }) => {
          const property = {
            ec: value,
          };
          foundXrefs.push({
            ...xref,
            properties: property,
          });
        });
      }
    });
  }
  return foundXrefs;
};

export const getUnconditionalImplicitXrefs = (
  implicitDatabaseXRefs: ImplicitDatabaseXRefs
) => {
  // Always include these implicit databases (ie they are unconditional)
  const foundXrefs: Xref[] = [];
  implicitDatabaseAlwaysInclude.forEach((name) => {
    const xref = implicitDatabaseXRefs.get(name);
    if (xref) {
      foundXrefs.push(xref);
    }
  });
  return foundXrefs;
};

export const getJoinedXrefs = (xrefs: Xref[]) => {
  /**
   * Add the "JOINED" xrefs to the "master" xref which it
   * shares its ProteinId with
   */
  if (!xrefs || xrefs.length === 0) {
    return xrefs;
  }
  const { JOINED, NOT_JOINED } = groupBy(xrefs, (xref) =>
    xref.properties && xref.properties.Status === 'JOINED'
      ? 'JOINED'
      : 'NOT_JOINED'
  );
  if (JOINED) {
    return NOT_JOINED.map((xref) => {
      const joinedXrefIds = JOINED.filter(
        (joinedXref) =>
          joinedXref.properties &&
          xref.properties &&
          joinedXref.properties.ProteinId === xref.properties.ProteinId &&
          joinedXref.id
      ).map((joinedXref) => joinedXref.id) as string[];
      return {
        ...xref,
        additionalIds: joinedXrefIds,
      };
    });
  }
  return NOT_JOINED;
};

export const getXrefsForSection = (
  databaseInfoMaps: DatabaseInfoMaps,
  xrefs: Xref[],
  section: EntrySection,
  geneNamesData?: GeneNamesData,
  commonName?: string | null,
  similarityComments?: FreeTextComment[],
  uniProtkbId?: string,
  ecNumbers?: ValueWithEvidence[] | null
): XrefUIModel[] => {
  if (!databaseInfoMaps) {
    return [];
  }
  const {
    databaseNameToCategory,
    entrySectionToDatabaseCategoryOrder,
    implicitDatabaseXRefs,
    entrySectionToDatabaseNames,
  } = databaseInfoMaps;
  const databasesForSection = entrySectionToDatabaseNames.get(section);
  if (!databasesForSection) {
    return [];
  }

  const categoryToNameToXrefs = new Map<
    DatabaseCategory,
    { [name: string]: Xref[] }
  >();
  const geneNames = geneNamesData ? flattenGeneNameData(geneNamesData) : [];
  // Combine all of the 'explicit' xrefs with all of the implicit xrefs
  // which pass the conditions and add if they are part of the section
  [
    ...xrefs,
    ...getUnconditionalImplicitXrefs(implicitDatabaseXRefs),
    ...getDRImplicitXrefs(implicitDatabaseXRefs, xrefs, geneNames),
    ...getDatabaseSimilarityCommentImplicitXrefs(
      implicitDatabaseXRefs,
      uniProtkbId,
      similarityComments
    ),
    ...getGenePatternOrganismImplicitXrefs(
      implicitDatabaseXRefs,
      geneNames,
      commonName
    ),
    ...getECImplicitXrefs(implicitDatabaseXRefs, ecNumbers),
  ].forEach((xref) => {
    const { database: name } = xref;
    if (!name) {
      return;
    }
    if (!databasesForSection.includes(name)) {
      return;
    }
    const category = databaseNameToCategory.get(name);
    if (!category) {
      return;
    }
    const nameToXrefs = categoryToNameToXrefs.get(category) || {};
    if (!nameToXrefs[name]) {
      nameToXrefs[name] = [];
    }
    nameToXrefs[name].push(xref);
    categoryToNameToXrefs.set(category, nameToXrefs);
  });

  const databaseCategoryOrder = entrySectionToDatabaseCategoryOrder.get(
    section
  ) as DatabaseCategory[];
  if (!databaseCategoryOrder) {
    return [];
  }
  const xrefCategories: XrefUIModel[] = [];
  databaseCategoryOrder.forEach((category) => {
    const nameToXrefs = categoryToNameToXrefs.get(category);
    if (!nameToXrefs) {
      return;
    }
    xrefCategories.push({
      category,
      databases: Object.entries(nameToXrefs).map(([database, refs]) => ({
        database,
        xrefs: refs,
      })),
    });
  });

  return xrefCategories;
};

export const partitionStructureDatabases = (
  databases: XrefsGoupedByDatabase[]
) => {
  // This function returns the PDB databases and an array of non-PDB databases.
  const { PDBDatabases, otherStructureDatabases } = groupBy(
    databases,
    ({ database }) =>
      PDBMirrors.includes(database) ? 'PDBDatabases' : 'otherStructureDatabases'
  );
  // Though we have partitioned the xrefs into PDB* and non-PDB* we only need the
  // information from the PDB xref entries (ie not PDBsum)
  const PDBDatabase =
    PDBDatabases && PDBDatabases.find(({ database }) => database === 'PDB');
  return { PDBDatabase, otherStructureDatabases };
};
