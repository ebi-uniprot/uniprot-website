import { memoize } from 'lodash-es';

import { Column } from '../../../config/columns';
import {
  FieldData,
  ReceivedField,
  ReceivedFieldData,
  FieldDatum,
} from '../../../../uniprotkb/types/resultsTypes';
import { Namespace } from '../../../types/namespaces';

type PreparedField = {
  id: Column;
  label: string;
  key: string;
  addAsterix?: boolean;
};

export const prepareFields = (
  fields: ReceivedField[],
  exclude?: Column[],
  isDownload?: boolean
) =>
  (exclude ? fields.filter(({ name }) => !exclude.includes(name)) : fields).map(
    ({ label, name, id, isMultiValueCrossReference }) =>
      isDownload
        ? ({
            id: name,
            label,
            key: id,
            addAsterix: isMultiValueCrossReference,
          } as PreparedField)
        : ({
            id: name,
            label,
            key: id,
          } as PreparedField)
  );

export const prepareFieldData = (
  fieldData?: ReceivedFieldData,
  // Exclude primaryKeyColumns which should not be user-selectable eg accession
  exclude?: Column[],
  isDownload?: boolean
): FieldData => {
  if (!fieldData?.length) {
    return [];
  }
  const dataFields: FieldDatum[] = [];
  const externalFields: FieldDatum[] = [];
  fieldData.forEach(({ groupName, fields, isDatabaseGroup, id }) => {
    const items = prepareFields(fields, exclude, isDownload);
    if (items.length) {
      const group = {
        id,
        label: groupName,
        items,
      };
      if (isDatabaseGroup) {
        externalFields.push(group);
      } else {
        dataFields.push(group);
      }
    }
  });
  const prepared = [];
  if (dataFields.length) {
    prepared.push({
      label: 'UniProt Data',
      id: 'uniprot-data',
      items: dataFields,
    });
  }
  if (externalFields.length) {
    prepared.push({
      label: 'External Resources',
      id: 'external-resources',
      items: externalFields,
    });
  }
  return prepared;
};

const getLabelInner = (
  fieldData: FieldData | FieldDatum,
  id: string
): string | null => {
  if (Array.isArray(fieldData)) {
    for (const item of fieldData) {
      const label = getLabelInner(item, id);
      if (label) {
        return label;
      }
    }
  } else if (fieldData.items) {
    return getLabelInner(fieldData.items, id);
  } else if (fieldData.id === id) {
    return fieldData.label;
  }
  return null;
};

export const getLabel = memoize(
  (
    fieldData: FieldData | FieldDatum,
    _namespace: Namespace,
    id: string
  ): string | null => getLabelInner(fieldData, id),
  (_fieldData, namespace, id) => `${namespace}${id}`
);
