import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ExternalLink, LongNumber } from 'franklin-sites';
import cn from 'classnames';

import HTMLHead from '../../../shared/components/HTMLHead';
// import YouTubeEmbed from '../../../shared/components/YouTubeEmbed';

import useDataApi from '../../../shared/hooks/useDataApi';

import {
  LocationToPath,
  Location,
  getLocationEntryPath,
} from '../../../app/config/urls';
import ftpUrls from '../../../shared/config/ftpUrls';
import { stringifyQuery } from '../../../shared/utils/url';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';

import { SearchResults } from '../../../shared/types/results';
import { Namespace } from '../../../shared/types/namespaces';
import { FacetsEnum } from '../../config/UniParcFacetConfiguration';

import styles from './styles/landing-page.module.scss';

import ArchiveIllustration from '../../../images/archive_illustration.img.svg';
import {
  useMediumScreen,
  useSmallScreen,
} from '../../../shared/hooks/useMatchMedia';

// const tutorialsInfo = [
//   {
//     id: 'yp1O1gDK8oA',
//     title: 'How to search UniProtKB',
//     date: new Date('2021-10-26'),
//   },
//   {
//     id: 'BHu88Sv--mc',
//     title: 'How to explore a UniProt entry',
//     date: new Date('2022-02-17'),
//   },
//   {
//     id: 'p4_gGkM-Rfs',
//     title: 'How to download embeddings in UniProt',
//     date: new Date('2023-06-25'),
//   },
// ];

const metaDescription =
  'The UniProt sequence archive (UniParc) is a comprehensive and non-redundant database that contains most of the publicly available protein sequences in the world';

