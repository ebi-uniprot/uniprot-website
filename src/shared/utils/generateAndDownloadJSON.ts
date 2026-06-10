/**
 * Client-side JSON file download — serialises `data` to a Blob and triggers a
 * download with no server round-trip. Mirrors `generateAndDownloadTSV`; used
 * for data that exists only in the browser (e.g. a UniParc sub-entry's
 * UniFire-transformed annotations, which have no downloadable API URL).
 */
const generateAndDownloadJSON = (
  data: unknown,
  filename = 'data.json'
): void => {
  if (data === undefined || data === null) {
    return;
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default generateAndDownloadJSON;
