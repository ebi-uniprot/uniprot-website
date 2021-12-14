import { Tile, HeroContainer } from 'franklin-sites';
import { generatePath } from 'react-router-dom';
import cn from 'classnames';

// eslint-disable-next-line import/no-relative-packages
import colors from '../../../../node_modules/franklin-sites/src/styles/colours.json';

import { LocationToPath, Location } from '../../config/urls';

import FTPIllustration from '../../../images/ftp_illustration.svg';
import ProgrammaticIllustration from '../../../images/programmatic_illustration.svg';
import TechDocIllustration from '../../../images/tech_doc_illustration.svg';
import SubmitDataIllustration from '../../../images/submit-data_illustration.svg';

import styles from './styles/non-critical.module.scss';

const UniProtData = () => (
  <HeroContainer
    title="UniProt data"
    className={cn(
      'uniprot-grid',
      'uniprot-grid--centered',
      'uniprot-grid--with-bleed',
      styles['home-page-section']
    )}
    titleClassName="uniprot-grid-cell--span-12"
    noSidePadding
  >
    <Tile
      title="FTP Download"
      className="uniprot-grid-cell--span-3"
      backgroundImage={<FTPIllustration />}
      backgroundColor={colors.independence}
      url="https://ftp.uniprot.org/pub/databases/uniprot/"
      gradient
    >
      Download UniProt release data
    </Tile>
    <Tile
      title="Technical Documentation"
      className="uniprot-grid-cell--span-3"
      backgroundImage={<TechDocIllustration />}
      backgroundColor={colors.independence}
      to={generatePath(LocationToPath[Location.HelpEntry], {
        accession: 'technical',
      })}
      gradient
    >
      Manuals, schemas and ontology descriptions
    </Tile>
    <Tile
      title="Programmatic Access"
      className="uniprot-grid-cell--span-3"
      backgroundImage={<ProgrammaticIllustration />}
      backgroundColor={colors.independence}
      to={generatePath(LocationToPath[Location.HelpEntry], {
        accession: 'programmatic_access',
      })}
      gradient
    >
      Query UniProt data using APIs providing REST, SPARQL and Java services
    </Tile>
    <Tile
      title="Submit Data"
      className="uniprot-grid-cell--span-3"
      backgroundImage={<SubmitDataIllustration />}
      backgroundColor={colors.independence}
      to={generatePath(LocationToPath[Location.HelpEntry], {
        accession: 'submissions',
      })}
      gradient
    >
      Submit your sequences, publications and annotation updates
    </Tile>
  </HeroContainer>
);

export default UniProtData;
