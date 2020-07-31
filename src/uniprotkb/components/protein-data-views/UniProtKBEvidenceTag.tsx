import React, { FC, Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';
import { groupBy } from 'lodash-es';
import { ExternalLink, EvidenceTag, EvidenceTagIcon } from 'franklin-sites';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { getEvidenceCodeData, EvidenceData } from '../../config/evidenceCodes';
import { Evidence } from '../../types/modelTypes';
import UniProtKBEntryPublications from './UniProtKBEntryPublications';
import { processUrlTemplate } from './XRefView';
import evidenceUrls from '../../config/evidenceUrls';

enum evidenceTagSourceTypes {
  PUBMED = 'PubMed',
  UNIPROT = 'UniProtKB',
  PROSITE_PRORULE = 'PROSITE-ProRule',
}

export const UniProtEvidenceTagContent: FC<{
  evidenceData: EvidenceData;
  evidences: Evidence[] | undefined;
}> = ({ evidenceData, evidences }) => {
  if (!evidences || evidences.length === 0) {
    return null;
  }
  const groupedEvidences =
    evidences && groupBy(evidences, (evidence: Evidence) => evidence.source);

  const {
    [evidenceTagSourceTypes.PUBMED]: publicationReferences,
    ...groupedEvidencesWithoutPubs
  } = groupedEvidences;

  return (
    <div>
      <h5>{evidenceData.label}</h5>
      {publicationReferences && (
        <UniProtKBEntryPublications
          pubmedIds={
            publicationReferences
              .map((reference: Evidence) => reference.id)
              .filter((id?: string) => id) as string[]
          }
        />
      )}
      {Object.entries(groupedEvidencesWithoutPubs).map(
        ([key, mappedEvidences]) => (
          <Fragment key={key}>
            {mappedEvidences.map(({ id }: Evidence) => {
              if (!id) {
                return null;
              }
              const urlPattern = evidenceUrls[key];
              return urlPattern ? (
                <ExternalLink
                  url={processUrlTemplate(urlPattern, { value: id })}
                  key={id}
                >
                  {id}
                </ExternalLink>
              ) : (
                <Fragment key={id}>{id}</Fragment>
              );
            })}
          </Fragment>
        )
      )}
    </div>
  );
};

const UniProtKBEvidenceTag: FC<{ evidences: Evidence[] }> = ({ evidences }) => {
  const evidenceObj = groupBy(
    evidences,
    (evidence: Evidence) => evidence.evidenceCode
  );
  const evidenceTags = Object.entries(evidenceObj).map(
    ([evidenceCode, references]) => {
      const evidenceData = getEvidenceCodeData(evidenceCode);
      if (!evidenceData) {
        return null;
      }
      return (
        <EvidenceTag
          label={
            evidenceData.labelRender
              ? evidenceData.labelRender(references)
              : evidenceData.label
          }
          className={
            evidenceData.manual
              ? 'svg-colour-reviewed'
              : 'svg-colour-unreviewed'
          }
          key={evidenceCode}
        >
          <UniProtEvidenceTagContent
            evidenceData={evidenceData}
            evidences={references}
          />
        </EvidenceTag>
      );
    }
  );
  return <Fragment>{evidenceTags}</Fragment>;
};

export const UniProtProtvistaEvidenceTag = (
  evidences: Evidence[],
  callback: (evidenceData: EvidenceData, references: Evidence[]) => void
) => {
  const size = 12;
  const evidenceObj = groupBy(
    evidences,
    (evidence: Evidence) => evidence.evidenceCode
  );
  const evidenceTags = Object.entries(evidenceObj).map(
    ([evidenceCode, references]) => {
      if (!evidenceCode) {
        return html``;
      }
      const evidenceData = getEvidenceCodeData(evidenceCode);
      if (!evidenceData) {
        // Unlike React, lit-html always expects an html template, not null.
        return html``;
      }
      return html`
        <span
          class=${`evidence-tag ${
            evidenceData.manual
              ? 'svg-colour-reviewed'
              : 'svg-colour-unreviewed'
          }`}
          @click=${() => callback(evidenceData, references)}
        >
          ${unsafeHTML(
            ReactDOMServer.renderToStaticMarkup(
              <EvidenceTagIcon width={size} height={size} />
            )
          )}
          ${evidenceData.labelRender
            ? evidenceData.labelRender(references)
            : evidenceData.label}</span
        >
      `;
    }
  );
  return evidenceTags;
};

export default UniProtKBEvidenceTag;
