import { HeroContainer, ExternalLink } from 'franklin-sites';
import cn from 'classnames';

// import useDataApi from '../../../shared/hooks/useDataApi';

import styles from './styles/non-critical.module.scss';

// TODO: Dynamically load content (TRM-25618 & TRM-25619)

const insideUniProtAbstract1 =
  'We would like to invite the machine learning community to help UniProt by creating computational methods to predict metal binding sites across the whole of UniProtKB.';

const insideUniProtAbstract2 =
  'One of the biggest changes we have made on the new UniProt website is to improve your usage of the tools associated with our data - BLAST, Align, ID mapping and Peptide search.';

const proteinSpotlightAbstract =
  "Who has not seen mould spread in the corner of a bathroom or on the edges of wallpaper in a damp house? Or winced at the green growth on the edges of a jam jar or on yoghourt left in the open air too long? Moulds are also sure to flourish on harvested crops that have not been kept dry, while the toxins they produce may wind up in water we drink. Moulds, or fungi, are as much part of our lives as insects or plants but they are not always so easy to see. Sometimes they end up inside us where they can produce poisons known as mycotoxins which may be detrimental to our health. Or we may simply ingest only the mycotoxins themselves. In the past 60 years, hundreds of different kinds of mycotoxins have been characterized, several of which, depending on their nature and concentration, can cause severe damage. Ochratoxin - in particular ochratoxin A (OTA) - is a mycotoxin which is secreted by several species of Aspergillus and Penicillium and frequently detected in popular food and beverages such as coffee, cow's milk, pork, cereals, wine and beer. In order for food items to remain safe for human consumption, OTA levels are constantly monitored to keep them as low as possible. One way of doing this would be to use an OTA biodegrading enzyme, or ochratoxinase.";

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
          <ExternalLink url="https://www.uniprot.org/news?sort=created" noIcon>
            View archive
          </ExternalLink>
        </div>
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
                  url="https://www.uniprot.org/news/2021/11/17/release"
                  noIcon
                >
                  UniProt release 2021_04
                </ExternalLink>
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
                <ExternalLink
                  url="https://www.uniprot.org/news/2021/06/02/release"
                  noIcon
                >
                  UniProt release 2021_03
                </ExternalLink>
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
      <div
        className={cn(
          'uniprot-grid-cell--span-4',
          styles['latest-news__middle']
        )}
      >
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
            {insideUniProtAbstract1}
          </p>
        </article>
        <article>
          <ExternalLink
            url="https://insideuniprot.blogspot.com/2021/11/navigating-use-of-tools-of-new-uniprot.html"
            noIcon
            aria-hidden="true"
            tabIndex={-1}
          >
            <img
              loading="lazy"
              src="data:image/jpeg;base64,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"
              alt=""
              width="184.305"
              height="127.29"
            />
          </ExternalLink>
          <h3 className="tiny">
            <ExternalLink
              url="https://insideuniprot.blogspot.com/2021/11/navigating-use-of-tools-of-new-uniprot.html"
              noIcon
            >
              Navigating the use of tools on the new UniProt website
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
            url="https://www.proteinspotlight.org/back_issues/243/"
            noIcon
          >
            Constructive futility
          </ExternalLink>
        </h3>
        <ExternalLink
          url="https://www.proteinspotlight.org/back_issues/243/"
          noIcon
          aria-hidden="true"
          tabIndex={-1}
        >
          <img
            loading="lazy"
            src="https://www.proteinspotlight.org/spotlight/images/sptlt243.jpg"
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
