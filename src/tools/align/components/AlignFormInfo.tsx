import React from 'react';

const AlignFormInfo = () => (
  <>
    <p>
      Align two or more protein sequences with the{' '}
      <a
        href="http://www.clustal.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Clustal Omega
      </a>{' '}
      program (see also this{' '}
      <a
        href="https://www.ebi.ac.uk/Tools/msa/clustalo/help/faq.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        FAQ
      </a>
      ) to view their characteristics alongside each other.
    </p>
    <ul>
      <li>
        Enter either protein sequences in FASTA format or UniProt identifiers
        into the form field, for example: TPA_HUMAN TPA_PIG
      </li>
      <li>Click the &quot;Run Align&quot; button.</li>
    </ul>
  </>
);

export default AlignFormInfo;
