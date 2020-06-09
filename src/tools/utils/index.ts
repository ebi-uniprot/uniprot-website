const parseXML = (xml: string) => {
  return new window.DOMParser().parseFromString(xml, 'text/xml');
};

type ServerError = {
  response?: { data?: string };
};

const getServerErrorDescription = (error: ServerError) => {
  const data = error?.response?.data;
  if (!data) {
    return null;
  }
  const xml = parseXML(data);
  const description = xml.getElementsByTagName('description');
  const text = description[0]?.textContent;
  return text && text.replace('->', '→');
};

export default getServerErrorDescription;
