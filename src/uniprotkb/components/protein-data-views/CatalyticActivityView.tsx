import { ChevronDownIcon, ChevronUpIcon, Loader } from 'franklin-sites';
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

// example accessions to view this component: P31937, P0A879

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

type ChebiImageData = {
  chebi: string;
  imgURL: string;
};

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
    if (node) {
      node.addEventListener(
        'zoomClicked',
        ({ detail }: { detail: ChebiImageData }) => {
          setZoomImageData(detail);
          setDisplayModal(true);
        }
      );
      if (!node.shadowRoot) {
        return;
      }
      const styleElement = document.createElement('style');
      styleElement.textContent = `
          .rhea-reaction-visualizer {
            border-bottom: 0.1rem solid var(--fr--color-platinum);
          }

          .name {
            font-size: 16px;
          }

          .info {
            stroke: var(--fr--color-sapphire-blue);
          }

          .more path {
            stroke: var(--fr--color-sapphire-blue);
          }

          .tabs:first-child {
            border-left: 0.1rem solid var(--fr--color-platinum);
          }

          .tab {
            border-right: 0.1rem solid var(--fr--color-platinum);
            border-top: 0.1rem solid var(--fr--color-platinum);
            border-radius: 0.2rem 0.2rem 0 0;
            background-color: white;
            color: var(--fr--color-sapphire-blue);
            font-weight: 600;
            margin-right: 0px;
            padding: 1rem;
            cursor: pointer;
            user-select: none;
          }

          .tab:hover,
          .tab:focus {
            background-color: color(from var(--fr--color-pastel-blue) srgb r g b / 0.19);
            box-shadow: inset 0 -0.2rem 0 0 var(--fr--color-sea-blue);
          }

          .tab.selected {
            background-color: color(from var(--fr--color-pastel-blue) srgb r g b / 0.19);
            box-shadow: inset 0 -0.2rem 0 0 var(--fr--color-sea-blue);
            color: var(--fr--color-sapphire-blue);
            font-weight: 600;
          }

          .tabpanel {
            border: none;
            border-top: 0.1rem solid var(--fr--color-platinum);
          }
        `;
      node.shadowRoot.appendChild(styleElement);
    }
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
