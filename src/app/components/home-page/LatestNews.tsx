import { HeroContainer } from 'franklin-sites';
import cn from 'classnames';
import { generatePath, Link } from 'react-router-dom';

import ExternalLink from '../../../shared/components/ExternalLink';

// import useDataApi from '../../../shared/hooks/useDataApi';
import { LocationToPath, Location } from '../../config/urls';

import styles from './styles/non-critical.module.scss';

// TODO: Dynamically load content (TRM-25618 & TRM-25619)

const insideUniProtAbstract1 =
  'UniProt is brought to you by a large team of dedicated scientists who have worked for over 20 years to produce a comprehensive view of protein sequence and biology.';

const insideUniProtAbstract2 =
  'We would like to invite the machine learning community to help UniProt by creating computational methods to predict metal binding sites across the whole of UniProtKB.';

const proteinSpotlightAbstract =
  "The moment life emerged on earth, the fight - or indeed the right - to multiply began. The notion of battle is particularly true for microbes such as bacteria, fungi and viruses, that may frequently depend on hosts to replicate. Over the aeons, the art of infection and its twin image immunity have both had plenty of time to devise intricate strategies, either to attack the enemy or to fend it off, respectively. If on the offensive, one way of diminishing an opponent's strength would be to confiscate an element of their protective gear. Let's say a soldier's helmet, or their walkie-talkie, or their bullet-proof jacket, or their gun. This is precisely one of the schemes pathogens have thought up to weaken their host's immune response - and there are many different ways of achieving it. As an illustration, the rice pathogen Magnaporthe oryzae is a filamentous fungus that secretes proteins, known as effectors, into the plant cell, whose role is to weaken the plant's immune response one way or another. Recently, researchers characterized two M.oryzae effectors that go straight into the nucleus of host rice cells. What do they do there? Tamper with the expression of genes involved in the plant's immune response. Their name: HTR1 and HTR2, for Host Transcription Reprogramming 1 and 2.";

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
        <div className={styles['latest-news__news-roll-heading']}>
          <h2>Latest News</h2>
          {/* TODO: remove comment when we have a list page */}
          {/* <ExternalLink url="https://www.uniprot.org/news?sort=created" noIcon>
            View archive
          </ExternalLink> */}
        </div>
        <ul className="no-bullet">
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
          <li>
            <article>
              <h3 className="tiny">
                <Link
                  to={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                    accession: '2021-06-02-release',
                  })}
                >
                  UniProt release 2021_03
                </Link>
              </h3>
              <p
                className={cn(
                  styles['latest-news__abstract'],
                  styles['latest-news__abstract--2-lines']
                )}
              >
                The importance of being disordered | MobiDB-lite predictions for
                intrinsically disordered regions | UniProtKB via AWS Open Data
                and Amazo...
              </p>
            </article>
          </li>
        </ul>
      </div>
      <div
        className={cn(
          'uniprot-grid-cell--span-4',
          styles['latest-news__middle']
        )}
      >
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
            {insideUniProtAbstract1}
          </p>
        </article>
        <article>
          <ExternalLink
            url="https://insideuniprot.blogspot.com/2022/02/the-uniprot-metal-binding-site-machine.html"
            noIcon
            aria-hidden="true"
            tabIndex={-1}
          >
            <img
              loading="lazy"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACcCAYAAADFwJa0AAAgAElEQVR4Xu2dB4AUxdLH68g555yDgiKCiJhFMSA+E5gwIQZ85uwzx/fMWRFzzk/8MCCKiulJUEmCSM6S45G5r3699DK77N1tmN2dO3rwvL2dmZ6equ5/V1fXvysnTw9xh5OAk4CTQBGQQI4DrCKgJVdFJwEnASMBA1hhIyuWsZWTIzn6k8phyufHh7JSqYe710nASaBoSyACsBb/+okBFUUX81ZlqtSXGi276FclUnpLAGv5tB+lZpseKYNfShVxNzsJOAkUaQlEANbE1y6Wjmc/FwaVWO4trK28vO07DKb8LS/uBfuWTBwhdTocKVP/e720PfGBUNnWkgtbbtaN5ilPr1k49j1p0LWfA7ki3cRc5Z0E/JNABGBNePVCBazBYYDYvnWzbNuyUUqXr2KeuG7xX1K5fhtZM3+ybN24Vv6eMExaHHmllKlU05xfOX20LJn0qTTo0k8q1m2ln4fLukVTpWG30yR32RxjYeVt3yYzv3pSSpWtLE0PvcDct2rWOClZupzM/+VNaXLQBVKxTnMtP1fGv9hfOg/6UEqUSM3C809criQnASeBbEogArB+f/l8aX/i/TotZFaoFlKpMrJl/UoFn5amjnO+fU6aHXaJ/PzgwdJpwNtSrnp9+fOjm6TNP+6RmV8+KPX2OdVcm7t0tqyePVrqq3W0dPLXUnvPI+T3l06Xvc5+VSa9dobsdf77WlqOTHjlLNnrnNfkl0ePlD36PSmVG7SXuaOGSMPuZ0kJBbBxz54iXQZ9ZJ6dqh8tm0J2z3YScBLwRwIRgPXrc32l1fG3G3Bg2ldOfVhbcleFAWv2N89I88MvlcnvXCLt+z6lkJMjG1bMFylRUuaMfEbannSn3lvSgN3mdculTOVasnTSV1K7wxHy25B+Umevk6Xhfqeqh6yEmS6unDnGWFOT37xAOg380PjKNul9W3LXSLlqddVi+1HB7igHWP7o2pXiJFDkJZDPlDDkZtqau1o2rV0uleq11L/zZPbXj+sU8Cr1R90sbU+4xzjoN65apNO87bJo3AfSvOdlYQf99i2b1Eoq6wGs06RKky7Sste1xrriwBKTEjky49O7pGP/F0x5m9etCIFk7eYh4e7wczkLq8i3NfcCTgIpSyDK6X5R2IcFQOHDWjJhuNTd5zhjdY17to9O0YbJnx/fLG36eABr21aZ9slNsvd5rxtgw1Ka/und0uq4W2WpOt1rqYX1+wunSaved8m2DeulavN9DCLO+eZJaXTgQJny3uXS8awdgLVeAWsdVl0LNw1MWb2uACeB4iUBD2DlyfhXB6qfaYhxctvYqfGvDpBqzbrLihnfSeW67aT18bfK1I8uU7/VYwaYNq5arOCzTUqVqyq/DjlR6u59uiwa/bTsf+1YExwx9sle0u7kxxXArtFp36cy68tHtewc2bphnVRv1VXqdDxaJrzaT4HybVMeFtbm3JVSqQ6A5Zztxau5ubdxEkhNAhEWVsg6ihGq4A0oDcdp7XqdDWUwSGXL2REwGi57x9+R1TY3pPYm7m4nASeBYiWBWFjkqDnFSsXuZZwEircEDGBtV6f5/B8Hy7qFE4r327q3cxJwEgi8BPK2b5J2pw6WkqVK71LXnVNCt2lD4BXpKugksNtIIB/esZsS7jYtwL2ok0DRl4ADrKKvQ/cGTgK7jQQcYO02qnYv6iRQ9CXgAKvo69C9gZPAbiOBiDgsVguJfeCHzxw2FsJ+X5Bk7HY03GuDT+O5b7eRtntRJwEngZQkEAastWvXyt133y3HH3+8HHjggXLffffJihUr5NRTT5UlS5ZI7969I0DIu1dWiCwd2tNq27ZtcvHFF8sll1wis2fPlhNPPDEC9CwoWjC091lg9P5tg029v6NBNKW3dzc7CTgJFCkJhAFr9erVctVVV0nt2rXlgQcekNNOO03KlCkj//nPfyQ3N1dKly4tn3zyifTs2VPatGkjP//8s/z5559y1lm6FYxSed59911p3ry5dOnSRU4++WS54YYbZNq0aQbw3nzzTWnQoIEcd9xxpgyOOnXqyAEHHCCjR4+Wv/76S/r16yelSpWSjz/+2PwGIP/v//5PDj30UJk6darUqlVL1q9fL99++60BwYYNGzquYZFqaq6yTgKpSyACsC666CKpVKmS/POf/5QRI0bIxIkThe+wtF566SX517/+JT/99JMcdNBB8v777xsw+vTTT2X58uVyyimnyEcffSTnn3++3HjjjeYHINq6dascdthhcv/998s999wj1157rdxxxx0G0G699Vb58MMP5cgjjzRABgi1bt1aNm/eLOvWrZOvv/7a3AOI7bHHHvLiiy/KTTfdJL/88otccMEFDrBS178rwUmgSEkgArDOPvtsA0JfffWVAae77rrLTO8WLVpkLCfA6r///a+ce+65xtrp06eP+e711183lhYWWePGjQ3gASyzZs2SUaNGyTHHHGMsI0DsyiuvNNYY9zJtnDJlinTr1k02btxowI97y5UrJ2+99ZZMmDDBABbX77PPPtKkSRNT3siRI815t+VMkWprrrJOAilLIAKwLrzwQnnwwQeN5cPvm2++2VhMy5YtM1M3rCWsrccee0yuueYaMxU8/fTTzfeACqDDOe7BkgKwfv/9dylZsqQw5bRWFQDHtPHll1821wE8+M6wovCd4eeiDt98840BxOrVq0uvXr3k888/l7Jly5qXBsjc1skp698V4CRQpCQQc7eGaGc3b2T2x9qx+med7N7dHexney7aie51sgM01vnOfQXdG72DhLcOzsIqUm3NVdZJIGUJuDislEXoCnAScBLIlAQcYGVK0u45TgJOAilLwAFWyiJ0BTgJOAlkSgIOsDIlafccJwEngZQlsAtgWee6LTkRak7KtYlRQCynPN95qT8FPde7WMB1Xqe9vS/6GYV979d7ep9LmX4sIkSXSbneRQ2/6u7KcRLIhgR2ASw69J133mmCQYmHItK8fv36Jg7Ku/IXaxXQ+wLezheLfhPdOWPtJ2/v++KLL+Too48OFz927Fjp2rVrmA6UX73s9wMHDpTnn3/eXP/aa6+ZOLJoChDfn3POOeYZti4EsH755ZcmQj9WfaMV5qUoFVQn7yrs//73P+nYsaNUrFjRFGe5l17qk/c50ZQo74qtrfsbr78h/c/ub25bs2aNCSkhPs4LirFWgv0CzWw0ZPfM3UMCMS0sGvOwYcMMdQYAI+Zp7ty58sEHH8i9994rM2fONFHnWDl8T7An8VOVK1c2n1955RUDEMRx3X777SYwlOuJu+JvKD1EyleoUMF0UKLWAUXitThPgGn79u3NNU8++aSh7RCTRXzXscceK+3atZN9993XRM9DEfrss8/MfXPmzDHPIdiVsh9//HFTPpH59erVk4ceesgAUNOmTU15xHcRB0aUPu/C+/HulEHM19tvv20i/vnNewPiADfxZtxz9dVXS9WqVQ3Av/rqq4aC9N1335lIfu7/7bffTKAsgES8GrFrAAj1IIqfZxKsC1hChdpzzz2lVatWcsYZZxiZAKCc69y5s3Tq1EleeOEF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"
              alt=""
              width="184.305"
              height="96"
            />
          </ExternalLink>
          <h3 className="tiny">
            <ExternalLink
              url="https://insideuniprot.blogspot.com/2022/02/the-uniprot-metal-binding-site-machine.html"
              noIcon
            >
              The UniProt Metal Binding Site Machine Learning Challenge
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
        className={cn('uniprot-grid-cell--span-4', styles['latest-news__left'])}
      >
        <h3>
          <ExternalLink
            url="https://www.proteinspotlight.org/back_issues/247/"
            noIcon
          >
            Sapped
          </ExternalLink>
        </h3>
        <ExternalLink
          url="https://www.proteinspotlight.org/back_issues/247/"
          noIcon
          aria-hidden="true"
          tabIndex={-1}
        >
          <img
            loading="lazy"
            src="https://www.proteinspotlight.org/spotlight/images/sptlt247.jpg"
            alt=""
            width="125.46"
            height="86.65"
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
