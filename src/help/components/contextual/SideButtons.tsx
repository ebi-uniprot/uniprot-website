import { useEffect, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
// import { sleep } from 'timing-functions';

import { LocationToPath, Location } from '../../../app/config/urls';

import sideButtonStyles from './styles/side-buttons.module.scss';
import baseStyles from '../../../shared/components/layouts/styles/base-layout.module.scss';

type Props = {
  displayHelp: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement>;
};

const SideButtons = ({ displayHelp, onClick }: Props) => {
  // const [displayFeedback, setDisplayFeedback] = useState(false);
  const displayFeedback = false;

  useEffect(() => {
    // Checking if there is a scroll bar
    const mainContent = document?.querySelector<HTMLElement>(
      `.${baseStyles['main-content']}`
    );
    let scrollBarWidth =
      mainContent && mainContent.offsetWidth - mainContent.clientWidth;

    if (scrollBarWidth) {
      scrollBarWidth += 2;
      const sideButton = document?.querySelector<HTMLElement>(
        `.${sideButtonStyles['side-button']}`
      );
      const sideButtonHelp = document?.querySelector<HTMLElement>(
        `.${sideButtonStyles.help}`
      );

      if (sideButton) {
        sideButton.style.right = `${scrollBarWidth.toString()}px`;
      }
      if (sideButtonHelp) {
        sideButtonHelp.style.right = `${scrollBarWidth.toString()}px`;
      }
    }
    // Important: restore it once the survey is over
    // sleep(3000).then(() => {
    //   // If there's already Hotjar's feedback, don't do anything
    //   if (document.querySelector('._hj_feedback_container')) {
    //     if (scrollBarWidth) {
    //       const hjButton = document.querySelector<HTMLElement>(
    //         '#_hj_feedback_container div button'
    //       );

    //       if (hjButton) {
    //         hjButton.style.right = `${scrollBarWidth.toString()}px`;
    //       }
    //     }

    //     return;
    //   }
    //   setDisplayFeedback(true);
    // });
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
