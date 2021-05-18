import { CodeBlock } from 'franklin-sites';

// TODO: This was formerly the page info but is now to serve as a starting point
// for implementing the landing page

const IDMappingLandingPage = () => (
  <>
    <div style={{ breakAfter: 'column' }}>
      <h4>About</h4>
      Enter or upload a list of identifiers to do one of the following:
      <ul>
        <li>
          Retrieve the corresponding UniProt entries to download them or work
          with them on this website.
        </li>
        <li>
          Convert identifiers which are of a different type to UniProt
          identifiers or vice versa and download the identifier lists.
        </li>
      </ul>
    </div>
    <div>
      <h4>How to use</h4>
      <ol>
        <li>
          Enter identifiers, separated by spaces or new lines, into the form
          field, for example:
          <br />
          <CodeBlock lightMode>
            {`P31946
P62258
ALBU_HUMAN
EFTU_ECOLI`}
          </CodeBlock>
        </li>
        <li>
          If you need to convert to another identifier type, select the source
          and target type from the dropdown menus.
        </li>
        <li>Click the Submit button.</li>
      </ol>
    </div>
  </>
);

export default IDMappingLandingPage;
