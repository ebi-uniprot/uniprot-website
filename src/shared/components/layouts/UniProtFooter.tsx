import { memo, HTMLAttributes } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { CitedIcon } from 'franklin-sites';
import cn from 'classnames';

import ExternalLink from '../ExternalLink';
import ReleaseInfo from './ReleaseInfo';
import Contact from './Contact';

import {
  getLocationEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';

import helper from '../../styles/helper.module.scss';
import footer from './styles/footer.module.scss';

import UniProtLogo from '../../../images/uniprot-logo.img.svg';
import EMBLEBILogo from '../../../images/embl-ebi-logo.img.svg';
import PIRLogo from '../../../images/pir-logo.jpg';
import SIBLogo from '../../../images/sib-logo.png';
import SERILogo from '../../../images/seri-logo.png';
import ElixirCDRLogo from '../../../images/elixir-cdr.png';
import GBCGCBRLogo from '../../../images/gbc-gcbr.img.svg';
import CTSLogo from '../../../images/core-trust-seal-logo.png';

const FooterConsortium = () => (
  <div className={footer.consortium}>
    <Link
      to={LocationToPath[Location.Home]}
      className={footer.consortium__uniprot}
      title="UniProt home page"
    >
      <img src={UniProtLogo} loading="lazy" alt="" width="152" height="70" />
    </Link>
    <div className={footer.consortium__members}>
      <ExternalLink
        noIcon
        url="https://www.ebi.ac.uk/"
        title="European Bioinformatics Institute"
      >
        <img src={EMBLEBILogo} loading="lazy" alt="" width="231" height="218" />
      </ExternalLink>
      <ExternalLink
        noIcon
        url="https://pir.georgetown.edu/"
        title="Protein Information Resource"
      >
        <img src={PIRLogo} loading="lazy" alt="" width="231" height="218" />
      </ExternalLink>
      <ExternalLink
        noIcon
        url="https://www.sib.swiss/"
        title="Swiss Institute of Bioinformatics"
      >
        <img src={SIBLogo} loading="lazy" alt="" width="200" height="152" />
      </ExternalLink>
    </div>
  </div>
);

const FooterCopyrightAndMisc = () => (
  <div className={footer['copyright-misc']}>
    <p>
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'about',
        })}
      >
        © 2002 – {new Date().getFullYear()} UniProt consortium
      </Link>
    </p>
    <p>
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'license',
        })}
      >
        License &amp; Disclaimer
      </Link>{' '}
      |{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'privacy',
        })}
      >
        Privacy Notice
      </Link>
    </p>
  </div>
);

const ReleaseInfoSection = () => (
  <div className={footer['stats-release']}>
    <ReleaseInfo />
  </div>
);

