type ProtvistaUniprotElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  accession?: string;
  checksum?: string;
  sequence?: string;
};

declare namespace JSX {
  interface IntrinsicElements {
    'protvista-uniprot': ProtvistaUniprotElement;
    'protvista-uniprot-structure': ProtvistaUniprotElement;
  }
}
