import React, { Fragment, useState, useCallback } from 'react';
import '@swissprot/rhea-reaction-visualizer';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import {
  CatalyticActivityComment,
  PhysiologicalReactionDirection,
  PhysiologicalReaction,
} from '../../../model/types/CommentTypes';
import './styles/CatalyticActivityView.scss';

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

export const RheaReactionVisualizer: React.FC<RheaReactionVisualizerProps> = ({
  rheaId,
  show: initialShow,
}) => {
  const [show, setShow] = useState(initialShow);

  const callback = useCallback((node): void => {
    if (node) {
      node.addEventListener(
        'zoomClicked',
        ({ detail }: { detail: { chebi: string; imgURL: string } }) =>
          // eslint-disable-next-line no-console
          console.log('zoomClicked:', detail)
      );
    }
  }, []);

  return (
    <Fragment>
      <button
        type="button"
        className="button tertiary rhea-reaction-visualizer__button"
        onClick={() => setShow(!show)}
      >
        {`${show ? 'Hide' : 'View'} Rhea reaction`}
      </button>
      {show && (
        <div className="rhea-reaction-visualizer__component">
          <rhea-reaction rheaid={rheaId} zoom showids ref={callback} />
        </div>
      )}
    </Fragment>
  );
};

export const physiologicalReactionDirectionToString = new Map<
  PhysiologicalReactionDirection,
  string
>([
  [PhysiologicalReactionDirection.LeftToRight, 'forward'],
  [PhysiologicalReactionDirection.RightToLeft, 'backward'],
]);

export type ReactionDirectionProps = {
  physiologicalReactions: PhysiologicalReaction[];
};

export const ReactionDirection: React.FC<ReactionDirectionProps> = ({
  physiologicalReactions,
}) => {
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
    // eslint-disable-next-line no-console
    console.error(
      'More than two physiological reactions encountered when rendering catalytic activity'
    );
    return null;
  }
  return (
    <Fragment>
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
            {physiologicalReactions.length === 1 && ' direction '}
            <UniProtEvidenceTag evidences={evidences} />
            {physiologicalReactions.length === 2 &&
              index === 1 &&
              ' directions '}
          </Fragment>
        ))}
    </Fragment>
  );
};

type CatalyticActivityProps = {
  comments?: CatalyticActivityComment[];
  title?: string;
};

const CatalyticActivityView: React.FC<CatalyticActivityProps> = ({
  comments,
  title,
}) => {
  if (!comments || comments.length <= 0) {
    return null;
  }
  let firstRheaId: number | null = null;
  return (
    <Fragment>
      {title && <h3>{title}</h3>}
      {comments.map(({ reaction, physiologicalReactions }) => {
        if (!reaction) {
          return null;
        }
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
          <span className="text-block" key={reaction.ecNumber}>
            <strong>{reaction.ecNumber}</strong>
            {/* Need a link to search for EC in UniProtKB:
             https://www.ebi.ac.uk/panda/jira/browse/TRM-23597 */}
            {` ${reaction.name}`}
            {reaction.evidences && (
              <UniProtEvidenceTag evidences={reaction.evidences} />
            )}
            {physiologicalReactions && physiologicalReactions.length && (
              <ReactionDirection
                physiologicalReactions={physiologicalReactions}
              />
            )}
            {!!rheaId && (
              <RheaReactionVisualizer
                rheaId={rheaId}
                show={rheaId === firstRheaId}
              />
            )}
          </span>
        );
      })}
    </Fragment>
  );
};

export default CatalyticActivityView;
