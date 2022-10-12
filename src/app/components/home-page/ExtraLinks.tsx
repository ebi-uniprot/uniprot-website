import { DecoratedListItem, ExternalLink } from 'franklin-sites';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Location, LocationToPath } from '../../config/urls';

import styles from './styles/non-critical.module.scss';

import AlphaFoldImg from '../../../images/alphafold.png';
import CovidPortalImg from '../../../images/covid-portal.png';

const ExtraLinks = () => (
  <section
    className={cn(
      'uniprot-grid',
      'uniprot-grid--centered',
      'uniprot-grid--with-bleed',
      styles['home-page-section'],
      styles['extra-links']
    )}
  >
    <DecoratedListItem
      compact
      altStyle
      className={cn(
        'uniprot-grid-cell--small-span-12',
        'uniprot-grid-cell--medium-span-4'
      )}
    >
      <img
        src={AlphaFoldImg}
        width="438"
        height="569"
        alt=""
        loading="lazy"
        className={styles['alphafold-img']}
      />
      <Link
        to={{
          pathname: LocationToPath[Location.AlphaFoldResults],
          search: `query=*`,
        }}
        title="Browse entries highlighting AlphaFold predictions"
      >
        <h2 className="medium">AlphaFold structures</h2>
        Search with all the power of the UniProt search engine for proteins with
        an AlphaFold prediction provided by DeepMind
      </Link>
    </DecoratedListItem>
    <DecoratedListItem
      compact
      altStyle
      className={cn(
        'uniprot-grid-cell--small-span-12',
        'uniprot-grid-cell--medium-span-4'
      )}
    >
      <Link
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: `query=(database:google)`,
        }}
        title="Browse entries with ProtNLM predictions"
      >
        <h2 className="medium">ProtNLM Predictions</h2>
        Explore all the entries annotated with Google&apos;s ProtNLM predictions
      </Link>
    </DecoratedListItem>
    <DecoratedListItem
      compact
      altStyle
      className={cn(
        'uniprot-grid-cell--small-span-12',
        'uniprot-grid-cell--medium-span-4'
      )}
    >
      <img
        src={CovidPortalImg}
        width="201"
        height="202"
        alt=""
        loading="lazy"
      />
      <ExternalLink
        noIcon
        url="https://covid-19.uniprot.org/"
        title="Browse entries highlighting AlphaFold predictions"
      >
        <h2 className="medium">UniProt COVID-19 portal</h2>
        UniProt portal for the latest SARS-CoV-2 coronavirus protein entries and
        receptors, updated independent of the general UniProt release cycle
      </ExternalLink>
    </DecoratedListItem>
  </section>
);

export default ExtraLinks;
