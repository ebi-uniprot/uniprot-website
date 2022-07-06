import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

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
      <title data-loaded={!titleLoading}>{renderedTitle}</title>
      {children}
    </Helmet>
  );
};

export default HTMLHead;
