import { ReactNode } from 'react';

const getLabelAndTooltip = (
  label: ReactNode,
  tooltip: string,
  articleId?: string
) => ({
  label: <span data-article-id={articleId}>{label}</span>,
  tooltip: `${tooltip}${
    articleId
      ? `<div data-article-id=${articleId} style="text-align:right;margin-top:1em" }>
          more
        </div>`
      : ''
  }`,
});

export default getLabelAndTooltip;
