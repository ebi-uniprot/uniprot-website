import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

type InputValue = string | number | false | null | undefined;

const isTruthy = (value: InputValue): value is number | string =>
  Boolean(value);

type Props = {
  title?: InputValue | InputValue[];
  children?: ReactNode;
};

const HTMLHead = ({ title, children }: Props) => {
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
      {renderedTitle ? <title>{renderedTitle}</title> : null}
      {children}
    </Helmet>
  );
};

export default HTMLHead;
