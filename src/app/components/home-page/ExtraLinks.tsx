import { DecoratedListItem } from 'franklin-sites';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import ExternalLink from '../../../shared/components/ExternalLink';

import {
  getLocationEntryPath,
  Location,
  LocationToPath,
} from '../../config/urls';

import styles from './styles/non-critical.module.scss';

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
      <Link
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: `query=(evidence_exp:true)`,
        }}
        title="Browse entries with experimental evidences"
      >
        <h2 className="medium">Experimental evidences</h2>
        Search through UniProtKB for all entries containing experimental
        evidences
        <br />
        <br />
        <small>
          <Link
            to={{
              pathname: getLocationEntryPath(Location.HelpEntry, 'evidences'),
              hash: 'ECO:0000269',
            }}
          >
            What are experimental evidences?
          </Link>
        </small>
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
          search: `query=(source:google)`,
        }}
        title="Browse entries with ProtNLM predictions"
      >
        <h2 className="medium">ProtNLM Predictions</h2>
        Browse all the entries annotated with Google&apos;s ProtNLM predictions
      </Link>
      <br />
      <br />
      <small>
        <Link
          to={{ pathname: getLocationEntryPath(Location.HelpEntry, 'ProtNLM') }}
        >
          What is ProtNLM?
        </Link>
      </small>
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
      <ExternalLink noIcon url="https://covid-19.uniprot.org/">
        <h2 className="medium">UniProt COVID-19 portal</h2>
        UniProt portal for the latest SARS-CoV-2 coronavirus protein entries and
        receptors, updated independent of the general UniProt release cycle
      </ExternalLink>
    </DecoratedListItem>
  </section>
);

export default ExtraLinks;
