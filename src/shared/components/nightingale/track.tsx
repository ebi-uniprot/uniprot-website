import { useRef, useEffect } from 'react';
import NightingaleTrack from '@nightingale-elements/nightingale-track';

import useCustomElement from '../../hooks/useCustomElement';
import useNightingale from '../../hooks/useNightingale';

import { NightingaleParams } from '../../../types/nightingale';

export const Track = ({ data, ...props }: Partial<NightingaleTrack>) => {
  const ref = useRef<NightingaleTrack>(null);
  const [state, setState] = useNightingale();

  const element = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "nightingale-track" */ '@nightingale-elements/nightingale-track'
      ),
    'nightingale-track'
  );

  useEffect(() => {
    const listener = (event: CustomEvent<NightingaleParams> | Event) => {
      if ('detail' in event) {
        setState((previousState) => {
          const newState = { ...previousState };
          if (event.detail['display-start']) {
            newState['display-start'] = +event.detail['display-start'];
          }
          if (event.detail['display-end']) {
            newState['display-end'] = +event.detail['display-end'];
          }
          if (event.detail.highlight) {
            newState.highlight = event.detail.highlight
              .split(',')
              .map((highlightPairs) => {
                const [start, end] = highlightPairs.split(':');
                return [+start, +end];
              });
          }
          return newState;
        });
      }
    };
    const element = ref.current;
    element?.addEventListener('change', listener, {
      passive: true,
    });
    return () => element?.removeEventListener('change', listener);
  }, [setState]);

  useEffect(() => {
    if (element.defined && ref.current?.data && data) {
      ref.current.data = data;
    }
  }, [element.defined, data]);

  return <element.name ref={ref} {...props} {...state} />;
};
