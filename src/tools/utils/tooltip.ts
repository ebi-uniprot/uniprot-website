import { Variant } from '@nightingale-elements/nightingale-variation/dist/proteinAPI';

import * as logging from '../../shared/utils/logging';

import ecoMap from '../config/tooltipEvidences';

import { ProteomicsPtmFeature, PTM } from '../../uniprotkb/types/proteomicsPtm';
import { Evidence, Source, TooltipFeature } from './feature';

const formatSource = (source: Source) =>
  source.name?.toLowerCase() === 'PubMed'.toLowerCase()
    ? `${source.id}&nbsp;(<a href='${source.url}' style="color:#FFF" target='_blank'>${source.name}</a>&nbsp;<a href='${source.alternativeUrl}' style="color:#FFF" target='_blank'>EuropePMC</a>)`
    : `&nbsp;<a href='${source.url}' style="color:#FFF" target='_blank'>${
        source.id
      }</a>&nbsp;${source.name ? `(${source.name})` : ''}`;

export const getEvidenceFromCodes = (evidenceList?: Evidence[]) =>
  evidenceList
    ? `
        <ul>${evidenceList
          .map((ev) => {
            const ecoMatch = ecoMap.find((eco) => eco.name === ev.code);
            return ecoMatch
              ? `<li title='${
                  ecoMatch.description
                }' style="padding: .25rem 0">${
                  ecoMatch.shortDescription
                }:&nbsp;${ev.source ? formatSource(ev.source) : ''}</li>`
              : '';
          })
          .join('')}</ul>
      `
    : '';

export const formatXrefs = (xrefs: Source[]) =>
  `<ul>${xrefs
    .map(
      (xref) =>
        `<li style="padding: .25rem 0">${xref.name} ${
          xref.url
            ? `<a href="${xref.url}" style="color:#FFF" target="_blank">${xref.id}</a>`
            : `${xref.name} ${xref.id}`
        }</li>`
    )
    .join('')}</ul>`;

