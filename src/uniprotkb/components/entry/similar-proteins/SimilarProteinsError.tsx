import { Button, Message } from 'franklin-sites';

type Props = {
  onRetry: () => void;
};

// Shown when loading a UniRef level fails, instead of an indefinite spinner.
const SimilarProteinsError = ({ onRetry }: Props) => (
  <Message level="failure" noShadow>
    Something went wrong loading similar proteins.{' '}
    <Button variant="secondary" onClick={onRetry}>
      Try again
    </Button>
  </Message>
);

export default SimilarProteinsError;
