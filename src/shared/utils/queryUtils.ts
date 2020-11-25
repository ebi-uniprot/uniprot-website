const getNextUrlFromResponse = (
  link: string | null | undefined
): string | undefined => {
  if (!link) {
    return;
  }
  const re = /<([0-9a-zA-Z$\-_.+!*'(),?/:=&%]+)>; rel="next"/;
  const match = re.exec(link);
  if (match && match[1]) {
    // eslint-disable-next-line consistent-return
    return match[1];
  }
};

export default getNextUrlFromResponse;
