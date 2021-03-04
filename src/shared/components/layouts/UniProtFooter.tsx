import { memo, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { CitedIcon, ExternalLink } from 'franklin-sites';

import { Location, LocationToPath } from '../../../app/config/urls';

import './styles/footer.scss';

import Logo from './svgs/uniprot-logo.svg';

const FooterConsortium = () => (
  <div className="consortium">
    <Link
      to={LocationToPath[Location.Home]}
      className="consortium__uniprot"
      title="UniProt home page"
    >
      <Logo />
    </Link>
    <div className="consortium__members">
      <ExternalLink
        url="https://www.ebi.ac.uk/"
        title="European Bioinformatics Institute"
      >
        EMBL-EBI
      </ExternalLink>
      <ExternalLink
        url="https://pir.georgetown.edu/"
        title="Protein Information Resource"
      >
        PIR
      </ExternalLink>
      <ExternalLink
        url="https://www.sib.swiss/"
        title="Swiss Institute of Bioinformatics"
      >
        SIB
      </ExternalLink>
    </div>
    <p>
      <Link className="copyright" to="/help/about">
        © 2002 – {new Date().getFullYear()} UniProt consortium
      </Link>
    </p>
    <p>
      <Link to="/help/license">License &amp; Disclaimer</Link> |{' '}
      <Link to="/help/privacy">Privacy Notice</Link>
    </p>
    <p>
      {/* TODO: load release info from API */}
      <Link to="/">Release YYYY_MM</Link> | <Link to="/">Statistics</Link>
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
          <Link to={LocationToPath[Location.PeptideSearch]}>
            Peptide search
          </Link>
        </li>
        <li>
          <Link to={LocationToPath[Location.IDMapping]}>
            Retrieve/ID mapping
          </Link>
        </li>
        <li className="tools-results-link">
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
      <ExternalLink url="/contact">Get in touch ✉</ExternalLink>
    </p>
    <p>
      <ExternalLink
        url="https://twitter.com/uniprot"
        title="UniProt posts on Twitter"
      >
        Twitter
      </ExternalLink>
      <ExternalLink
        url="https://www.facebook.com/uniprot.org"
        title="UniProt posts on Facebook"
      >
        FB
      </ExternalLink>
      <ExternalLink
        url="https://www.youtube.com/user/uniprotvideos"
        title="UniProt videos on YouTube"
      >
        YT
      </ExternalLink>
      <ExternalLink
        url="https://insideuniprot.blogspot.com/"
        title="UniProt blog"
      >
        Blogger
      </ExternalLink>
      {/* TODO: find if this exists */}
      <ExternalLink url="?" title="UniProt Google Group">
        Google Groups
      </ExternalLink>
    </p>
    <p>
      <ExternalLink url="https://www.elixir-europe.org/platforms/data/core-data-resources">
        UniProt is an ELIXIR core data resource
      </ExternalLink>
      <ExternalLink
        url="https://www.coretrustseal.org/wp-content/uploads/2020/05/UniProt.pdf"
        title="Core Trust Seal assessment information"
      >
        CoreTrustSeal
      </ExternalLink>
    </p>
  </div>
);

const FooterFunding = () => (
  <div className="funding">
    <span>
      Main <Link to="/help/about">funding</Link> by:
    </span>
    <ExternalLink url="https://www.nih.gov/">
      National Institutes of Health
    </ExternalLink>
    <ExternalLink
      url="https://www.embl.org/"
      title="European Molecular Biology Laboratory"
    >
      EMBL-EBI
    </ExternalLink>
    <ExternalLink
      url="https://www.sbfi.admin.ch/sbfi/en/home.html"
      title="State Secretariat for Education, Research and Innovation SERI"
    >
      SERI
    </ExternalLink>
  </div>
);

const UniProtFooter = memo<HTMLAttributes<HTMLElement>>(
  ({ className, ...props }) => (
    <footer className={cn(className, 'footer')} {...props}>
      <div className="uniprot-grid uniprot-grid--centered">
        <FooterConsortium />
        <FooterShortcuts />
        <FooterContactAndElixir />
        <FooterFunding />
      </div>
    </footer>
  )
);

export default UniProtFooter;
