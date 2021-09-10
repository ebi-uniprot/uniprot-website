import cn from 'classnames';

import HelpQuickSearch from './HelpQuickSearch';
import { Contact } from '../../../shared/components/layouts/UniProtFooter';

import landing from './styles/help-landing-page.module.scss';

const HelpLandingPage = () => (
  <div
    className={cn(
      'uniprot-grid uniprot-grid--centered',
      landing['help-landing']
    )}
  >
    <h2 className="uniprot-grid-cell--span-12">Help center</h2>
    <div className="uniprot-grid-cell--span-9">
      <HelpQuickSearch />
    </div>
    <div
      className={cn(
        'uniprot-grid-cell--span-3',
        landing['help-landing__faq-contact']
      )}
    >
      <h4>Suggested FAQs</h4>
      <ul className="no-bullet">
        <li>How can I get all the proteins involved in a given disease?</li>
        <li>What is the canonical sequence? </li>
        <li>What are reference proteomes?</li>
      </ul>
      <div className={landing['help-landing__faq-contact__view-all']}>
        View all FAQs
      </div>
      <Contact />
    </div>
    <div className="uniprot-grid-cell--span-9">Tiles</div>
    <div className="uniprot-grid-cell--span-3">
      <h4>Help videos</h4>
    </div>
  </div>
);

export default HelpLandingPage;
