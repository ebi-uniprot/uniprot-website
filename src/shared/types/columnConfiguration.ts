import { ReactNode } from 'react';

export type ColumnConfiguration<
  Columns,
  Schema extends Record<string, unknown>
> = Map<
  Columns,
  {
    label: ReactNode;
    // Exclude plain objects as it wouldn't detect an issue when returning
    // objects to react to render
    render: (data: Schema) => Exclude<ReactNode, Record<string, unknown>>;
  }
>;
