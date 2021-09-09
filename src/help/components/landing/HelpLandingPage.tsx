import HelpQuickSearch from './HelpQuickSearch';
import { Contact } from '../../../shared/components/layouts/UniProtFooter';

const HelpLandingPage = () => (
  <div className="uniprot-grid uniprot-grid--centered">
    <h2 className="uniprot-grid-cell--span-12">Help center</h2>
    <div className="uniprot-grid-cell--span-9">
      <HelpQuickSearch />
    </div>
    <div className="uniprot-grid-cell--span-3">
      <h4>Suggest FAQ</h4>
      <ul className="no-bullet">
        <li>How can I get all the proteins involved in a given disease?</li>
        <li>What is the canonical sequence? </li>
        <li>What are reference proteomes?</li>
      </ul>
      <Contact />
    </div>
    <div className="uniprot-grid-cell--span-9">Tiles</div>
    <div className="uniprot-grid-cell--span-3">
      <h4>Help videos</h4>
    </div>
  </div>
);

export default HelpLandingPage;