const getPTMEvidence = (ptms: PTM[]) => {
  if (!ptms) {
    return '';
  }
  const ids = ptms.flatMap(({ dbReferences }) =>
    dbReferences.map((ref) => ref.id)
  );
  const uniqueIds = [...new Set(ids.flat())];
  // Urls in the payload are not relevant. For 'Glue project' dataset, Dataset ID and publication reference is hardcoded. Need to be checked in 2024 if it still exists in the payload
  const prideArchive = 'https://www.ebi.ac.uk/pride/archive/projects/';
  return `
    <ul>${uniqueIds
      .map((id) => {
        const datasetID = id === 'Glue project' ? 'PXD012174' : id;
        return `<li title='${datasetID}' style="padding: .25rem 0">${datasetID}&nbsp;(<a href="${prideArchive}${datasetID}" style="color:#FFF" target="_blank">PRIDE</a>
        ${
          id === 'Glue project'
            ? `)</li><li title="publication" style="padding: .25rem 0">Publication:&nbsp;31819260&nbsp;(<a href="https://pubmed.ncbi.nlm.nih.gov/31819260" style="color:#FFF" target="_blank">PubMed</a>)</li>`
            : `&nbsp;<a href="http://www.peptideatlas.org/builds/rice/phospho/" style="color:#FFF" target="_blank">PeptideAtlas</a>)</li>`
        }`;
      })
      .join('')}</ul>
  `;
};

const formatPTMPeptidoform = (peptide: string, ptms: PTM[]) => {
  if (!ptms) {
    return '';
  }
  const modificationValues = ptms.map((ptm) => ({
    name: ptm.name,
    position: ptm.position,
  }));
  let peptidoform = '';
  let lastModPosition = 0;
  modificationValues.forEach((p) => {
    peptidoform = `${peptidoform}${peptide.slice(
      lastModPosition,
      p.position
    )}[${p.name}]`;
    lastModPosition = p.position;
  });
  // Add last remaining part of the peptide if any
  peptidoform = `${peptidoform}${peptide.slice(lastModPosition)}`;
  return `<p>${peptidoform}</p>`;
};

// At the moment, there is only phospho data. In future we may have more, the below AA sites have to be updated to accomodate more.
const aaPhosphoSites = new Map([
  ['A', 'alanine'],
  ['S', 'serine'],
  ['T', 'threonine'],
  ['Y', 'tyrosine'],
]);

const findModifiedResidueName = (feature: ProteomicsPtmFeature, ptm: PTM) => {
  const { peptide, begin: peptideStart } = feature;
  const proteinLocation = Number(peptideStart) + ptm.position - 1;
  const modifiedResidue = peptide.charAt(ptm.position - 1); // CharAt index starts from 0
  const site = aaPhosphoSites.get(modifiedResidue);
  if (!site) {
    logging.error(`${modifiedResidue} not in aaPhosphoSites Map`);
  }
  return `${proteinLocation} phospho${site}`;
};

export const formatVariantTooltip = (feature: Variant) => {
  const evidenceHTML = getEvidenceFromCodes(feature.evidences);
  const description = feature.descriptions?.map((d) => d.value).join(', ');

  return `
        ${description ? `<h5>Description</h5><p>${description}</p>` : ''}
        ${feature.ftId ? `<h5>Feature ID</h5><p>${feature.ftId}</p>` : ''}
        ${
          feature.alternativeSequence
            ? `<h5>Alternative sequence</h5><p>${feature.alternativeSequence}</p>`
            : ''
        }
        ${
          feature.xrefs
            ? `<h5>Cross-references</h5>${formatXrefs(feature.xrefs)}`
            : ''
        }
        ${evidenceHTML ? `<h5>Evidence</h5>${evidenceHTML}` : ''}`;
};

export const formatFeatureTooltip = (feature: TooltipFeature) => {
  const evidenceHTML = getEvidenceFromCodes(feature.evidences);
  let { description } = feature;

  if (feature.type === 'BINDING' || feature.type === 'Binding site') {
    let bindingDescription = '';
    if (feature.ligandPart) {
      bindingDescription += `${feature.ligandPart.name} of `;
    }
    if (feature.ligand) {
      bindingDescription += feature.ligand.name;
    }
    if (feature.description) {
      bindingDescription += `; ${feature.description}`;
    }
    description = bindingDescription;
  }

  return `
        ${description ? `<h5>Description</h5><p>${description}</p>` : ''}
        ${feature.ftId ? `<h5>Feature ID</h5><p>${feature.ftId}</p>` : ''}
        ${evidenceHTML ? `<h5>Evidence</h5>${evidenceHTML}` : ''}`;
};

export const formatPtmTooltip = (feature: ProteomicsPtmFeature) => {
  const evidenceHTML = getPTMEvidence(feature.ptms);
  const ptms = feature.ptms.map((ptm) => findModifiedResidueName(feature, ptm));
  const dataset = feature.ptms.flatMap(({ dbReferences }) =>
    dbReferences.map((ref) => ref.id)
  );
  return `
        ${
          ptms.length
            ? `<h5 data-article-id="ptm_processing_section">PTMs</h5><ul>${ptms
                .map((item) => `<li>${item}</li>`)
                .join('')}</ul>
              `
            : ''
        }
        ${
          feature.peptide
            ? `<h5 data-article-id="mod_res_large_scale#what-is-the-goldsilverbronze-criterion">Peptidoform</h5><p>${formatPTMPeptidoform(
                feature.peptide,
                feature.ptms
              )}</p>
              <h5>Peptide</h5><p>${feature.peptide}</p>`
            : ''
        }
        ${
          feature.xrefs
            ? `<h5>Cross-references</h5>${formatXrefs(feature.xrefs)}`
            : ''
        }
        ${evidenceHTML ? `<h5>Evidence</h5>${evidenceHTML}` : ''}
        ${
          dataset && !dataset.includes('Glue project')
            ? `<hr /><h5 data-article-id="mod_res_large_scale#what-is-the-goldsilverbronze-criterion">PTM statistical attributes</h5><ul>${feature.ptms
                .map((ptm) =>
                  ptm.dbReferences
                    .map(
                      (ref) =>
                        `<li><b>${ref.id}</b></li>
                        <li style="text-indent: 1em"><b>${findModifiedResidueName(
                          feature,
                          ptm
                        )}</b></li>
                        <li style="text-indent: 2em">PubMed ID: <a href="https://europepmc.org/article/MED/${
                          ref.properties['Pubmed ID']
                        }" style="color:#FFF" target="_blank">
                        ${ref.properties['Pubmed ID']}</a>
                        </li>
                        <li style="text-indent: 2em"><span data-article-id="mod_res_large_scale#confidence-score">Confidence score</span>: ${
                          ref.properties['Confidence score']
                        }</li>
                        <li style="text-indent: 2em">Universal Spectrum Id: 
                        <a href="http://proteomecentral.proteomexchange.org/usi/?usi=${
                          ref.properties['Universal Spectrum Id']
                        }" style="color:#FFF" target="_blank">View on ProteomeXchange</a>
                        </li>
                        <li style="text-indent: 2em">PSM Count (0.05 gFLR): ${
                          ref.properties['PSM Count (0.05 gFLR)']
                        }</li>
                        <li style="text-indent: 2em">Final site probability: ${
                          ref.properties['Final site probability']
                        }</li>
                        `
                    )
                    .join('')
                )
                .join('')}</ul>`
            : ''
        }`;
};

type FeatureType = TooltipFeature | ProteomicsPtmFeature | Variant;

const isProteomicsPtmFeature = (
  feature: FeatureType
): feature is ProteomicsPtmFeature => feature.type === 'PROTEOMICS_PTM';

const isVariantFeature = (feature: FeatureType): feature is Variant =>
  'wildType' in feature;

const isTooltipFeature = (feature: FeatureType): feature is TooltipFeature =>
  'description' in feature;

export const formatTooltip = (feature: FeatureType) => {
  try {
    if (isProteomicsPtmFeature(feature)) {
      return formatPtmTooltip(feature);
    }
    if (isVariantFeature(feature)) {
      return formatVariantTooltip(feature);
    }
    if (isTooltipFeature(feature)) {
      return formatFeatureTooltip(feature);
    }
  } catch (error) {
    if (error instanceof Error || typeof error === 'string') {
      logging.error(error);
    }
    return '';
  }

  logging.error(
    `Unknown feature when attempting to format: ${JSON.stringify(feature)}`
  );
  return '';
};
