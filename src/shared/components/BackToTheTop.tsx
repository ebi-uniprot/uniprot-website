import { memo } from 'react';
import { Button } from 'franklin-sites';
import cn from 'classnames';

import useScrollInfo from '../hooks/useScrollInfo';

import styles from './styles/back-to-the-top.module.scss';
import baseLayoutStyles from './layouts/styles/base-layout.module.scss';

const BackToTheTop = () => {
  const { direction, scrollY } = useScrollInfo(
    `.${baseLayoutStyles['main-content']}`
  );

  const visible = direction === 'up' && scrollY > 750;

  return (
    <Button
      title="scroll to the top of the page"
      className={cn(styles.button, { [styles.visible]: visible })}
      onClick={() => window.scrollTo(0, 0)}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      ⬆
    </Button>
  );
};

export default memo(BackToTheTop);
