import { useRef, useEffect, useState } from 'react';
import NightingaleNavigation from '@nightingale-elements/nightingale-navigation';
import { throttle } from 'lodash-es';

import useCustomElement from '../../hooks/useCustomElement';
import useNightingale from '../../hooks/useNightingale';

import { NightingaleParams } from '../../../types/nightingale';
import { NightingaleState } from '../../contexts/Nightingale';

export const Navigation = (props: Partial<NightingaleNavigation>) => {
  const ref = useRef<NightingaleNavigation>(null);
  const [state, setState] = useNightingale();
  const [localState, setLocalState] = useState(state);

  const element = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "nightingale-navigation" */ '@nightingale-elements/nightingale-navigation'
      ),
    'nightingale-navigation'
  );

  useEffect(() => {
    const updater = (
      previousState: NightingaleState | undefined,
      detail: NightingaleParams
    ) => {
      const newState = { ...previousState };
      if (detail['display-start']) {
        newState['display-start'] = +detail['display-start'];
      }
      if (detail['display-end']) {
        newState['display-end'] = +detail['display-end'];
      }
      return newState;
    };
    const throttled = throttle(
      (detail: NightingaleParams) =>
        setState((previousState) => updater(previousState, detail)),
      500,
      { leading: true }
    );
    const listener = (event: CustomEvent<NightingaleParams> | Event) => {
      if ('detail' in event) {
        const { detail } = event;
        throttled(detail);
        setLocalState((previousState) => updater(previousState, detail));
      }
    };
    const element = ref.current;
    element?.addEventListener('change', listener, {
      passive: true,
    });
    return () => {
      throttled.cancel();
      element?.removeEventListener('change', listener);
    };
  }, [setState]);

  return <element.name ref={ref} {...props} {...state} {...localState} />;
};
