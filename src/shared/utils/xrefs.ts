import { AttributesItem } from '../../uniprotkb/types/databaseRefs';

export const processUrlTemplate = (
  urlTemplate: string,
  params: Record<string, string>
) => {
  let url = urlTemplate;
  Object.entries(params).forEach(([param, value]) => {
    url = url.replace(new RegExp(`%${param}`, 'g'), value);
  });
  return url;
};

export const getDatabaseInfoAttribute = (
  attributes: AttributesItem[],
  name: string
) => attributes.find(({ name: n }) => n === name);
