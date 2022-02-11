import { Button, CodeBlock, CopyIcon } from 'franklin-sites';

const DownloadAPIURL = ({ apiURL }: { apiURL: string }) => {
  const handleCopyURL = () => {
    // Copy to clipboard here and indicate to the user
    // that it was copied successfully via Message
  };

  return (
    <div className="preview">
      <h4>API URL</h4>
      <CodeBlock lightMode className="codeblock--inline">
        {apiURL}
      </CodeBlock>
      <Button variant="primary" onClick={handleCopyURL}>
        <CopyIcon />
        Copy
      </Button>
    </div>
  );
};

export default DownloadAPIURL;
