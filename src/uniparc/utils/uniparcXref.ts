export const getXrefId = (id: string, database: string) => {
  let xrefId = id;
  // NOTE: exception for FusionGDB we need to remove the underscore number
  if (database === 'FusionGDB') {
    xrefId = xrefId.replace(/_\d+$/, '');
  }
  return xrefId;
};
