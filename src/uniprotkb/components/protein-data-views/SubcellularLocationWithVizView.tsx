import { FC, useCallback, useEffect, useRef } from 'react';
import tippy from 'tippy.js';
import { sleep } from 'timing-functions';

import SubcellularLocationView from './SubcellularLocationView';

import { OrganismData } from '../../adapters/namesAndTaxonomyConverter';

import { SubcellularLocationComment } from '../../types/commentTypes';

// import '../../../../node_modules/tippy.js/dist/tippy.css';
import './styles/tippy.css';
import useSafeState from '../../../shared/hooks/useSafeState';

enum Superkingdom {
  Viruses = 'Viruses',
}

const isVirus = ([superkingdom]: string[]) =>
  superkingdom === Superkingdom.Viruses;

const getSubcellularLocationId = (id: string) => {
  const match = id.match(/SL-(\d+)/);
  if (match?.[1]) {
    return match[1];
  }
  return null;
};

// 😷, get style rules from the document context in order to
// copy and inject them in the shadow dom later through the template
const getStylesContaining = (...selectors: string[]) =>
  Array.from(document.styleSheets)
    .flatMap((stylesheet) =>
      Array.from(stylesheet.rules).map(
        (rule) =>
          selectors.some((selector) => rule.cssText.includes(selector)) &&
          rule.cssText
      )
    )
    .filter(Boolean) as string[];

const SubcellularLocationWithVizView: FC<
  {
    comments?: SubcellularLocationComment[];
  } & Pick<OrganismData, 'taxonId' | 'lineage'>
> = ({ comments, taxonId, lineage }) => {
  /*
    The logic implemented here to get our data into @swissprot/swissbiopics-visualizer has been lifted
    from the source code at http://sp.sib.swiss/scripts/uniprot_entry-bundle.js with some modifications
  */
  const ref = useRef<HTMLDivElement>(null);
  const [ceLoaded, setCELoaded] = useSafeState(false);

  useEffect(() => {
    import('@swissprot/swissbiopics-visualizer').then(
      () => setCELoaded(true),
      // eslint-disable-next-line no-console
      (error) => console.error(error)
    );
  }, [setCELoaded]);

  // NOTE: injecting HTML because of the way the web component is implemented.
  //       See here for details: https://stackoverflow.com/questions/43836886/failed-to-construct-customelement-error-when-javascript-file-is-placed-in-head
  //       After discussion with author of @swissprot/swissbiopics-visualizer this will most likely not change.
  // TODO: add additional GO template which will also require GO term data
  // TODO: handle this case as seen in the source code 'svg .membranes .membrane.subcell_present' eg A1L3X0 doesn't work
  // TODO: clicking a UniProtKBEvidenceTag doesn't open the content
  useEffect(() => {
    if (lineage && taxonId && comments && !isVirus(lineage)) {
      const sls = comments
        ?.flatMap(({ subcellularLocations }) =>
          subcellularLocations?.map(({ location }) =>
            getSubcellularLocationId(location.id)
          )
        )
        .filter(Boolean)
        .join(',');

      const tabsHeaderHeight = document.querySelector('.tabs__header')
        ?.clientHeight;
      const pictureTop = tabsHeaderHeight
        ? `${tabsHeaderHeight + 5}px`
        : '4rem';

      ref.current?.insertAdjacentHTML(
        'afterbegin',
        `
      <template id="sibSwissBioPicsStyle">
        <style>
          #swissBioPicsSlData {
            grid-area: terms;
          }
          .lookedAt {
            background-color: #abc7d6 !important;          
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
          .inpicture:before{
            content: '🔎';
            margin-right: 0.2rem;
          }
          ${getStylesContaining(
            'button',
            '.evidence-tag',
            'svg-colour-reviewed'
          ).join('\n')}
       </style>
     </template>
    <sib-swissbiopics-sl taxid="${taxonId}" sls="${sls}" contentid="swissBioPicsSlData"/> `
      );
    }
  }, [comments, lineage, taxonId, ceLoaded]);

  const getGoTermClassNames = (locationGroup: Element) =>
    Array.from(locationGroup.classList.values())
      .filter((className) => className.startsWith('GO'))
      .map((className) => `.${className}`);

  const attachTooltips = useCallback(
    (
      locationGroup: Element,
      shadowRoot: ShadowRoot,
      triggerTargetSvgs:
        | NodeListOf<Element & { membrane?: Element }>
        | undefined,
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
    },
    []
  );

  useEffect(() => {
    // TODO: Need to condition on the custom element being loaded rather than sleeping
    sleep(2000).then(() => {
      const ce = document.querySelector('sib-swissbiopics-sl')?.shadowRoot;
      if (!ce) {
        return;
      }
      // This finds all subcellular location SVGs that will require a tooltip
      const subcellularPresentSVGs = ce.querySelectorAll(
        'svg .subcell_present:not(.membrane)'
      );
      if (!subcellularPresentSVGs) {
        return;
      }
      for (const subcellularPresentSVG of subcellularPresentSVGs) {
        // The text location in the righthand column
        const locationText = ce.querySelector(
          `#${subcellularPresentSVG.id}term`
        );
        if (locationText) {
          locationText.classList.add('inpicture');
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
          attachTooltips(subcellularPresentSVG, ce, triggerTargetSvgs, false);
        }
      }
    });
  }, [attachTooltips, ceLoaded]);

  if (!comments || !comments.length || !ceLoaded) {
    return null;
  }

  return (
    <div id="swissviz" ref={ref}>
      <div id="swissBioPicsSlData">
        <SubcellularLocationView comments={comments} />
      </div>
    </div>
  );
};

export default SubcellularLocationWithVizView;
