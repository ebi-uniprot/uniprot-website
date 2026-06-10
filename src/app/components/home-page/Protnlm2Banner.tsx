import { ExternalLink, Message } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { getLocationEntryPathFor, Location } from '../../config/urls';

const getHelpEntryPath = getLocationEntryPathFor(Location.HelpEntry);

const Protnlm2Banner = () => (
  <Message level="info" className="uniprot-grid-cell--span-12">
    <small>
      {
        'Over 26,000 UniProtKB unreviewed/TrEMBL entries now include annotations from machine learning / artificial intelligence (AI) using a Protein Natural Language Model, '
      }
      <Link to={getHelpEntryPath('ProtNLM')}>ProtNLM2</Link>
      {', developed by collaborators at '}
      <ExternalLink url="https://deepmind.google/science/">
        Google DeepMind
      </ExternalLink>
      {'. This includes predictions for '}
      <Link to={getHelpEntryPath('function')}>function comments</Link>
      {', '}
      <Link to={getHelpEntryPath('subcellular_location')}>
        subcellular locations
      </Link>
      {', '}
      <Link to={getHelpEntryPath('keywords')}>keywords</Link>
      {', and '}
      <Link to={getHelpEntryPath('gene_ontology')}>Gene Ontology</Link>
      {' (GO) terms. View the '}
      <Link to={getHelpEntryPath('ProtNLM')}>ProtNLM2 help page</Link>
      {
        ' to learn more and obtain a list of the UniProtKB unreviewed/TrEMBL entries currently annotated by the model.'
      }
    </small>
  </Message>
);

export default Protnlm2Banner;
