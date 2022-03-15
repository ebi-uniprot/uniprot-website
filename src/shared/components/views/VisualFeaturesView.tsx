import { useCallback } from 'react';

import NightingaleZoomTool from '../../../uniprotkb/components/protein-data-views/NightingaleZoomTool';

import useCustomElement from '../../hooks/useCustomElement';

// Can't use arrow function because of TS generic annotation
// eslint-disable-next-line react/function-component-definition
function VisualFeaturesView<T>({
  features,
  sequence,
  trackHeight,
}: {
  features: T[];
  sequence: string;
  trackHeight?: number;
}) {
  const trackElement = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-track" */ 'protvista-track'),
    'protvista-track'
  );
  const navigationElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-navigation" */ 'protvista-navigation'
      ),
    'protvista-navigation'
  );
  const sequenceElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-sequence" */ 'protvista-sequence'),
    'protvista-sequence'
  );

  const setTrackData = useCallback(
    (node): void => {
      if (node && trackElement.defined) {
        // eslint-disable-next-line no-param-reassign
        node.data = features;
      }
    },
    [trackElement.defined, features]
  );

  const ceDefined =
    trackElement.defined &&
    navigationElement.defined &&
    sequenceElement.defined;

  return ceDefined ? (
    <>
      <NightingaleZoomTool length={sequence.length} />
      <navigationElement.name length={sequence.length} />
      <trackElement.name
        ref={setTrackData}
        length={sequence.length}
        layout="non-overlapping"
        height={trackHeight}
      />
      <sequenceElement.name
        sequence={sequence}
        length={sequence.length}
        height="20"
      />
    </>
  ) : null;
}

export default VisualFeaturesView;
