import { Message } from 'franklin-sites';
import { useState } from 'react';

import style from './styles/warning-message.module.scss';

const reUniProtOrg = /^https?:\/\/www\.uniprot\.org/;

const DevDeploymentWarning = () => {
  const [dismissed, setDismissed] = useState(false);
  return (
    <>
      {!window.location.href.match(reUniProtOrg) &&
      !LIVE_RELOAD &&
      !dismissed ? (
        <Message
          className={style['warning-message']}
          level="warning"
          onDismiss={() => setDismissed(true)}
        >
          <small>
            {`This is a fallback version of `}
            <a href="https://www.uniprot.org">www.uniprot.org</a>. We will
            endeavour to get the main website up and running as soon as
            possible.
          </small>
        </Message>
      ) : null}
    </>
  );
};

export default DevDeploymentWarning;
