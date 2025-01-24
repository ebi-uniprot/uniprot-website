import { Message } from 'franklin-sites';
import { useState } from 'react';

import style from './styles/warning-message.module.scss';

const DnsDowntimeWarning = () => {
  const [dismissed, setDismissed] = useState(false);
  return (
    <>
      {!dismissed ? (
        <Message
          className={style['warning-message']}
          level="warning"
          onDismiss={() => setDismissed(true)}
        >
          <small>
            {`Essential maintenance is planned to begin on
            ${new Date('January 24, 2025').toDateString()}. The website may be temporarily unavailable. Please use our fallback: `}
            <a
              href="https://wwwdev.ebi.ac.uk/uniprot/front-end/fallback/"
              rel="nofollow"
            >
              https://wwwdev.ebi.ac.uk/uniprot/front-end/fallback/
            </a>
            {` in case of any outage.`}
          </small>
        </Message>
      ) : null}
    </>
  );
};

export default DnsDowntimeWarning;
