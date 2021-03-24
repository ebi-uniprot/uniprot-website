import { memo, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { CitedIcon, EnvelopeIcon, ExternalLink } from 'franklin-sites';

import { Location, LocationToPath } from '../../../app/config/urls';

import './styles/footer.scss';

import UniProtLogo from '../../../images/uniprot-logo.svg';

import EMBLEBILogo from '../../../images/embl-ebi-logo.svg';
import PIRLogo from '../../../images/pir-logo.jpg';
import SIBLogo from '../../../images/sib-logo.png';

import TwitterLogo from '../../../images/twitter-logo.svg';
import FacebookLogo from '../../../images/facebook-logo.svg';
import YouTubeLogo from '../../../images/youtube-logo.svg';
import BloggerLogo from '../../../images/blogger-logo.svg';
import GGroupsLogo from '../../../images/ggroups-logo.svg';

import SERILogo from '../../../images/seri-logo.png';

import ElixirCDRLogo from '../../../images/elixir-cdr.png';
import CTSLogo from '../../../images/core-trust-seal-logo.png';
import ReleaseInfo from './ReleaseInfo';

const FooterConsortium = () => (
  <div className="consortium">
    <Link
      to={LocationToPath[Location.Home]}
      className="consortium__uniprot"
      title="UniProt home page"
    >
      <UniProtLogo />
    </Link>
    <div className="consortium__members">
      <ExternalLink
        noIcon
        url="https://www.ebi.ac.uk/"
        title="European Bioinformatics Institute"
      >
        <EMBLEBILogo />
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
  <div className="copyright-misc">
    <p>
      <Link to="/help/about">
        © 2002 – {new Date().getFullYear()} UniProt consortium
      </Link>
    </p>
    <p>
      <Link to="/help/license">License &amp; Disclaimer</Link> |{' '}
      <Link to="/help/privacy">Privacy Notice</Link>
    </p>
    <p>
      <ReleaseInfo />
    </p>
  </div>
);

const FooterShortcuts = () => (
  <ul className="no-bullet shortcuts">
    <li>
      <span className="shortcuts__title">Core data</span>
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
      <span className="shortcuts__title">Supporting data</span>
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
    <li>
      <span className="shortcuts__title">Tools</span>
      <ul className="no-bullet">
        <li>
          <Link to={LocationToPath[Location.Blast]}>BLAST</Link>
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
      <span className="shortcuts__title">Information</span>
      <ul className="no-bullet">
        <li>
          <Link to="/">
            Cite{' '}
            <span className="no-wrap">
              UniProt&nbsp;
              <sup>
                <CitedIcon width="1.5ch" />
              </sup>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">About</Link> &amp; <Link to="/">Help</Link>
        </li>
        <li>
          <Link to="/">UniProtKB manual</Link>
        </li>
        <li>
          <Link to="/">Technical corner</Link>
        </li>
        <li>
          <Link to="/">Expert biocuration</Link>
        </li>
        <li>
          <Link to="/">Statistics</Link>
        </li>
      </ul>
    </li>
  </ul>
);

const FooterContactAndElixir = () => (
  <div className="contact-elixir">
    <p>
      <Link to="/contact">
        Get in touch <EnvelopeIcon width="2ch" />
      </Link>
    </p>
    <p className="social">
      <ExternalLink
        noIcon
        url="https://twitter.com/uniprot"
        title="UniProt posts on Twitter"
      >
        <TwitterLogo />
      </ExternalLink>
      <ExternalLink
        noIcon
        url="https://www.facebook.com/uniprot.org"
        title="UniProt posts on Facebook"
      >
        <FacebookLogo />
      </ExternalLink>
      <ExternalLink
        noIcon
        url="https://www.youtube.com/user/uniprotvideos"
        title="UniProt videos on YouTube"
      >
        <YouTubeLogo />
      </ExternalLink>
      <ExternalLink
        noIcon
        url="https://insideuniprot.blogspot.com/"
        title="UniProt blog"
      >
        <BloggerLogo />
      </ExternalLink>
      <ExternalLink
        noIcon
        url="https://groups.google.com/forum/#!forum/ebi-proteins-api"
        title="UniProt Google Group"
      >
        <GGroupsLogo />
      </ExternalLink>
    </p>
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
  </div>
);

const FooterFunding = () => (
  <div className="funding">
    <span>
      Main <Link to="/help/about">funding</Link> by:
    </span>
    <ExternalLink noIcon url="https://www.nih.gov/">
      National Institutes of Health
    </ExternalLink>
    <ExternalLink
      noIcon
      url="https://www.embl.org/"
      title="European Molecular Biology Laboratory"
    >
      <EMBLEBILogo height="2.5em" width="8.11em" />
    </ExternalLink>
    <ExternalLink
      noIcon
      url="https://www.sbfi.admin.ch/sbfi/en/home.html"
      title="State Secretariat for Education, Research and Innovation SERI"
    >
      <img src={SERILogo} loading="lazy" alt="" />
    </ExternalLink>
  </div>
);

const UniProtFooter = memo<HTMLAttributes<HTMLElement>>(
  ({ className, ...props }) => (
    <footer className={cn(className, 'footer')} {...props}>
      <div className="hero-container uniprot-grid uniprot-grid--centered uniprot-grid--with-bleed hero-container--side-padding">
        <FooterConsortium />
        <FooterCopyrightAndMisc />
        <FooterShortcuts />
        <FooterContactAndElixir />
        <FooterFunding />
      </div>
    </footer>
  )
);

export default UniProtFooter;
