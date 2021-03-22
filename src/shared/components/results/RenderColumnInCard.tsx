import { memo, ReactNode } from 'react';

import {
  ColumnConfiguration,
  ColumRenderer,
} from '../../types/columnConfiguration';

import styles from './styles/render-column-in-card.module.scss';

type RenderColumnInCardProps<T, R extends Record<string, unknown>> = {
  type: T;
  data: R;
  columnConfig: ColumnConfiguration<T, R>;
};

/**
 * @deprecated `RenderColumnsInCard` should be used instead
 */
const RenderColumnInCard = <T, R extends Record<string, unknown>>(
  props: RenderColumnInCardProps<T, R>
) => {
  const { type, data, columnConfig } = props;
  const rendered = columnConfig.get(type)?.render(data);
  return rendered ? (
    <span className={styles['result-card__info-bit']}>
      <strong>{columnConfig.get(type)?.label}: </strong>
      {rendered}
    </span>
  ) : null;
};

export default RenderColumnInCard;

/**
 * Renders a column renderer or a list of renderers for usage within a card with
 * with all the corresponding wrapping markup and classes
 */
export const RenderColumnsInCard = memo(
  <Schema extends Record<string, unknown>>({
    renderers,
    data,
  }: {
    /** Renderer or list of renderers to render with the data */
    renderers:
      | Array<ColumRenderer<Schema> | undefined>
      | ColumRenderer<Schema>
      | undefined;
    /** Data to pass to the renderer(s) */
    data: Schema;
  }) => {
    const listOfRenderers = Array.isArray(renderers) ? renderers : [renderers];
    const renderedNodes: ReactNode[] = listOfRenderers
      .map((renderer, index) => {
        const rendered = renderer?.render(data);
        if (!rendered || !renderer) {
          return null;
        }
        return (
          <span
            className={styles['result-card__info-bit']}
            key={typeof renderer.label === 'string' ? renderer.label : index}
          >
            <strong>{renderer.label}: </strong>
            {rendered}
          </span>
        );
      })
      .filter(Boolean);

    return renderedNodes.length ? (
      <div className={styles['result-card__info-container']}>
        {renderedNodes}
      </div>
    ) : null;
  }
);
