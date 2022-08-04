import { useMemo, Fragment, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { v1 } from 'uuid';
import { Button } from 'franklin-sites';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import FeaturesView, {
  LocationModifier,
  ProcessedFeature,
} from '../../../shared/components/views/FeaturesView';
import { RichText } from './FreeTextView';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import ExternalLink from '../../../shared/components/ExternalLink';

import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';

import listFormat from '../../../shared/utils/listFormat';
import {
  getEntryPath,
  getURLToJobWithData,
  LocationToPath,
  Location,
} from '../../../app/config/urls';
import externalUrls from '../../../shared/config/externalUrls';

import { Evidence } from '../../types/modelTypes';
import FeatureType from '../../types/featureType';
import { Xref } from '../../../shared/types/apiModel';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import { Namespace } from '../../../shared/types/namespaces';

type FeatureLocation = {
  value: number;
  modifier: LocationModifier;
};

export type FeatureData = {
  type: FeatureType;
  featureId?: string;
  description?: string; // Sometimes you do have an empty string though
  location: {
    start: FeatureLocation;
    end: FeatureLocation;
    sequence?: string;
  };
  alternativeSequence?: {
    originalSequence?: string;
    alternativeSequences?: string[];
  };
  evidences?: Evidence[];
  featureCrossReferences?: Xref[];
  ligand?: Ligand;
  ligandPart?: LigandPart;
}[];

// For Ligand and LigandPart context refer to https://github.com/ebi-uniprot/uniprot-manual/blob/main/release-notes/2022-08-03-release.md#structuring-of-binding-site-annotations

export type Ligand = {
  name: string;
  id?: string;
  label?: string;
  note?: string;
};

// Example: O14744
export type LigandPart = {
  name?: string;
  id?: string;
  label?: string;
  note?: string;
};

export type ProtvistaFeature = {
  type: string;
  description: ReactNode;
  evidences: Evidence[];
  start: number;
  end: number;
  startModifier: LocationModifier;
  endModifier: LocationModifier;
};

type FeatureProps = {
  primaryAccession: string;
  sequence?: string;
  features: FeatureData;
  withTitle?: boolean;
  withDataTable?: boolean;
};

const Ligand = ({ ligand }: { ligand: Ligand | LigandPart }) => {
  const id = ligand.id?.replace('ChEBI:', '');
  return (
    <>
      <RichText>{ligand.name}</RichText>
      {id && (
        <>
          {' ('}
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              search: `query=ft_binding:"${id}"`,
            }}
          >
            UniProtKB
          </Link>
          {' | '}
          <ExternalLink url={externalUrls.ChEBI(id)}>ChEBI</ExternalLink>
          {') '}
        </>
      )}
      <RichText>{ligand?.note}</RichText>
    </>
  );
};

export const processFeaturesData = (
  data: FeatureData,
  sequence?: string
): ProcessedFeature[] =>
  data.map((feature): ProcessedFeature => {
    let s: string | undefined;
    let description: ReactNode = feature.description || '';
    if (feature.alternativeSequence) {
      if (
        feature.alternativeSequence.originalSequence &&
        feature.alternativeSequence.alternativeSequences
      ) {
        s = feature.alternativeSequence.originalSequence;
        if (feature.alternativeSequence.alternativeSequences?.length) {
          s += ` → ${feature.alternativeSequence.alternativeSequences
            .map(
              (alternative, index, array) =>
                `${listFormat(index, array, 'or')}${alternative}`
            )
            .join('')}`;
        }
      } else {
        s = 'Missing';
      }
    } else if (feature.location.sequence) {
      description = `In isoform ${feature.location.sequence}; ${description}`;
    } else {
      s = sequence?.substring(
        feature.location.start.value - 1,
        feature.location.end.value
      );
    }

    if (feature.ligand || feature.ligandPart) {
      description = [feature.ligand, feature.ligandPart]
        .filter((l): l is Ligand | LigandPart => Boolean(l))
        // eslint-disable-next-line react/no-array-index-key
        .map<ReactNode>((l, i) => <Ligand ligand={l} key={i} />)
        .reduce((prev, curr) => [prev, '; ', curr]);
    }

    return {
      protvistaFeatureId: feature.featureId || v1(),
      featureId: feature.featureId,
      start: feature.location.start.value,
      end: feature.location.end.value,
      startModifier: feature.location.start.modifier,
      endModifier: feature.location.end.modifier,
      type: feature.type,
      description,
      evidences: feature.evidences,
      sequence: s,
    };
  });

