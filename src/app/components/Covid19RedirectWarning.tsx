import { Message } from 'franklin-sites';
import { useState } from 'react';

import style from './styles/warning-message.module.scss';

const reFromCovidPortal = /fromCovid19Portal=true/i;

const Covid19DeploymentWarning = () => {
  const [dismissed, setDismissed] = useState(false);
  return (
    <>
      {!window.location.search.match(reFromCovidPortal) &&
      !LIVE_RELOAD &&
      !dismissed ? (
        <Message
          className={style['warning-message']}
          level="warning"
          onDismiss={() => setDismissed(true)}
        >
          You have been redirected from the COVID-19 Portal which has been shut
          down.
        </Message>
      ) : null}
    </>
  );
};

export default Covid19DeploymentWarning;
