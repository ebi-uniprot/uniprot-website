import React, { Fragment } from 'react';

const BlastFormInfo = () => (
  <Fragment>
    <p>
      The Basic Local Alignment Search Tool (BLAST) finds regions of local
      similarity between sequences, which can be used to infer functional and
      evolutionary relationships between sequences as well as help identify
      members of gene families.
    </p>

    <ul>
      <li>
        Start by providing a UniProt ID (UniProtKB accession/UniProtKB entry
        name/UniParc accession) into the input form OR a protein/nucleotide
        sequence.
      </li>
      <li>
        Optionally, you may change the Target database your BLAST will be run
        against or restrict by Taxonomy using the Taxonomy ID or name.
      </li>
      <li>
        Further advanced options can be used to change BLAST algorithm
        parameters.
      </li>
      <li>
        Your BLAST job will be provided a default name. You may edit this name
        as per your choice.
      </li>
      <li>Finally, click the Run BLAST button to submit your BLAST job.</li>
    </ul>
  </Fragment>
);

export default BlastFormInfo;
