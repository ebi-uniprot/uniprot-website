const generateAndDownloadTSV = (
  data?: Record<string, string>[],
  filename = 'data.tsv'
): void => {
  if (!data?.length) {
    return;
  }

  const header = Object.keys(data[0]);
  const tsvRows = [
    header.join('\t'),
    ...data.map((row) => header.map((h) => row[h] ?? '').join('\t')),
  ];
  const tsvString = tsvRows.join('\n');

  const blob = new Blob([tsvString], {
    type: 'text/tab-separated-values;charset=utf-8;',
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

export default generateAndDownloadTSV;
