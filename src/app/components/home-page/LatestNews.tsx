import { HeroContainer, ExternalLink } from 'franklin-sites';
import cn from 'classnames';

// import useDataApi from '../../../shared/hooks/useDataApi';

import styles from './styles/non-critical.module.scss';

// TODO: Dynamically load content (TRM-25618 & TRM-25619)

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
              <h3 className="micro">
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
              <h3 className="micro">
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
              <h3 className="micro">
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
              <h3 className="micro">
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
              <h3 className="micro">
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
      <div
        className={cn(
          'uniprot-grid-cell--span-4',
          styles['latest-news__inside-uniprot']
        )}
      >
        <article>
          <img
            loading="lazy"
            src="data:image/jpeg;base64,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"
            alt=""
            width="138.25"
            height="122.88"
          />
          <h3 className="micro">
            <ExternalLink
              url="https://www.proteinspotlight.org/spotlight/back_issues/234/"
              noIcon
            >
              Drosophila Dating
            </ExternalLink>
          </h3>
          <p className={cn(styles['latest-news__abstract'])}>
            In February, the month of love, we’ll take a brief look at the weird
            and wonderful courtship behaviour of one of the model organisms we
            annotate at UniProt, the amorous arthropod Drosophila melanogaster,
            and explore how studying their courtship song helps researchers
            understand the genetic and neural underpinnings of behaviour. The
            study of proteins from well characterised model organisms such as
            the fruit fly D.melanogaster (Drosophila protein annotation project)
            helps in understanding insect biology, allowing us to control their
            populations by manipulating processes such as reproduction, and also
            enables scientists to model human physiology and disease.
          </p>
        </article>
        <article>
          <img
            loading="lazy"
            src="https://lh5.googleusercontent.com/Mb7ec0_RAI2ypS7wo16BYdXuFwLdaE8fbbofK0lshbgYW8vk_4zWfzyPIBg_w9LZ9oCr4umvC6TuG-v8C9cn3OhPIH6hYy5R8QeBT71omVEpIBbNUnR3udAKsKInfBQtXV72UpFR"
            alt=""
            width="138.25"
            height="122.88"
          />
          <h3 className="micro">
            <ExternalLink
              url="https://insideuniprot.blogspot.com/2020/10/introducing-uniprot-alzheimers-disease.html"
              noIcon
            >
              Introducing the UniProt Alzheimer’s disease portal
            </ExternalLink>
          </h3>
          <p className={cn(styles['latest-news__abstract'])}>
            Alzheimer&apos;s disease (AD), the most common subtype of dementia,
            is the most prevalent neurodegenerative disorder with an estimated
            30-35 million living with the disease worldwide. It is characterized
            by progressive memory loss, cognitive decline, and eventually leads
            to the loss of bodily functions and ultimately death.
          </p>
        </article>
      </div>
      <article
        className={cn(
          'uniprot-grid-cell--span-4',
          styles['latest-news__spotlight']
        )}
      >
        <h3>
          <ExternalLink
            url="https://www.proteinspotlight.org/spotlight/back_issues/234/"
            noIcon
          >
            Wrong place
          </ExternalLink>
          {/* TODO: hiding it for now, might not be needed */}
          {/* <time dateTime="2021-03-25T10:58:57Z" className="no-wrap">
            <CalendarIcon width="1em" />
            Mar 2021
          </time> */}
        </h3>
        <img
          loading="lazy"
          src="https://www.proteinspotlight.org/images/sptlt234.jpg"
          alt=""
          width="125.46"
          height="86.65"
        />
        <p className={cn(styles['latest-news__abstract'])}>
          When you reach a certain age, one question arises on a painfully
          regular basis. It begins with a &quot;Where are my...&#34;&quot; or a
          &quot;Where is my...&quot; Reading glasses are a constant. Frequently,
          they are not where they ought to be. Having relocated them, you may
          well remark that they are not where you put them. But they are. The
          thing is, in a moment of distraction, you left them where you would
          not normally: on the garden wall, in your coat pocket, on the clothes
          washing machine, perhaps even in the fridge. All in all, they were
          inadvertently mislocated. On a far smaller scale, the same kind of
          thing can happen to proteins. There are times when proteins end up
          where they should not be - which is a source of stress both for their
          unusual environment and the one they have not reached. Over time,
          cells have developed various quality control systems to correct all
          sorts of mistakes - one of them being mislocation. As an illustration,
          lodged in the endoplasmic reticulum membrane, the enzyme P5A-ATPase is
          able to spot mislocated transmembrane mitochondrial proteins, grab
          hold of them and fling them back into the cellular cytosol.
        </p>
      </article>
    </HeroContainer>
  );
};

export default LatestNews;
