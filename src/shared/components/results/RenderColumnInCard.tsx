import { ColumRenderer } from '../../types/columnConfiguration';

import './styles/render-column-in-card.scss';

type RenderColumnInCardProps<R extends Record<string, unknown>> = {
  data: R;
  // eslint-disable-next-line react/require-default-props
  columnRenderer?: ColumRenderer<R>;
};

const RenderColumnInCard = <R extends Record<string, unknown>>(
  props: RenderColumnInCardProps<R>
) => {
  const { data, columnRenderer } = props;
  if (!columnRenderer) {
    return null;
  }
  const rendered = columnRenderer?.render(data);
  return rendered ? (
    <>
      <span className="result-card__info-bit">
        <strong>{columnRenderer?.label}</strong>
        {': '}
        {rendered}
      </span>
    </>
  ) : null;
};

export default RenderColumnInCard;
