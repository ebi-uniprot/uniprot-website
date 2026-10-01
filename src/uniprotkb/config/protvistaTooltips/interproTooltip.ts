import { escapeHtml } from './security';

// The v5 InterPro adapter spreads the entry metadata onto each feature, so
// accession/name/source_database/integrated arrive at the top level, along
// with `locations` (the entry's protein locations).
export type InterProFeature = {
  start?: number | string;
  end?: number | string;
  locations?: { fragments: { start: number; end: number }[] }[] | null;
  accession: string;
  name: string;
  source_database: string;
  integrated: null | string;
};

// As in v4, the heading spans the whole entry rather than the clicked fragment
const getSpan = (feature: InterProFeature) => {
  const fragments = feature.locations?.flatMap(({ fragments }) => fragments);
  if (!fragments?.length) {
    return { start: feature.start, end: feature.end };
  }
  return {
    start: Math.min(...fragments.map(({ start }) => start)),
    end: Math.max(...fragments.map(({ end }) => end)),
  };
};

const formatTooltip = (feature: InterProFeature) => {
  const { start, end } = getSpan(feature);
  return `
      ${
        start && end
          ? `<h4>InterPro Representative Domain ${escapeHtml(start)}-${escapeHtml(end)}</h4><hr />`
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
};

export default formatTooltip;
