type ProtvistaUniprotElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  accession?: string;
  sequence?: string;
  isoforms?: object;
};

declare namespace JSX {
  interface IntrinsicElements {
    'protvista-uniprot': ProtvistaUniprotElement;
    'protvista-uniprot-structure': ProtvistaUniprotElement;
  }
}
