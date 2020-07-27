/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, useCallback, useState, useEffect } from 'react';
import ProtvistaTrack from 'protvista-track';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaMSA from 'protvista-msa';
import ProtvistaManager from 'protvista-manager';
import { Loader, DropdownButton, CloseIcon } from 'franklin-sites';
import { uniq } from 'lodash-es';
import { Link } from 'react-router-dom';
import SlidingPanel from '../../../../shared/components/layouts/SlidingPanel';
import { BlastHsp } from '../../types/blastResults';
import { loadWebComponent } from '../../../../shared/utils/utils';
import useDataApi from '../../../../shared/hooks/useDataApi';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import apiUrls from '../../../../uniprotkb/config/apiUrls';
import FeatureType from '../../../../uniprotkb/types/featureType';
import { processFeaturesData } from '../../../../uniprotkb/components/protein-data-views/FeaturesView';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import {
  MsaColorScheme,
  msaColorSchemeToString,
} from '../../../config/msaColorSchemes';
import { findSequenceSegments } from '../../../utils';
import './styles/HSPDetailPanel.scss';

loadWebComponent('protvista-navigation', ProtvistaNavigation);
loadWebComponent('protvista-track', ProtvistaTrack);
loadWebComponent('protvista-msa', ProtvistaMSA);
loadWebComponent('protvista-manager', ProtvistaManager);

type UniProtkbAccessionsAPI = {
  results: UniProtkbAPIModel[];
};

export type HSPDetailPanelProps = {
  hsp: BlastHsp;
  hitAccession: string;
  onClose: () => void;
  hitLength: number;
  queryLength: number;
};

