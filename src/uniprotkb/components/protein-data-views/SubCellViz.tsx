/* eslint-disable react/no-this-in-sfc */
import { FC, memo, useEffect, useRef } from 'react';
import tippy from 'tippy.js';
import '@swissprot/swissbiopics-visualizer';
import { RequireExactlyOne } from 'type-fest';

import { VizTab } from './SubcellularLocationWithVizView';

import 'tippy.js/dist/tippy.css';
import './styles/sub-cell-viz.scss';

/*
  The logic implemented here to get our data into @swissprot/swissbiopics-visualizer has been lifted
  from the source code at http://sp.sib.swiss/scripts/uniprot_entry-bundle.js with some modifications

  Good membrane example: A1L3X0
*/

const shapes = [
  'path',
  'circle',
  'ellipse',
  'polygon',
  'rect',
  'polyline',
  'line',
] as const;
const shapesSelector = shapes.join(', ');
const scopedShapesSelector = shapes.map((s) => `:scope ${s}`).join(', ');

const reMpPart = /(mp|part)_(?<id>\w+)/;

// Typing inspired from
// https://github.com/ionic-team/stencil/blob/master/test/end-to-end/src/components.d.ts
// this approach might be useful when we have to type more custom elements
interface CanonicalDefinitionI extends HTMLElement {
  highLight(
    e: HTMLElement | SVGElement | null | undefined,
    target: HTMLElement | SVGElement | null | undefined,
    selector: string
  ): void;

  removeHiglight(
    e: HTMLElement | SVGElement | null | undefined,
    target: HTMLElement | SVGElement | null | undefined,
    selector: string
  ): void;
}

type CanonicalDefinitionT = {
  new (): CanonicalDefinitionI;
};

const canonicalName = 'sib-swissbiopics-sl';
// FIXME: fix definition here, wasn't sure what to do when upgrating to TS 4.4
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const CanonicalDefinition: CanonicalDefinitionT =
  customElements.get(canonicalName);
let counter = 0;

// Note that these are without leading zeros eg: GO1 (and not GO0000001) so make sure
// the correct classnames are supplied in SubcellularLocationGOView
const getGoTermClassNames = (locationGroup: Element) =>
  Array.from(locationGroup.classList.values())
    .filter((className) => className.startsWith('GO'))
    .map((goId) => `.${goId}`);

const getUniProtTextSelectors = (subcellularPresentSVG: Element): string[] => [
  `#${subcellularPresentSVG.id}term`,
  ...Array.from(subcellularPresentSVG.classList)
    .map((className: string) => {
      const id = className.match(reMpPart)?.groups?.id;
      return id && `#${id}term`;
    })
    .filter((sel: string | undefined): sel is string => Boolean(sel)),
];

