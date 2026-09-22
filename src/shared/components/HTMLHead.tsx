import { type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

import { getCanonicalURL } from '../../app/config/urls';

type InputValue = string | number | false | null | undefined;

const isTruthy = (value: InputValue): value is number | string =>
  Boolean(value);

type Props = {
  title?: InputValue | InputValue[];
  titleLoading?: boolean;
  /**
   * Path this page canonicalises to, resolved against the production origin.
   * Build it with `getEntryPath` rather than `useLocation().pathname` wherever
   * a route has optional segments, so it matches the sitemap exactly
   * (`/uniprotkb/<accession>/entry`, not `/uniprotkb/<accession>`), and pass
   * the entry's own identifier so a differently-cased or query-decorated URL
   * still canonicalises to the one the sitemap lists. Omit it where no other
   * URL should be consolidated onto this one -- a canonical asserts two URLs
   * are the same page.
   */
  canonical?: string;
  children?: ReactNode;
};

const HTMLHead = ({ title, titleLoading, canonical, children }: Props) => {
  let renderedTitle: string | undefined;
  if (title) {
    if (Array.isArray(title)) {
      renderedTitle = title.filter(isTruthy).join(' | ');
    } else {
      renderedTitle = `${title}`;
    }
  }

  return (
    <Helmet>
      {/* If titleLoading undefined, or false, then set as "loaded" */}
      {renderedTitle || titleLoading ? (
        <>
          <title translate="no" data-loaded={!titleLoading}>
            {renderedTitle}
          </title>
          <meta property="og:title" content={renderedTitle} />
        </>
      ) : null}
      {canonical && <link rel="canonical" href={getCanonicalURL(canonical)} />}
      {children}
    </Helmet>
  );
};

export default HTMLHead;
