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
          <ExternalLink
            url="https://insideuniprot.blogspot.com/2021/02/drosophila-dating.html"
            noIcon
            aria-hidden="true"
            tabIndex={-1}
          >
            <img
              loading="lazy"
              src="data:image/jpeg;base64,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"
              alt=""
              width="138.25"
              height="122.88"
            />
          </ExternalLink>
          <h3 className="micro">
            <ExternalLink
              url="https://insideuniprot.blogspot.com/2021/02/drosophila-dating.html"
              noIcon
            >
              Drosophila Dating
            </ExternalLink>
          </h3>
          <p
            className={cn(
              styles['latest-news__abstract'],
              styles['latest-news__abstract--4-lines']
            )}
          >
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
          <ExternalLink
            url="https://insideuniprot.blogspot.com/2020/10/introducing-uniprot-alzheimers-disease.html"
            noIcon
            aria-hidden="true"
            tabIndex={-1}
          >
            <img
              loading="lazy"
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNEBCAgICAkICQoKCQ0ODA4NExEQEBETHBQWFBYUHCsbHxsbHxsrJi4lIyUuJkQ1Ly81RE5CPkJOX1VVX3dxd5yc0f/CABEIAPQB2gMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQIDBAUGB//aAAgBAQAAAAD6LGtdNch09hWaVnYVroUmxJIi4a5p6JpGe3NlT0vP6fQ83l18mmkdn1kRdl2eqAAAAAc200+fa+R9d+eVjo+j8HzMtq9n0lQ6u0AAAAAruy44nwfZ+P8AOToUunXC+6qRhW15m2TSxNV7WvXTh6ocjvpHlej28Gmv135/w38b2vE9nCct7+L7NubTh9DbzfMrVrKYraSsWrrMzbPaqsWTb6D5/wBOeD7v7++qs3nmtdFpy0Q05qJAidNgAAPM/OsFvof0DDLLHV1X4mmHZzdHNbOyZlWmtF66Y7dGwAAPnvzHLPyfu/1MAAAc0TEJhJboAAAAY4bU6geBWPa6AAAAAAABGNb6QLcJ0aAAAAAAALS8ycOzquKyiQAAAAAACXw31MV16tDxOa3u+Xa8Z7bc8Z6xrhO+VLTpjZakdFIznXmnqzwvtSk+tEuG+uwIlHjWtRtGc11pnbfmp14xG9Lcuus421zodOGnP189bdfbIARKPnOnn2jfntrzzbPSu0RjrE0b2yRDr49MY10jKs09brkAMNDk0z6MkNKLc+y9aXjGdc7kwvNM9sl75xLpmwAeRzR7/lesAAAAAAAkAPCU9Pka4b5a0p7AAAAAARYAPD5p9rPK98XpAAAAAAIsAESjkyzWehcAAAAACJACknJnSPTAAAAAACwAeNw+h63iehz3joxmvfYAAAAARIAeNw3+j8d2c874Wv3gAAAABEgBEnh19Lljojn29IAAAAAIkAIlHzs+jx33yr0ekAAAAAESAESfNadNLXp136wAAAAAiQArJgtUtqAAAAAAkAAAAAAAAAAAPltb93pgAAAAAAAAPC6OXZnaWeucdnJrTSmWm3JptgaM5Xrnrn035ujlvpjXT17hSkDxc764Vtpfmm16TG/Kvpje835tcrZ6WwnopS1byptF/S2v+Sd5liGF8blwAAAAAGmsr/Kf/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/9oACAECEAAAAPqx0efBiiCIEmta9cx0ccVEBIhCW75ZiULAWQQvozfHlrNIugigNenHPkp1zgAAAOHqmQAAACoAAAAAAAAAAFXIAAABq5gAAAA2TIAAADVuIAAAA0ZAAAAAAAAB80AEoIsezuHmIAAAd//EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/aAAgBAxAAAAD4PRxn1PQZAtq1S84+LenKfR7yRUW23VUuZnluqgaBm21SebWvTpmitYDWIAz5O97IcNdQAAA3xugAAACKAAAAAAAAAAEKAAAAZmqAAAAMloAAADMaoAAADJoAAAAAAAAGwAAAZgalJQAAT//EAC8QAAEDBAIBAwMEAQUBAAAAAAEAAgMEERIUEyEiJDFBBRAwFSMyUCAWM0BCUWD/2gAIAQEAAQgBk6keAvlO9k2P/wBex7MSf8I2Zkha4WuFrhawWuEaUFaYWmtZay1lrI0qNJday1lrLVWqtZay1lrLWWutda611rrWXAuBcC4FwJ0bne/AuFCFYBAACyA/9Y0NJKdHkblgxFk+LK6bBb3kbg3JRuYY2XjiElTI1zaMFkJLaOENGZpGC+VRTCEMvG30c5+wP3pv5vXkXOAxlVpb2WEywmR5RdUzGS8nJrU61qda1OtanWtTrWp1rU61qda1OtanWtTrWp1rU61qda1OtanWtTrWp1rU61qda1OtanWtTrWp1rU61qda1OtanWtTrWp1rU61qda1Oo+FsUeXJTLOnN1MGcObI5QRJlswfIljLgFVWuGqGhHFGpC5sznNNRKTdzpXvFnMmlEmSeyiMgjU84eyOMICx+xVKe3IlhJK8F4LwXgvBRTCHK28t5by3lvLeW8t5by3lvLeW8t5by3lvLeW8t5by3lvLeW8t5by3lvLeW8t5byjqmNYGncjW5Gn1bHCy5mrlYuZqqrEXUTm8UancGySE80RXLAuSBc0S5olzRLmiXNEuaJCeNpu3cW6m1q3AtwI1i3AtwLcC3AtwI1va3ShXIVq3O1uBbgW6t5bgW4FuBbgW4Futst1q3Grcatxl1txrab8GqZZPrrHoVbMQVttW21PrHBwxd9Rb/13GdLbYhWMv2ayS5TK0dZc7X9jbDXFq2wuRkgUUcHFGq4XEtjJTuZG088XWMXjI1z+SjcDd/byWumpSS5clIR2JacYlrpYjK1yElHbsvo/YVLWmV3CJaV5Jdy0iY6mzkLi+lsLTFr3AxtmiETWkz059qkxucDFi4oscsHLF11i5YvWD1g9YuWDli5YuWLli5WcgxyxcsXIMesXLFys5WdZYOVnWWLli5YuWBWLli5CN5TW4yNLhq2Bc515DhnT9kufSELEPqXubFAONifHCzKQXA6d+3eyHGSQP2iLr9q11i1YtQdGRIU50Tbr9o3I8OleJft3xQDD7Ex/H7d8UOM3t+1a6/bsCsWrOO9m2lK4Xn34B868S1oVrQrWhWvF8cH/AJxSD28x7tdE42GLVi1YtWLVi1YtWLVi1YtWLVi1YtWLVi1YtWLVi1YtWLVWy69JNM0/W6wNa4n6/Ug2P+oKhfr1Va6+mV5+oTuhmbHGGhSgujeA8OeLLF46GD8GhFry+6xkyyUbSIwE7PA2dC8AYva6QSXljcXgh0T3Zp7LunthJ7FjLQhocxzgyxY/2HG8hoWL8yUGSB2SItHE12MrC7BxqDx4g1JZJcmou/ECrb2r1BbLe9SCbZ1Vgg6pv3lUhzrMdUZAOyq/dG3G7njLzGzP/hfVgT9NqwJvqNTLHGwmunKdWzua8IGQQviX0AuNZ3/xuID/AG/3ws3/ADzMHvzwrngXPAueBc8S5QfbOX4tMfdsTQb/APLkLg0lvN5dMkysUJD3f/KWpka8saa0i9zXgKJ5ey5/rj2uMIRhvth3dWK7Xa7Xf2MDXG54AuAJrS0WHkvJeS8l5LyXkvJeS8l5LyXkvJeS8l5LyXkvJeS8l5LyXkvJeS8l5LyXkvJeS8l5LyXkvJeS8l5LyXkvJC/3EcvYXDM1oANPOU+N5cSm3DWg/wCF/vf+wYx8dWwtfLMx7wuaW4XPKnSyACzHZNB/wqKR0z2yM0JRezaGZvsAQGA8NV2uKquuKrBCkiqS9zmGKtXHU8bgcajNqwrAenxVZBCMVf8ABjq79cVVkbtZVAPyENWLWMVXcEOjnLGhcdZ5LjrEYqr/AK8VRjJfCq43J0dbbwMdXe44qzEqSKqOGJiq/gxVSLJzEwJjKoPBe2Kos8uMddcLiqeyDHVYSBcFSuKsHs9tQ4sxEdTaS4irRZcNX8sZUBwy4ZznmIKgZBNiqQ4fb5++NSAsZ+kwSAHP/Iew+/yE2nBWqfng8MQ6kutXxT4C6TMPp8nFy1+3WFNazVrGyfA0tAHBdajb9OpRckcAtI1GmIaSm01wCJYnS2Wr7gawPvr5EFOgD3NtrJkADg5Gnwxy13AMDjAS2JibBbNGlNyU6nLrhPhu2MLVv0GwDIFOpHFzyNYlQxcRNjSsORY6ONxBWq4e8kOZ6NLchGms2yNKuG8/Kfn8g9h9/kJzPp4smxUjL24aFNpaZ46tRO47mKkawxkR0QshBRpkdNDcgQ0DQhDR+KLKLjaDwUIsjHRFz3kQURuQ5lGWsBwpJhEEI6McjUYqGwC4KQjIGKie1gUbKNrmPbw0TG4uEFEMinMpH3cn6rwM2x0kLsw2mpGsa8PipPNzzT0jfcw0rHOeRBDycw4KKSwDmUb5HFxp6IBriYaJBtG0PasKNzA1CKkayw4aL+a4KHGyMNCALmOgBbeKCOLLD5H5MwC1purrvpcNOOkYmOfmdeBNY1n8TDC4AF0MbnBx4IUIIR2ONnkhDEL2MMJvcRRhoaNWEPDhww3uuGIXtxs7XEzLIa8Ha4o+r8MWOK1YOlrQCydDE731qftcEWJaDBAbLghXDGGvahBCPZ0ELvd0Ubsr8bPJCGIYY60C4o7Ba8Pa14De4hiAcAY4yLEQQhGngIsnQQutcQQj2HQsPn8k1HTzubI/9Oo+kz6dSMxKv21MpGNcD/WfP5KmmmkeyWHVqkKas8soGSRsa2UR1bW9Btb8xsqWv8sK3BPbVZ+BZV+4kbVchLMazpFlZ3j/AEfz+So3hIDAJPqt0XfVbKHkdHFzPdNZhbyVAuVnULObjLlyVAQlqOv6f5/IPYff5CeKnGPAbXQPrUDWFess5erTcsRl/S/I/ICLBXCuFdt2pzJHCOxZN/FGOcrCoV1cK4VwrhXCuFcK4VwrhXCuFcK4VwrhXCuFcK4VwrhXCuFcK4VwrhXCuFcK4VwrhXCuFcK4Vwvn8k7K8vDqa31btU25kTP8hevsoucWzD6u2SLqq3XLU/GUtugaq4uXVFziXVVzYXu8f0fz+SehhqHse79Jph7N+l07XBzfkLjr22XHXgJgqB/PCsasKwWWNRjZcdWsKqyjbOHDP+j+R+Qew+/y1NpZG2wFM8dNZHI29xTvb/AQPH8TE7HyMJuFr+LQo4rPB/pPkfkHsPv8hNpqM/7bYKUts2KGJt8WwUhH7YhpyBjxwtanRU73WPHTOsVG2EPbj/R/I/IPYff5ah+mvVqB3SvSRPLV6G6c2kBscqW3RfRk960CbBEx2Tf6P5H5O12u130jEw2QjYPYsa7342riYbrjYsGrtdrtdrtdrtdrtdrtdrtdrtdrtdrtdrtdrtdrtdrtdrtdrtdrtdrtdrtd3/8AiP1QAOLnfU429r9Rb801U2oBt/cbFQA4udNOMbbNT0mzzOcVsSiJ73bNQQSmzzki75qm5DeeoI62Ki5WxLi9zjUVAWxUkOtyy5gLnqRdGea7QBPP1czygy355+kaipC5qgtcQ2WYtJW1UdIVE5C5peIlbM/d9ioubbM9rozzjAJs85DyuepBKdPUNuueoTZ5i8gtqZiAhVTkAplRM69zUzgZKWWYMaWcsnLiueouAuWXJwIqZ7AmSona54HNKWkjnqL2WzUXXPOGsKH+d1dXV1dRuq8wHmSt+M6vBB9T+zcvrLFZVpunPrP+rzVB7sHPqOSzMq291nWrKsyaE91Xd2AfV37D6vjJQdWdqN8+f7mdamyVZaChJVggukdU3fhnW3KyrLouqsWWkfUg+Ebp8zyB1WE91TkMY9u5c/OrWdb0nOqzG2zjUhxxdJWNBKL61OfU5DHKqxJWdZ7LKsuVlWXRdVWYmPqvPJjqrKPIurE91Vd+F6349XiCm5YjIfakfXSUtO9euXrl65EVi9YrVitWK1YrVi9ZdesT9ywR3LtR3LtQ3FasVqxesVqxWrF6xesXrFasXrF6xWrFasXrFasVqxesXrF6xesXrFasVqxesVqxWrF6xesXrFasXrF6xWrFasXrFasVqxesQFYrVitWK1YgK1SSVAkeF//EAD4QAAIBAgMEBwMLBAIDAQAAAAABEQIDITGRBBJBUQUiYXGi0uEygaEQIDBAQlBSscHR8BNikqNjgkNy8WD/2gAIAQEACT8B/E/mVqnL+MXVqndfOPmsqKiorKitlb0KnoN6Deg3oN6FT0KnoVPQb0G9Cp6FT0G9BvQb0G9BvQb0G9Bsb0GxsbGxsbGxvQbG/kpEOTiVfJXDZcbMTZn7KP73oV7u9TTnj1mLlL3ojDMvZRPVn2situt5r1NzCpZ+17vm8hpYxkNDQ18CDh3FKqiILVJapLVJapLVJapLVJapLVJapLVJapLVJapLVJapLVJapLVJapLVJapLVJapLVJapLVJapLVJapLVJapLVIljPCcmbv+IqcM+ryKKXxWGYlNKnLdnUXwKM+wcTXBX9lcBw1W4ZXVMz7yuUXalMJtcjaav6UOr2p6xRSlRlVxfzeQ6iqoqqKqyqsdRTvJxxjIteL0LXi9C14vQteL0LXi9C14vQteL0LXi9C14vQteL0LXi9C14vQteL0LXi9C14vQteL0LXi9C14vQteL0LXi9C14vQteL0LXi9C14vQteL0LXi9C14vQteL0LXi9C14vQteL0LXi9C14vQpbKGUMpZSUFJzkv8A2UfiZcRXSVrUuIuIuIuIuIuIupF5F5F5F5F5F5F5F5F5F5F5F5F5F5F5F5QXkXkXkXUXkXkXkXkXkXkXkXkXUXUXUXaS9SVpl1F2kvIu0wOS5SXUXVBtKRcpL9CXIvKrHgXUXqO4u2/ZX2T8f6litNbstU5x+5s7WLcbq4otupLGIzNnrwWGGehbap5QbJVPcbJXnw5GzVL8SifzNnqdMOVux3ZcjZq57mbNW1zhope5w6rRsrXKFwNlry5fzU2et0upbqjJGzVdrabLTp54Gztvdh9X+YmyunGfZThlFX+MT2lNWhS9CmrQpehTVoUVaMpq0ZRVoyl6FL0KXoUvQpehS9CmrQpehS9Cl6CehS9Cl6FL0KXoUvQT0KXoUvQpehS9Cl6FL0KXoUNpVKcCw1hDwKKlROUM2eqpzh1Yw9xs1c8MMsO/EpdFEYKIK37KLansKGuWI1PKRqV2lSjvKlHOflT6vxGu6RqF2mXOSqnUanlJ+Zi8cnyGp5SNYdpUo7ypR3/InW/7cSimnvc/kXf8af3kuXH74/I3/wDNlPxZQUvVm/8A5su3F8fzLiffT+xan/1f7wZ8ng/qlKbopmGbJRFWWeJs9pPvZYtas2a3HPEsW4VG8UU5chSyhqJePdkil+0n2d8lL6tLzSj1Ka8qccE8OwT45JT3tGBjVwHvdXcyLVUvClRw9RcsuxlLczn3FOdtI3vbnhHfIoe78S01FNS+EQJ+088u9Mpq6tMQ0v4ymv7OOE4TwE+OSU+9dphR9v17D2IlTllwMJWOGWPH3FO693q95Q44J5mOeDxE53VuwoKW6ZwnOC3jD4FvCVoUyt94tcCng5cFHug590dx7UY/U19g2ZrcqpqnrY7psnwfKORs0b0zCazLNfWqTmHw7CwqN2y1Ko3d7Hj9XqdHdloblXh/cs1+6GKtd9DK0XqNS9RqXaNSrRNlFx/9X+pZf/ZpfuV00/8Aqp/Ml1c3j9bz9RSo+JTg3H6lOTxx7Y+fUpiUmNqCqrT7xjQjQjQfwH8Cr4FXwH8BiRBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBHy7QuGCc5F9l7ifinPhGRnHzUxMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMT+ZQ1N3HiWZp4M2dmzVLDiU4xThHPP5t922qEk0sf5ibbcxz7TbbiUjlpZ88C/m/zNow+JtGHxL0LgbQuJe629KZcUf04a/u5l+VHEv8C8oxxNpNownAvUt7uHYy+sjaC9jHWeRtHDAv4/zsL5ex6sPLIuzVvKHl1S7L0No5G0KS9DVPxNoL5Wt9ceeBeVVPL3F2amkkXcOL5F9ZYTkX+s2t1vgi+XytUKOskXk6mklH8wL+HMvl6UnlzLzxpapjhJfwL/V+PycvlvrQvYqckVT9HtNVWPPmX6p4l/7e83xyL9XZoX6p5l+pLq4dxdftSbRVwjHI2ipwbRUn/O0v1UxTu4G0vku/UvOePPEvOnH1Lz3XSlnk+OptLltxLhY8DaXiuGRtDpaofs9vEv1JzP68zaG1+xtT54cUi9Ukqd2Ey/VGEY8S/ODj3o2p0uJf5aG1Nd2H6m0VdWfeXqutTCfFG01/xG0OezhPvL7ph5znvF+rdxTxk2je3ak47jaGm5+JtNRelZQXXTM404ZuTaGoW7nxRtL5TJdayWhfq7jaWl/O0v1SVtw5S5YHL6hV9qNOBdjftxi+DL2K7eZW690uexThv4YPvKklS3VmXcM4kufFFVS3E028i5Tg+LLvDOcyvqurBl1YOc/wl6mapeaK8k5xyRTXu01PdhP3lbcPD/tzLqW8mnjyK911UqHxxyK8G4wfEurKFFRdWGWK+1gXMeeBWsM8VwLkOmhUOpVcGXaXuzyLma4vngVYU1TvSXPabfDCWXYlT7WaN/qtOpxh+Q3KrbfeVpup4Q13lxS8M8oUFzPGZLvDn75Lq60PPkVJqjHn7TK1FdUpzxpK1DjjhgXFwxnmVKmaZnsLiw7fzJ6xy+ka3nTKU8ERqRqIs0YqCjHCMeRZWpRHvLK1LfGc+yC14mWUnM4Mt+1niWlj2llY9paULtLfuktKe8txNO7nwKO3Moh4ceWRZWLnMt5KM+Bawx48y14iysO0tLUsLjx5luJaeFXIsrDLEteJlHVqzW8WvEy0soz4FvPPrPEowqmVvcy0lu5YllZzmW1hljzLUy+LLOf9zLWDzxLSjv5lpZRmWVnOZaWCjMtLUWHecvpKa95U7qfYUVCqdScp++RMqrznFcZkT0E9BPQT0E9BPQT0E9BPQT0E9BPQT0E9BPQT0E9BPQT0E9BPQT0E9BPQT0E9BPQT0E9BPQT0E9BPQT0E9BPQT0E9BPQT0E9BPQT0OX0m0blSohI6Qqg2954dxe/qPefW7DaJ7y/T7i7S6YeHaX6Zgu0qnAv0l6lU4YdhtCffBfp9/wBycvpKaHb/AKWT/H+xs9iN6MXHvLNlYr+PEpppr+0kWccd42efcbOiylVwRs0my8vufl9QanHe5PE3O83RUrvRudhukT9zcvpGNDQ0X1NMvvNoweZtCzNoWWA0MaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGjl9JXTu7i6tWTeI7OA7cbqjc5/IqZ4YfmKnjPZ3FlZZFqksrj8Clb0U4cO0t0xx9C2nnmW1mcH9x8vpKriaojq1Qi5d17IK7uDTWOGHyXlV3lxT2srpefAuqrvK13tyVTjwwLnxKmso6xXKx4/cnL6htVXbxNpW98S9U8GbTVrPA2hThlmXZxnrZF1LrOI7e82hYbnHkbQ6vaw7/uTl9QvaMvuOzIrnOcS7h2PsLzjDuLnHDjiXcZqwiC9wS1Lstb0L8/uTl9QWK7H/JJ54v4mFSwFHBFNeGXeb/PD8xt4p444vAo5fApj7k5fSQQQQW6MCikopKKS3RiW6S3R/8ACCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCP8A8TYqhT7OP8ZZuR8c4yLF3vSLVdOCfWjj982HhL93AtThLxNnfcWnCWpbiDZ3qWY1LXHMsassOC1EKUbPz48jZ9S31cMSzJZeNKfv5FnOqC24ppbT5lgsMtQ95YdnEtcVH7mzMsNFubi+yWKuwsOPzNnZZltY9haaiIRZ0LE8oZZLLSSzLL/Q2dlhrqt+hYcL9CjrcVHYW3u/iLMYqS3gphmzvGOPM2eqpLJ8y1jvxH6lg2dwWplOc+f0qp3cceJRQU072/4SmnN75Qs80KlFNPvN1rhPDAVO7CxZu9xRSKmOLFRHApUFNO/Kw7BUlK3eEfqU05lC7moZQonGDdjhIqVyFQKnexmSlNYeoqd3CIEn3xn+wk6YU9417L6vCSmn3/8A0pp7RUquHPYQ1hmUJ92JTTkKmN34iW9vLDsFT3m53ipghPd63eUrJ7qFRH2hUipa+zJTRmJTvPDDIzjH5ekdoW9apcdR5rtpbOk9p/1+U6T2n/X5TpPaf9flOkto0t+U6R2jS35TpHaNLflOkdo0t+U6R2jS35TpHaNLflOkdoy/4/KdI7Rpb8p0jtGf9nlOkdoz/wCPynSO0f6/KdI7R/r8p0jtGlvynSO0aW/KdI7Rpb8p0jtGlvynSO0aW/KdI7Rpb8p0jtGlvynSO0aW/KdI7Rpb8p0jtGlvynSO0aW/KdI7Rpb8p0jtGlvynSO0aW/KdI7Rpb8p0jtGlvynSO0aW/KdI7Rpb8p0jtGlvynSO0aW/KdI7Rpb8p0jtGlvynSO0aW/KdI7Rpb8p0jtGlvynSO0aW/KdI7Rpb8p0jtGlvynSO0aW/KdI7Rpb8p0jtGlvynSO0aW/KdI7Rpb8p0jtGlvynSO0aW/KdI7Rpb8p0jtGlvynSO0aW/KdI7Rpb8p0ltGlvynSW0aW/KdJbRpb8p0ltOlvym17S+s/wDzVr8mkf/EACoQAQACAgEEAgEDBQEBAAAAAAEAESExUUFxkfFhoRCBsfAwUMHR4SBA/9oACAEBAAE/EAAKAA7P4yjghu3ELC84DaltPwrcNCbAuCqsm/8AwbiKLny/BPl+CfL8EVTLDwT5fgn+iiCaipNWSklZKyA1FYmKhFWSsjeYpNWSslZKf+ImZ/MfhP4iIUdfxP5CfyE/lJ/IT+AlBeqP4CfyEERVTioujY8yjBK/CsJa639FSzR8HEsrWXcW+3UAYlevkUIb2adI8qVFsziXRVippsKSxrHQbX+CWTi0xxbuW4bgiNFRhnpHFZYpZF+RwVYfH4XX8P5stKEOABHFwWtvFF/tEArVehiv0jkpQ+P9J8vif6mfaqlodUYSlNjQ3PRz0c9HPRz0c9HPRz0c9HPRz0c9HPRz0c9HPRz0c9HPRz0c9HPRz0c9HPRz0c9HPRz0c9HPRz0c9HFlvSLZST4dLgwmAvAbdIm4UpAaSwmSl0E44uLhwLYNWLh7WVWjGjPmIspIoXVxL9fT8RTb0Gkbmil3Xo0w+y66W8hUNWKTZpMi4waMuYvMUAw6t/AJv8WprcBKa+F9KP8Acv8A4T/cu9/Sf7l/8B/uX/wH+4334z/ccvdStG3Ay3GVuMrcZW4ytwlbhK3CVuMrcZW4ytxlbjK3GVuMrcZW4ytxlbjK3GVuMrcZW4ytxlbjK3GVuMrcZW4ytxlbjK3GVuMhcYM7C7qqy31n88gf/OVEeb2RdtWq6T+YJ8r6jW8EswPb+I+IHW7zqPLDqeb8W97Pez3sf+7Pez3scIkpiQ3+Iv1S1p+ifzSfzSBTX0w9RP5pP5pP5pP5pFFX1z+USjaeJY5+mNbWfolxgvE/kkab+mA6/XP5JP4pP4pD0s/ikKC/lDS3PnJ8Jg1v3kWdLuQtzyQKsdyRFeULGo/94/D3oeu4hKxW8EVADyjGGUrYY4K2gDEDnkKdFy4TpUFWl0g9KfwpEvUbWVZ/JnI1ErbRB0Rqd9UuE7L3rRkxaN06iu3bXU6wONXChzVXfw/2YR3yVdjBcdgKw3ApBoSYm6dBN3Wd1FXLSPGnJ3ROAnsVTTgibjqtYl4My9mGugcmbJRLoFAXWUGUf9bK2DFhWbm66MKOZTm9wd3ES0ZNyoX6qgGmmrLhdeqF6eGF94doVeXlgxElBMCooautwoICmmMlj4R3TFrzoK/5kf8Ae0rP82CTs/4oJ6/nRox50KT91Paof9VPao119yJP86Jh+6h/1UYN+dPep7VK9eVF/wDJRSr86Yv76P8A1U9ijp+1AtedPep7VND5UZNkFsg2kasIEsgQkrDVSw2dauIt2S0kWjPpGeD5tUpkBA9EtjjUV9acQGt7bALbBFsRsBFC6vowsazLtlAgWwMiCg1tuhLBYvWiCAhYnM+KbTfw5PiyEK5OgXBBFsejvC4hFXgKKgoO5ox3K/yqSxsNbq0GgjcAxRc+ICq80gyE7VaoKZrNLqRS0VpTTPi+4qhTYfs6I6wvnfj/AGnCewQ/mF4E+Nd1/wAz58v4ln8C/wAzmHtFP+QP2I+EVT5RD973/ULFId3eBnxT4p8U+KfFPinxT4p8U+KfFPinxT4p8U+KfFPinxTFYwjTmoejv3L4UAizKjcbI/Oysq3AwmGlcjXWDIQAMI9KjAbcwmBWGpbYAjhTaBB7ewk3tQUHSkErKJG5ioBbr4XpgZYmI2t1+oqpka88KW32gBNqpNGXrjiFzi6KGNjjhJhCizAtlXmEz0F6CtmAeNyxViGgLgWhzHUSEtGavECsrpvXUvksjml07IhEs4oFWwObZdT7TATfeD8RFGVQIDQhVQq9TIqA0Wfq1LpMQnXG7S6jPUWstHQRq24q7IQZVLUCqthGqCS1ktZdIHR6Nhw5Y1LHIMLK6OOYQ9S/SUtcVfEpQeojbdZ2nSWaiKfc47vSdF5DnQ1KSopJWRfN1EcOEsVZqqcktHrO0zeKzCks02sF53iBJQAI0pUd93qogdD8r/8AjVAriBbsmP4MEt2XiWi5q25c9SNWaU9jXE2kz72GFSvWSOSpl8w0f/MJtLir5rPE/jr/AMJX9pj+5NB/+HAzmLuJ+5CY9L/HOO/8TBD6nl/hLNL+Ji0cYL5F5/0gZ0uvY7cfp/8AUaJSxVKHTdIrWU1y7POpexKhXrXRNW1UjQUP/dPnQDmlxZrBF68qurvAzYFmszYK7/rUcf2A0QUrG+pemKFVuuvVtjy1N8Yl6i7ufhxXHFcUVxRXHBZd2/SpeFfkuKbhXZ4S9FJ3eLO77zu+87vvO77zu+87vvO7xZ3fed33nd953fed33nd953fed33nd953fed33nd953fed33nd953fed33nd953fed33nd953fed3izu+87vvO77zu+87vvO77zu+87vvO77zu+87vvO77zu+8y58IaJzEgKgHoCrfEOiMu/uEb3RyuKKr5tzBY4Ksy8EBhsAXlD/wAlizwS/RL9E6P2Jfol+iX6Jfol+iX6Jfol+iX6Jfol+iX6Jfol+iX6Jfol+iX6Jfol+iX6Jfol+iX6Jfol+iX6Jfol+iX6Jfol+iX6Jfol+iX6Jfol+iX6Jfol+iX6Jfol+iDmqTuQ0fizNVwRV7vpdwiIkCvOrbzEwwrWeS789ImW3k5P+BhAOe2Kr8KiLhbetNNX+v5dMuo9SCW2K1TtAlQm3z5YLWekLtOLWM7IFbRRf1lVKNiuSjJDeB1OuuaDHk43MjeOcHC+niAYqo8fpUya7c510aqCil0RQFa1Ala6EbhdohQBXlCAi40bw54oxA4Qs6gHBVeOJXIdbx+2JayOpwY+MuJaOwEKOvRTUBFIFi234jdQD7baKl62TqLUbMdI75zp6NVnEahCApTA66aMKaFG156YrUHolmVha3pi419E1FBtcOVhMGrWMnjGJjimVPN5NQDAsbatsMQCnUvL1NV1lBa29IUHxjEtKWaxeAewRYE5ZdSi4MKy7wG6c9hpgttU4Abem3msTAjdaEEeMxNsnIbA1ZXmFKVIFfRLhEbay2XBFjWMb65tSNppmQ28NQV7Gqqpz0ySV6jR8KAqopqxSAo/JYR9IRQaeIWaG1ELN6I3yNUr0o2S/wDDsPkcn46e6Gj8FYYjF2b+WGa1yKabYTC7soqjj/06Z9A/N0vy/tM9ZL2VrasMtq1TMzcvTLHf6u7fXidAOKVqjgu4poGjFnXmZbBTp+/WDVdol4M3VCQNw9gZ1KHcYIbotu65uLAHKyLobKhUoStXkHrcoEVy535U1kwEBrqhzere2Wp1H5ocLuFuYSN6Nt7VYm6Q1rcurUVdgNtsjamYpcNI6DhL8XHFIGwvNv1RfdIqrxaeVzzGh2oBwpUO/mZkzNym7W7uLcaqOVBbd/pL1+uPWixuCKYsXVgW23tGgMpLIf1bJxK3Cb003/W8XMuM5deWyrW6jTEXq9VTmUsQ0DJV/KCIZ12PTr4JQOuHNfQyupS7sayZWdYwalSoYUXTNAaksu+mnPGobqsGshWeq5bh2wSjBKNJzDGwg66Xrl5gdAmCFbfOcOaJSpoECteUCgwZsrnncFzt91tvLyuXNhUyqrseYkskTpNOfE6e6Gj+k6Z9A/N0vy/tBQvCwOrro8Q9FfCV84TIWAONXjxWa1CmCgljWOKiZIBgW9tBFRgRNilXK+CmwU1m3EElC7OpkaOkQ2xAAbBTKdamZOpk1G7b8yic0rbpm4JLZy7avYUFO4AoFOnavOOkZGW3UL0JnbHUFg5dTMWiCC3SwqVJfnPK3bx6wEqE64FaQRtydVta5jjZFKU2fpxLsoBgzZiDztgYr/zSqFSraNHWii7gSVoL1FNMqLUAsVDsbqOh2/eillfpUwSu4FoHC4VBIEEsYFMu1vqGCnyxEErAQfRaXHxsaWCU01Ql1kl8FLsdYHMVWsBab01kjlelQMgfKVfxKkRYIA3i9TAMrpQGloLoaxxKK2dZarY6gRg7Ugq7LXVJiJZBb4Fg+FaDGlKKhlNIw2GAXNb5Eg/Js1D7clUTKXFy2Bbb1P3kNH9J0wEShhFptDgufypNwqC2+Z6/EGIBsFmQhGwAWxLWIcxxdBHeJCbCsKOQ1VZYqFgs+MpkrtP+7NF+qAo3VX4Kiq0OVF1btOF5Jj6tbn1bgpR1ZwMBLC2GFAlKodK9Xmuk1Z0C7dIEq2FnhdDiB5Xttbcoi1ou8ys1DowxrwgATYM98xcIpTF1AZIDgDODrpMlKAVVqThheFlKbtVLa9be4DyBpmAbeTGF14jYgIWG9kEDgVRleO8Duq3uggCqjYrdxGyG/A2SnXIS306T4EagFOQmA2QCJG9sTSl72suYaxcncwq1Us35QvabDlQvoRcwUUqilVmBgpALbpuX+csPJbNP8w3pUAJK2NbgIdQM8VrxF1MqrnBVRGjKF1srLrDR/SdMq9OJStkrVLuLK02pbSqtvO45lpuyqA+CVE6j0eIDVC8BWhI1i0l+xL9iX7Ev2JfsS/Yl+xL9iX7Ev2JfsS/Yl+xL9iX7Ev2JfsS/Yl+xL9iX7Ev2JfsS/Yl+xL9iX7Ev2JfsS/Yl+xL9iX7Ev2JfsS/Yl+xL9iX7Ev2JfsS/Yl+xLxw7bK6kNH9J0wIpciCB4F/PmOsOmVroKWUA97ANrQ/SAQVYuDtyF3LWCVjDntLAss+iKoc0NIfqNbmY6VtLgz0g3ghulTxVzK4QWHlqolgK80T+2oYuHoo/YPMs5JZySzklnJLOSWcks5JZySzklnJLOSWcks5JZySzklnJLOSWcks5JZySzklnJLOSWcks5JZySzklnJLOSWcks5JZySzklnJLOSWJp6oaP6TpgN26MXKs/eIFVLbMAGvJbURhQI0qbW1DiNFSdaDXSCFKaMNGivnrKQEBVKG+YHbdvHWWOIoEVyZUg6ncW1FVQW2eLlHBKOCUcEo4JRwSjglHBKOCUcEo4JRwSjglHBKOCUcEo4JRwSjglHBKOCUcEo4JRwSjglHBKOCUcEo4JRwSjglHBKOCUcEo4JRwSjglHBKOCUBo6oaP6Tpn0D84y8v7QiDLQYBFeCOgQ7RT+lR0qpVOqe/yRhstpg8hxxH5EHCoV5vzVTGNGxTrn+zfvIaP6TpmgNHWewnsIEzRb1+JVRSxxZ1ddAmGL2WU1TU2ml14bi4tbyXTAUXdXM+J5ntJ7Se0ntJ7Se0ntJ7Se0ntJ7Se0ntJ7Se0ntJ7Se0ntJ7Se0ntJ7Se0ntJ7Se0ntJ7Se0ntJ7Se0ntJ7Se0ntJ7SWJpHKGj+k6YYiC6hLL9Rzyu6t9eHgJYsMsFZZZQ28v7Qd14yChKRtWldUWvlcfUoikU99w6LVNO672xsp6dVl2q9/Ubbl4Q5L1SsZj4OoPQVU064dwAOBUoXV46xWAVSNV0P7H090NH9J0zFn1dr6oQ0DkdS62QfJPFRe6qY/Vf2hc1nddbhY2U3eBeqoF+Y40FaZW6quIECtWwcBKqUcX9AaggQQFtdOBCN7kHfj666OImrZuz02rjjEXVruPh+v9k/eQ0f0nTPoH513n9pYDYsX8q/SY4kLZbvkFVqY5rYOrYeYlFik0AjoVBbZnF24mLMAs23w51GLjKk3QLCySzi+zJUIO+tx8eL2TN/7J+8ho/pOmfQPzdL8v7SraU3SWtxbituBa+qFV8RNvgNu9qHWCUQBga1b8QDpbAUJa648QBqoXWOLWbl+LoOoFygF6E40sGs3cGQVVDmvCtf2T95DR/SdM+gfk6XL+0VWWQqhXNldYDjTZg2922XCp6qrHAkRC2hwFW2FkOKKrZEAtX1rcCARSBLxQO9URqOKhZYQzGCWgFrggbbF1Tgv+yfvIaP6ZUCsDlnZ5M7PJllQYMyXAoxohtHzf68whG23nmAql7tjlEaX+kzXltbrqzHRoDXRWTt8mdnkzs8mdnkzs8mdnkzs8mdnkzs8mdnkzs8mdnkzs8mdnkzs8mdnkzs8mdnkzs8mdnkzs8mdnkzs8mdnkzs8mdnkzs8mdnkzs8mdnkzs8mdnkzs8mdnkzs8mdnkzs8mGxrVYho/vho/ptkbyXS1WQrkSwaHDQZ1gCh84SeNsdCi9QX0lL/bjR/wCrly5cuBgBbqevlnmXBwkNhehiCKpwrkvmFKaEcl6ui6qNVolDdvLVXUACo6bPFYhwwU5UNbxAXkKivIPHyQEfIH66gyBhQG7dQFiF2ZT4q4cI2zqf4dZYkEurP6aI02yyzKuJk4HFWahWa0VoFtUOp02o3RLXk0BmdZEkqjqFaVm8W3gvjEcw5V1nr8nHWYQABDfVGHpoCpd70wQUsa111b1xFi5iZtetNBKlsJYum2rGoWdqF/rbUuKgaunwsKiOZ0FLb5MEqpNqyCvTuIrmbbbmNouaBOz5rUOd6tWm89oVAtXuBGxMXk1oiPUoNtlObSASlp66epZNV8Bd2mtIlVErltBbQhV9JY0s2p0nZExcQv6C4XJ2sWoC5dQtzqG2tYlHzBW1oOprMJENi4kdaiud1u3Fw33N5tA1V4nL/BI7VCAFJQ6cRrSlY1DR/wCVjNZWVlZrBbdR6aYhKRi7RrOdMotYzhqihdUxnVLPB0rMUALaqNDwu0jvRTVUn2y2oqKqjbe98RQsapSqRdVDBbXdZnQauLBijeHbDc+U4PmXI68OmTBmCRFmqZC97zLNyWisdsyzLNVijqlq1aqWhVVQVeHmXxaAIFjVrRZVke9VAD9GD0b/AMgq4xHdSt0XVZgaq2qODGz5glxrTAeMuYXRpDDW/uCuVLaVfTTKjds2g+0ruEs51beZbbvLDqSq7OsOZRFQLlZliYfqNGErlljin4FviBcw00p0l1mCagXil0S2HRGUacZnKZULfoXuZFYLGm1HDmNIdarmus2TXDCwTHJvVxoaWGhSjWNsuCiFVS7+41fmKU/uxKmIRQlP16xFi6it3i24ujPp2YNZmkctgeMsD1YAHB894lVm+roeZfKFp0MdY04CqhzNoaJp370Gar8wrP4id/8AFNsf4PxldTF/FkifhiRr/CI1AaOAdJj9gYj5A9In9Q9In4Aga/AIEgGoDUBr8AgagNQF/AECH4BAsA1AagIQGoDX5BAga/AIEgEIDUBr8AgagNQF/AECH4BAsA1+ATE/8K9auTcSgLz88GdgCf/EADARAAECBAUCBQMEAwAAAAAAAAEAAhITUpEDEVFhoRQhIjFAQWIEIFMQMDJQYHGB/9oACAECAQE/AC9rTkVNYdUHdgQexOX64mI5ruxU19SnOqU12RJK6jc2XUbmwXUbmwXUbmy6jc2C6jc2XUbmwXUbmynjU2U8amynN1NlNbvZTW72U1m9lMZvZTGb2UbcswCpg0QMQ8lmdEHMb/JGHZeHLLsmsaMs3ZrMahZjVPZE7OIKWagpRqClexIKkN0bcqQ3RtypLdG3KkN0bcqQ3RtypDdG3KkN0bcqS3RtypLNG3KlM0bcqWzQXKgZSLlQMpFyoGUi5ULKQoGUi6hZllkpbFC0LIJpG9lifUNLh4ShjDTlDGA9uVM2N1OHnlypw3upw05U4acoYw05U5unKngey6jRhU91Aup7qBdT30C66g/jN11A0U3ZTdlM2UzZR7KPZR7KPZR7IOJIAHcofT41IuE7BxW5RQj/AG4BRuwTC5vdEZqAaqDcrLsoAiwFQhFoIAUA1UG5QzaSQM1MFPCmt+KmN+KmM+KmN0sEXFwygCHYfstdC5rtCCupw/wi6fi4OIAHYHl8isXEmPiyyRB1WR1+zNmicWkdh6jGx3YJw/BmHOyOy8WyyPrAVn/gQChKhO3rB5ey7fFZ7D1oI2XbZdtkfVj3X/eFeyd6sEDVRDdE6E/28TquVG6rlROq5UTquVE6rkqJ1XKidVyonVcqJ1XKidVyonVcqJ1XJUbqjdROq5UTquVE6rlROq5UTquVE6rlRPq5UTquVE6rkqN1XKL3VG6+nJOH3Pv90LaQoW0hQtpChbSFC2kKFtIULaQoW0hQtpChbSFC2kKFtIULaQoW0hQtpChbSFC2kKFtIULaQoW0hQtpChbSFC2kKFtIWGAGr//EADYRAAECAwUHAwEGBwAAAAAAAAEAAgMRkQQSExRSITFBUVNhoSJAYpIQIGCBgrEjMEJy0dLh/9oACAEDAQE/AGQ3OaCEYEQSOyqLNpaRIgT+2y2eC+CHOZMzKytn6YqVlbP0xUo2aAJfwxUrLwOkKlZaB0hUrLQOkKlZeB0hUrLQOkKlZeB0hUrLwOkKlYEHpCpWDC6YqVhQ+mKlYbNAqrjNAqrrdAqrrdAqpDSKqQ0iq2aVJvJOexpldWJD0p7ST6U29dEpyXrBn6k+I5wIDJT5BSdyKkeRVntLIUINLHzmdwWdh6H0Weh6IlEbbDP9ESgWchaYlAs5D0xKBZqHpiUCzcPTEoFm4emJQLNw9MSgWbh6YlAs1D0xKBZiHyfQLHZyfQLGZyesRvyV9vyV9vyV5vyV5vyV5vdX28ijhngVKFpKftOxQrI5jCLwojZyZerwjZyePhYPcUWXO6fhYB5j6VgHbt8LAPMURs5PHwsB2rwhZXPJkfCyYG+Mwef2msrC4xj+Tf8AJCysHrP+gf7LKwes76P+rKM4R2/mCjY3ATnMcxtWD8lhfJYfdYfdXO6uqSuqSdJrSSdgEyjbLPqI/SUy0Q4kxDD3S33WEptyM2+07EDJXzyV/sp7VfKDiFeKDjOavlX+yJa9oaXFpFFgk7ng/qA8FZeLofRYEXQ+hWBG0RKFYEQb9n9xA/dNa2G4OMUkjg1OM3EyAmdw/kvbea5vMELKxSZ5g/SFAFqs5cYdpkTKfoHBQYWEwMvTQI5KY5fcuxOaaHg7T7hjA+9tkQF6e6mPey/ARKmrw95x4qql3Pvaqqqh7s8PtHuyD2Uj2QHOX4PO/wB8V//Z"
              alt=""
              width="138.25"
              height="122.88"
            />
          </ExternalLink>
          <h3 className="micro">
            <ExternalLink
              url="https://insideuniprot.blogspot.com/2020/10/introducing-uniprot-alzheimers-disease.html"
              noIcon
            >
              Introducing the UniProt Alzheimer’s disease portal
            </ExternalLink>
          </h3>
          <p
            className={cn(
              styles['latest-news__abstract'],
              styles['latest-news__abstract--4-lines']
            )}
          >
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
        <ExternalLink
          url="https://www.proteinspotlight.org/spotlight/back_issues/234/"
          noIcon
          aria-hidden="true"
          tabIndex={-1}
        >
          <img
            loading="lazy"
            src="https://www.proteinspotlight.org/images/sptlt234.jpg"
            alt=""
            width="125.46"
            height="86.65"
          />
        </ExternalLink>
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