const attachTooltips = (
  locationGroup: Element,
  instance: Element | null,
  triggerTargetSvgs: NodeListOf<Element & { membrane?: Element }> | undefined,
  partOfShown: boolean
) => {
  if (!triggerTargetSvgs?.length) {
    return;
  }
  const name = locationGroup.querySelector('.subcell_name')?.textContent;
  let description = locationGroup.querySelector(
    '.subcell_description'
  )?.textContent;
  if (partOfShown) {
    // This location is a child of another location
    const parentLocationText =
      locationGroup.parentElement?.querySelector('.subcell_name')?.textContent;
    if (parentLocationText) {
      description = `A part of the shown ${parentLocationText}. ${description}`;
    }
  }
  const locationTextSelector = [
    ...getGoTermClassNames(locationGroup),
    ...getUniProtTextSelectors(locationGroup),
  ].join(',');
  const locationTextQueryResult =
    instance?.querySelectorAll(locationTextSelector);
  if (!locationTextQueryResult) {
    return;
  }
  const locationTextElements = Array.from(locationTextQueryResult);

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

type Props = RequireExactlyOne<
  {
    taxonId: number;
    uniProtLocationIds: string;
    goLocationIds: string;
  },
  'uniProtLocationIds' | 'goLocationIds'
>;

const SubCellViz: FC<Props> = memo(
  ({ uniProtLocationIds, goLocationIds, taxonId, children }) => {
    throw Error('testing');
    const instanceName = useRef(
      `${canonicalName}-${
        uniProtLocationIds?.length ? VizTab.UniProt : VizTab.GO
      }-${counter}`
    );
    useEffect(() => {
      // eslint-disable-next-line no-plusplus
      counter++;
    }, []);

    /**
     * NOTE: whole lot of mitigation logic because of the way the custom element
     * is implemented.
     * See here for details:
     * https://stackoverflow.com/questions/43836886/failed-to-construct-customelement-error-when-javascript-file-is-placed-in-head
     */
    /* istanbul ignore next */
    useEffect(() => {
      // define a new element for each instance *after* it has been rendered.
      // cannot reuse the same class with different name, so create a new one
      class InstanceClass extends CanonicalDefinition {
        // logic for highlighting
        getHighlights(image: HTMLElement | SVGElement | null | undefined) {
          if (!image) {
            return [];
          }
          const selectors = getGoTermClassNames(image);
          if (image?.id) {
            selectors.push(`#${image.id}term`);
          }
          return this.querySelectorAll(selectors.join(','));
        }

        highLight(
          text: HTMLElement | SVGElement | null | undefined,
          image: HTMLElement | SVGElement | null | undefined,
          selector: string
        ) {
          super.highLight(text, image, selector);
          // Add "lookedAt" classname to image SVG and text
          for (const highlight of this.getHighlights(image)) {
            highlight?.classList.add('lookedAt');
          }
        }

        // Note that there is no "h" in the middle of this method name
        // This is probably a typo that needs correcting
        removeHiglight(
          text: HTMLElement | SVGElement | null | undefined,
          image: HTMLElement | SVGElement | null | undefined,
          selector: string
        ) {
          // Remove "lookedAt" classname from image SVG and text
          for (const highlight of this.getHighlights(image)) {
            highlight?.classList.remove('lookedAt');
          }
          super.removeHiglight(text, image, selector);
        }
      }
      /**
       * This needs to happen after the element has been created and inserted into
       * the DOM in order to have the constructor being called when already in the
       * document as the logic depends on that...
       * We create a new definition everytime otherwise if we navigate to another
       * entry page the definition will already be registered and it will crash...
       */
      customElements.define(instanceName.current, InstanceClass);
      // get the instance to modify its shadow root
      const instance = document.querySelector<InstanceClass>(
        instanceName.current
      );
      const shadowRoot = instance?.shadowRoot;
      const onSvgLoaded = () => {
        const tabsHeaderHeight =
          document.querySelector('.tabs__header')?.clientHeight;
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
          width: 100%;
          position: sticky;
          top: ${pictureTop};
        }
        .subcell_name {
          display: none;
        }
        .subcell_description {
          display: none;
        }
        [class*="mp_"] .coloured, svg [class*="part_"] .coloured {
          stroke: black !important;
          fill: #abc7d6 !important;
          fill-opacity: 1 !important;
        }
      `;

        const style = document.createElement('style');
        // inject more styles
        style.innerText = css;
        shadowRoot?.appendChild(style);
        // add a slot to inject content
        const slot = document.createElement('slot');
        const terms = shadowRoot?.querySelector('.terms');
        terms?.appendChild(slot);

        // This finds all subcellular location SVGs that will require a tooltip
        const subcellularPresentSVGs =
          shadowRoot?.querySelectorAll(
            'svg .subcell_present, svg [class*="mp_"], svg [class*="part_"]'
          ) || [];

        for (const subcellularPresentSVG of subcellularPresentSVGs) {
          // The text location in the righthand column which in our case will either
          // be of the form \d+term or GO\d+ depending on what props has been provided
          const textSelectors = uniProtLocationIds?.length
            ? getUniProtTextSelectors(subcellularPresentSVG)
            : getGoTermClassNames(subcellularPresentSVG);

          for (const textSelector of textSelectors) {
            const locationText =
              instance?.querySelector<HTMLElement>(textSelector);

            if (locationText) {
              locationText.classList.add('inpicture');
              const locationSVG = shadowRoot?.querySelector<SVGElement>(
                `#${subcellularPresentSVG.id}`
              );
              // TODO: need to remove event listeners on unmount. Will leave for now until
              // to see what changes are made to @swissprot/swissbiopics-visualizer
              locationText.addEventListener('mouseenter', () => {
                instance?.highLight(locationText, locationSVG, shapesSelector);
              });
              locationText.addEventListener('mouseleave', () => {
                instance?.removeHiglight(
                  locationText,
                  locationSVG,
                  shapesSelector
                );
              });
              // Get all of the SVG elements in the picture that should open a tooltip
              let triggerTargetSvgs: NodeListOf<SVGElement> | undefined =
                subcellularPresentSVG.querySelectorAll<SVGElement>(
                  scopedShapesSelector
                );
              if (!triggerTargetSvgs.length) {
                // If nothing found (as with happens with eg Cell surface) try the parentElement
                triggerTargetSvgs =
                  subcellularPresentSVG.parentElement?.querySelectorAll<SVGElement>(
                    scopedShapesSelector
                  );
              }
              attachTooltips(
                subcellularPresentSVG,
                instance,
                triggerTargetSvgs,
                false
              );
            }
          }
        }
      };
      shadowRoot?.addEventListener('svgloaded', onSvgLoaded);
      return () => {
        shadowRoot?.removeEventListener('svgloaded', onSvgLoaded);
      };
    }, [uniProtLocationIds]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Instance = (props: any) => <instanceName.current {...props} />;

    const locationIds = {
      sls: uniProtLocationIds,
      gos: goLocationIds,
    };

    return (
      <>
        {/** if this is not somewhere in the document, it doesn't add one of its 2
         * custom style tags... */}
        <template id="sibSwissBioPicsStyle" />
        {/** insists on wanting to get stuff from the outside, give empty div */}
        <div id="fakeContent" />
        <Instance taxid={taxonId} contentid="fakeContent" {...locationIds}>
          {children}
        </Instance>
      </>
    );
  }
);

export default SubCellViz;
