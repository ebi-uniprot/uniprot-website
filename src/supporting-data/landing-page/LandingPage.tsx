import { Link } from 'react-router-dom';
import cn from 'classnames';

import HTMLHead from '../../shared/components/HTMLHead';

import { LocationToPath, Location } from '../../app/config/urls';

import styles from './styles/landing-page.module.scss';
import { SingleColumnLayout } from '../../shared/components/layouts/SingleColumnLayout';

// import ArchiveIllustration from '../../../images/archive_illustration.img.svg';

const metaDescription =
  'The Supporting Data section enhances UniProt by providing curated and automated datasets that enrich protein entries with detailed annotations, including keywords, localization, functions, taxonomy, and literature citations.';

const LandingPage = () => {
  return (
    <SingleColumnLayout>
      <div className={styles['landing-page']}>
        <HTMLHead title="Supporting data">
          <meta name="description" content={metaDescription} />
        </HTMLHead>
        <section className="uniprot-grid">
          <h1 className="uniprot-grid-cell--span-12">Supporting Data</h1>
          <div
            className={cn(
              'uniprot-grid-cell--small-span-12',
              'uniprot-grid-cell--medium-span-4',
              styles['image-container']
            )}
          >
            {/* <img src={ArchiveIllustration} width={250} height={250} alt="" /> */}
          </div>
          <div className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-8">
            The Supporting Data section enhances the functionality of UniProt by
            providing curated and automated datasets that enrich protein entries
            with detailed information. This section covers keywords, subcellular
            localization, automatic annotations, functional insights, taxonomy
            and literature citations. By integrating these data points, it
            allows researchers to explore proteins more comprehensively,
            uncovering their roles, interactions, and evolutionary significance.
            The Supporting Data section serves as a vital resource for making
            UniProt entries more informative and accessible for biological and
            biomedical research.
          </div>

          {/* Categories */}
          <h2 className="uniprot-grid-cell--span-12">Key Categories</h2>
          {/* Keywords */}
          <div className="uniprot-grid-cell--small-span-6 uniprot-grid-cell--medium-span-4">
            <h3>
              <Link
                to={{
                  pathname: LocationToPath[Location.KeywordsResults],
                  search: 'query=*',
                }}
              >
                Keywords
              </Link>
            </h3>
            <p>
              Keywords in UniProt provide standardized terms that summarize the
              main features and attributes of a protein entry.
            </p>
            <p>
              Categories include: Biological Process, Molecular Function,
              Technical Terms, Ligands and Cofactors, and Applications.
            </p>
          </div>
          {/* Subcellular Location */}
          <div className="uniprot-grid-cell--small-span-6 uniprot-grid-cell--medium-span-4">
            <h3>
              <Link
                to={{
                  pathname: LocationToPath[Location.LocationsResults],
                  search: 'query=*',
                }}
              >
                Subcellular Location
              </Link>
            </h3>
            <p>
              Specifies where the protein is located within a cell or organism,
              providing insight into its potential role.
            </p>
            <p>
              Experimental evidence or computational predictions supporting the
              localization are often included.
            </p>
          </div>
          {/* Literature Citations */}
          <div className="uniprot-grid-cell--small-span-6 uniprot-grid-cell--medium-span-4">
            <h3>
              <Link
                to={{
                  pathname: LocationToPath[Location.CitationsResults],
                  search: 'query=*',
                }}
              >
                Literature Citations
              </Link>
            </h3>
            <p>
              Direct references to scientific studies supporting protein
              annotations.
            </p>
            <p>
              Includes experimental evidence such as enzymatic activities,
              protein interactions, or structural data.
            </p>
          </div>
          {/* Taxonomy */}
          <div className="uniprot-grid-cell--small-span-6 uniprot-grid-cell--medium-span-4">
            <h3>
              <Link
                to={{
                  pathname: LocationToPath[Location.TaxonomyResults],
                  search: 'query=*',
                }}
              >
                Taxonomy
              </Link>
            </h3>
            <p>
              Classification of the protein based on the organism of origin,
              linking to databases like NCBI Taxonomy.
            </p>
          </div>
          {/* Cross-referenced Databases */}
          <div className="uniprot-grid-cell--small-span-6 uniprot-grid-cell--medium-span-4">
            <h3>
              <Link
                to={{
                  pathname: LocationToPath[Location.DatabaseResults],
                  search: 'query=*',
                }}
              >
                Cross-referenced Databases
              </Link>
            </h3>
            <p>
              Links to databases like PDB (Protein Data Bank), Gene Ontology
              (GO), Ensembl, and RefSeq.
            </p>
          </div>
          {/* Human Diseases */}
          <div className="uniprot-grid-cell--small-span-6 uniprot-grid-cell--medium-span-4">
            <h3>
              <Link
                to={{
                  pathname: LocationToPath[Location.DiseasesResults],
                  search: 'query=*',
                }}
              >
                Human Diseases
              </Link>
            </h3>
            <p>
              Provides insights into the relationship between proteins and human
              health.
            </p>
            <p>
              Includes disease annotations, pathogenesis information, variants
              linked to diseases, and links to drug databases.
            </p>
          </div>
          {/* Automatic Annotations */}
          <div className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-8">
            <h2>Automatic Annotations</h2>
            <p>
              The Automatic Annotations section in UniProt provides functional
              and structural insights for protein sequences and supplements
              manually curated data using two key systems: UniRule and ARBA.
            </p>
            <p>
              <Link to={LocationToPath[Location.UniRuleResults]}>UniRule</Link>:
              A manually curated rule-based system that delivers high-confidence
              annotations for well-characterized protein families based on
              experimental evidence and domain information.
            </p>
            <p>
              <Link to={LocationToPath[Location.ARBAResults]}>ARBA</Link>: An
              automated system that uses computationally generated rules to
              annotate a broader range of protein sequences, including those
              with less-established functional data.
            </p>
          </div>
        </section>
      </div>
    </SingleColumnLayout>
  );
};

export default LandingPage;
