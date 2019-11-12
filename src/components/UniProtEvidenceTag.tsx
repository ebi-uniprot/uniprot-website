import React, { FC, Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';
import { EvidenceTag, SwissProtIcon, TremblIcon } from 'franklin-sites';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import {
  getEvidenceCodeData,
  EvidenceData,
} from '../model/types/EvidenceCodes';
import { Evidence } from '../model/types/modelTypes';
import { groupBy } from '../utils/utils';

export const UniProtEvidenceTagContent: FC<{
  evidenceData: EvidenceData;
  references: Evidence[] | undefined;
}> = ({ evidenceData, references }) => (
  <div>
    <h5>{evidenceData.label}</h5>
    {references &&
      references
        .filter((reference: Evidence) => reference.id && reference.source)
        .map((reference: Evidence) => (
          <div key={reference.id}>{`${reference.source}:${reference.id}`}</div>
        ))}
  </div>
);

const UniProtEvidenceTag: FC<{ evidences: Evidence[] }> = ({ evidences }) => {
  const evidenceMap: Map<string, Evidence[]> = groupBy(
    evidences,
    (evidence: Evidence) => evidence.evidenceCode
  );
  const evidenceTags = Array.from(evidenceMap.keys()).map(evidenceCode => {
    const evidenceData = getEvidenceCodeData(evidenceCode);
    if (!evidenceData) {
      return null;
    }
    const references = evidenceMap.get(evidenceCode);
    return (
      <EvidenceTag
        label={
          evidenceData.labelRender
            ? evidenceData.labelRender(references)
            : evidenceData.label
        }
        iconComponent={evidenceData.manual ? <SwissProtIcon /> : <TremblIcon />}
        className={
          evidenceData.manual ? 'svg-colour-reviewed' : 'svg-colour-unreviewed'
        }
        key={evidenceCode}
      >
        <UniProtEvidenceTagContent
          evidenceData={evidenceData}
          references={references}
        />
      </EvidenceTag>
    );
  });
  return <Fragment>{evidenceTags}</Fragment>;
};

export const UniProtProtvistaEvidenceTag = (
  evidences: Evidence[],
  callback: Function
) => {
  const size = 12;
  const evidenceMap: Map<string, Evidence[]> = groupBy(
    evidences,
    (evidence: Evidence) => evidence.evidenceCode
  );
  const evidenceTags = Array.from(evidenceMap.keys()).map(evidenceCode => {
    if (!evidenceCode) {
      return html``;
    }
    const evidenceData = getEvidenceCodeData(evidenceCode);
    if (!evidenceData) {
      // Unlike React, lit-html always expects an html template, not null.
      return html``;
    }
    const references = evidenceMap.get(evidenceCode);
    return html`
      <span
        class=${`evidence-tag ${
          evidenceData.manual ? 'svg-colour-reviewed' : 'svg-colour-unreviewed'
        }`}
        @click=${() => callback(evidenceData, references)}
      >
        ${unsafeHTML(
          ReactDOMServer.renderToStaticMarkup(
            evidenceData.manual ? (
              <SwissProtIcon width={size} height={size} />
            ) : (
              <TremblIcon width={size} height={size} />
            )
          )
        )}
        ${evidenceData.labelRender
          ? evidenceData.labelRender(references)
          : evidenceData.label}</span
      >
    `;
  });
  return evidenceTags;
};

export default UniProtEvidenceTag;
