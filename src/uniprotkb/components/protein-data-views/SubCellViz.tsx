import { FC, memo, useEffect, useRef, useState } from 'react';
import tippy from 'tippy.js';
import '@swissprot/swissbiopics-visualizer';

import 'tippy.js/dist/tippy.css';
import './styles/sub-cell-viz.scss';

import { SubcellularLocationComment } from '../../types/commentTypes';

/*
  The logic implemented here to get our data into @swissprot/swissbiopics-visualizer has been lifted
  from the source code at http://sp.sib.swiss/scripts/uniprot_entry-bundle.js with some modifications
*/

const canonicalName = 'sib-swissbiopics-sl';
const CanonicalDefinition: CustomElementConstructor = customElements.get(
  canonicalName
);
let counter = 0;

const getSubcellularLocationId = (id: string) => {
  const match = id.match(/SL-(\d+)/);
  if (match?.[1]) {
    return match[1];
  }
  return null;
};

const getGoTermClassNames = (locationGroup: Element) =>
  Array.from(locationGroup.classList.values())
    .filter((className) => className.startsWith('GO'))
    .map((className) => `.${className}`);

const attachTooltips = (
  locationGroup: Element,
  shadowRoot: ShadowRoot,
  triggerTargetSvgs: NodeListOf<Element & { membrane?: Element }> | undefined,
  partOfShown: boolean
) => {
  if (!triggerTargetSvgs?.length) {
    return;
  }
  const name = locationGroup.querySelector('.subcell_name')?.textContent;
  let description = locationGroup.querySelector('.subcell_description')
    ?.textContent;
  if (partOfShown) {
    // This location is a child of another location
    const parentLocationText = locationGroup.parentElement?.querySelector(
      '.subcell_name'
    )?.textContent;
    if (parentLocationText) {
      description = `A part of the shown ${parentLocationText}. ${description}`;
    }
  }
  const locationTextSelector = [
    ...getGoTermClassNames(locationGroup),
    `#${locationGroup.id}term`,
  ].join(',');
  const locationTextElements = Array.from(
    shadowRoot.querySelectorAll(locationTextSelector)
  );

  const tooltipTarget = triggerTargetSvgs[0];
  if (tooltipTarget.membrane) {
    locationTextElements.push(tooltipTarget.membrane);
  }

  const tooltipTriggerTargets = [
    tooltipTarget,
    ...locationTextElements,
    ...triggerTargetSvgs,
  ].filter(Boolean);
  tippy(tooltipTarget, {
    allowHTML: true,
    content: `${name}<br/>${description}`,
    triggerTarget: tooltipTriggerTargets,
  });
};

type Props = {
  comments: SubcellularLocationComment[];
  taxonId: number;
};

