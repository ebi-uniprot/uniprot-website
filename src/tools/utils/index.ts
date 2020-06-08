export const parseXml = (xml: string) => {
  return new window.DOMParser().parseFromString(xml, 'text/xml');
};

type ServerError = {
  response?: { data?: string };
};

export const getServerErrorDescription = (error: ServerError) => {
  const data = error?.response?.data;
  if (!data) {
    return null;
  }
  const xml = parseXml(data);
  const description = xml.getElementsByTagName('description');
  const text = description[0]?.textContent;
  return text && text.replace('->', '→');
};
