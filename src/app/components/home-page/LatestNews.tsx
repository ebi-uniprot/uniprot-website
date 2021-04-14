import { HeroContainer, ExternalLink } from 'franklin-sites';
import cn from 'classnames';

// import useDataApi from '../../../shared/hooks/useDataApi';

import styles from './styles/non-critical.module.scss';

// TODO: Dynamically load content

// eslint-disable-next-line arrow-body-style
const LatestNews = () => {
  // CORS issues if using those directly
  // const proteinsSpotlightData = useDataApi<string>(
  //   'https://www.proteinspotlight.org/atom.xml'
  // );
  // const insideUniProtData = useDataApi<string>(
  //   'https://www.blogger.com/feeds/2163876227102975905/posts/default'
  // );

  // console.log(proteinsSpotlightData.data);
  // console.log(insideUniProtData);

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
      <article className="uniprot-grid-cell--span-4">Protein spotlight</article>
      <div className="uniprot-grid-cell--span-4">
        <article>
          Search with a sequence to find homologs through pairwise sequence
          alignment
        </article>
        <article>
          Search with a sequence to find homologs through pairwise sequence
          alignment
        </article>
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--span-4',
          styles['latest-news__news-roll']
        )}
      >
        <h2 className="medium">
          <ExternalLink url="https://www.uniprot.org/news?sort=created" noIcon>
            Latest News
          </ExternalLink>
        </h2>
        <ul className="no-bullet">
          <li>
            <article>
              <h3 className="tiny">
                <ExternalLink
                  url="https://www.uniprot.org/changes?sort=published"
                  noIcon
                >
                  Forthcoming changes
                </ExternalLink>
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
                <ExternalLink
                  url="https://www.uniprot.org/news/2021/04/07/release"
                  noIcon
                >
                  UniProt release 2021_02
                </ExternalLink>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                With a little help from my friend | SwissBioPics subcellular
                location visualization | Change of evidence codes for
                combinatorial evidence
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <ExternalLink
                  url="https://www.uniprot.org/news/2021/02/10/release"
                  noIcon
                >
                  UniProt release 2021_01
                </ExternalLink>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                (Almost) all about that CBASS | Cross-references to VEuPathDB |
                Changes to humsavar.txt and related keywords | Reference
                proteomes downlo...
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <ExternalLink
                  url="https://www.uniprot.org/news/2020/12/02/release"
                  noIcon
                >
                  UniProt release 2020_06
                </ExternalLink>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                Venoms, gold mines for new antiprotozoal drugs | Removal of
                cross-references to KO
              </p>
            </article>
          </li>
          <li>
            <article>
              <h3 className="tiny">
                <ExternalLink
                  url="https://www.uniprot.org/news/2020/10/07/release"
                  noIcon
                >
                  UniProt release 2020_05
                </ExternalLink>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                PCK1 vacillating between gluconeogenesis and lipogenesis |
                Cross-references to CPTC, BMRB, PCDDB and SASBDB
              </p>
            </article>
          </li>
        </ul>
      </div>
    </HeroContainer>
  );
};

export default LatestNews;
