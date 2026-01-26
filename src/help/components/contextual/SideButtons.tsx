import cn from 'classnames';
import { type MouseEventHandler, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sleep } from 'timing-functions';

import { Location, LocationToPath } from '../../../app/config/urls';
import baseStyles from '../../../shared/components/layouts/styles/base-layout.module.scss';
import sideButtonStyles from './styles/side-buttons.module.scss';

type Props = {
  displayHelp: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement>;
};

const SideButtons = ({ displayHelp, onClick }: Props) => {
  useEffect(() => {
    // Checking if there is a scroll bar
    const mainContent = document?.querySelector<HTMLElement>(
      `.${baseStyles['main-content']}`
    );
    const scrollBarWidth =
      mainContent && mainContent.offsetWidth - mainContent.clientWidth;

    const surveyId = '#survey_1067707';

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
            `${surveyId} > div > div > div > div > div:nth-child(2)`
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
      }
    });
  }, []);

  return (
    <span className={sideButtonStyles.container}>
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
