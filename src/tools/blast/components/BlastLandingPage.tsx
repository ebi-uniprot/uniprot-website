// TODO: This was formerly the page info but is now to serve as a starting point
// for implementing the landing page

const BlastLandingPage = () => (
  <>
    <p>
      The Basic Local Alignment Search Tool (<span translate="no">BLAST</span>)
      finds regions of local similarity between sequences, which can be used to
      infer functional and evolutionary relationships between sequences as well
      as help identify members of gene families.
    </p>

    <ul>
      <li>
        Start by providing a UniProt ID (UniProtKB accession/UniProtKB entry
        name/UniParc accession) into the input form OR a protein/nucleotide
        sequence.
      </li>
      <li>
        Optionally, you may change the Target database your{' '}
        <span translate="no">BLAST</span> will be run against or restrict by
        Taxonomy using the Taxonomy ID or name.
      </li>
      <li>
        Further advanced options can be used to change{' '}
        <span translate="no">BLAST</span> algorithm parameters.
      </li>
      <li>
        Your <span translate="no">BLAST</span> job will be provided a default
        name. You may edit this name as per your choice.
      </li>
      <li>
        Finally, click the &quot;Run <span translate="no">BLAST</span>&quot;
        button to submit your <span translate="no">BLAST</span>
        job.
      </li>
    </ul>
  </>
);

export default BlastLandingPage;
