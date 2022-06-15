import { Message } from 'franklin-sites';
import { useState } from 'react';
import style from './styles/deployment-warning.module.scss';

const reUniProtOrg = /^https?:\/\/www\.uniprot\.org/;

const DeploymentWarning = () => {
  const [dismissed, setDismissed] = useState(
    // Temporary
    globalThis?.location.origin.includes('beta')
  );
  return (
    <>
      {!window.location.href.match(reUniProtOrg) &&
      !LIVE_RELOAD &&
      !dismissed ? (
        <Message
          className={style['deployment-warning']}
          level="warning"
          onDismiss={() => setDismissed(true)}
        >
          {`This is a development version of `}
          <a href="https://www.uniprot.org">www.uniprot.org</a>
          {` |  git branch: ${GIT_BRANCH} |  API: ${API_PREFIX}`}
        </Message>
      ) : null}
    </>
  );
};

export default DeploymentWarning;
