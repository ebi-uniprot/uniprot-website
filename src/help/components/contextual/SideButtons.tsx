import { useEffect, useState, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { sleep } from 'timing-functions';

import { LocationToPath, Location } from '../../../app/config/urls';

import styles from './styles/side-buttons.module.scss';

type Props = {
  displayHelp: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement>;
};

const SideButtons = ({ displayHelp, onClick }: Props) => {
  const [displayFeedback, setDisplayFeedback] = useState(false);

  useEffect(() => {
    sleep(3000).then(() => {
      // If there's already Hotjar's feedback, don't do anything
      if (document.querySelector('._hj_feedback_container')) {
        return;
      }
      setDisplayFeedback(true);
    });
  });

  return (
    <span className={styles.container}>
      <a
        className={cn(styles['side-button'], styles.feedback, {
          [styles.visible]: displayFeedback,
        })}
        target="_blank"
        href="https://goo.gl/forms/VrAGbqg2XFg6Mpbh1"
        rel="noopener noreferrer"
        tabIndex={-1}
      >
        Feedback
      </a>
      <Link
        to={LocationToPath[Location.HelpResults]}
        onClick={onClick}
        tabIndex={-1}
        className={cn(styles['side-button'], styles.help, {
          [styles.visible]: displayHelp,
        })}
      >
        Help
      </Link>
    </span>
  );
};

export default SideButtons;
