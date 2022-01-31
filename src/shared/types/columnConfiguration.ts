import { ReactNode } from 'react';

export type ColumRenderer<Schema extends Record<string, unknown>> = {
  label: ReactNode;
  tooltip?: ReactNode;
  // Exclude plain objects as it wouldn't detect an issue when returning
  // objects to React for rendering
  render: (data: Schema) => Exclude<ReactNode, Record<string, unknown>>;
};

export type ColumnConfiguration<
  Columns,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Schema extends Record<string, unknown> = any
> = Map<Columns, ColumRenderer<Schema>>;
