// eslint-disable-next-line import/no-extraneous-dependencies
import { OpenAPIV3 } from 'openapi-types';

import { InPageNavSection } from '../../shared/components/InPageNav';

export const SCHEMAS_ID = 'schemas' as const;

export const tagNameToId = (name: string) => name.replaceAll(' ', '_');

export const getIdToOperation = (paths: OpenAPIV3.PathItemObject) =>
  new Map(
    Object.entries(paths).flatMap(([path, methods]) =>
      Object.values(methods).map((method) => {
        const tag = method.tags?.[0];
        const { operationId } = method;
        const id = `operations-${tag.replaceAll(' ', '_')}-${operationId}`;
        return [id, { path, tag, operationId }];
      })
    )
  );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getLayoutAction = (operation: any, shown: boolean) => ({
  type: 'layout_show',
  payload: {
    thing: ['operations', operation.tag, operation.operationId],
    shown,
  },
});

export const getTagIdsAndSections = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: any,
  idToOperation: ReturnType<typeof getIdToOperation>,
  operationLabelClassname: string
): [Set<string>, InPageNavSection[]] => {
  const sections = [];
  const tagIds = new Set<string>();
  for (const tag of spec.get('tags')) {
    const tagName = tag.get('name');
    const tagId = tagNameToId(tagName);
    tagIds.add(tagId);
    // Group section with about
    sections.push({
      id: tagId,
      label: tagName,
    });
    // Operations
    for (const [id, operation] of idToOperation) {
      if (operation.tag === tagName) {
        sections.push({
          id,
          label: (
            <span className={operationLabelClassname}>{operation.path}</span>
          ),
        });
      }
    }
  }

  // Schemas at the bottom of every page
  if (spec.get('components')?.get('schemas')) {
    sections.push({
      id: SCHEMAS_ID,
      label: 'Schemas',
    });
  }

  return [tagIds, sections];
};