const UniProtKBFeaturesView = ({
  primaryAccession,
  sequence,
  features,
  withTitle = true,
  withDataTable = true,
}: FeatureProps) => {
  const processedData = useMemo(
    () => processFeaturesData(features, sequence),
    [features, sequence]
  );

  const smallScreen = useSmallScreen();

  if (processedData.length === 0) {
    return null;
  }

  processedData.sort((a, b) =>
    a.start === b.start ? a.end - b.end : a.start - b.start
  );

  const table = (
    <table className={classNames(!withDataTable && 'data-table--compact')}>
      <thead>
        <tr>
          <th data-filter="type">Type</th>
          <th>ID</th>
          <th>Position(s)</th>
          <th>Description</th>
          {smallScreen ? null : (
            <th>
              {/* Intentionally left blank, corresponds to tools/basket */}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {processedData.map((feature) => {
          const start =
            feature.startModifier === 'UNKNOWN' ? '?' : feature.start;
          const end = feature.endModifier === 'UNKNOWN' ? '?' : feature.end;
          const positionStart = `${
            feature.startModifier === 'UNSURE' ? '?' : ''
          }${start}`;
          const positionEnd = `${
            feature.endModifier === 'UNSURE' ? '?' : ''
          }${end}`;
          const position =
            positionStart === positionEnd
              ? positionStart
              : `${positionStart}-${positionEnd}`;

          let { description } = feature;
          if (typeof feature.description === 'string') {
            const isoform = feature.description.match(
              /isoform\s([A-Z0-9]+-\d+)/i
            )?.[1];
            if (isoform) {
              description = feature.description
                ?.split(new RegExp(`(${isoform})`))
                .map((part) => {
                  if (part === isoform) {
                    return (
                      <Link
                        key={part}
                        to={getEntryPath(Namespace.uniprotkb, part)}
                      >
                        {part}
                      </Link>
                    );
                  }
                  return <RichText key={part}>{part}</RichText>;
                });
            } else {
              description = <RichText>{feature.description}</RichText>;
            }
          }
          return (
            <Fragment key={feature.protvistaFeatureId}>
              <tr
                data-id={feature.protvistaFeatureId}
                data-start={feature.start}
                data-end={feature.end}
              >
                <td data-filter="type" data-filter-value={feature.type}>
                  {feature.type}
                </td>
                <td id={feature.featureId}>{feature.featureId}</td>
                <td>{position}</td>
                <td>
                  {description}
                  <UniProtKBEvidenceTag evidences={feature.evidences} />
                </td>
                {smallScreen ? null : (
                  <td>
                    {/* Not using React Router link as this is copied into the table DOM */}
                    {feature.end - feature.start >= 2 && (
                      <div className="button-group">
                        <Button
                          element="a"
                          variant="tertiary"
                          title="BLAST the sequence corresponding to this feature"
                          href={getURLToJobWithData(
                            JobTypes.BLAST,
                            primaryAccession,
                            {
                              start: feature.start,
                              end: feature.end,
                            }
                          )}
                        >
                          BLAST
                        </Button>
                        <AddToBasketButton
                          selectedEntries={`${primaryAccession}[${feature.start}-${feature.end}]`}
                        />
                      </div>
                    )}
                  </td>
                )}
              </tr>
              {feature.sequence && (
                <tr
                  data-group-for={feature.protvistaFeatureId}
                  data-start={feature.start}
                  data-end={feature.end}
                >
                  <td>
                    <strong>Sequence: </strong>
                    {feature.sequence}
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );

  return withDataTable ? (
    <FeaturesView
      features={processedData}
      sequence={sequence}
      table={table}
      withTitle={withTitle}
    />
  ) : (
    table
  );
};

export default UniProtKBFeaturesView;
