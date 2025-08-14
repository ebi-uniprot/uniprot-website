import {
  ChevronDownIcon,
  ChevronUpIcon,
  Loader,
  ModalBackdrop,
  Tab,
  Tabs,
  useModal,
  Window,
} from 'franklin-sites';
import { Fragment, useCallback, useRef, useState } from 'react';
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

export const ZoomModalContent = ({ chebi, imgURL }: ChebiImageData) => {
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
    <div className={styles['zoom-image-container']}>
      <img
        ref={imageRef}
        alt={chebi}
        style={{ display: loading ? 'none' : 'block' }}
      />
      {loading && <Loader />}
    </div>
  );
};

type ZoomClickedEvent = { detail: ChebiImageData };

type RheaReactionVisualizerProps = {
  rheaId: number;
  show: boolean;
};

export const RheaReactionVisualizer = ({
  rheaId,
  show: initialShow,
}: RheaReactionVisualizerProps) => {
  const rheaReactionElement = useCustomElement(
    () =>
      import(
        /* webpackChunkName: "rhea-reaction-visualizer" */ '@swissprot/rhea-reaction-viz-test'
      ),
    'rhea-reaction'
  );
  const rheaAtommapElement = useCustomElement(
    () =>
      import(
        /* webpackChunkName: "rhea-reaction-visualizer" */ '@swissprot/rhea-reaction-viz-test'
      ),
    'rhea-atommap'
  );
  const [show, setShow] = useState(initialShow);
  const [zoomImageData, setZoomImageData] = useState<ChebiImageData>();
  const { displayModal, setDisplayModal, Modal } = useModal(
    ModalBackdrop,
    Window
  );
  const callback = useCallback(
    (node: {
      addEventListener: (
        name: string,
        event: ({ detail }: ZoomClickedEvent) => void
      ) => void;
    }): void => {
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

  if (rheaReactionElement.errored || rheaAtommapElement.errored) {
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
      {show && (
        <Tabs className={styles['rhea-reaction-visualizer__tabs']} bordered>
          <Tab title="Reaction">
            {rheaReactionElement.defined ? (
              <>
                <div className={styles['rhea-reaction-visualizer__component']}>
                  <rheaReactionElement.name
                    rheaid={rheaId}
                    showIds
                    zoom
                    ref={callback}
                    usehost="https://api.rhea-db.org"
                  />
                </div>
                {displayModal && zoomImageData?.imgURL && (
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
            ) : (
              <Loader />
            )}
          </Tab>
          <Tab title="Atom map">
            {rheaAtommapElement.defined ? (
              <rheaAtommapElement.name
                rheaid={rheaId}
                nosource
                usehost="https://www.rhea-db.org"
                imagehost="https://www.rhea-db.org"
              />
            ) : (
              <Loader />
            )}
          </Tab>
        </Tabs>
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
