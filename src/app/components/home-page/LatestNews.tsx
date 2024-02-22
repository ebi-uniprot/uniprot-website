import { Chip, HeroContainer } from 'franklin-sites';
import cn from 'classnames';
import { generatePath, Link } from 'react-router-dom';

import ExternalLink from '../../../shared/components/ExternalLink';

import { LocationToPath, Location } from '../../config/urls';

import styles from './styles/non-critical.module.scss';

// TODO: Dynamically load content (TRM-25618 & TRM-25619)

const insideUniProtAbstract1 =
  'In recent years a wealth of information has become available about genetic variations that underlie various diseases, especially cancer.';

const insideUniProtAbstract2 =
  'A conversation with machine learning engineer Andreea Gane. At UniProt we are very interested in engaging with the machine learning community';

const proteinSpotlightAbstract =
  'Scents communicate. Wrapped in silence perhaps, yet they have much to say. They may revolt us or delight us, go unnoticed or do nothing for us, but scents always have something to convey. So much so that many of us dab a little perfume on the nape of our neck or spray eau de toilette on our torso at the start of each day. We want to smell nice, or at the very least clean.';

const getWordsUpTo = (text: string, max: number) => {
  let output = '';

  for (const word of text.split(' ')) {
    if (output.length + word.length + 1 > max) {
      output += '…';
      break;
    }
    output += `  ${word}`;
  }

  return output;
};

