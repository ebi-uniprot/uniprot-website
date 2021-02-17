import { FC, useEffect, useRef } from 'react';
import tippy from 'tippy.js';

import { sleep } from 'timing-functions';
import SubcellularLocationView from './SubcellularLocationView';

import { OrganismData } from '../../adapters/namesAndTaxonomyConverter';

import { SubcellularLocationComment } from '../../types/commentTypes';

// import '../../../../node_modules/tippy.js/dist/tippy.css';
import './styles/tippy.css';

enum Superkingdom {
  Viruses = 'Viruses',
}

const isVirus = ([superkingdom]: string[]) =>
  superkingdom === Superkingdom.Viruses;

const reSL = /SL-(\d+)/;

const getSubcellularLocationId = (id: string) => {
  const match = id.match(reSL);
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

const SubcellularLocationWithVizView: FC<{
  comments?: SubcellularLocationComment[];
  taxonId: OrganismData['taxonId'];
  lineage: OrganismData['lineage'];
}> = ({ comments, taxonId, lineage }) => {
  const ref = useRef<HTMLDivElement>(null);

  // TODO: injecting HTML because of the way the web component is implemented. See here for details: https://stackoverflow.com/questions/43836886/failed-to-construct-customelement-error-when-javascript-file-is-placed-in-head
  // TODO: the graphic top is an estimate but instead should be based on the size of the entry header
  // TODO: add additional GO template
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
            top: 4rem;
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
  }, [comments, lineage, taxonId]);

  const getGoTermClassNames = (locationGroup: Element) =>
    Array.from(locationGroup.classList.values())
      .filter((className) => className.startsWith('GO'))
      .map((className) => `.${className}`);

  const attachTooltips = (
    locationGroup: Element,
    shadowRoot: ShadowRoot,
    svgs: NodeListOf<Element & { membrane?: Element }> | undefined,
    partOfShown: boolean
  ) => {
    if (!svgs?.length) {
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
    const locationTextSelectors = getGoTermClassNames(locationGroup);
    locationTextSelectors.push(`#${locationGroup.id}term`);
    let locationTextElements = Array.from(
      shadowRoot.querySelectorAll(locationTextSelectors.join(','))
    );

    const firstSvg = svgs[0];
    if (firstSvg.membrane) {
      locationTextElements = locationTextElements.concat(firstSvg.membrane);
    }

    // TODO: make use of the inpicture class name to indicate to the user that the location
    // is in the diagram.
    // locationTextElements.forEach((x) => {
    //   console.log(x);
    //   locationGroup.classList.add('inpicture');
    // });

    const tooltipTriggerTargets = [
      firstSvg,
      ...locationTextElements,
      ...svgs,
    ].filter(Boolean);

    tippy(firstSvg, {
      allowHTML: true,
      content: `${name}<br/>${description}`,
      triggerTarget: tooltipTriggerTargets,
    });
  };

  useEffect(() => {
    sleep(2000).then(() => {
      const ce = document.querySelector('sib-swissbiopics-sl');
      if (!ce?.shadowRoot) {
        return;
      }
      // This finds all subcellular location SVGs that will require a tooltip
      const subcellularPresentsSVGs = ce?.shadowRoot?.querySelectorAll(
        'svg .subcell_present:not(.membrane)'
      );
      if (!subcellularPresentsSVGs) {
        return;
      }
      for (const locationGroup of subcellularPresentsSVGs) {
        // The text location in the righthand column
        const locationText = ce?.shadowRoot?.querySelector(
          `#${locationGroup.id}term`
        );
        if (locationText) {
          locationText.classList.add('inpicture');
          const shapes = [
            ':scope path', // only match selectors of descendants of the base element in the query
            ':scope circle',
            ':scope rect',
            ':scope ellipse',
            ':scope polygon',
            ':scope line',
          ].join(',');
          const svgs = locationGroup.parentElement?.querySelectorAll(shapes);
          attachTooltips(locationGroup, ce.shadowRoot, svgs, true);
        }
      }
    });
  });

  if (!comments || !comments.length) {
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
