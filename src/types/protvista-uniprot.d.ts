import type { ProtvistaUniprotStructure } from 'protvista-uniprot';

declare global {
  type ProtvistaUniprotElement = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > & {
    accession?: string;
    checksum?: string;
    sequence?: string;
    isoforms?: object;
    'no-table'?: boolean;
  };

  type ProtvistaUniprotStructureElement = React.DetailedHTMLProps<
    React.HTMLAttributes<ProtvistaUniprotStructure>,
    ProtvistaUniprotStructure
  > & {
    accession?: string;
    checksum?: string;
    sequence?: string;
    isoforms?: object;
    'no-table'?: boolean;
  };

  namespace React.JSX {
    interface IntrinsicElements {
      'protvista-uniprot': ProtvistaUniprotElement;
      'protvista-uniprot-structure': ProtvistaUniprotStructureElement;
    }
  }
}
