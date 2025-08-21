import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIconRaw,
  Loader,
} from 'franklin-sites';
import { Fragment, useCallback, useState } from 'react';
import { SetRequired } from 'type-fest';

import ExternalLink from '../../../shared/components/ExternalLink';
import externalUrls from '../../../shared/config/externalUrls';
import useCustomElement from '../../../shared/hooks/useCustomElement';
import * as logging from '../../../shared/utils/logging';
import {
  CatalyticActivityComment,
  PhysiologicalReaction,
  PhysiologicalReactionDirection,
} from '../../types/commentTypes';
import { RichText } from './FreeTextView';
import { ECNumbersView } from './ProteinNamesView';
import styles from './styles/catalytic-activity-view.module.scss';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

export const getRheaId = (referenceId: string) => {
  const re = /^RHEA:(\d+)$/i;
  const match = referenceId.match(re);
  return match && parseInt(match[1], 10);
};

export const isRheaReactionReference = ({
  database,
  id,
}: {
  database: string;
  id: string;
}) => database === 'Rhea' && !!getRheaId(id);

type RheaReactionVisualizerProps = {
  rheaId: number;
  show: boolean;
};

export const RheaReactionVisualizer = ({
  rheaId,
  show: initialShow,
}: RheaReactionVisualizerProps) => {
  const rheaVisualizerElement = useCustomElement(
    () =>
      import(
        /* webpackChunkName: "rhea-reaction-visualizer" */ '@swissprot/rhea-reaction-viz-test'
      ),
    'rhea-visualizer'
  );

  const [show, setShow] = useState(initialShow);

  const callback = useCallback<React.RefCallback<HTMLElement>>((node): void => {
    if (!node) {
      return;
    }
    const { shadowRoot } = node;
    if (!shadowRoot) {
      return;
    }

    // Inject styles once
    if (!shadowRoot.querySelector('style[data-rhea-overrides]')) {
      const styleElement = document.createElement('style');
      styleElement.setAttribute('data-rhea-overrides', '');
      const externalLinkMask = `url("data:image/svg+xml;utf8,${encodeURIComponent(
        ExternalLinkIconRaw
      )}")`;
      styleElement.textContent = `
      .rhea-reaction-visualizer { border-bottom: 0.1rem solid var(--fr--color-platinum); }
      .name { font-size: 16px; }
      .info { stroke: var(--fr--color-sapphire-blue); }
      .more path { stroke: var(--fr--color-sapphire-blue); }

      .tabs:first-child { border-left: 0.1rem solid var(--fr--color-platinum); }
      .tab {
        border-right: 0.1rem solid var(--fr--color-platinum);
        border-top: 0.1rem solid var(--fr--color-platinum);
        border-radius: 0.2rem 0.2rem 0 0;
        background-color: white;
        color: var(--fr--color-sapphire-blue);
        font-weight: 600;
        margin-right: 0;
        padding: 1rem;
        cursor: pointer;
        user-select: none;
      }
      .tab:hover, .tab:focus {
        background-color: color(from var(--fr--color-pastel-blue) srgb r g b / 0.19);
        box-shadow: inset 0 -0.2rem 0 0 var(--fr--color-sea-blue);
      }
      .tab.selected {
        background-color: color(from var(--fr--color-pastel-blue) srgb r g b / 0.19);
        box-shadow: inset 0 -0.2rem 0 0 var(--fr--color-sea-blue);
        color: var(--fr--color-sapphire-blue);
        font-weight: 600;
      }
      .tabpanel { border: none; border-top: 0.1rem solid var(--fr--color-platinum); }

     

  a.icon_link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--fr--color-sapphire-blue);
    text-decoration: none;
    font-weight: 600;
  }

  a.icon_link:hover,
  a.icon_link:focus { color: #0161a4; }

  /* The icon "mixin": applies to both places */
a.icon_link:not(.no_icon)::after {
    content: '';
    background: currentColor;
    -webkit-mask-image: ${externalLinkMask};
    mask-image: ${externalLinkMask};
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-position: center;
    mask-position: center;
    display: inline-block;
    width: 0.75em;
    height: 0.75em;
    margin: 0 0.5ch;
  }

  .tippy-box a.icon_link { color: white; text-decoration:underline }
    `;
      shadowRoot.appendChild(styleElement);
    }

    // Wrap span + svg in link (if needed) and replace icon
    const adaptRheaLink = (container: Element) => {
      const span = container.querySelector(':scope > span');
      if (!span) {
        return;
      }
      const link = container.querySelector(
        ':scope > a.icon_link'
      ) as HTMLAnchorElement | null;

      let targetLink: HTMLAnchorElement;
      if (!link) {
        return;
      } else if (link.contains(span)) {
        // Already wrapped: keep using it
        targetLink = link;
      } else {
        // Wrap the span (and old svg) with a new link that copies attributes
        targetLink = link.cloneNode(false) as HTMLAnchorElement;
        container.insertBefore(targetLink, span);
        targetLink.appendChild(span);
        link.remove();
      }

      targetLink.target = '_blank';
      // ensure rel includes noopener and noreferrer without duplicating
      const relSet = new Set(
        (targetLink.rel || '').split(/\s+/).filter(Boolean)
      );
      relSet.add('noopener');
      relSet.add('noreferrer');
      targetLink.rel = Array.from(relSet).join(' ');
      targetLink.querySelector(':scope > svg')?.remove();
    };

    const adaptTippyContent = (root: ShadowRoot) => {
      const links = root.querySelectorAll('.tippy-box .tippy-content a[href]');
      links.forEach((a) => {
        if (a.textContent === 'Search proteins') {
          // Don't have external link icon for UniProt links
          a.classList.add('no_icon');
        }
        a.classList.add('icon_link');
        a.setAttribute('target', '_blank');
        const rel = new Set(
          (a.getAttribute('rel') || '').split(/\s+/).filter(Boolean)
        );
        rel.add('noopener');
        rel.add('noreferrer');
        a.setAttribute('rel', Array.from(rel).join(' '));
      });
    };

    const adaptAll = () => {
      shadowRoot
        .querySelectorAll('.rhea-reaction-source')
        .forEach(adaptRheaLink);

      adaptTippyContent(shadowRoot);
    };

    // Initial pass
    adaptAll();

    // Observe future shadow re-renders
    const mo = new MutationObserver(adaptAll);
    mo.observe(shadowRoot, { childList: true, subtree: true });

    // TODO: add clean up
  }, []);

  if (rheaVisualizerElement.errored) {
    // It's fine, just don't display anything
    return null;
  }

  return (
    <>
      <div className={styles['rhea-reaction-visualizer__toggle']}>
        <button
          type="button"
          className="button tertiary"
          onClick={() => setShow(!show)}
        >
          {`${show ? 'Hide' : 'View'} reaction and atom map`}
        </button>
        {show ? <ChevronUpIcon width="1ch" /> : <ChevronDownIcon width="1ch" />}
      </div>
      {show &&
        (rheaVisualizerElement.defined ? (
          <rheaVisualizerElement.name
            rheaid={rheaId}
            showIds
            ref={callback}
            usehost="https://api.rhea-db.org"
          />
        ) : (
          <Loader />
        ))}
    </>
  );
};

