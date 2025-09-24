import { ReactNode } from 'react';
// import { Helmet } from 'react-helmet-async';

// Temporary
const Helmet = () => null;

type InputValue = string | number | false | null | undefined;

const isTruthy = (value: InputValue): value is number | string =>
  Boolean(value);

type Props = {
  title?: InputValue | InputValue[];
  titleLoading?: boolean;
  children?: ReactNode;
};

const HTMLHead = ({ title, titleLoading, children }: Props) => {
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
      {children}
    </Helmet>
  );
};

export default HTMLHead;
