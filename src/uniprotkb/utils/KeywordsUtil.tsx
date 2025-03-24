import { flatten } from 'lodash-es';

import { UIModel } from '../adapters/sectionConverter';
import { UniProtkbUIModel } from '../adapters/uniProtkbConverter';
import KeywordCategory from '../types/keywordCategory';
import { Evidence } from '../types/modelTypes';

// TODO: types should maybe eventually come from supporting-data/keywords
export type Keyword = {
  id?: string;
  name?: string;
  category?: KeywordCategory;
  evidences?: Evidence[];
};

export type KeywordUIModel = {
  category: KeywordCategory;
  keywords: Keyword[];
};

export const getAllKeywords = (data: UniProtkbUIModel) => {
  const allKeywords: Keyword[] = [];
  Object.values(data).forEach((attributes) => {
    const UIModelAttribute = attributes as UIModel;
    if (UIModelAttribute && UIModelAttribute.keywordData) {
      const keywordData = flatten(
        UIModelAttribute.keywordData.map((categ) => categ.keywords)
      );
      allKeywords.push(...keywordData);
    }
  });
  return allKeywords;
};

export const getKeywordsForCategories = (
  keywords: Keyword[],
  keywordCategories: KeywordCategory[]
): KeywordUIModel[] => {
  if (!keywords || !keywordCategories) {
    return [];
  }
  const keywordsByCategories = [];
  for (const category of keywordCategories) {
    const categoryKeywords = keywords.filter(
      (keyword) => keyword.category === category
    );
    if (categoryKeywords && categoryKeywords.length > 0) {
      keywordsByCategories.push({
        category,
        keywords: categoryKeywords,
      });
    }
  }
  return keywordsByCategories;
};
