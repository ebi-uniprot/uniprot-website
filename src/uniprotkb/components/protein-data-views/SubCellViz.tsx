import '@swissprot/swissbiopics-visualizer';
import './styles/sub-cell-viz.scss';

import { groupBy } from 'lodash-es';
import { type FC, memo, useEffect, useMemo, useRef } from 'react';
import { type RequireExactlyOne } from 'type-fest';

import { addTooltip } from '../../../shared/utils/tooltip';
import {
  type SubCellularLocation,
  VizTab,
} from './SubcellularLocationWithVizView';

/*
  The logic implemented here to get our data into @swissprot/swissbiopics-visualizer has been lifted
  from the source code at http://sp.sib.swiss/scripts/uniprot_entry-bundle.js with some modifications

  Good membrane example: A1L3X0

  See following for mitigation logic because of the way the custom element is implemented.
  https://stackoverflow.com/questions/43836886/failed-to-construct-customelement-error-when-javascript-file-is-placed-in-head
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

type SwissBioPicsEl = HTMLElement & {
  shadowRoot: ShadowRoot | null;

  highLight(
    e: HTMLElement | SVGElement | null | undefined,
    target: HTMLElement | SVGElement | null | undefined,
    selector: string
  ): void;

  // Note that there is no "h" in the middle of this method name
  // This is probably a typo that needs correcting
  removeHiglight(
    e: HTMLElement | SVGElement | null | undefined,
    target: HTMLElement | SVGElement | null | undefined,
    selector: string
  ): void;

  swissBioPicsRemovedCSSRules?: boolean;
};

const canonicalName = 'sib-swissbiopics-sl';

// The SwissBioPics web component does async DOM work and sometimes runs callbacks after React unmounts/remounts.
// In those cases its internal `wrapper` / `terms` nodes may be null, but the library doesn’t null-check,
// so it can throw (e.g. calling `querySelectorAll` on null). We defensively guard those calls here.
const patchSwissBioPics = (() => {
  let done = false;

  return () => {
    if (done) {
      return;
    }
    done = true;

    const Base = customElements.get(canonicalName);
    if (!Base?.prototype) {
      return;
    }

    const proto = Base.prototype;

    const safeWrap = (
      fnName: string,
      guard: (...args: unknown[]) => boolean
    ) => {
      const orig = proto[fnName];
      if (typeof orig !== 'function') {
        return;
      }

      proto[fnName] = function patched(this, ...args: unknown[]) {
        // Need this try-catch otherwise SwissBioPics will show
        // "Failed to fetch..." when new ProtNLM2 data is loaded.
        try {
          if (!this.isConnected) {
            return;
          }
          if (!guard(...args)) {
            return;
          }
          return orig.apply(this, args);
        } catch {
          // Just swallow library errors.
          return;
        }
      };
    };

    const deleteCSSRule = (
      shadowRoot: ShadowRoot | null | undefined,
      selectorText: string
    ) => {
      if (!shadowRoot) {
        return;
      }

      for (const styleSheet of Array.from(shadowRoot?.styleSheets || [])) {
        const { cssRules } = styleSheet as CSSStyleSheet;
        for (let i = 0; i < cssRules.length; i += 1) {
          const rule = cssRules[i];
          if (
            rule instanceof CSSStyleRule &&
            rule.selectorText === selectorText
          ) {
            (styleSheet as CSSStyleSheet).deleteRule(i);
            return;
          }
        }
      }
    };

    safeWrap('findAndSort', (e) => Boolean(e));
    safeWrap('addListOfPresentSubcellularLocations', (_sls, wrapper, terms) =>
      Boolean(wrapper && terms)
    );
    safeWrap(
      'addListOfNotPresentSubcellularLocations',
      (_sls, wrapper, terms) => Boolean(wrapper && terms)
    );
    safeWrap('addListOfNotFoundSubcellularLocations', (_sls, wrapper, terms) =>
      Boolean(wrapper && terms)
    );
    safeWrap('addEventHandlers', (wrapper, terms) => Boolean(wrapper && terms));

    // Special-case highLight so we can remove the library's `.lookedAt` shadow CSS.
    const originalHighLight = proto.highLight;
    if (typeof originalHighLight === 'function') {
      proto.highLight = function patchedHighLight(this, ...args: unknown[]) {
        try {
          if (!this.isConnected) {
            return;
          }

          const target = args[1];
          if (!target) {
            return;
          }

          // Remove the `.lookedAt` CSS rule(s) once per instance to avoid default styling.
          if (!this.swissBioPicsRemovedCSSRules) {
            deleteCSSRule(this.shadowRoot, '.lookedAt');
            // Undo hard-coded cytoskeleton rule present in some versions
            deleteCSSRule(this.shadowRoot, '#SL0090 .lookedAt');
            this.swissBioPicsRemovedCSSRules = true;
          }

          return originalHighLight.apply(this, args);
        } catch {
          return;
        }
      };
    }

    safeWrap('removeHiglight', (_e, t) => Boolean(t));
  };
})();

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

const getGoTermSelectors = (locations: SubCellularLocation[] = []) =>
  locations.flatMap(({ id }) => [
    `svg .GO${+id} *:not(text)`,
    `svg .part_GO${+id} *:not(text)`,
  ]);

const getUniProtTermSelectors = (locations: SubCellularLocation[] = []) =>
  locations.flatMap(({ id }) => [
    `svg #SL${id} *:not(text)`,
    `svg .mp_SL${id} *:not(text)`,
  ]);

const getGoIds = (locations: SubCellularLocation[] = []) =>
  locations.map(({ id }) => `GO${+id}`);

const getGoLegendSelectors = (goIds: string[]) =>
  goIds.map((id) => `li.${id}.inpicture`).join(',\n');

const getGoLegendHoverSelectors = (goIds: string[]) =>
  goIds.map((id) => `li.${id}.inpicture.lookedAt`).join(',\n');

// The library highlights SVG shapes, but legend hover styling in our page relies on
// `.lookedAt` being applied to the corresponding legend/text nodes in the light DOM.
const getHighlights = (
  instance: Element | null | undefined,
  image: Element | null | undefined
) => {
  if (!instance || !image) {
    return [];
  }

  const selectors = getGoTermClassNames(image);

  // For UniProt IDs, the library uses "<id>term" anchors
  const id = image.id as string | undefined;
  if (id) {
    selectors.push(`#${id}term`);
  }

  if (!selectors.length) {
    return [];
  }

  return Array.from(instance.querySelectorAll(selectors.join(',')));
};

const attachTooltips = (
  locationGroup: Element,
  instance: Element | null,
  triggerTargetSvgs: NodeListOf<Element & { membrane?: Element }> | undefined,
  partOfShown: boolean
) => {
  if (!triggerTargetSvgs?.length) {
    return null;
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
    return null;
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

  return addTooltip(
    tooltipTarget,
    `${name}<br/>${description}`,
    tooltipTriggerTargets
  );
};

const upsertGlobalStyle = (id: string, cssText: string) => {
  let styleEl = document.getElementById(id) as HTMLStyleElement | null;

  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = id;
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = cssText;

  return () => {
    styleEl?.remove();
  };
};

type Props = RequireExactlyOne<
  {
    taxonId: number;
    uniProtLocations: SubCellularLocation[];
    goLocations: SubCellularLocation[];
  },
  'uniProtLocations' | 'goLocations'
>;

const SubCellViz: FC<React.PropsWithChildren<Props>> = memo(
  ({ uniProtLocations, goLocations, taxonId, children }) => {
    patchSwissBioPics();

    const elRef = useRef<SwissBioPicsEl | null>(null);

    const uniProtLocationIds = uniProtLocations?.map(({ id }) => id).join(',');
    const goLocationIds = goLocations?.map(({ id }) => id).join(',');

    // Force hard remount (so the web component starts clean each time)
    const instanceKey = useMemo(() => {
      const tab = uniProtLocations?.length ? VizTab.UniProt : VizTab.GO;
      return `${tab}|${taxonId}|${uniProtLocationIds ?? ''}|${goLocationIds ?? ''}`;
    }, [taxonId, uniProtLocations?.length, uniProtLocationIds, goLocationIds]);

    // Unique content id per mount (the component moves/removes this node by id)
    const contentId = useMemo(
      () => `swissbiopics-content-${instanceKey.replaceAll('|', '-')}`,
      [instanceKey]
    );

    useEffect(() => {
      const instance = elRef.current;
      const shadowRoot = instance?.shadowRoot as ShadowRoot | undefined;
      if (!shadowRoot) {
        return;
      }

      const uniProtLocationsByReviewedStatus = groupBy(
        uniProtLocations,
        'evidenceType'
      );
      const goLocationsByEvidenceType = groupBy(goLocations, 'evidenceType');

      const unreviewed = [
        ...getUniProtTermSelectors(uniProtLocationsByReviewedStatus.unreviewed),
        ...getGoTermSelectors(goLocationsByEvidenceType.unreviewed),
      ];

      const reviewed = [
        ...getUniProtTermSelectors(uniProtLocationsByReviewedStatus.reviewed),
        ...getGoTermSelectors(goLocationsByEvidenceType.reviewed),
      ];

      const ai = [...getGoTermSelectors(goLocationsByEvidenceType.ai)];
      const aiGoIds = getGoIds(goLocationsByEvidenceType.ai);

      const legendStyleId = `swissbiopics-legend-${instanceKey}`;
      const cleanupLegendStyle = upsertGlobalStyle(
        legendStyleId,
        `
        ${getGoLegendSelectors(aiGoIds)} {
          background-color: color-mix(in srgb, var(--fr--color-purple-mid) 15%, white) !important;
        }
        ${getGoLegendHoverSelectors(aiGoIds)} {
          background-color: color-mix(in srgb, var(--fr--color-purple-mid) 40%, white) !important;
        }
        `
      );

      const cleanupTooltips: Array<ReturnType<typeof attachTooltips>> = [];
      const uniprot = [...unreviewed, ...reviewed];

      const onSvgLoaded = () => {
        const tabsHeaderHeight =
          document.querySelector('.tabs__header')?.clientHeight;
        const pictureTop = tabsHeaderHeight
          ? `${tabsHeaderHeight + 5}px`
          : '4rem';

        // TODO: Update colors as part of https://www.ebi.ac.uk/panda/jira/browse/TRM-26911
        const aiLookedAtSelectors = ai
          .flatMap((s) => [`${s}.lookedAt`, `${s} .lookedAt`])
          .join(',');
        const uniprotLookedAtSelectors = uniprot
          .flatMap((s) => [`${s}.lookedAt`, `${s} .lookedAt`])
          .join(',');

        const css = `
        #fakeContent {
          display: none;
        }

        ${aiLookedAtSelectors} {
          stroke: black !important;
          fill: color-mix(in srgb, var(--fr--color-purple-mid) 90%, white) !important;
          fill-opacity: 1 !important;
        }

        ${uniprotLookedAtSelectors} {
          stroke: black !important;
          fill: color-mix(in srgb, var(--fr--color-sea-blue) 40%, white); !important;
          fill-opacity: 1 !important;
        }

        #swissbiopic > svg {
          width: 100%;
          position: sticky;
          top: ${pictureTop};
        }

        #swissbiopic > h1 {
          font-size: 0;
          font-weight: normal;
        }

        .subcell_name {
          display: none;
        }

        .subcell_description {
          display: none;
        }

        ${unreviewed.join(',')} {
          stroke: black;
          fill-opacity: 1;
          fill: var(--fr--color-unreviewed);
        }

        ${reviewed.join(',')} {
          stroke: black;
          fill-opacity: 1;
          fill: color-mix(in srgb, var(--fr--color-reviewed) 30%, white);
        }

        ${ai.join(',')} {
          stroke: black;
          fill-opacity: 1;
          fill: color-mix(in srgb, var(--fr--color-purple-mid) 15%, white);
        }
        `;

        const style = document.createElement('style');
        // inject more styles
        style.innerText = css;
        shadowRoot?.appendChild(style);

        // add a slot to inject content
        const slot = document.createElement('slot');
        shadowRoot?.querySelector('.terms')?.appendChild(slot);

        // This finds all subcellular location SVGs that will require a tooltip
        const subcellularPresentSVGs =
          shadowRoot?.querySelectorAll(
            'svg .subcell_present, svg [class*="mp_"], svg [class*="part_"]'
          ) || [];

        for (const subcellularPresentSVG of subcellularPresentSVGs) {
          // The text location in the righthand column which in our case will either
          // be of the form \d+term or GO\d+ depending on what props has been provided
          const textSelectors = uniProtLocations?.length
            ? getUniProtTextSelectors(subcellularPresentSVG)
            : getGoTermClassNames(subcellularPresentSVG);

          for (const textSelector of textSelectors) {
            const locationText =
              instance?.querySelector<HTMLElement>(textSelector);
            if (!locationText) {
              continue;
            }

            locationText.classList.add('inpicture');

            const locationSVG = shadowRoot?.querySelector<SVGElement>(
              `#${subcellularPresentSVG.id}`
            );

            // The "image" node to derive highlight selectors from:
            // - GO case: subcellularPresentSVG carries GOxxxx classes
            // - UniProt case: locationSVG id is used to find #<id>term
            const highlightSource =
              (uniProtLocations?.length
                ? locationSVG
                : subcellularPresentSVG) || subcellularPresentSVG;

            locationText.addEventListener('mouseenter', () => {
              instance?.highLight(locationText, locationSVG, shapesSelector);

              // Ensure legend/text nodes get .lookedAt so our global legend CSS works.
              for (const el of getHighlights(instance, highlightSource)) {
                el.classList.add('lookedAt');
              }
            });

            locationText.addEventListener('mouseleave', () => {
              // Remove lookedAt first so the legend hover state drops immediately
              for (const el of getHighlights(instance, highlightSource)) {
                el.classList.remove('lookedAt');
              }

              instance?.removeHiglight(
                locationText,
                locationSVG,
                shapesSelector
              );
            });

            let triggerTargetSvgs: NodeListOf<SVGElement> | undefined =
              subcellularPresentSVG.querySelectorAll(scopedShapesSelector);

            if (!triggerTargetSvgs.length) {
              // If nothing found (as with happens with eg Cell surface) try the parentElement
              triggerTargetSvgs =
                subcellularPresentSVG.parentElement?.querySelectorAll(
                  scopedShapesSelector
                );
            }

            cleanupTooltips.push(
              attachTooltips(
                subcellularPresentSVG,
                instance,
                triggerTargetSvgs,
                false
              )
            );
          }
        }
      };

      shadowRoot?.addEventListener('svgloaded', onSvgLoaded);

      return () => {
        cleanupLegendStyle?.();
        cleanupTooltips.forEach((cleanup) => cleanup?.());
        shadowRoot?.removeEventListener('svgloaded', onSvgLoaded);
      };
    }, [instanceKey, uniProtLocations, goLocations]);

    const locationIds = {
      sls: uniProtLocationIds,
      gos: goLocationIds,
    };

    return (
      <>
        {/** if this is not somewhere in the document, it doesn't add one of its 2
         * custom style tags... */}
        <template id="sibSwissBioPicsStyle" />
        <div id={contentId} />
        {/* Use the canonical element. Force remount with key. */}
        <sib-swissbiopics-sl
          ref={elRef}
          key={instanceKey}
          taxid={taxonId}
          contentid={contentId}
          {...locationIds}
        >
          {children}
        </sib-swissbiopics-sl>
      </>
    );
  }
);

export default SubCellViz;