// eslint-disable-next-line arrow-body-style
const LatestNews = () => {
  // CORS issues if using those directly
  // const proteinSpotlightData = useDataApi<string>(
  //   'https://www.proteinspotlight.org/atom.xml'
  // );
  // const insideUniProtData = useDataApi<string>(
  //   'https://www.blogger.com/feeds/2163876227102975905/posts/default'
  // );

  // TODO: implement part of TRM-28342
  // const { data, loading, error, status, progress } = useDataApi<
  //   HelpSearchResponse
  // >(
  //   news.search({query: '*'})
  // );

  // Implement logic to not show release notes under progress for the upcoming release

  return (
    <HeroContainer
      className={cn(
        'uniprot-grid',
        'uniprot-grid--centered',
        'uniprot-grid--with-bleed',
        styles['home-page-section'],
        styles['latest-news']
      )}
      titleClassName="uniprot-grid-cell--span-12"
      noSidePadding
    >
      <div
        className={cn(
          'uniprot-grid-cell--small-span-12',
          'uniprot-grid-cell--medium-span-4',
          'uniprot-grid-cell--medium-offset-9',
          styles['latest-news__news-roll']
        )}
      >
        <div className={styles['latest-news__news-roll-heading']}>
          <h2>Latest News</h2>
          <Link to={generatePath(LocationToPath[Location.ReleaseNotesResults])}>
            <small>View release archive</small>
          </Link>
        </div>
        <ul className="no-bullet">
          {/* TODO Display news dynamically using API after sorting out the article content */}
          {/* {data.results.map((release) => (
            <li key={release.id}>
              <article>
                <h3 className="tiny">
                  <Link
                    to={generatePath(
                      LocationToPath[Location.ReleaseNotesEntry],
                      {
                        accession: release.id,
                      }
                    )}
                  >
                    {release.title}
                  </Link>
                </h3>
                <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                Article content
              </p>
              </article>
            </li>
          ))} */}
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: 'forthcoming-changes',
                  })}
                >
                  Forthcoming changes
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                Planned changes for UniProt
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2024-01-24-release',
                  })}
                >
                  UniProt release 2024_01
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                Vitamin K beyond coagulation | Cross-references to EMDB |
                Cross-references to JaponicusDB | Changes to the controlled
                vocabulary...
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2023-11-08-release',
                  })}
                >
                  UniProt release 2023_05
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                Hush, little ribosome | Cross-references to Pumba | Changes to
                the controlled vocabulary of human diseases
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2023-09-13-release',
                  })}
                >
                  UniProt release 2023_04
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                Some like it hot | Change of the cross-references to TAIR |
                Change of the cross-references to TIGRFAMs: replaced by NCBIfam
                | Change of evidence code for the ProtNLM method
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2023-06-28-release',
                  })}
                >
                  UniProt release 2023_03
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                The fair price of an (ant) lunch | Changes to the controlled
                vocabulary of human diseases | Changes to the controlled
                vocabulary for PTMs
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2023-05-03-release',
                  })}
                >
                  UniProt release 2023_02
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                Levering the DNA | Changes in prokaryotic taxonomy | Changes to
                the controlled vocabulary of human diseases
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2023-03-01-release',
                  })}
                >
                  UniProt release 2023_01
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                Killing me softly | Cross-references to GlyCosmos | Change to
                the cross-references to Gene3D | Changes to the controlled...
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2022-12-14-release',
                  })}
                >
                  UniProt release 2022_05
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                Plant adaptation to global warming through epigenetic memory |
                Cross-references to AGR | Changes to the controlled...
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2022-10-12-release',
                  })}
                >
                  UniProt release 2022_04
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                The (phenolic) Rings of Power | UniProtKB news: Protein
                embeddings | Changes to the controlled vocabulary of human
                diseases | Changes to the controlled vocabulary for PTMs
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2022-08-03-release',
                  })}
                >
                  UniProt release 2022_03
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                Not just for proteins: new targets for ADP-ribosylation |
                Annotation of biologically relevant ligands in UniProtKB using
                ChEBI | Changes to the controlled vocabulary of human
                diseases...
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2022-05-25-release',
                  })}
                >
                  UniProt release 2022_02
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                Prenylation for antiviral activity | Cross-references to
                AlphaFoldDB | Version numbers for identifiers in Ensembl
                cross-references in Uni...
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2022-02-23-release',
                  })}
                >
                  UniProt release 2022_01
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                A phospholipase for clear vision | Cross-references to
                MANE-Select
              </p>
            </article>
          </li>
        </ul>
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--small-span-12',
          'uniprot-grid-cell--medium-span-4',
          'uniprot-grid-cell--medium-offset-5',
          styles['latest-news__blogspot']
        )}
      >
        <article>
          <ExternalLink
            url="https://insideuniprot.blogspot.com/2023/05/usinguniprot-discanvis-interpreting.html"
            noIcon
            aria-hidden="true"
            tabIndex={-1}
          >
            <img
              loading="lazy"
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh05-yWBZ5nDjx--3jyDMr5jla5tF8yAN2ITooYxlmd7I8WCri6rz3V3kDA35i0JYVcA_TIMWAp_BLDO9svprXjw1hk_Ohq4tx76C9MTz6LXmXrExCXoHZWYe5VPwZrdGxk0g4rWSwmQ9gL1WOA_kkqvQaWJuAXAU3zni9xdxG7c3yBCW9Wyl9yQy8W/s512/blog1.png"
              style={{ background: 'white' }}
              alt=""
              width="184.305"
              height="96"
            />
          </ExternalLink>
          <h3 className="tiny">
            <ExternalLink
              url="https://insideuniprot.blogspot.com/2023/05/usinguniprot-discanvis-interpreting.html"
              noIcon
            >
              #UsingUniProt - DisCanVis interpreting genomic variation data
            </ExternalLink>
          </h3>
          <p
            className={cn(
              styles['latest-news__abstract'],
              styles['latest-news__abstract--4-lines']
            )}
          >
            {insideUniProtAbstract1}
          </p>
        </article>
        <article>
          <ExternalLink
            url="http://insideuniprot.blogspot.com/2022/12/how-artificial-intelligence-can-help-us.html"
            noIcon
            aria-hidden="true"
            tabIndex={-1}
          >
            <img
              loading="lazy"
              src="https://github.com/ebi-uniprot/uniprot-manual/blob/main/images/protnlm-schematic-3.png?raw=true"
              style={{ background: 'white' }}
              alt=""
              width="184.305"
              height="96"
            />
          </ExternalLink>
          <h3 className="tiny">
            <ExternalLink
              url="http://insideuniprot.blogspot.com/2022/12/how-artificial-intelligence-can-help-us.html"
              noIcon
            >
              How artificial intelligence can help us annotate protein names
            </ExternalLink>
          </h3>
          <p
            className={cn(
              styles['latest-news__abstract'],
              styles['latest-news__abstract--4-lines']
            )}
          >
            {insideUniProtAbstract2}
          </p>
        </article>
      </div>
      <article
        className={cn(
          'uniprot-grid-cell--small-span-12',
          'uniprot-grid-cell--medium-span-4',
          'uniprot-grid-cell--medium-offset-1',
          styles['latest-news__spotlight']
        )}
      >
        <Chip>
          <ExternalLink url="https://www.proteinspotlight.org" noIcon>
            <span className={styles['ps-logo-protein-color']}>protein</span>{' '}
            <span className={styles['ps-logo-spotlight-color']}>spotlight</span>
          </ExternalLink>
        </Chip>
        <h3>
          <ExternalLink
            url="https://www.proteinspotlight.org/back_issues/266/"
            noIcon
          >
            Fierce
          </ExternalLink>
        </h3>
        <ExternalLink
          url="https://www.proteinspotlight.org/back_issues/266/"
          noIcon
          aria-hidden="true"
          tabIndex={-1}
        >
          <img
            loading="lazy"
            src="https://www.proteinspotlight.org/spotlight/images/sptlt266.jpg"
            alt=""
            width="123"
            height="129"
          />
        </ExternalLink>
        <p className={cn(styles['latest-news__abstract'])}>
          {getWordsUpTo(proteinSpotlightAbstract, 300)}
        </p>
      </article>
    </HeroContainer>
  );
};

export default LatestNews;
