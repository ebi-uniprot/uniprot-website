import type { ProtvistaUniprotStructure } from 'protvista-uniprot';

declare global {
  // Not re-exported from the package barrel, so derive it from the class
  type ProcessedStructureData = NonNullable<
    ProtvistaUniprotStructure['data']
  >[number];

  type ProtvistaUniprotElement = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > & {
    accession?: string;
    notooltip?: boolean;
    // Defers loading until the attribute is removed, so a host can register
    // custom adapters on the element first
    suspend?: boolean;
  };

  type ProtvistaUniprotStructureElement = React.DetailedHTMLProps<
    React.HTMLAttributes<ProtvistaUniprotStructure>,
    ProtvistaUniprotStructure
  > &
    Pick<ProtvistaUniprotStructure, 'accession' | 'checksum' | 'sequence'> & {
      'no-table'?: boolean;
      'selected-id'?: string;
      'color-theme'?: string;
    };

  namespace React.JSX {
    interface IntrinsicElements {
      'protvista-uniprot': ProtvistaUniprotElement;
      'protvista-uniprot-structure': ProtvistaUniprotStructureElement;
    }
  }
}