const physiologicalReactionDirectionToString = new Map<
  PhysiologicalReactionDirection,
  string
>([
  ['left-to-right', 'forward'],
  ['right-to-left', 'backward'],
]);

export type ReactionDirectionProps = {
  physiologicalReactions: PhysiologicalReaction[];
  noEvidence?: boolean;
};

export const ReactionDirection = ({
  physiologicalReactions,
  noEvidence,
}: ReactionDirectionProps) => {
  /*
  Possible output:
    1. This reaction proceeds in the backward direction <Evidence>
    2. This reaction proceeds in the forward direction <Evidence>
    3. This reaction proceeds in the forward <Evidence> and the backward <Evidence> directions.
  */
  if (!physiologicalReactions || physiologicalReactions.length === 0) {
    return null;
  }
  if (physiologicalReactions.length > 2) {
    logging.error(
      'More than two physiological reactions encountered when rendering catalytic activity'
    );
    return null;
  }
  return (
    <div>
      {`This reaction proceeds in `}
      {physiologicalReactions
        // Ensure that left-to-right/forward comes before right-to-left/backward
        .sort((a, b) => a.directionType.localeCompare(b.directionType))
        .map(({ reactionCrossReference, directionType, evidences }, index) => (
          <Fragment key={reactionCrossReference.id}>
            {index > 0 && ' and '}
            {`the `}
            <span data-testid="direction-text">
              {physiologicalReactionDirectionToString.get(directionType)}
            </span>
            {physiologicalReactions.length === 1 && ' direction.'}
            {!noEvidence && <UniProtKBEvidenceTag evidences={evidences} />}
            {physiologicalReactions.length === 2 &&
              index === 1 &&
              ' directions.'}
          </Fragment>
        ))}
    </div>
  );
};

type CatalyticActivityProps = {
  comments?: CatalyticActivityComment[];
  title?: string;
  defaultHideAllReactions?: boolean;
  noEvidence?: boolean;
};

const CatalyticActivityView = ({
  comments,
  title,
  defaultHideAllReactions = false,
  noEvidence,
}: CatalyticActivityProps) => {
  if (!comments?.length) {
    return null;
  }
  let firstRheaId: number;
  return (
    <div className={styles['catalytic-activity']}>
      {title && <h3 data-article-id="catalytic_activity">{title}</h3>}
      {comments
        .filter(
          (
            comment
          ): comment is SetRequired<CatalyticActivityComment, 'reaction'> =>
            Boolean(comment.reaction)
        )
        .map(({ molecule, reaction, physiologicalReactions }) => {
          // Using only the first rhea reaction reference because FW has assured us that
          // there will be either 0 or 1 types of this reference (ie never > 1)

          const rheaReactionReference =
            reaction.reactionCrossReferences &&
            reaction.reactionCrossReferences.find(isRheaReactionReference);
          const rheaId =
            rheaReactionReference && getRheaId(rheaReactionReference.id);
          if (rheaId && !firstRheaId) {
            firstRheaId = rheaId;
          }
          return (
            <div className={styles['rhea-entry']} key={rheaId}>
              <h4>
                {rheaId ? (
                  <ExternalLink url={externalUrls.RheaEntry(rheaId)}>
                    Rhea {rheaId}
                  </ExternalLink>
                ) : (
                  ''
                )}
              </h4>

              {molecule && (
                <h4 className="tiny">
                  {noEvidence ? (
                    `${molecule}`
                  ) : (
                    <a href={`#${molecule.replaceAll(' ', '_')}`}>{molecule}</a>
                  )}
                </h4>
              )}
              <RichText>{reaction.name}</RichText>
              {!noEvidence && (
                <UniProtKBEvidenceTag evidences={reaction.evidences} />
              )}
              {physiologicalReactions && physiologicalReactions.length && (
                <ReactionDirection
                  physiologicalReactions={physiologicalReactions}
                  noEvidence={noEvidence}
                />
              )}
              {reaction.ecNumber && (
                <div>
                  <ECNumbersView ecNumbers={[{ value: reaction.ecNumber }]} />
                </div>
              )}
              {!!rheaId && (
                <RheaReactionVisualizer
                  rheaId={rheaId}
                  show={
                    defaultHideAllReactions ? false : rheaId === firstRheaId
                  }
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default CatalyticActivityView;