const HSPDetailPanel: FC<HSPDetailPanelProps> = ({
  hsp,
  hitAccession,
  onClose,
  hitLength,
  queryLength,
}) => {
  const {
    hsp_align_len,
    hsp_query_from,
    hsp_qseq,
    hsp_hit_from,
    hsp_hseq,
    hsp_identity,
  } = hsp;
  // TODO calculate actual length based on total match and query lengths
  const [highlightPosition, setHighlighPosition] = useState('');
  const [annotation, setAnnotation] = useState<FeatureType>();
  const [highlightProperty, setHighlightProperty] = useState<MsaColorScheme>();
  const [initialDisplayEnd, setInitialDisplayEnd] = useState<
    number | undefined
  >();
  const tracksOffset = Math.abs(hsp_hit_from - hsp_query_from);

  useEffect(() => {
    setHighlighPosition('0:0');
  }, [hsp_hit_from, hsp_query_from]);

  const setQueryTrackData = useCallback(
    (node): void => {
      if (node) {
        const seqSegments = findSequenceSegments(hsp_qseq);
        const opacity = hsp_identity / 100;

        const blockSegments = seqSegments.map(([start, end]) => ({
          start: start + tracksOffset,
          end: end + tracksOffset,
          // franklin $colour-sapphire-blue
          color: '#014371',
          opacity,
        }));

        const lineSegments = [
          {
            start: tracksOffset + 1,
            end: hsp_query_from + 1,
            shape: 'line',
            color: '#014371',
            opacity,
          },
          {
            start: blockSegments[blockSegments.length - 1].end + 1,
            end: queryLength + tracksOffset,
            shape: 'line',
            color: '#014371',
            opacity,
          },
        ];

        // eslint-disable-next-line no-param-reassign
        node.data = [...lineSegments, ...blockSegments];
      }
    },
    [hsp_query_from, hsp_identity, hsp_qseq, queryLength, tracksOffset]
  );

  const setMatchTrackData = useCallback(
    (node): void => {
      if (node) {
        const seqSegments = findSequenceSegments(hsp_hseq);
        const opacity = hsp_identity / 100;

        const blockSegments = seqSegments.map(([start, end]) => ({
          start: start + tracksOffset,
          end: end + tracksOffset,
          // franklin $colour-sapphire-blue
          color: '#014371',
          opacity,
        }));

        const lineSegments = [
          {
            start: 1,
            end: tracksOffset,
            shape: 'line',
            color: '#014371',
            opacity,
          },
          {
            start: blockSegments[blockSegments.length - 1].end + 1,
            end: hitLength,
            shape: 'line',
            color: '#014371',
            opacity,
          },
        ];

        // eslint-disable-next-line no-param-reassign
        node.data = [...lineSegments, ...blockSegments];
      }
    },
    [hsp_identity, hitLength, hsp_hseq, tracksOffset]
  );

  const setMSAAttributes = useCallback(
    (node): void => {
      if (!node) {
        return;
      }
      setInitialDisplayEnd(hsp_align_len / (15 / node.getSingleBaseWidth()));
      node.data = [
        {
          name: 'Query',
          sequence: hsp_qseq,
        },
        {
          name: 'Match',
          sequence: hsp_hseq,
        },
      ];
    },
    [hsp_qseq, hsp_hseq, hsp_align_len]
  );

  const { loading, data, status, error } = useDataApi<UniProtkbAccessionsAPI>(
    apiUrls.entries([hitAccession])
  );

  const features = data?.results?.[0]?.features;
  const recommendedName =
    data?.results?.[0]?.proteinDescription?.recommendedName?.fullName.value;
  const organism = data?.results?.[0]?.organism?.scientificName;

  const title = [hitAccession, recommendedName, organism]
    .filter(Boolean)
    .join(' · ');

  const annotationChoices = uniq(features?.map(({ type }) => type));
  if (!annotation && !!annotationChoices?.length) {
    setAnnotation(annotationChoices[0]);
  }

  const setFeatureTrackData = useCallback(
    (node): void => {
      if (node && features && annotation) {
        const processedFeatures = processFeaturesData(
          features.filter(({ type }) => type === annotation)
        );
        node.data = processedFeatures;
      }
    },
    [features, annotation]
  );

  type EventDetail = {
    displaystart: string;
    displayend: string;
  };

  const findHighlighPositions = useCallback(
    ({ displaystart, displayend }: EventDetail) => {
      const start = tracksOffset + parseInt(displaystart, 10);
      const end = tracksOffset + parseInt(displayend, 10);
      setHighlighPosition(`${start}:${end}`);
    },
    [tracksOffset]
  );

  const managerRef = useCallback(
    (node): void => {
      if (node && initialDisplayEnd) {
        node.addEventListener('change', ({ detail }: { detail: EventDetail }) =>
          findHighlighPositions(detail)
        );
        node.setAttribute('displaystart', 1);
        node.setAttribute('displayend', initialDisplayEnd);
        setHighlighPosition(
          `${tracksOffset + 1}:${tracksOffset + initialDisplayEnd}`
        );
      }
    },
    [initialDisplayEnd, findHighlighPositions, tracksOffset]
  );

  if (error) {
    return <ErrorHandler status={status} />;
  }

  if (loading) {
    return <Loader />;
  }
  const conservationOptions =
    highlightProperty === MsaColorScheme.CONSERVATION
      ? {
          'calculate-conservation': true,
          'overlay-conservation': true,
        }
      : {};
  return (
    <SlidingPanel position="bottom" className="hsp-detail-panel">
      <div className="hsp-detail-panel__header">
        <h4>{title}</h4>
        <button type="button" onClick={onClose}>
          <CloseIcon width="16" height="16" />
        </button>
      </div>

      <div className="button-group">
        <DropdownButton label="Highlight properties" className="tertiary">
          {(setShowMenu: (showMenu: boolean) => void) => (
            <div className="dropdown-menu__content">
              <ul>
                {Object.entries(msaColorSchemeToString).map(
                  ([schemeValue, schemeString]) => (
                    // TODO: indicate currently selected
                    <li key={schemeString}>
                      <button
                        type="button"
                        onClick={() => {
                          setShowMenu(false);
                          setHighlightProperty(schemeValue as MsaColorScheme);
                        }}
                      >
                        {schemeString}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </DropdownButton>
        {!!annotationChoices?.length && (
          <DropdownButton label="Show annotation" className="tertiary">
            {(setShowMenu: (showMenu: boolean) => void) => (
              <div className="dropdown-menu__content">
                <ul>
                  {annotationChoices.map((annotationChoice) => (
                    // TODO: indicate currently selected
                    <li key={annotationChoice}>
                      <button
                        type="button"
                        className="annotation-choice"
                        onClick={() => {
                          setShowMenu(false);
                          setAnnotation(annotationChoice);
                        }}
                      >
                        {annotationChoice}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </DropdownButton>
        )}
        <DropdownButton label="View" className="tertiary">
          <div className="dropdown-menu__content">
            <ul>
              <li key="overview">Overview</li>
              <li key="wrapped">Wrapped</li>
            </ul>
          </div>
        </DropdownButton>
      </div>
      <section className="hsp-detail-panel__visualisation">
        <section className="hsp-label">Alignment</section>
        <protvista-manager
          ref={managerRef}
          attributes="displaystart displayend"
        >
          <protvista-navigation length={hsp_align_len} />
          <protvista-msa
            ref={setMSAAttributes}
            length={hsp_align_len}
            colorscheme={highlightProperty}
            {...conservationOptions}
          />
        </protvista-manager>
        {/* 
          TODO listen to "highlight" event from block above and set on these 2 tracks,
          working as protvista-manager
          */}
        {/* Query track */}
        <section className="hsp-label">Query</section>
        <protvista-track
          height="30"
          ref={setQueryTrackData}
          length={hitLength}
          layout="overlapping"
          highlight={highlightPosition}
        />
        {/* Match track - to colour based on score, see BlastSummaryTrack in BlastResultTable */}
        <section className="hsp-label">
          <Link to={`/uniprotkb/${hitAccession}`}>{hitAccession}</Link>
        </section>
        <protvista-track
          height="30"
          ref={setMatchTrackData}
          length={hitLength}
          layout="overlapping"
          highlight={highlightPosition}
        />
        <section className="hsp-label">{annotation}</section>
        <protvista-track
          // height="10"
          ref={setFeatureTrackData}
          length={hitLength}
          layout="non-overlapping"
          highlight={highlightPosition}
        />
      </section>
    </SlidingPanel>
  );
};

export default HSPDetailPanel;
