import cn from 'classnames';
import { Button, ExternalLink, LongNumber } from 'franklin-sites';
import { useState } from 'react';
import { generatePath, Link } from 'react-router-dom';

import {
  getLocationEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import ArchiveIllustration from '../../../images/archive_illustration.img.svg';
import HTMLHead from '../../../shared/components/HTMLHead';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import ftpUrls from '../../../shared/config/ftpUrls';
// import YouTubeEmbed from '../../../shared/components/YouTubeEmbed';
import useDataApi from '../../../shared/hooks/useDataApi';
import {
  useMediumScreen,
  useSmallScreen,
} from '../../../shared/hooks/useMatchMedia';
import { Namespace } from '../../../shared/types/namespaces';
import { SearchResults } from '../../../shared/types/results';
import { stringifyQuery } from '../../../shared/utils/url';
import { FacetsEnum } from '../../config/UniParcFacetConfiguration';
import styles from './styles/landing-page.module.scss';

// TODO: when we do have videos for UniParc, update list and expose
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

const documentationLinks = [
  {
    label: 'UniParc',
    id: 'uniparc',
  },
  {
    label: 'Explore the sequence archive',
    id: 'explore_sequence_archive',
  },
  {
    label: 'UniParc data resources',
    id: 'uniparc_data_resources',
  },
  {
    label: 'Linking to UniProt',
    id: 'linking_to_uniprot',
  },
];

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

  const databaseMapping = (label: string) => {
    if (label === 'UniProtKB') {
      return 'uniprot';
    }
    if (label === 'UniProtKB/Swiss-Prot isoforms') {
      return 'isoforms';
    }
    return label.replace(' ', '-');
  };

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
            is a comprehensive and non-redundant database of protein sequences.
            These sequences are sourced from public sequence databases, and each
            unique sequence is stored in a UniParc entry with a stable unique
            identifier (UPI). A UPI is never removed, changed or reassigned to a
            different sequence. In addition to the protein sequence, a UniParc
            entry contains cross-references to all source database entries in
            which the sequence exists or existed, with a date range that shows
            when the sequence was first and last seen in each source entry. In
            this way UniParc tracks sequence changes in the source databases and
            archives the history of all changes.
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
          <h2>Databases</h2>
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
                              query: `database:${databaseMapping(label as string)}`,
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
            {expanded ? 'View fewer' : 'View more'} databases
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
            UniParc provides text- and sequence-based searches. Performing a
            sequence similarity search against UniParc is equivalent to
            performing the same search against all databases cross-referenced in
            UniParc, as UniParc contains all proteins from its source databases.
          </p>
          <p>
            <Link
              to={{
                pathname: LocationToPath[Location.Blast],
                search: stringifyQuery({
                  database: 'uniparc',
                }),
              }}
            >
              Start a sequence similarity search in UniParc using BLAST »
            </Link>
          </p>
        </section>

        {/* Downloads */}
        <section className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-3">
          <h2>Download</h2>
          <div className={styles.download}>
            <br />
            <div>
              UniParc sequence archive
              <br />
              <ul>
                <li>
                  <ExternalLink url="https://ftp.uniprot.org/pub/databases/uniprot/current_release/uniparc/xml/all/">
                    xml
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink url="https://ftp.uniprot.org/pub/databases/uniprot/current_release/uniparc/fasta/active/">
                    fasta
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink url="https://ftp.uniprot.org/pub/databases/uniprot/current_release/uniparc/README">
                    README
                  </ExternalLink>
                </li>
              </ul>
            </div>
            <p>
              <ExternalLink url={ftpUrls.uniparc}>
                Explore more in FTP
              </ExternalLink>
            </p>
          </div>
        </section>

        {/* Help links */}
        <section className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-4">
          <h2>Documentation</h2>
          <ul>
            {documentationLinks.map((item) => (
              <li key={item.id}>
                <Link
                  to={generatePath(LocationToPath[Location.HelpEntry], {
                    accession: item.id,
                  })}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
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
