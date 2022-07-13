import { useMemo, Fragment } from 'react';
import classNames from 'classnames';
import { v1 } from 'uuid';
import { Button } from 'franklin-sites';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import FeaturesView, {
  LocationModifier,
  ProcessedFeature,
} from '../../../shared/components/views/FeaturesView';

import listFormat from '../../../shared/utils/listFormat';
import {
  getEntryPath,
  getURLToJobWithData,
  LocationToPath,
} from '../../../app/config/urls';

import { Evidence } from '../../types/modelTypes';
import FeatureType from '../../types/featureType';
import { Xref } from '../../../shared/types/apiModel';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import { Namespace } from '../../../shared/types/namespaces';
import { generatePath, Link } from 'react-router-dom';

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
  featureCrossReference?: Xref;
}[];

export type ProtvistaFeature = {
  type: string;
  description: string;
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

export const processFeaturesData = (
  data: FeatureData,
  sequence?: string
): ProcessedFeature[] =>
  data.map((feature): ProcessedFeature => {
    let s: string | undefined;
    let description = feature.description || '';
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

    return {
      protvistaFeatureId: feature.featureId || v1(),
      featureId: feature.featureId,
      start: feature.location.start.value,
      end: feature.location.end.value,
      startModifier: feature.location.start.modifier,
      endModifier: feature.location.end.modifier,
      type: feature.type,
      description: description,
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

  if (processedData.length === 0) {
    return null;
  }

  const wrapTags = (text: string, regex: RegExp, className?: string) => {
    const textArray = text.split(regex);
    return textArray.map((str) => {
      if (regex.test(str)) {
        return (
          <Link to={getEntryPath(Namespace.uniprotkb, 'P12345-2')}>{str}</Link>
        );
      }
      return str;
    });
  };

  const table = (
    <table className={classNames(!withDataTable && 'data-table--compact')}>
      <thead>
        <tr>
          <th data-filter="type">Type</th>
          <th>ID</th>
          <th>Position(s)</th>
          <th>Description</th>
          <th>{/* Intentionaly left blank */}</th>
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

          const isoform = feature.description?.includes('isoform')
            ? feature.description.match(/isoform\s([A-Z0-9]+\-\d+)/i)?.[1]
            : null;

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
                <td>{feature.featureId}</td>
                <td>{position}</td>
                <td>
                  {isoform
                    ? feature.description
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
                          } else {
                            return part;
                          }
                        })
                    : feature.description}
                  <UniProtKBEvidenceTag evidences={feature.evidences} />
                </td>
                <td>
                  {/* Not using React Router link as this is copied into the table DOM */}
                  {feature.end - feature.start >= 2 && (
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
                  )}
                  {/* <Button>Add</Button> */}
                </td>
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
