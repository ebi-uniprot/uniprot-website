type Props = {
  id: string;
  title: string;
  titleMatch?: string;
  contentMatch?: string;
};

const HelpCompactResult = ({ id, title, titleMatch, contentMatch }: Props) => (
  <>
    {id} {title} {titleMatch} {contentMatch}
  </>
);

export default HelpCompactResult;
