import type { ProtvistaUniprotStructure } from 'protvista-uniprot';

declare global {
  type ProtvistaUniprotElement = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > & {
    accession?: string;
  };

  type ProtvistaUniprotStructureElement = React.DetailedHTMLProps<
    React.HTMLAttributes<ProtvistaUniprotStructure>,
    ProtvistaUniprotStructure
  > &
    Pick<
      ProtvistaUniprotStructure,
      'accession' | 'checksum' | 'sequence' | 'isoforms' | 'noTable'
    >;

  namespace React.JSX {
    interface IntrinsicElements {
      'protvista-uniprot': ProtvistaUniprotElement;
      'protvista-uniprot-structure': ProtvistaUniprotStructureElement;
    }
  }
}
