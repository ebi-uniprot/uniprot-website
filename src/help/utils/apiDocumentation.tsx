import { type OpenAPIV3 } from 'openapi-types';

import { type InPageNavSection } from '../../shared/components/InPageNav';

export const SCHEMAS_ID = 'schemas' as const;

export const tagNameToId = (name: string) => name.replaceAll(' ', '_');

export type Operation = { path: string; tag: string; operationId: string };

// Path items mix operations with $ref/summary/description (strings) and
// servers/parameters (arrays)
const isOperation = (value: unknown): value is OpenAPIV3.OperationObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const getIdToOperation = (paths: OpenAPIV3.PathsObject) =>
  new Map<string, Operation>(
    Object.entries(paths).flatMap(([path, pathItem]) =>
      Object.values(pathItem ?? {}).flatMap((method) => {
        if (!isOperation(method)) {
          return [];
        }
        const tag = method.tags?.[0];
        const { operationId } = method;
        if (!tag || !operationId) {
          return [];
        }
        const id = `operations-${tagNameToId(tag)}-${operationId}`;
        return [[id, { path, tag, operationId }] as const];
      })
    )
  );

export const getLayoutAction = (operation: Operation, shown: boolean) => ({
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
