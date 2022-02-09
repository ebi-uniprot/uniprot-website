import { ReactNode } from 'react';

const getLabelAndTooltip = (
  label: ReactNode,
  tooltip: ReactNode,
  articleId?: string
) => ({
  label: <span data-article-id={articleId}>{label}</span>,
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
