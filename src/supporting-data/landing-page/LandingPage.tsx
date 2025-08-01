import cn from 'classnames';
import { Button } from 'franklin-sites';
import { ChangeEvent, useEffect, useId, useRef } from 'react';
import { generatePath, Link } from 'react-router-dom';

import { Location, LocationToPath } from '../../app/config/urls';
import { useFormLogic } from '../../contact/adapters/contactFormAdapter';
import SupportingDataIllustration from '../../images/Supporting_data_illustration.jpg';
import ExternalLink from '../../shared/components/ExternalLink';
import HTMLHead from '../../shared/components/HTMLHead';
import { SingleColumnLayout } from '../../shared/components/layouts/SingleColumnLayout';
import styles from './styles/landing-page.module.scss';

const metaDescription =
  'Supporting data enhances UniProt by providing curated and automated datasets that enrich protein entries with detailed annotations, including keywords, localization, functions, taxonomy, and literature citations.';

const LandingPage = () => {
  const formId = useId();

  const { handleSubmit, handleChange, sending } = useFormLogic();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === '#integration-form' && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity(
      e.target.checked ? '' : 'Please tick the box to agree.'
    );
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity(
      e.target.value.trim().length >= 3
        ? ''
        : 'Please enter more details about the database'
    );
  };

  return (
    <SingleColumnLayout>
      <div className={styles['landing-page']}>
        <HTMLHead title="Supporting data">
          <meta name="description" content={metaDescription} />
        </HTMLHead>
        <section className="uniprot-grid">
          <h1 className="uniprot-grid-cell--span-12">Supporting data</h1>
          <div
            className={cn(
              'uniprot-grid-cell--small-span-12',
              'uniprot-grid-cell--medium-span-4',
              styles['image-container']
            )}
          >
            <img src={SupportingDataIllustration} alt="Supporting data" />
          </div>
          <div className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-8">
            The Supporting data presented within this page enhances the
            functionality of UniProt by providing curated and automatically
            generated datasets that enrich protein entries with detailed
            information. Supporting data includes keywords, subcellular
            locations, automatic annotation rules, human diseases, taxonomy,
            cross-referenced databases and literature citations. By integrating
            this data, it allows researchers to explore proteins more
            comprehensively, uncovering their roles, interactions, and
            evolutionary significance. Supporting data serves as a vital
            resource for making UniProt entries more informative and accessible
            for biological and biomedical research.
          </div>

          {/* Categories */}
          <h2 className="uniprot-grid-cell--span-12">Datasets</h2>
          {/* Keywords */}
          <div className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-4">
            <h3 data-article-id="keywords">Keywords</h3>
            <div className={styles.category}>
              Keywords in UniProt provide standardized terms that summarize the
              main features and attributes of a protein entry. Categories
              include: Biological Process, Molecular Function, Technical Terms,
              Ligands and Cofactors, and Applications.
            </div>
            <Link
              to={{
                pathname: LocationToPath[Location.KeywordsResults],
                search: 'query=*',
              }}
            >
              Start searching »
            </Link>
          </div>

          {/* Subcellular Location */}
          <div className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-4">
            <h3 data-article-id="subcellular_location">
              Subcellular locations
            </h3>
            <div className={styles.category}>
              Specifies where the protein is located within a cell or organism,
              providing insight into its potential role. Experimental evidence
              or computational predictions supporting the localization are often
              included.
            </div>
            <Link
              to={{
                pathname: LocationToPath[Location.LocationsResults],
                search: 'query=*',
              }}
            >
              Start searching »
            </Link>
          </div>

          {/* Automatic annotation rules*/}
          <div
            className={cn(
              'uniprot-grid-cell--small-span-12',
              'uniprot-grid-cell--medium-span-6',
              styles['automatic-annotations']
            )}
          >
            <h3 data-article-id="automatic_annotation">
              Automatic annotation rules
            </h3>
            <div>
              Automatic annotations in UniProt provides functional and
              structural insights for protein sequences and supplements manually
              curated data using two key systems: UniRule and ARBA.
            </div>

            <div>
              <h4 data-article-id="unirule">UniRule</h4>
              <div>
                A manually curated rule-based system that delivers
                high-confidence annotations for well-characterized protein
                families based on experimental evidence and domain information.
              </div>
              <Link to={LocationToPath[Location.UniRuleResults]}>
                Start searching in UniRule »
              </Link>
            </div>

            <div>
              <h4 data-article-id="arba">ARBA</h4>
              <div>
                An automated system that uses computationally generated rules to
                annotate a broader range of protein sequences, including those
                with less-established functional data.
              </div>
              <Link to={LocationToPath[Location.ARBAResults]}>
                Start searching in ARBA »
              </Link>
            </div>
          </div>

          {/* Human Diseases */}
          <div className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-4">
            <h3 data-article-id="controlled_vocabulary#human-diseases">
              Human diseases
            </h3>
            <div className={styles.category}>
              Provides insights into the relationship between proteins and human
              health. Includes disease annotations, pathogenesis information,
              variants linked to diseases, and links to drug databases.
            </div>
            <Link
              to={{
                pathname: LocationToPath[Location.DiseasesResults],
                search: 'query=*',
              }}
            >
              Start searching »
            </Link>
          </div>

          {/* Taxonomy */}
          <div className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-4">
            <h3 data-article-id="taxonomy">Taxonomy</h3>
            <div className={styles.category}>
              Classification of organisms according to the{' '}
              <ExternalLink url="https://www.ncbi.nlm.nih.gov/taxonomy">
                NCBI taxonomy database
              </ExternalLink>
              , supplemented with data specific to UniProt.
            </div>
            <Link
              to={{
                pathname: LocationToPath[Location.TaxonomyResults],
                search: 'query=*',
              }}
            >
              Start searching »
            </Link>
          </div>

          {/* Cross-referenced Databases */}
          <div className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-8">
            <h3 data-article-id="cross_references_section">
              Cross-referenced databases
            </h3>
            <div className={styles.category}>
              Links to databases like PDB (Protein Data Bank), Gene Ontology
              (GO), Ensembl, and RefSeq.
            </div>
            <Link
              to={{
                pathname: LocationToPath[Location.DatabaseResults],
                search: 'query=*',
              }}
            >
              Start searching »
            </Link>

            {/* Data integration form */}
            <h4 className={styles['form-title']} ref={formRef}>
              Expand your reach: connect your database with UniProt
            </h4>
            <div>
              If you would like your database to be linked with UniProt to
              expand its integration with protein-related data, please fill out
              this form, and a member of our team will be in contact.
            </div>
            <form
              aria-label="Data integration form"
              onSubmit={handleSubmit}
              id="integration-form"
            >
              {/* Name */}
              <label htmlFor={`name-${formId}`}>Submitter&apos;s name *</label>
              <input
                type="text"
                name="name"
                placeholder=" "
                id={`name-${formId}`}
                maxLength={100}
                onChange={handleChange}
                required
              />
              {/* Email */}
              <label htmlFor={`email-${formId}`}>Contact email *</label>
              <input
                type="email"
                name="email"
                placeholder="myemail@example.com"
                id={`email-${formId}`}
                required
                minLength={4}
                maxLength={100}
                onChange={handleChange}
              />
              {/* Database name */}
              <label htmlFor={`subject-${formId}`}>Database name *</label>
              <input
                type="text"
                name="subject"
                placeholder=" "
                id={`subject-${formId}`}
                required
                maxLength={100}
                onChange={handleChange}
              />
              {/* Message */}
              <label htmlFor={`message-${formId}`}>Message *</label>
              <textarea
                name="message"
                placeholder="My message"
                id={`message-${formId}`}
                required
                minLength={1}
                rows={5}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                  handleTextareaChange(event);
                  handleChange(event);
                }}
              />
              <textarea
                name="context"
                id={`context-${formId}`}
                value="This is a message from the cross-reference form in the supporting data landing page"
                readOnly
                data-hj-allow
              />
              {/* Privacy */}
              <label className={styles.privacy}>
                <input
                  type="checkbox"
                  name="privacy"
                  required
                  onChange={handleCheckboxChange}
                />
                I agree to the processing of my data for the purposes described
                in this{' '}
                <Link
                  to={generatePath(LocationToPath[Location.HelpEntry], {
                    accession: 'privacy',
                  })}
                >
                  privacy notice
                </Link>
                .
                <span aria-hidden="true" className={styles.required}>
                  {' '}
                  *
                </span>
              </label>
              {/* 🍯 */}
              <input
                type="text"
                name="requiredForRobots"
                // Make sure it's NOT reachable, on purpose
                tabIndex={-1}
                aria-hidden="true"
              />
              <Button
                type="submit"
                disabled={sending}
                className={styles['submit-button']}
              >{`Send${sending ? 'ing' : ''} message`}</Button>
            </form>
          </div>

          {/* Literature Citations */}
          <div
            className={cn(
              'uniprot-grid-cell--small-span-12',
              'uniprot-grid-cell--medium-span-4',
              styles.citations
            )}
          >
            <h3 data-article-id="literature_references">
              Literature citations
            </h3>
            <div className={styles.category}>
              Direct references to scientific studies supporting protein
              annotations. Includes experimental evidence such as enzymatic
              activities, protein interactions, or structural data.
            </div>
            <Link
              to={{
                pathname: LocationToPath[Location.CitationsResults],
                search: 'query=*',
              }}
            >
              Start searching »
            </Link>
          </div>
        </section>
      </div>
    </SingleColumnLayout>
  );
};

export default LandingPage;
