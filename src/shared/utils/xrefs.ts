import * as logging from './logging';

import { AttributesItem } from '../../uniprotkb/types/databaseRefs';
import { DatabaseInfoMaps } from '../../uniprotkb/utils/database';

export const processUrlTemplate = (
  urlTemplate: string | null | undefined,
  params: Record<string, string>
): string | null => {
  if (!urlTemplate) {
    return null;
  }
  let url: string = urlTemplate;
  for (const [param, value] of Object.entries(params)) {
    url = url.replace(new RegExp(`%${param}`, 'g'), value);
  }
  /* istanbul ignore if */
  if (url === urlTemplate) {
    logging.error(
      `${urlTemplate} template values not filled in with params: ${JSON.stringify(
        params
      )}`
    );
  }
  return url;
};

export const getDatabaseInfoAttribute = (
  attributes: AttributesItem[] | undefined,
  name: string
) => attributes?.find(({ name: n }) => n === name);

export const getUrlFromDatabaseInfo = (
  databaseInfoMaps: DatabaseInfoMaps | null,
  database: string,
  params: Record<string, string>,
  attribute?: string
) => {
  if (
    !(
      databaseInfoMaps &&
      Object.keys(databaseInfoMaps.databaseToDatabaseInfo).length
    )
  ) {
    return null;
  }
  const databaseInfo = databaseInfoMaps.databaseToDatabaseInfo[database];
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
  return processUrlTemplate(uriLink, params);
};