const FooterShortcuts = () => (
  <ul className={cn('no-bullet', footer.shortcuts)}>
    <li className={footer['shortcuts__core-data']}>
      <span className={footer.shortcuts__title}>Core data</span>
      <ul className="no-bullet">
        <li>
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              search: 'query=*',
            }}
          >
            Proteins (UniProtKB)
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: LocationToPath[Location.ProteomesResults],
              search: 'query=*',
            }}
          >
            Species (Proteomes)
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: LocationToPath[Location.UniRefResults],
              search: 'query=*',
            }}
          >
            Protein clusters (UniRef)
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: LocationToPath[Location.UniParcResults],
              search: 'query=*',
            }}
          >
            Sequence archive (UniParc)
          </Link>
        </li>
      </ul>
    </li>
    <li>
      <span className={footer.shortcuts__title}>Supporting data</span>
      <ul className="no-bullet">
        <li>
          <Link
            to={{
              pathname: LocationToPath[Location.CitationsResults],
              search: 'query=*',
            }}
          >
            Literature citations
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: LocationToPath[Location.TaxonomyResults],
              search: 'query=*',
            }}
          >
            Taxonomy
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: LocationToPath[Location.KeywordsResults],
              search: 'query=*',
            }}
          >
            Keywords
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: LocationToPath[Location.LocationsResults],
              search: 'query=*',
            }}
          >
            Subcellular locations
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: LocationToPath[Location.DatabaseResults],
              search: 'query=*',
            }}
          >
            Cross-referenced databases
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: LocationToPath[Location.DiseasesResults],
              search: 'query=*',
            }}
          >
            Diseases
          </Link>
        </li>
      </ul>
    </li>
    <li className={helper['no-small']}>
      <span className={footer.shortcuts__title}>Tools</span>
      <ul className="no-bullet">
        <li>
          <Link to={LocationToPath[Location.Blast]} translate="no">
            BLAST
          </Link>
        </li>
        <li>
          <Link to={LocationToPath[Location.Align]}>Align</Link>
        </li>
        <li>
          <Link to={LocationToPath[Location.IDMapping]}>
            Retrieve/ID mapping
          </Link>
        </li>
        <li>
          <Link to={LocationToPath[Location.PeptideSearch]}>
            Peptide search
          </Link>
        </li>
        <li>
          <Link to={LocationToPath[Location.Dashboard]}>Tool results</Link>
        </li>
      </ul>
    </li>
    <li>
      <span className={footer.shortcuts__title}>Information</span>
      <ul className="no-bullet">
        <li>
          <Link
            to={generatePath(LocationToPath[Location.HelpEntry], {
              accession: 'publications',
            })}
          >
            Cite{' '}
            <span className={helper['no-wrap']}>
              UniProt
              <sup>
                <CitedIcon width="1em" />
              </sup>
            </span>
          </Link>
        </li>
        <li>
          <Link
            to={generatePath(LocationToPath[Location.HelpEntry], {
              accession: 'about',
            })}
          >
            About
          </Link>{' '}
          &amp; <Link to={LocationToPath[Location.HelpResults]}>Help</Link>
        </li>
        <li>
          <Link
            to={{
              pathname: LocationToPath[Location.HelpResults],
              search: '?query=*&facets=category:manual',
            }}
          >
            UniProtKB manual
          </Link>
        </li>
        <li>
          <Link
            to={generatePath(LocationToPath[Location.HelpEntry], {
              accession: 'technical',
            })}
          >
            Technical corner
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: LocationToPath[Location.HelpResults],
              search: '?query=*&facets=category:biocuration',
            }}
          >
            Expert biocuration
          </Link>
        </li>
        <li>
          <Link to={LocationToPath[Location.UniProtKBStatistics]}>
            Statistics
          </Link>
        </li>
      </ul>
    </li>
  </ul>
);

const FooterContactAndElixir = () => (
  <div className={footer['contact-elixir']}>
    <Contact />
    <p>
      <ExternalLink
        noIcon
        url="https://www.elixir-europe.org/platforms/data/core-data-resources"
      >
        UniProt is an ELIXIR core data resource
        <img
          src={ElixirCDRLogo}
          loading="lazy"
          alt=""
          width="115"
          height="115"
        />
      </ExternalLink>
      <ExternalLink
        noIcon
        url="https://www.coretrustseal.org/wp-content/uploads/2020/05/UniProt.pdf"
        title="Core Trust Seal assessment information"
      >
        <img src={CTSLogo} loading="lazy" alt="" width="425" height="401" />
      </ExternalLink>
    </p>
    <p>
      <ExternalLink
        noIcon
        url="https://globalbiodata.org/scientific-activities/global-core-biodata-resources/"
      >
        UniProt is a GBC global core biodata resource
        <img src={GBCGCBRLogo} loading="lazy" alt="" width="270" height="115" />
      </ExternalLink>
    </p>
  </div>
);

const FooterFunding = () => (
  <div className={footer.funding}>
    <span>
      Main{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'about',
        })}
      >
        funding
      </Link>{' '}
      by:
    </span>
    <ExternalLink noIcon url="https://www.nih.gov/">
      National Institutes of Health
    </ExternalLink>
    <ExternalLink
      noIcon
      url="https://www.embl.org/"
      title="European Molecular Biology Laboratory"
    >
      <img src={EMBLEBILogo} width="156" height="48" loading="lazy" alt="" />
    </ExternalLink>
    <ExternalLink
      noIcon
      url="https://www.sbfi.admin.ch/sbfi/en/home.html"
      title="State Secretariat for Education, Research and Innovation SERI"
    >
      <img src={SERILogo} width="288" height="48" loading="lazy" alt="" />
    </ExternalLink>
  </div>
);

const UniProtFooter = memo<HTMLAttributes<HTMLElement>>(
  ({ className, ...props }) => (
    <footer className={cn(className, footer.footer)} {...props}>
      <div className="hero-container uniprot-grid uniprot-grid--centered uniprot-grid--with-bleed">
        <FooterConsortium />
        <ReleaseInfoSection />
        <FooterCopyrightAndMisc />
        <FooterShortcuts />
        <FooterContactAndElixir />
        <FooterFunding />
      </div>
    </footer>
  )
);

export default UniProtFooter;
