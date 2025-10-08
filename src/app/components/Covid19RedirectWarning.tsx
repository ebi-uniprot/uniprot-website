import { Message } from 'franklin-sites';
import { useState } from 'react';

import style from './styles/warning-message.module.scss';

const reFromCovid19Portal = /fromCovid19Portal=true/;

const Covid19DeploymentWarning = () => {
  const [dismissed, setDismissed] = useState(false);
  return (
    <>
      {window.location.search.match(reFromCovid19Portal) &&
      !LIVE_RELOAD &&
      !dismissed ? (
        <Message
          className={style['warning-message']}
          level="warning"
          onDismiss={() => setDismissed(true)}
        >
          You have been redirected from the COVID-19 portal which is now
          obsolete as all entries have been fully integrated into UniProtKB.
        </Message>
      ) : null}
    </>
  );
};

export default Covid19DeploymentWarning;