// TODO: add additional GO template which will also require GO term data
// TODO: handle this case as seen in the source code 'svg .membranes .membrane.subcell_present' eg A1L3X0 doesn't work
const SubCellViz: FC<Props> = memo(({ comments, taxonId, children }) => {
  const instanceName = useRef(`${canonicalName}-${counter}`);
  useEffect(() => {
    // eslint-disable-next-line no-plusplus
    counter++;
  }, []);

  const sls = comments
    ?.flatMap(({ subcellularLocations }) =>
      subcellularLocations?.map(({ location }) =>
        getSubcellularLocationId(location.id)
      )
    )
    .filter(Boolean)
    .join(',');

  /**
   * NOTE: whole lot of mitigation logic because of the way the custom element
   * is implemented.
   * See here for details:
   * https://stackoverflow.com/questions/43836886/failed-to-construct-customelement-error-when-javascript-file-is-placed-in-head
   * After discussion with author of @swissprot/swissbiopics-visualizer this
   * will most likely not change.
   */
  useEffect(() => {
    // define a new element for each instance *after* it has been rendered.
    /**
     * This needs to happen after the element has been created and inserted into
     * the DOM in order to have the constructor being called when already in the
     * document as the logic depends on that...
     * We create a new definition everytime otherwise if we navigate to another
     * entry page the definition will already be registered and it will crash...
     */
    customElements.define(
      instanceName.current,
      // cannot reuse the same one with different name, so create a new one
      class InstanceClass extends CanonicalDefinition {
        // logic for highlighting
        highLight(event, target, selector) {
          super.highLight(event, target, selector);
          this.querySelector(`#${target.id}term`)?.classList.add('lookedAt');
        }

        // No "h" in the middle of this method name
        // "Higlight" [sic] ...
        removeHiglight(event, target, selector) {
          this.querySelector(`#${target.id}term`)?.classList.remove('lookedAt');
          super.removeHiglight(event, target, selector);
        }
      }
    );
    // get the instance to modify its shadow root
    const instance = document.querySelector(instanceName.current);
    const shadowRoot = instance?.shadowRoot;
    shadowRoot?.addEventListener('svgloaded', () => {
      const tabsHeaderHeight = document.querySelector('.tabs__header')
        ?.clientHeight;
      const pictureTop = tabsHeaderHeight
        ? `${tabsHeaderHeight + 5}px`
        : '4rem';

      const css = `
        #fakeContent {
          display: none;
        }
        .lookedAt {
          stroke: black !important;
          fill: #abc7d6 !important;
          fill-opacity: 1 !important;
        }
        #swissbiopic > svg {
          position: sticky;
          top: ${pictureTop};
        }
        .subcell_name {
          display: none;
        }
        .subcell_description {
          display: none;
        }
      `;
      const style = document.createElement('style');
      // inject more styles
      style.innerText = css;
      shadowRoot?.appendChild(style);
      // add a slot to inject content
      const slot = document.createElement('slot');
      const terms = shadowRoot.querySelector('.terms');
      terms?.appendChild(slot);

      // This finds all subcellular location SVGs that will require a tooltip
      const subcellularPresentSVGs = shadowRoot.querySelectorAll(
        'svg .subcell_present:not(.membrane)'
      );
      if (!subcellularPresentSVGs) {
        return;
      }
      for (const subcellularPresentSVG of subcellularPresentSVGs) {
        // The text location in the righthand column
        const locationText = instance?.querySelector(
          `#${subcellularPresentSVG.id}term`
        );
        if (locationText) {
          locationText.classList.add('inpicture');
          // TODO: this logic is not working yet
          // TODO: need to remove event listeners on unmount
          locationText.addEventListener('mouseenter', () => {
            instance.highLight(
              undefined,
              shadowRoot.querySelector(`#${subcellularPresentSVG.id}`)
            );
          });
          locationText.addEventListener('mouseleave', () => {
            instance.removeHiglight(
              undefined,
              shadowRoot.querySelector(`#${subcellularPresentSVG.id}`)
            );
          });
          const shapes = [
            ':scope path',
            ':scope circle',
            ':scope rect',
            ':scope ellipse',
            ':scope polygon',
            ':scope line',
          ].join(',');
          // Get all of the SVG elements in the picture that should open a tooltip
          let triggerTargetSvgs:
            | NodeListOf<Element>
            | undefined = subcellularPresentSVG.querySelectorAll(shapes);
          if (!triggerTargetSvgs.length) {
            // If nothing found (as with happens with eg Cell surface) try the parentElement
            triggerTargetSvgs = subcellularPresentSVG.parentElement?.querySelectorAll(
              shapes
            );
          }
          attachTooltips(
            subcellularPresentSVG,
            shadowRoot,
            triggerTargetSvgs,
            false
          );
        }
      }
    });
  }, []);

  return (
    <>
      {/** if this is not somewhere in the document, it doesn't add one of its 2
       * custom style tags... */}
      <template id="sibSwissBioPicsStyle" />
      {/** insists on wanting to get stuff from the outside, give empty div */}
      <div id="fakeContent" />
      <instanceName.current taxid={taxonId} sls={sls} contentid="fakeContent">
        {children}
      </instanceName.current>
    </>
  );
});

export default SubCellViz;
