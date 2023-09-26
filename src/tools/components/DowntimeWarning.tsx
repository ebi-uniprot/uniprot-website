import { ReactNode } from 'react';
import { Message } from 'franklin-sites';

const from = new Date('2023-09-27T05:00:00-04:00');
const to = new Date('2023-09-27T09:00:00-04:00');

const TZ = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return <> ({tz} time zone)</>;
  } catch {
    return null;
  }
};

type Props = {
  children: ReactNode;
};

export const DowntimeWarning = ({ children }: Props) => (
  <Message level="warning">
    Please note that scheduled maintenance could cause the {children} servers to
    be at risk from {from.toLocaleString()} to {to.toLocaleString()}
    <TZ />.<br />
    If you encounter any issue during that time, please try again later.
  </Message>
);

export default DowntimeWarning;
