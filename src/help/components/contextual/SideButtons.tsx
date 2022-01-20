import { useEffect, useState, MouseEventHandler } from 'react';
import cn from 'classnames';
import { sleep } from 'timing-functions';

import styles from './styles/side-buttons.module.scss';

type Props = {
  displayHelp: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
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
    <>
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
      {/* Different style than franklin, so avoid using it to not fight it */}
      <button type="button" onClick={onClick} tabIndex={-1}>
        <p
          className={cn(styles['side-button'], styles.help, {
            [styles.visible]: displayHelp,
          })}
        >
          Help
        </p>
      </button>
    </>
  );
};

export default SideButtons;
