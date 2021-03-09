import { ColumnConfiguration } from '../../types/columnConfiguration';

import './styles/render-column-in-card.scss';

type RenderColumnInCardProps<T, R extends Record<string, unknown>> = {
  type: T;
  data: R;
  columnConfig: ColumnConfiguration<T, R>;
};

const RenderColumnInCard = <T, R extends Record<string, unknown>>(
  props: RenderColumnInCardProps<T, R>
) => {
  const { type, data, columnConfig } = props;
  const rendered = columnConfig.get(type)?.render(data);
  return rendered ? (
    <>
      <span className="result-card__info-bit">
        {columnConfig.get(type)?.label}
        {': '}
        {rendered}
      </span>
    </>
  ) : null;
};

export default RenderColumnInCard;