const LandingPage = () => {
  const [expanded, setExpanded] = useState(false);
  const smallScreen = useSmallScreen();
  const mediumScreen = useMediumScreen();
  const { data } = useDataApi<SearchResults<never>>(
    apiUrls.search.search({
      namespace: Namespace.uniparc,
      query: '*',
      size: 0,
      facets: [FacetsEnum.Database],
    })
  );

  const databases = Array.from(data?.facets?.[0].values || []).sort(
    (a, b) => b.count - a.count
  );

  const groupedDatabases = [];
  if (!expanded) {
    groupedDatabases.push(databases.slice(0, 5));
  } else {
    let nGroups = 3;
    if (mediumScreen) {
      nGroups = 2;
    }
    if (smallScreen) {
      nGroups = 1;
    }
    const countByColumn = Math.ceil(databases.length / nGroups);
    let start = 0;
    while (start < databases.length) {
      groupedDatabases.push(databases.slice(start, start + countByColumn));
      start += countByColumn;
    }
  }

  return (
    <div className={styles['landing-page']}>
      <HTMLHead title="UniProt sequence archive (UniParc)">
        <meta name="description" content={metaDescription} />
      </HTMLHead>
      <section className="uniprot-grid">
        <h1 className="uniprot-grid-cell--span-12">UniParc sequence archive</h1>
        <div
          className={cn(
            'uniprot-grid-cell--small-span-12',
            'uniprot-grid-cell--medium-span-4',
            styles['image-container']
          )}
        >
          <img src={ArchiveIllustration} width={250} height={250} alt="" />
        </div>
        <div className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-8">
          <p>
            The{' '}
            <Link to={getLocationEntryPath(Location.HelpEntry, 'uniparc')}>
              UniProt Archive (UniParc)
            </Link>{' '}
            is a comprehensive and non-redundant database that contains most of
            the publicly available protein sequences in the world. Proteins may
            exist in different source databases and in multiple copies in the
            same database. UniParc removes such redundancy by storing each
            unique sequence only once and giving it a stable and unique
            identifier (UPI) making it possible to identify the same protein
            from different source databases. A UPI is never removed, changed or
            reassigned. UniParc contains only protein sequences and
            cross-references. All other information about the protein must be
            retrieved from the source databases using the database
            cross-references. UniParc tracks sequence changes in the source
            databases and archives the history of all changes. UniParc has
            combined many databases into one at the sequence level and searching
            UniParc is equivalent to searching many databases simultaneously.
          </p>
          <p>
            <Link
              to={{
                pathname: LocationToPath[Location.UniParcResults],
                search: stringifyQuery({ query: '*' }),
              }}
            >
              Start searching in UniParc »
            </Link>
          </p>
        </div>

        {/* Table */}
        <section
          className={cn(
            'uniprot-grid-cell--small-span-12',
            `uniprot-grid-cell--medium-span-${expanded ? '12' : '4'}`
          )}
        >
          <h2>Top Databases</h2>
          <div className={styles['table-container']}>
            {groupedDatabases.map((databases, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <table key={index}>
                <thead>
                  <tr>
                    <th>Cross-reference</th>
                    <th>
                      Number of
                      <br />
                      UniParc entries
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {databases.map(({ count, value, label }) => (
                    <tr key={value}>
                      <td>
                        <Link
                          to={{
                            pathname: LocationToPath[Location.UniParcResults],
                            search: stringifyQuery({
                              query: '*',
                              facets: `${FacetsEnum.Database}:${value}`,
                            }),
                          }}
                        >
                          {label || value}
                        </Link>
                      </td>
                      <td className={styles.end}>
                        <LongNumber>{count}</LongNumber>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </div>

          <Button
            variant="tertiary"
            onClick={() => setExpanded((expanded) => !expanded)}
          >
            {expanded ? 'View less' : 'Explore more'} databases
          </Button>
        </section>

        {/* Text */}
        <section
          className={cn(
            'uniprot-grid-cell--small-span-12',
            `uniprot-grid-cell--medium-span-${expanded ? '9' : '5'}`
          )}
        >
          <h2>Searching the Database</h2>
          <br />
          <p>
            UniParc is available for text- and sequence-based searches.
            Performing a similarity search against UniParc is equivalent to
            performing the same search against all databases cross-referenced in
            UniParc, as UniParc contains all proteins from its source databases.
          </p>
          <p>
            Sequence similarity searches can be done using{' '}
            <Link
              to={{
                pathname: LocationToPath[Location.Blast],
                search: stringifyQuery({
                  database: 'uniparc',
                }),
              }}
            >
              BLAST
            </Link>
          </p>
        </section>

        {/* Downloads */}
        <section className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-3">
          <h2>Download</h2>
          <div className={styles.download}>
            <br />
            <p>
              UniParc sequence archive
              <br />
              <ExternalLink url="https://ftp.uniprot.org/pub/databases/uniprot/current_release/uniparc/xml/all/">
                xml
              </ExternalLink>
              <ExternalLink url="https://ftp.uniprot.org/pub/databases/uniprot/current_release/uniparc/fasta/active/">
                fasta
              </ExternalLink>
              <ExternalLink url="https://ftp.uniprot.org/pub/databases/uniprot/current_release/uniparc/README">
                readme
              </ExternalLink>
            </p>
            <p>
              XML
              <br />
              <ExternalLink url="https://ftp.uniprot.org/pub/databases/uniprot/current_release/uniparc/uniparc.xsd">
                xml schema
              </ExternalLink>
            </p>
            <p>
              <ExternalLink url={ftpUrls.uniparc}>
                Explore more in FTP
              </ExternalLink>
            </p>
          </div>
        </section>

        {/* Tutorials */}
        {/* <h2 className="uniprot-grid-cell--span-12">Resources & Webinars</h2>
        {tutorialsInfo.map((item) => (
          <Fragment key={item.id}>
            <div
              className={cn(
                'uniprot-grid-cell--small-span-6',
                'uniprot-grid-cell--medium-span-2',
                styles.tutorial
              )}
            >
              <YouTubeEmbed videoid={item.id} title={item.title} />
            </div>
            <div
              className={cn(
                'uniprot-grid-cell--small-span-6',
                'uniprot-grid-cell--medium-span-2',
                styles.tutorial
              )}
            >
              <div className={styles.tutorial__title} title={item.title}>
                {item.title}
              </div>
              <time dateTime={item.date.toISOString()}>
                {item.date.toDateString()}
              </time>
            </div>
          </Fragment>
        ))} */}
      </section>
    </div>
  );
};

export default LandingPage;
