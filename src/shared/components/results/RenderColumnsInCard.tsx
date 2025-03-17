import { memo, ReactNode } from 'react';

import { ColumRenderer } from '../../types/columnConfiguration';
import styles from './styles/render-columns-in-card.module.scss';

/**
 * Renders a column renderer or a list of renderers for usage within a card with
 * with all the corresponding wrapping markup and classes
 */
const RenderColumnsInCard = <Schema extends Record<string, unknown>>({
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
    <div className={styles['result-card__info-container']}>{renderedNodes}</div>
  ) : null;
};

export default memo(RenderColumnsInCard) as typeof RenderColumnsInCard;
