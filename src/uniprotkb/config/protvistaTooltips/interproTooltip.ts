import { escapeHtml } from './security';

// The v5 InterPro adapter spreads the entry metadata onto each feature, so
// accession/name/source_database/integrated arrive at the top level.
export type InterProFeature = {
  start?: number | string;
  end?: number | string;
  accession: string;
  name: string;
  source_database: string;
  integrated: null | string;
};

const formatTooltip = (feature: InterProFeature) => `
      ${
        feature.start && feature.end
          ? `<h4>InterPro Representative Domain ${escapeHtml(feature.start)}-${escapeHtml(feature.end)}</h4><hr />`
          : ''
      }
        <h5>Accession</h5>
        <p>
        <a
          target="_blank"
          rel="noopener"
          href="https://www.ebi.ac.uk/interpro/entry/${encodeURIComponent(feature.source_database)}/${encodeURIComponent(feature.accession)}/"
        >
        ${escapeHtml(feature.accession)}
        </a>
        </p>
        <h5>Name</h5>
        <p>${escapeHtml(feature.name)}</p>
        ${
          feature.integrated
            ? `<h5>Integrated into </h5>
        <p>
        <a
          target="_blank"
          rel="noopener"
          href="https://www.ebi.ac.uk/interpro/entry/InterPro/${encodeURIComponent(feature.integrated)}/"
        >
          ${escapeHtml(feature.integrated)}
        </a>
        </p>`
            : ''
        }
      `;

export default formatTooltip;
