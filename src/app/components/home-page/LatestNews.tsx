import { HeroContainer, ExternalLink } from 'franklin-sites';
import cn from 'classnames';

// import useDataApi from '../../../shared/hooks/useDataApi';

import styles from './styles/non-critical.module.scss';

// TODO: Dynamically load content (TRM-25618 & TRM-25619)

const spotlightAbstract =
  'The space humans evolve in is divided into parts. It makes life easier. Each part is dedicated to a certain activity. We have homes to live in, pools to swim in, restaurants to socialise in, trains to travel on, roads to drive along and offices to work in. Cells, too, are divided into parts, and these are known as organelles or compartments. Mitochondria and chloroplasts produce energy, the nucleus transcribes DNA, the endoplasmic reticulum is the seat of protein trafficking, and vacuoles are destined for breaking down cellular waste. Like all cells, bacteria also have their compartments. Carboxysomes are a particularly intriguing example. Why? Because not only is their architecture reminiscent of crystals - sporting layers, straight lines, tips and angles - but their shells are built with proteins. One of the major shell proteins, dubbed CcmK2, assembles into cyclic hexamers which link to one another to form a twenty-facetted polyhedron.';

const drosophilaAbstract =
  'In February, the month of love, we’ll take a brief look at the weird and wonderful courtship behaviour of one of the model organisms we annotate at UniProt, the amorous arthropod Drosophila melanogaster, and explore how studying their courtship song helps researchers understand the genetic and neural underpinnings of behaviour. The study of proteins from well characterised model organisms such as the fruit fly D.melanogaster (Drosophila protein annotation project) helps in understanding insect biology, allowing us to control their populations by manipulating processes such as reproduction, and also enables scientists to model human physiology and disease.';

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
          <h2 className="medium">Latest News</h2>
          <ExternalLink url="https://www.uniprot.org/news?sort=created" noIcon>
            View archive
          </ExternalLink>
        </div>
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
          styles['latest-news__middle']
        )}
      >
        <article>
          <ExternalLink
            url="https://www.proteinspotlight.org/back_issues/237/"
            noIcon
            aria-hidden="true"
            tabIndex={-1}
          >
            <img
              loading="lazy"
              src="https://www.proteinspotlight.org/images/sptlt237.jpg"
              alt=""
              width="184.305"
              height="127.29"
            />
          </ExternalLink>
          <h3 className="micro">
            <ExternalLink
              url="https://www.proteinspotlight.org/back_issues/237/"
              noIcon
            >
              A peculiar architecture
            </ExternalLink>
          </h3>
          <p
            className={cn(
              styles['latest-news__abstract'],
              styles['latest-news__abstract--4-lines']
            )}
          >
            {spotlightAbstract}
          </p>
        </article>
        <article>
          <ExternalLink
            url="https://insideuniprot.blogspot.com/2021/05/prioritizing-curation-how-do-we-decide.html"
            noIcon
            aria-hidden="true"
            tabIndex={-1}
          >
            <img
              loading="lazy"
              src="data:image/jpeg;base64,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"
              alt=""
              width="161.5"
              height="143.55"
            />
          </ExternalLink>
          <h3 className="micro">
            <ExternalLink
              url="https://insideuniprot.blogspot.com/2021/05/prioritizing-curation-how-do-we-decide.html"
              title="Prioritizing curation – how do we decide which UniProtKB entries
              to manually annotate?"
              noIcon
            >
              Prioritizing curation – how do we decide which UniProtKB entries
              to manually annotate?
            </ExternalLink>
          </h3>
          <p
            className={cn(
              styles['latest-news__abstract'],
              styles['latest-news__abstract--4-lines']
            )}
          >
            With over 500,000 proteins already in UniProtKB/Swiss-Prot and many
            hundreds of new papers being published each week, we are often asked
            how we prioritise which entries our expert curators manually update.
            We consider many factors when coming to these decisions. Our focus
            is determined by biomedical importance, funding, size of community
            and biological interest; the following list will help to explain our
            overall strategy.
          </p>
        </article>
      </div>
      <article
        className={cn('uniprot-grid-cell--span-4', styles['latest-news__left'])}
      >
        <h3>
          <ExternalLink
            url="https://insideuniprot.blogspot.com/2021/02/drosophila-dating.html"
            noIcon
          >
            Drosophila Dating
          </ExternalLink>
        </h3>
        <ExternalLink
          url="https://insideuniprot.blogspot.com/2021/02/drosophila-dating.html"
          noIcon
          aria-hidden="true"
          tabIndex={-1}
        >
          <img
            loading="lazy"
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAG0A+gMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQECAwQGBwj/2gAIAQEAAAAA9+AAIPU6HMAAAR0iBoR8+AAAPJ+03YrrBghugAAAGpyGXSk97oSOkaae6AABEYpKnF7/AGBwdnkMjbM+hSEvsL6ioUprwcL1kmPIOOj9nJlWT/S5d+ydlNpW3DH6kfzvJRcjCdR6H2rxrzb0nlsWzpakd1frmhh1cu93EHCRaQ4Dj5Pc1d/RmveqxHJdh5hx8ntcvCxn091lMVuTJrYM2xA/K0/0+eM9F6DL0o4PR0suTS8+4X3T2JWgqee+A+l9+wZujkw4juOT6DZw8H4x7t2wUDT819K3XMb0jnFeY6Ln+lMUH0BWgCO3ldC7HKULY3Tm6lY2UqBSlNbFXHZr6u1KbTX1IvDvZ77slt+3Wta0qUtrWlLLa5L6YdPHdfnyXrceetw//8QAFgEBAQEAAAAAAAAAAAAAAAAAAAID/9oACAECEAAAAAEzoAARYAAAAAAAAAAAAAB//8QAFwEBAQEBAAAAAAAAAAAAAAAAAAEEA//aAAgBAxAAAAABo7YQAF75wACwAAAAAAAAAAAP/8QAPRAAAgEDAgQCBgcHAwUAAAAAAQIDAAQRBRIGITFBE2EQFCAiUXEyUmKBkZKhBxUjMEBCgiQzslRzscHS/9oACAEBAAE/AP5+rQC6udPs5LiWGOYTEPE5RhKigr88DJxVvqurSQtaJaxyXtqzpdSSsY4hs+ieQPNxzwOlW0/rFrbT7CnixI+09RuGcH+mbVrFNXj0mR9lzJbePGG5BwDggeY/kalZvd2v8F1S5hcTQOeiyL8fI9DS3w1YG0hglh7XxK7TF2MPm7fotAAAADAH9NKNL4x4vS60y/O7SEtmE4DBSRO29V+OQK1HjHhbTJJIrzWrZJU5NGrb3XyIWtF13Tdctp7iweVkim8Jt8ZjO7Abo1XPE62XGNpoM4Xw7yzR4nA5rLluTeTBfZupXhtp5UQuyIWCjmTitIu5bi9vGcx7XjjKlMhJSnJnXPzAP9PaWFhY+N6pZwW4lcvJ4SBNzHqzYrhpNGs9Fv8AU7mK1izqWoSzTui9FuXAJauCby1v4eIb+0cvDc6zK6EgryEaLXD9jrOp63qOr6/oyWZAt0tYt+4gwM7BquuJtSN9f2WlcN3N89rKIZJTLHDEHKh60DVtSv31eDULOC3ls7pIdsTmUe9EsnNiBk8/YZVbWYGHWGykBH/ecY/4egsFBJIAHUnoKi1TS5SQl/bMQcECVevXFA5A/o9e0WDXdKn0+e4nhSRlLNCQGwpzjmCCDWn8N6RYaBFoQt/GsUQqUm9/eWO4lqsrGy0+2S1srWKCBMlY41CqM1qF9b6dY3V7cEiGCJpZCo3EKtcJ6pNf6TxLrVlp07vc38s9tBKVQzbIVQANXBsWtC21a81iyW1ub6/Nx4IOdiiNU9JIAJJ5Vdca6LZXV7JCk1yTtDsmFXEfIbS3UVqXH1lbaML23g33MkohhgZ+5G7cSOwFarqmuay27UbySRD0hQlIgD9hasOGWuVjmQJnB2kjO2jPrllcPZwalPAkZ5osrtv3c/8AELVlxjqdlPAh1ae5iUqJhMilFX/lUfF+luq41WzDEZKtHKr/AIVBrdtvy+rWbKVGFwyc6ivIZB7k8LfDmRXieWR8QQa8VO5x8xQYHoQfYz7YYEkBgSOoq5vbS0jMl1cxQp9aRgop+MeGEDkavBIVBJSLMjfgtP8AtJ0FJNrW97t7uIwQK0vWdL1eFpLC9imVeThT7y+TKeYoAAcvY4n1LxdQu9k8u1QUA3e5hTg5XvSujsQepOSe5q5tpPXWbJZGICL3XyqEAHbI20BTj5+dLdzW8q+BI6F/qjseXOjY2s8qrJdSbycsiId3nljWnaforNM14jBRnCi4CbDkhT50p4bS6b+DfhACPdaAoP1yasbvSmR/V7jVNgGGQmBh+DVDYo8KFbS/KFuoEJx+DU3hWkTNHe3CEMo95Aepx2p9WvoMGOaK5T7JXNQ8VLn/AFFmU88GrbXLSfHhzfcWDCo7osMtEdvZlIYUro65VgfQKZ0UgMwBp7mJBksB5sQKk1myTrdR/JQWNPrbnd4FnPLt+IKjnU+r6qV9zTVU/A+9V7qPEPv+r6RBnmdzxIN33b61NuKbxI7q4toYzDzURlEIZuX0SSTUccrzW889jkZDl06OPJl6VqEun3Y8O1tTH5nr8hULS6be297aO0dxA4O4HBIB5o3xU96HE+u3Dm9jvpoVkBKpnklaHxa196rbXFufFPuNMuAufl6eL9LeyM0ULO6lFlLMOfNzmlinMyuS3Ll5GoOHGOixahMdru2VH9wReWTU25MgEA55kAU6qoEgbJY/SJyQV7fKpZxdMjeCF+1k0wCHKpuz1zy/A1OVC7iuT8OpNEtaWssszlZQSw542E9BXCusOk8EV/e3FvHOdomjIxG/YuG7VPpGtJkpc2l2O3iJ4Un4rUraxGcXOjRSL2avXETm+jOnmmf/AFU13psnMQzRMO+Aat9QsICXjvpI2+Dxkg/lNJxCUkVlKTnHWIMGbyII50p3KrbSMgHBq81q3iuXtlYl0OGAIX9Wq51Mnmlzaxj6ocM33kZpzp0gPrGouzHsu7H6YqEaVA26CO7dyf7Ihk/eRUVneXDvJHpl0wcgkzyiNOXLmeZrinXVs53s47axOx9srQplVc9QWbqRUzvJdHxdpV1GCFABPcEVA7wxGCN2VW6gAYqGREZDNI4QL/ZyB+eCKVNu+VOQLZxkjn1GMd/jVlpxvpFhjXmxHXnjnWtRXunXT2bLh4m2tXCsFzfXSBPdlEuUYkgAqN3p1nSxqEI25zHkheXvg9RntWncK2xuEeSwuYj1Yy4wvkuCaubW0nlSCVcKbcqgU7QADjFa7oa2Nz6vKcI+WhmIxu+yfMUI0WTazZwedQyRhyiQhhgYwPhUmls1m7oy8m3Y/wDPOnhIJcZyaukF06XEj5SJzlexwO9Nfi5lcchCOR8wew8zXBmsrq+hQOWBng/gS/NRyb7x6CoPUfpTW1u3WFT91C0tgf8AZT8opYYUOUjAPkMeia0tLg5mt43P2lBr91ab/wBFD+UUllaR/Qt4x91BFHRQPkK4o1lNF0W6uyR4pHhwg95HoXyK3gzfxIZARluvzbzqziljQWrFn2gElq0vTjKW3OAApxu75qaERKqG3JUcmfBpIYnm2FyiA5JPYVw7p2mpbm+muUTKsIYw4DsAPpHzPYVrWgWerRQT+CXkCKCUYKxAHUE1oGhrpqmQpsYqVCHDFQepJHc+zq8Bnv7kG4ZQb1ITvUMqK6jBFXHB+pbip8GdQeR8Zh+j0/CQ01JdQ1KZPAijJKIWdt3RRyrhe2t9ROGifwS0gORtyFHY/EE1qGnPYb1uAWVGyjdpV8vMVdcOSXOlWd5AypJcSMQrcgVwdo+ZpbFbl7q0J5TwsM/BwORqOMybVSPD9Co+t3r9lFrcQjU5ZOSvFEo+asf5f7SbIXXD8XMqY7kNn5qVqw05pdXtbU808UM5+KR+/WhcPTX07TzQyCJ5sIwwN7k9Pko5mp+Hbj94zrBHGtofeicn6BPIjFcQaHMmmKNOg3mGI5B5s+DknzJqy4ZsNStYL6RTBcui+IkZV0BAq74esbCKORXmeSSeNAxwoUdWJCeQrRdn7rtygARi7qB2VmJHtaxCW1wWpyUvEhxg4wyt1/T0cR3rloNNhRXkuGCYIyMt/wDNWNja2FtFb20SoiLgU6RyIUdFZT1DDIq6tkubaSE4GQNp+qy81I+RrW9Di8GHV7a3WOZSPWY0XlkHmwxV7Yiz1i65KqvJ4kHcsJPe5VwNpktjpRlnVllnbOGBBCD+XqFjBqNlPaTg+HKuDjqPMVb8Bw2WqRL6/wCJNKjjOwL4cGeZ82q3toojEsagRwReFEPhnqfTp0L6XqV5as4FvK3jQD7BPP8AK1cQLnR7xt20ogfd8Npq0iSGztokOVSJVB+Q9qa5iuuJ7C1TazWsTzynugYbVH+VTSeGmRzPYedaVAl7ePqjplY90Vqx6t9eb/I8l9jbiR8AbW5n51ptvFDd31g0MfhRMk0IIBwG7j08/Rg+jn7GazUKiS/urksCqhYI/wDHm/61uAreK3itRtzcwDwtouIjvhY9A3wP2WHI1byR3lqQdrxuGQg9R1VlbzFaPELfTrWIF8JGEw7F2G3lzY9fZJFWwAvb9l2BQIYwRjJIXcd341qW26mGnrM4eaMtIV/shBAP5+gpNiIqIoVVACqOgA6Ct4reK8QVvFXISG/tLwnAINu58n5qT99ZrPs8/QfTNIw9yPBlPQfDzNRxeBEkSZwo+8+Zo78d6PiUXkHajcSg8iaiMyXEsyuNkvORe+8ct+fMcjVqzwCRDjBld1wezndUcpNA5FE4FPJinnq3aWJbh3TDyzvJgd+y/oKsxcQeJJOyG5lOZXQflQHuFHIUJ3z1NCViOlBmoFqy1SxLcQyQvna4watpJCDHKMSJyPwYfWHsD2iq/ChGgOQK2isCiqntRjQ9qNvCeq16rB9ShbQj+2hGg6D0HpTRg1JAhpoVOASa9Ujz1NLbR0sSfCvDUVsX4UUFYFPCjsrEc1PI/Cgn2jW0Vj2P/8QAHREAAgEEAwAAAAAAAAAAAAAAARECAAMgQFJgYf/aAAgBAgEBPwDOYcTVt8mNCDAI96x//8QAJxEBAAIABAILAAAAAAAAAAAAAQIRAAQSUQMxEyAhIjBAQWCBkcH/2gAIAQMBAT8A6+VmQ48Flp5hLZSh+MZvQUdBHhzW0Hf828eKEhSy+WMyxlOEiOm4Hd2rs8gyZNr6B9eyP//Z"
            alt=""
            width="125.46"
            height="86.65"
          />
        </ExternalLink>
        <p className={cn(styles['latest-news__abstract'])}>
          {getWordsUpTo(drosophilaAbstract, 300)}
        </p>
      </article>
    </HeroContainer>
  );
};

export default LatestNews;
