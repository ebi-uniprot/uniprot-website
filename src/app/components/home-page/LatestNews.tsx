import { Chip, HeroContainer } from 'franklin-sites';
import cn from 'classnames';
import { generatePath, Link } from 'react-router-dom';

import ExternalLink from '../../../shared/components/ExternalLink';

import { LocationToPath, Location } from '../../config/urls';

import styles from './styles/non-critical.module.scss';

// TODO: Dynamically load content (TRM-25618 & TRM-25619)

const insideUniProtAbstract1 =
  'A conversation with machine learning engineer Andreea Gane. At UniProt we are very interested in engaging with the machine learning community';

const insideUniProtAbstract2 =
  'UniProt is brought to you by a large team of dedicated scientists who have worked for over 20 years to produce a comprehensive view of protein sequence and biology.';

const proteinSpotlightAbstract =
  'Stress. We know what it feels like. Though we may be the only living organism to have turned it into a fertile and imaginative piece of conversation, every single living species on this planet is prone to stress and its effects.';

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
  // const proteinsSpotlightData = useDataApi<string>(
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
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2021-11-17-release',
                  })}
                >
                  UniProt release 2021_04
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                ZTGC: bacteriophages reinvent the DNA alphabet
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
            {insideUniProtAbstract1}
          </p>
        </article>
        <article>
          <ExternalLink
            url="https://insideuniprot.blogspot.com/2022/02/metrics-metrics-metrics-measuring.html"
            noIcon
            aria-hidden="true"
            tabIndex={-1}
          >
            <img
              loading="lazy"
              src="data:image/png;base64,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"
              alt=""
              width="184.305"
              height="96"
            />
          </ExternalLink>
          <h3 className="tiny">
            <ExternalLink
              url="https://insideuniprot.blogspot.com/2022/02/metrics-metrics-metrics-measuring.html"
              noIcon
            >
              Metrics, metrics, metrics: Measuring the Impact of UniProt
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
            url="https://www.proteinspotlight.org/back_issues/253/"
            noIcon
          >
            A heated legacy
          </ExternalLink>
        </h3>
        <ExternalLink
          url="https://www.proteinspotlight.org/back_issues/253/"
          noIcon
          aria-hidden="true"
          tabIndex={-1}
        >
          <img
            loading="lazy"
            src="https://www.proteinspotlight.org/spotlight/images/sptlt253.jpg"
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
