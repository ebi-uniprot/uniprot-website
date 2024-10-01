import { FC } from 'react';
import { Button, CopyIcon } from 'franklin-sites';

import useMessagesDispatch from '../../hooks/useMessagesDispatch';

import {
  copyFailureMessage,
  copySuccessMessage,
} from '../../../messages/state/messagesActions';

import helper from '../../styles/helper.module.scss';

const isCopySupported = Boolean(
  'clipboard' in navigator &&
    'writeText' in navigator.clipboard &&
    navigator.clipboard.writeText
);

type CopyButtonProps = {
  textToCopy?: string;
  postCopy?: (textCopied?: string) => unknown;
};

const CopyButton: FC<React.PropsWithChildren<CopyButtonProps>> = ({
  textToCopy,
  children,
  postCopy,
  ...props
}) => {
  const dispatch = useMessagesDispatch();

  const handleClick = async () => {
    if (!textToCopy) {
      postCopy?.();
      return;
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      // Success with Clipboard API, display message
      dispatch(copySuccessMessage());
    } catch {
      // Issue with Clipboard API too, bail with error message
      dispatch(copyFailureMessage());
    } finally {
      postCopy?.(textToCopy);
    }
  };

  if (!isCopySupported) {
    return <span>copy not supported</span>;
  }

  return (
    <Button
      variant="tertiary"
      disabled={!textToCopy}
      onClick={handleClick}
      className={helper['no-small']}
      {...props}
    >
      <CopyIcon width="1em" />
      {children}
    </Button>
  );
};

export default CopyButton;
