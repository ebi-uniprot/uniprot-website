import { Fragment, useState, useCallback, useRef, FC } from 'react';
import { Link } from 'react-router-dom';
import {
  useModal,
  ModalBackdrop,
  Window,
  Loader,
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
  ExternalLink,
} from 'franklin-sites';
import '@swissprot/rhea-reaction-visualizer';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import { Location, LocationToPath } from '../../../app/config/urls';
import externalUrls from '../../../shared/config/externalUrls';

import {
  CatalyticActivityComment,
  PhysiologicalReactionDirection,
  PhysiologicalReaction,
} from '../../types/commentTypes';

import helper from '../../../shared/styles/helper.module.scss';
import './styles/catalytic-activity-view.scss';
import * as logging from '../../../shared/utils/logging';

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
} | null;

export const ZoomModalContent: FC<ChebiImageData> = ({ chebi, imgURL }) => {
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

export const RheaReactionVisualizer: FC<RheaReactionVisualizerProps> = ({
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
    <>
      <div className="rhea-reaction-visualizer__toggle">
        {show ? <ChevronUpIcon width="1ch" /> : <ChevronDownIcon width="1ch" />}
        <button
          type="button"
          className="button tertiary"
          onClick={() => setShow(!show)}
        >
          {`${show ? 'Hide' : 'View'} Rhea reaction`}
        </button>
      </div>
      {show && (
        <>
          <div className="rhea-reaction-visualizer__component">
            <rhea-reaction
              rheaid={rheaId}
              showIds
              zoom
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
        </>
      )}
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
};

export const ReactionDirection: FC<ReactionDirectionProps> = ({
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
    logging.error(
      'More than two physiological reactions encountered when rendering catalytic activity'
    );
    return null;
  }
  return (
    <>
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
    </>
  );
};

type CatalyticActivityProps = {
  comments?: CatalyticActivityComment[];
  title?: string;
};

const CatalyticActivityView: FC<CatalyticActivityProps> = ({
  comments,
  title,
}) => {
  if (!comments || !comments.length) {
    return null;
  }
  let firstRheaId: number;
  return (
    <>
      {title && <h3 className={helper.capitalize}>{title}</h3>}
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
          <span className="text-block" key={reaction.name}>
            {` ${reaction.name}`}
            {reaction.evidences && (
              <UniProtKBEvidenceTag evidences={reaction.evidences} />
            )}
            {physiologicalReactions && physiologicalReactions.length && (
              <ReactionDirection
                physiologicalReactions={physiologicalReactions}
              />
            )}

            {reaction.ecNumber && (
              <div>
                <span className="ec-number">EC: {reaction.ecNumber}</span>
                {' ( '}
                <Link
                  to={{
                    pathname: LocationToPath[Location.UniProtKBResults],
                    search: `query=(ec:${reaction.ecNumber})`,
                  }}
                >
                  UniProtKB <SearchIcon width="1.333ch" />
                </Link>
                {' | '}
                <ExternalLink url={externalUrls.ENZYME(reaction.ecNumber)}>
                  ENZYME
                </ExternalLink>
                {'| '}
                <ExternalLink url={externalUrls.RheaSearch(reaction.ecNumber)}>
                  Rhea
                </ExternalLink>
                )
              </div>
            )}
            {!!rheaId && (
              <>
                <div>
                  <strong>Source: </strong>
                  <ExternalLink url={externalUrls.RheaEntry(rheaId)}>
                    Rhea {rheaId}
                  </ExternalLink>
                </div>
                <RheaReactionVisualizer
                  rheaId={rheaId}
                  show={rheaId === firstRheaId}
                />
              </>
            )}
          </span>
        );
      })}
    </>
  );
};

export default CatalyticActivityView;
