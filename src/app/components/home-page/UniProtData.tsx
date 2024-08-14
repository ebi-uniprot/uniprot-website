import { Tile, HeroContainer } from 'franklin-sites';
import { Link, generatePath } from 'react-router-dom';
import cn from 'classnames';

// eslint-disable-next-line import/no-relative-packages
import colors from '../../../../node_modules/franklin-sites/src/styles/colours.json';

import { LocationToPath, Location } from '../../config/urls';
import ftpUrls from '../../../shared/config/ftpUrls';

import FTPIllustration from '../../../images/ftp_illustration.img.svg';
import ProgrammaticIllustration from '../../../images/programmatic_illustration.img.svg';
import TechDocIllustration from '../../../images/tech_doc_illustration.img.svg';
import SubmitDataIllustration from '../../../images/submit-data_illustration.img.svg';

import styles from './styles/non-critical.module.scss';

const UniProtData = () => (
  <HeroContainer
    headingContent="UniProt data"
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
      headingLevel="h3"
      title="FTP Download"
      className={cn(
        'uniprot-grid-cell--small-span-6',
        'uniprot-grid-cell--medium-span-3'
      )}
      backgroundImage={
        <img
          src={FTPIllustration}
          width={240}
          height={240}
          loading="lazy"
          alt=""
        />
      }
      backgroundColor={colors.independence}
      // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/anchor-has-content
      link={<a href={ftpUrls.uniprot} />}
      gradient
    >
      Download UniProt release data
    </Tile>
    <Tile
      headingLevel="h3"
      title="Technical Documentation"
      className={cn(
        'uniprot-grid-cell--small-span-6',
        'uniprot-grid-cell--medium-span-3'
      )}
      backgroundImage={
        <img
          src={TechDocIllustration}
          width={240}
          height={240}
          loading="lazy"
          alt=""
        />
      }
      backgroundColor={colors.independence}
      link={
        <Link
          to={generatePath(LocationToPath[Location.HelpEntry], {
            accession: 'technical',
          })}
        />
      }
      gradient
    >
      Manuals, schemas and ontology descriptions
    </Tile>
    <Tile
      headingLevel="h3"
      title="Programmatic Access"
      className={cn(
        'uniprot-grid-cell--small-span-6',
        'uniprot-grid-cell--medium-span-3'
      )}
      backgroundImage={
        <img
          src={ProgrammaticIllustration}
          width={240}
          height={240}
          loading="lazy"
          alt=""
        />
      }
      backgroundColor={colors.independence}
      link={
        <Link
          to={generatePath(LocationToPath[Location.HelpEntry], {
            accession: 'programmatic_access',
          })}
        />
      }
      gradient
    >
      Query UniProt data using APIs providing REST, SPARQL and Java services
    </Tile>
    <Tile
      headingLevel="h3"
      title="Submit Data"
      className={cn(
        'uniprot-grid-cell--small-span-6',
        'uniprot-grid-cell--medium-span-3'
      )}
      backgroundImage={
        <img
          src={SubmitDataIllustration}
          width={240}
          height={240}
          loading="lazy"
          alt=""
        />
      }
      backgroundColor={colors.independence}
      link={
        <Link
          to={generatePath(LocationToPath[Location.HelpEntry], {
            accession: 'submissions',
          })}
        />
      }
      gradient
    >
      Submit your sequences, publications and annotation updates
    </Tile>
  </HeroContainer>
);

export default UniProtData;
