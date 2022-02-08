import { ReactNode } from 'react';

export const getLabelAndTooltip = (
  label: ReactNode,
  tooltip: ReactNode,
  articleId?: string
) => ({
  label: <span data-article-id={articleId}>{label}</span>,
  tooltip: (
    <>
      {tooltip}
      {articleId && (
        <div data-article-id="entry_name" style={{ textAlign: 'right' }}>
          more
        </div>
      )}
    </>
  ),
});

export default getLabelAndTooltip;
