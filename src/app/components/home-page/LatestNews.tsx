import cn from 'classnames';
import { Chip, HeroContainer } from 'franklin-sites';
import { generatePath, Link } from 'react-router';

import ExternalLink from '../../../shared/components/ExternalLink';
import { Location, LocationToPath } from '../../config/urls';
import styles from './styles/non-critical.module.scss';

// TODO: Dynamically load content (TRM-25618 & TRM-25619)
const insideUniProtAbstract1 =
  'How many members do you have on your team and have you ever considered UniProt as one of them?';

const insideUniProtAbstract2 =
  'Advances in genome sequencing technology means that large-scale efforts such as the Earth Biogenome project and the Darwin Tree of Life';

const proteinSpotlightAbstract =
  "The nice thing about shampoo is the foam it produces. When it doesn't, we usually add a little more to froth things up - because foam is a very pleasant part of the procedure...";

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
      headingClassName="uniprot-grid-cell--span-12"
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
                    accession: '2025-06-18-release',
                  })}
                >
                  UniProt release 2025_03
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                Cross-references to CARD | Cross-references to FunCoup |
                Cross-references to PAN-GO
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2025-04-23-release',
                  })}
                >
                  UniProt release 2025_02
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                Brain property: no trespassing | Cross-references to CD-CODE |
                Cross-references to STRENDA-DB | Cross-references to YCharOS
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2025-02-05-release',
                  })}
                >
                  UniProt release 2025_01
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                The &apos;dark&apos; side of male contraception | Changes to the
                controlled vocabulary of human diseases | Changes to the...
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2024-11-27-release',
                  })}
                >
                  UniProt release 2024_06
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                What happens when ribosomes crash | Cross-references to FunFam |
                Cross-references to AntiFam
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2024-10-02-release',
                  })}
                >
                  UniProt release 2024_05
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                Plasma membrane rupture during cell death: from a passive
                hypothesis to an active process | Changes to the controlled
                vocabulary of human diseases
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2024-07-24-release',
                  })}
                >
                  UniProt release 2024_04
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                Oocyte waste disposal strategy: &#39;store to degrade later&#39;
                | Removal of the cross-references to CLAE | Removal of the
                cross-references to COMPLUYEAST-2DPAGE
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
            url="https://insideuniprot.blogspot.com/2025/06/uniprot-ultimate-colleague-on-your.html"
            noIcon
            aria-hidden="true"
            tabIndex={-1}
          >
            <img
              loading="lazy"
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3OR6x6_Tx_GoAIRCHoalCg6IlBgwwrI1YlxoCtzS4J6EO_8aO5ALgMaOErbSlqPL3IXmBvCLtmPMouQB-RkK5aAHbAeM1sWF5V-k8E-6ufjNbPF2u16_s9qI8cGYKHEt8-2PWy_fZgZWdbaDcBvnQByXvf2wmVsIqY1FRyf8F8xB1CW5Jlzv1Xdvjq1g/w418-h260/scales.png"
              style={{ background: 'white' }}
              alt=""
              width="184.305"
              height="96"
            />
          </ExternalLink>
          <h3 className="tiny">
            <ExternalLink
              url="https://insideuniprot.blogspot.com/2025/06/uniprot-ultimate-colleague-on-your.html"
              noIcon
            >
              UniProt - the ultimate colleague on your biological research team!
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
            url="https://insideuniprot.blogspot.com/2025/06/capturing-diversity-of-life.html"
            noIcon
            aria-hidden="true"
            tabIndex={-1}
          >
            <img
              loading="lazy"
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirk3tkRBOtzcDOTuqYSaFrGGQ1Io-VRfUIKfUEa0C5B4DhxuQqMyYanGHhvzH9mG-i4Of2uPZuK7H7d-34yYHKv6-FVqtW-27BEt9t0EukH9ECDTgRQiuarZdYC143Nr-t1RtmD_55avFfIiGIpmjCAM4VTNM9mo739WbLH5r0D2joTOyK8q8hRfKGPhA/w400-h200/Picture1.png"
              alt=""
              width="184.305"
              height="96"
            />
          </ExternalLink>
          <h3 className="tiny">
            <ExternalLink
              url="https://insideuniprot.blogspot.com/2025/06/capturing-diversity-of-life.html"
              noIcon
            >
              Capturing the Diversity of Life - Reorganizing the Protein Space
              in UniProtKB
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
            url="https://www.proteinspotlight.org/back_issues/281/"
            noIcon
          >
            Foam etc.
          </ExternalLink>
        </h3>
        <ExternalLink
          url="https://www.proteinspotlight.org/back_issues/281/"
          noIcon
          aria-hidden="true"
          tabIndex={-1}
        >
          <img
            loading="lazy"
            src="https://www.proteinspotlight.org/spotlight/images/sptlt281.jpg"
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
