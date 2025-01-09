import { ReactNode } from 'react';
import { Message } from 'franklin-sites';

// import styles from './styles/downtime-warning.module.scss';

// const from = new Date('2024-11-27T10:30:00');
// const to = new Date('2024-11-27T11:00:00');

// const TZ = () => {
//   try {
//     const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
//     return <span className={styles.spaced}>({tz} time zone)</span>;
//   } catch {
//     return null;
//   }
// };

type Props = {
  children: ReactNode;
};

// export const DowntimeWarning = ({ children }: Props) => (
//   <Message level="warning">
//     Scheduled maintenance will cause {children} to be unavailable at the
//     following time:
//     <div className={styles.time}>
//       {from.toLocaleString()}
//       <span className={styles.spaced}>to</span>
//       {to.toLocaleString()}
//       <TZ />
//     </div>
//     Please submit jobs before or after this period. In addition, running jobs
//     might be interrupted and so might need to be resubmitted&nbsp;&nbsp;
//     <ReSubmitIcon width="1em" />.
//   </Message>
// );

export const DowntimeWarning = ({ children }: Props) => (
  <Message level="warning">
    Unexpected server issues are causing {children} to be unstable at moment, we
    are working on it. If you encounter an error, please come back later to
    retry.
  </Message>
);

export default DowntimeWarning;
