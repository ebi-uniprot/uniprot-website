import { memo, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { CitedIcon } from 'franklin-sites';

import { Location, LocationToPath } from '../../../app/config/urls';

import './styles/footer.scss';

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
          <Link>
            Cite{' '}
            <span className="no-wrap">
              UniProt&nbsp;
              <CitedIcon width="1.5ch" />
            </span>
          </Link>
        </li>
        <li>
          {/* TODO: */}
          <Link to="/">About</Link> &amp; <Link to="/">Help</Link>
        </li>
        <li>
          {/* TODO: */}
          <Link to="/">UniProtKB manual</Link>
        </li>
        <li>
          {/* TODO: */}
          <Link to="/">Technical corner</Link>
        </li>
        <li>
          {/* TODO: */}
          <Link to="/">Expert biocuration</Link>
        </li>
        <li>
          {/* TODO: */}
          <Link to="/">Statistics</Link>
        </li>
      </ul>
    </li>
  </ul>
);

const UniProtFooter = memo<HTMLAttributes<HTMLElement>>(
  ({ className, ...props }) => (
    <footer className={cn(className, 'footer')} {...props}>
      <div className="uniprot-grid uniprot-grid--centered">
        <div className="uniprot-grid-cell--span-3">left</div>
        <div className="uniprot-grid-cell--span-6">
          <FooterShortcuts />
        </div>
        <div className="uniprot-grid-cell--span-3">right</div>
      </div>
    </footer>
  )
);

export default UniProtFooter;
