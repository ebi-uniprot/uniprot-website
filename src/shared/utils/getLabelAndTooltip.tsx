import { ReactNode } from 'react';

const getLabelAndTooltip = (
  label: ReactNode,
  tooltip: ReactNode,
  columnName: string,
  articleId?: string
) => ({
  label: (
    <span data-column-name={columnName} data-article-id={articleId}>
      {label}
    </span>
  ),
  tooltip: (
    <>
      {tooltip}
      {articleId && (
        <div data-article-id={articleId} style={{ textAlign: 'right' }}>
          more
        </div>
      )}
    </>
  ),
});

export default getLabelAndTooltip;
