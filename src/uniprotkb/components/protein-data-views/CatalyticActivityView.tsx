import React, { Fragment, useState, useCallback, useRef } from 'react';
import '@swissprot/rhea-reaction-visualizer';
import { useModal, ModalBackdrop, Window, Loader } from 'franklin-sites';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import {
  CatalyticActivityComment,
  PhysiologicalReactionDirection,
  PhysiologicalReaction,
} from '../../types/commentTypes';
import './styles/catalytic-activity-view.scss';

// example accession to view this component: P31937

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

export const ZoomModalContent: React.FC<ChebiImageData> = ({
  chebi,
  imgURL,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState(true);
  const image = new Image();
  image.src = imgURL;
  image.onload = () => {
    if (imageRef && imageRef.current) {
      imageRef.current.src = image.src;
      setLoading(false);
    }
  };
  return (
    <div className="zoom-image-container">
      <img
        ref={imageRef}
        alt={chebi}
        style={{ display: loading ? 'none' : 'block' }}
      />
      {loading && <Loader />}
    </div>
  );
};

type RheaReactionVisualizerProps = {
  rheaId: number;
  show: boolean;
};

type ChebiImageData = {
  chebi: string;
  imgURL: string;
} | null;

export const RheaReactionVisualizer: React.FC<RheaReactionVisualizerProps> = ({
  rheaId,
  show: initialShow,
}) => {
  const [show, setShow] = useState(initialShow);
  const [zoomImageData, setZoomImageData] = useState<ChebiImageData>();
  const { displayModal, setDisplayModal, Modal } = useModal(
    ModalBackdrop,
    Window
  );
  const callback = useCallback(
    (node): void => {
      if (node) {
        node.addEventListener(
          'zoomClicked',
          ({ detail }: { detail: ChebiImageData }) => {
            setZoomImageData(detail);
            setDisplayModal(true);
          }
        );
      }
    },
    [setDisplayModal]
  );

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
        <Fragment>
          <div className="rhea-reaction-visualizer__component">
            <rhea-reaction
              rheaid={rheaId}
              zoom
              showids
              ref={callback}
              usehost="https://api.rhea-db.org"
            />
          </div>
          {displayModal && zoomImageData && zoomImageData.imgURL && (
            <Modal
              handleExitModal={() => setDisplayModal(false)}
              height="30vh"
              width="30vw"
            >
              <ZoomModalContent
                chebi={zoomImageData.chebi}
                imgURL={zoomImageData.imgURL}
              />
            </Modal>
          )}
        </Fragment>
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
            <UniProtKBEvidenceTag evidences={evidences} />
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
              <UniProtKBEvidenceTag evidences={reaction.evidences} />
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
