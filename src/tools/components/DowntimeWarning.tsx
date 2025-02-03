import { ReactNode } from 'react';
import { Message, ReSubmitIcon } from 'franklin-sites';

import styles from './styles/downtime-warning.module.scss';

// NOTE: Always include +XX:XX at the end, otherwise it will be relative to the
// user's timezone and not assumed to be UTC
// Make sure to watch out for summer time:
// GMT / UK winter time: +00:00
// BST / UK summer time: +01:00
const from = new Date('2025-02-05T09:30:00+00:00');
const to = new Date('2025-02-05T11:30:00+00:00');

const TZ = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return <span className={styles.spaced}>({tz} time zone)</span>;
  } catch {
    return null;
  }
};

type Props = {
  children: ReactNode;
};

export const DowntimeWarning = ({ children }: Props) => (
  <Message level="warning">
    Scheduled maintenance will cause {children} to have less available resources
    between the following times:
    <div className={styles.time}>
      {from.toLocaleString()}
      <span className={styles.spaced}>to</span>
      {to.toLocaleString()}
      <TZ />
    </div>
    Your job might be queued for longer than usual.
    <br />
    Please try submitting jobs before or after this period. In addition, running
    jobs might be interrupted and so might need to be resubmitted&nbsp;&nbsp;
    <ReSubmitIcon width="1em" />.
  </Message>
);

export default DowntimeWarning;
