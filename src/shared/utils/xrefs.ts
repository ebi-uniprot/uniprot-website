import * as logging from './logging';

import { AttributesItem } from '../../uniprotkb/types/databaseRefs';
import { DatabaseInfoMaps } from '../../uniprotkb/utils/database';

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

export const getUrlFromDatabaseInfo = (
  databaseInfoMaps: DatabaseInfoMaps | null,
  database: string,
  params: Record<string, string>,
  attribute?: string
) => {
  if (!databaseInfoMaps) {
    return null;
  }
  const { databaseToDatabaseInfo } = databaseInfoMaps;
  const databaseInfo = databaseToDatabaseInfo[database];
  const uriLink = attribute
    ? databaseInfo.attributes?.find((a) => a.name === attribute)?.uriLink
    : databaseInfo.uriLink;
  if (!uriLink) {
    const attributeError = attribute ? ` with attribute: ${attribute}` : '';
    logging.error(
      `${database} not found in databaseToDatabaseInfo${attributeError}`
    );
    return null;
  }
  const processedUrl = processUrlTemplate(uriLink, params);
  if (processedUrl === uriLink) {
    const attributeError = attribute ? ` and with attribute: ${attribute}` : '';
    logging.error(
      `${database} ${uriLink} template values not filled in with params: ${JSON.stringify(
        params
      )} ${attributeError}`
    );
    return null;
  }

  return processedUrl;
};
