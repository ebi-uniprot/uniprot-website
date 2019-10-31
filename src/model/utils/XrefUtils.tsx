import {
  databaseNameToCategory,
  entrySectionToDatabaseNames,
  entrySectionToDatabaseCategoryOrder,
} from '../../data/database';
import EntrySection from '../types/EntrySection';
import { DatabaseCategory } from '../types/DatabaseTypes';
import { Xref } from '../types/CommentTypes';

export type XrefsGoupedByDatabase = {
  database: string;
  xrefs: Xref[];
};

export type XrefUIModel = {
  category: DatabaseCategory;
  databases: XrefsGoupedByDatabase[];
};

export const getXrefsForSection = (
  xrefs: Xref[],
  section: EntrySection
): XrefUIModel[] => {
  const databasesForSection = entrySectionToDatabaseNames.get(section);
  if (!databasesForSection) {
    return [];
  }
  const categoryToNameToXrefs = new Map<
    DatabaseCategory,
    { [name: string]: Xref[] }
  >();

  xrefs.forEach(xref => {
    const { databaseType: name } = xref;
    if (!name || !databasesForSection.includes(name)) {
      return;
    }
    const category = databaseNameToCategory.get(name);
    if (!category) {
      return;
    }
    const nametoXrefs = categoryToNameToXrefs.get(category) || {};
    if (!nametoXrefs[name]) {
      nametoXrefs[name] = [];
    }
    nametoXrefs[name].push(xref);
    categoryToNameToXrefs.set(category, nametoXrefs);
  });
  const databaseCategoryOrder = entrySectionToDatabaseCategoryOrder.get(
    section
  ) as DatabaseCategory[];
  if (!databaseCategoryOrder) {
    return [];
  }
  const xrefCategories: XrefUIModel[] = [];
  databaseCategoryOrder.forEach(category => {
    const nameToXrefs = categoryToNameToXrefs.get(category);
    if (!nameToXrefs) {
      return;
    }
    xrefCategories.push({
      category,
      databases: Object.keys(nameToXrefs).map(name => ({
        database: name,
        xrefs: nameToXrefs[name],
      })),
    });
  });

  return xrefCategories;
};
