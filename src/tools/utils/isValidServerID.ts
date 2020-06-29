// TODO: change for other types
const validServerID = /^ncbiblast-R\d{8}(-\w+){4}$/;

const isValidServerID = (id: string) => validServerID.test(id);

export default isValidServerID;
