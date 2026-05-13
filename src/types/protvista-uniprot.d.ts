import type ProtvistaUniprot from 'protvista-uniprot';
import type { ProtvistaUniprotStructure } from 'protvista-uniprot';

declare global {
  type ProtvistaUniprotElement = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > &
    Pick<ProtvistaUniprot, 'accession' | 'sequence'>;

  type ProtvistaUniprotStructureElement = React.DetailedHTMLProps<
    React.HTMLAttributes<ProtvistaUniprotStructure>,
    ProtvistaUniprotStructure
  > &
    Pick<
      ProtvistaUniprotStructure,
      'accession' | 'checksum' | 'sequence' | 'isoforms'
    > & {
      // Kebab-case JSX attribute name; the class field is `noTable`.
      'no-table'?: boolean;
    };

  namespace React.JSX {
    interface IntrinsicElements {
      'protvista-uniprot': ProtvistaUniprotElement;
      'protvista-uniprot-structure': ProtvistaUniprotStructureElement;
    }
  }
}
