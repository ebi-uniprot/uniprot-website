import { Protein } from 'schema-dts';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

const dataToSchema = (data?: UniProtkbAPIModel): Protein | undefined => {
  if (!data) {
    return;
  }
  console.log('!', data);
  // eslint-disable-next-line consistent-return
  return {
    '@context': 'https://schema.org',
    '@id': window.location.href,
    includedInDataset: 'https://disprot.org/#current',
    'http://purl.org/dc/terms/conformsTo': {
      '@id': 'https://bioschemas.org/specifications/Protein/0.12-DRAFT',
    },
    hasRepresentation:
      'MEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSPLPSQAMDDLMLSPDDIEQWFTEDPGPDEAPRMPEAAPPVAPAPAAPTPAAPAPAPSWPLSSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNTSSSPQPKKKPLDGEYFTLQIRGRERFEMFRELNEALELKDAQAGKEPGGSRAHSSHLKSKKGQSTSRHKKLMFKTEGPDSD',
    identifier: 'DP00086',
    taxonomicRange: data.organism?.taxonId
      ? {
          '@id': `https://identifiers.org/taxonomy:${data.organism.taxonId}`,
        }
      : undefined,
  };
};

export default dataToSchema;
