import 'interaction-viewer';

type Props = {
  accession: string;
};

const InteractionViewer = ({ accession }: Props) => (
  <interaction-viewer accession={accession} />
);

export default InteractionViewer;
