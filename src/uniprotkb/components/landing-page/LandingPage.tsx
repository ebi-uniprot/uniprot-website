import { Link } from 'react-router-dom';

import YouTubeEmbed from '../../../shared/components/YouTubeEmbed';

import { LocationToPath, Location } from '../../../app/config/urls';

import styles from './styles/landing-page.module.scss';

const LandingPage = () => {
  return (
    <div className={styles['landing-page']}>
      <h2 className={styles['landing-page__title']}>UniProtKB</h2>
      <div className={styles['introduction-section']}>
        <div className={styles['video']}>
          <YouTubeEmbed id="yp1O1gDK8oA" title="How to search UniProtKB" />
        </div>
        <div>
          The UniProt Knowledgebase (UniProtKB) is the central hub for the
          collection of functional information on proteins, with accurate,
          consistent and rich annotation. In addition to capturing the core data
          mandatory for each UniProtKB entry (mainly, the amino acid sequence,
          protein name or description, taxonomic data and citation information),
          as much annotation information as possible is added. The UniProt
          Knowledgebase consists of two sections: a section containing
          manually-annotated records with information extracted from literature
          and curator-evaluated computational analysis (UniProtKB/Swiss-Prot),
          and a section with computationally analyzed records that await full
          manual annotation (UniProtKB/TrEMBL).
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              search: `query=*`,
            }}
            className={styles['search-link']}
          >
            Start searching in UniProtKB &gt;&gt;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
