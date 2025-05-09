import cn from 'classnames';
import { Chip, HeroContainer } from 'franklin-sites';
import { generatePath, Link } from 'react-router-dom';

import ExternalLink from '../../../shared/components/ExternalLink';
import { Location, LocationToPath } from '../../config/urls';
import styles from './styles/non-critical.module.scss';

// TODO: Dynamically load content (TRM-25618 & TRM-25619)
const insideUniProtAbstract1 =
  'Mammalian immune responses are mediated by interactions between antigens and immune system components such as antibodies, B cells, and T cells';

const insideUniProtAbstract2 =
  'In recent years a wealth of information has become available about genetic variations that underlie various diseases, especially cancer.';

const proteinSpotlightAbstract =
  'Spermatozoa. There are no other cells in humans - or indeed in any other animals - that have the capacity to wriggle and move forward the way spermatozoa do. Blood cells may dash around our bodies but they can only do so because they are swept up in the pulse and flow of blood...';

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
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2024-05-29-release',
                  })}
                >
                  UniProt release 2024_03
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                The culprit for extreme morning sickness identified | Removal of
                the cross-references to Genevisible | Removal of the
                cross-references to SWISS-2DPAGE
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
            url="https://insideuniprot.blogspot.com/2025/05/rich-epitope-information-comes-to.html"
            noIcon
            aria-hidden="true"
            tabIndex={-1}
          >
            <img
              loading="lazy"
              src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXd1s6fiajiMzEs5LbVFoTwb3hDXN-kCrUx9GWBrP5ZnvCE4t_f-1Vp1A8cM3qq9eowxZjlWdVy-dm1z2HNlkZnlAlNP5WcegaJvaYeQAawIMh6QGJ-JAirapMPWdp_G9XS8m2He7g=w571-h541?key=jfJMcOebpi8n6A4ZKBU-RSi0"
              alt=""
              width="184.305"
              height="96"
            />
          </ExternalLink>
          <h3 className="tiny">
            <ExternalLink
              url="https://insideuniprot.blogspot.com/2025/05/rich-epitope-information-comes-to.html"
              noIcon
            >
              Rich Epitope Information Comes to UniProt
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
            url="https://www.proteinspotlight.org/back_issues/279/"
            noIcon
          >
            A dark kinase
          </ExternalLink>
        </h3>
        <ExternalLink
          url="https://www.proteinspotlight.org/back_issues/279/"
          noIcon
          aria-hidden="true"
          tabIndex={-1}
        >
          <img
            loading="lazy"
            src="https://www.proteinspotlight.org/spotlight/images/sptlt279.jpg"
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
