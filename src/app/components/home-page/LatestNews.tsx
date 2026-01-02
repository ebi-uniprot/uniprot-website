import cn from 'classnames';
import { Chip, HeroContainer } from 'franklin-sites';
import { generatePath, Link } from 'react-router-dom';

import ExternalLink from '../../../shared/components/ExternalLink';
import { Location, LocationToPath } from '../../config/urls';
import styles from './styles/non-critical.module.scss';

// TODO: Dynamically load content (TRM-25618 & TRM-25619)

const insideUniProtAbstract1 =
  'Antimicrobial resistance contributes to almost 5 million deaths annually, worldwide. To mark World AMR Awareness Week...';

const insideUniProtAbstract2 =
  'How many members do you have on your team and have you ever considered UniProt as one of them?';

const proteinSpotlightAbstract =
  'As I crossed Geneva this morning and approached the office, I felt a growing sadness. I realised that, if I was walking in this direction in the first place, it was thanks to Amos Bairoch.';

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
                    accession: '2025-10-15-release',
                  })}
                >
                  UniProt release 2025_04
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                The strange case of the Cheetah and Leopard proteomes |
                UniProtKB/Swiss-Prot not updated in release 2025_04...
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
            url="https://insideuniprot.blogspot.com/2025/11/germ-warfare-arsenal-of-antimicrobial.html"
            noIcon
            aria-hidden="true"
            tabIndex={-1}
          >
            <img
              loading="lazy"
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPhueF7GaqM1eZpOU9xGZBkx6Sw_uwFI66eigkahrFVm74QmISsgDrKs6CWL4uEjfgQoxZirkOHhU8RsUXNzzra6WWiKrNTOuWiVqD_PaHBLsIIQmTiGO86yyKn-aKMWuZCnnbfMije4X7fBfMP5rPuxz70WUUwM0fbPOgWmzKgr9F96i4yo0i9cgheDoD/s1280/AMR_blog1.png"
              style={{ background: 'white' }}
              alt=""
              width="184.305"
              height="96"
            />
          </ExternalLink>
          <h3 className="tiny">
            <ExternalLink
              url="https://insideuniprot.blogspot.com/2025/11/germ-warfare-arsenal-of-antimicrobial.html"
              noIcon
            >
              Germ Warfare: Arsenal of Antimicrobial Resistance Proteins in
              UniProt
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
            url="https://insideuniprot.blogspot.com/2025/09/using-uniprotkb-to-navigate-large-and.html"
            noIcon
            aria-hidden="true"
            tabIndex={-1}
          >
            <img
              loading="lazy"
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiGpOH8Kn5qgGPBDK_qSSxDEU_ddihIo6bQjYf5DnSRGhhEvN4oICW9NLMlYL1rpN6H6vOD043jciygkXxSbGPc_z-0V7AjfHLYurZr2bG-7WHyeVItlY48nsW_PFiBgH_W8hm_Ar3Zn2OrPvPn3Vg4YiIDJNl7E5gyv2YbAgkANwcxvwh1JOcSrt1pIZY/s320/Figure1.png"
              style={{ background: 'white' }}
              alt=""
              width="184.305"
              height="96"
            />
          </ExternalLink>
          <h3 className="tiny">
            <ExternalLink
              url="https://insideuniprot.blogspot.com/2025/09/using-uniprotkb-to-navigate-large-and.html"
              noIcon
            >
              Using UniProtKB to navigate large and complex structures
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
            url="https://www.proteinspotlight.org/back_issues/286/"
            noIcon
          >
            A tribute
          </ExternalLink>
        </h3>
        <ExternalLink
          url="https://www.proteinspotlight.org/back_issues/286/"
          noIcon
          aria-hidden="true"
          tabIndex={-1}
        >
          <img
            loading="lazy"
            src="https://www.proteinspotlight.org/spotlight/images/sptlt286.jpg"
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
