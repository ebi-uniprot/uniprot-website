import { useEffect, MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { sleep } from 'timing-functions';

import { LocationToPath, Location } from '../../../app/config/urls';

import sideButtonStyles from './styles/side-buttons.module.scss';
import baseStyles from '../../../shared/components/layouts/styles/base-layout.module.scss';

type Props = {
  displayHelp: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement>;
};

const SideButtons = ({ displayHelp, onClick }: Props) => {
  const [displayFeedback, setDisplayFeedback] = useState(false);

  useEffect(() => {
    // Checking if there is a scroll bar
    const mainContent = document?.querySelector<HTMLElement>(
      `.${baseStyles['main-content']}`
    );
    const scrollBarWidth =
      mainContent && mainContent.offsetWidth - mainContent.clientWidth;

    const surveyId = '#survey_106777';

    if (scrollBarWidth) {
      // Set the scroll bar width as a Custom Property for the CSS to use
      window.document.body.style.setProperty(
        '--scroll-bar-width',
        `${scrollBarWidth.toString()}px`
      );
    }

    sleep(3000).then(() => {
      // If there's already Hotjar's feedback, don't do anything
      if (document.querySelector(surveyId)) {
        if (scrollBarWidth) {
          const hjButton = document.querySelector<HTMLElement>(
            `${surveyId} > div > div > div`
          );

          if (hjButton) {
            const classes = Array.from(hjButton.classList)
              .map((el) => `.${el}`)
              .join('');
            const style = document.createElement('style');
            style.innerHTML = `${classes} {right: ${scrollBarWidth.toString()}px !important;}`;
            document.head.appendChild(style);
          }
        }

        return;
      }
      setDisplayFeedback(true);
    });
  }, []);

  return (
    <span className={sideButtonStyles.container}>
      <a
        className={cn(
          sideButtonStyles['side-button'],
          sideButtonStyles.feedback,
          {
            [sideButtonStyles.visible]: displayFeedback,
          }
        )}
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
        className={cn(sideButtonStyles['side-button'], sideButtonStyles.help, {
          [sideButtonStyles.visible]: displayHelp,
        })}
      >
        Help
      </Link>
    </span>
  );
};

export default SideButtons;
