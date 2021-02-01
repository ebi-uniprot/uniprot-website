const re = /<([0-9a-zA-Z$\-_.+!*'(),?/:=&%]+)>; rel="next"/;

const getNextURLFromHeaders = (parsedHeaders?: Record<string, string>) => {
  if (!parsedHeaders?.link) {
    return;
  }

  const match = re.exec(parsedHeaders.link);
  // eslint-disable-next-line consistent-return
  return match?.[1];
};

export default getNextURLFromHeaders;
