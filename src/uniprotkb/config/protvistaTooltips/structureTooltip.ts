import { escapeHtml, sanitizeUrl } from './security';

export type StructureFeature = {
  type?: string;
  start?: number | string;
  end?: number | string;
  structures: {
    start: number;
    end: number;
    source: { id: string; url: string };
  }[];
};

const getStructuresHTML = (structureList: StructureFeature['structures']) =>
  `<ul>
              ${structureList
                .map(
                  (structure) =>
                    `<li><a href='${sanitizeUrl(structure.source.url)}' target='_blank'>
              ${escapeHtml(structure.source.id)}
          </a> (${escapeHtml(structure.start)}-${escapeHtml(structure.end)})</li>`
                )
                .join('')}
          </ul>`;

const formatTooltip = (feature: StructureFeature) => {
  const structuresHTML = getStructuresHTML(feature.structures);
  return !structuresHTML
    ? ''
    : `
    ${
      feature.type && feature.start && feature.end
        ? `<h4>${escapeHtml(feature.type)} ${escapeHtml(feature.start)}-${escapeHtml(feature.end)}</h4><hr />`
        : ''
    }
    <h5>Structures</h5>${structuresHTML}`;
};

export default formatTooltip;
