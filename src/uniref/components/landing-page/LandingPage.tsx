/* eslint-disable react/jsx-key */
import { ExternalLink, Loader, LongNumber } from 'franklin-sites';
import { fromPairs } from 'lodash-es';
import { ReactNode } from 'react';
import { generatePath, Link } from 'react-router-dom';
import joinUrl from 'url-join';

import { Location, LocationToPath } from '../../../app/config/urls';
import ClusterLanding50Illustration from '../../../images/cluster_landing_50_illustration.img.svg';
import ClusterLanding90Illustration from '../../../images/cluster_landing_90_illustration.img.svg';
import ClusterLanding100Illustration from '../../../images/cluster_landing_100_illustration.img.svg';
import HTMLHead from '../../../shared/components/HTMLHead';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import ftpUrls from '../../../shared/config/ftpUrls';
// import YouTubeEmbed from '../../../shared/components/YouTubeEmbed';
import useDataApi from '../../../shared/hooks/useDataApi';
import { Namespace } from '../../../shared/types/namespaces';
import { SearchResults } from '../../../shared/types/results';
import { stringifyQuery } from '../../../shared/utils/url';
import { FacetsEnum } from '../../config/UniRefFacetConfiguration';
import styles from './styles/landing-page.module.scss';

const documentationLinks = [
  {
    label: 'UniRef',
    id: 'uniref',
  },
  {
    label: 'UniRef cluster',
    id: 'uniref_cluster',
  },
  {
    label: 'UniRef seed',
    id: 'uniref_seed',
  },
  {
    label: 'Linking to UniRef',
    id: 'linking_to_uniref',
  },
];

const identities = [100, 90, 50] as const;
type Identity = (typeof identities)[number];

const getFTPLinks = (identity: '100%' | '90%' | '50%') => {
  // Omit the % sign
  const cluster = `uniref${identity.slice(0, -1)}`;
  return (
    <>
      <ExternalLink url={joinUrl(ftpUrls.uniref, cluster, 'README')}>
        README
      </ExternalLink>
      &nbsp;
      <ExternalLink url={joinUrl(ftpUrls.uniref, cluster)}>FTP</ExternalLink>
    </>
  );
};

const identityToImage = new Map<Identity, ReactNode>([
  [
    100,
    <img src={ClusterLanding100Illustration} width={277} height={208} alt="" />,
  ],
  [
    90,
    <img src={ClusterLanding90Illustration} width={277} height={208} alt="" />,
  ],
  [
    50,
    <img src={ClusterLanding50Illustration} width={277} height={208} alt="" />,
  ],
]);

const identityToParagraph = new Map<Identity, ReactNode>([
  [
    100,
    <p>
      <Link
        to={{
          pathname: LocationToPath[Location.UniRefResults],
          search: stringifyQuery({ query: '(identity:1.0)' }),
        }}
      >
        <b>UniRef100</b>
      </Link>{' '}
      contains all{' '}
      <Link to={LocationToPath[Location.UniProtKBResults]}>
        UniProt Knowledgebase
      </Link>{' '}
      records plus selected{' '}
      <Link to={LocationToPath[Location.UniParcResults]}>UniParc</Link> records.
      In UniRef100, all identical sequences and subfragments with 11 or more
      residues are placed into a single record.
    </p>,
  ],
  [
    90,
    <p>
      <Link
        to={{
          pathname: LocationToPath[Location.UniRefResults],
          search: stringifyQuery({ query: '(identity:0.9)' }),
        }}
      >
        <b>UniRef90</b>
      </Link>{' '}
      is generated by clustered UniRef100 sequences with 11 or more residues,
      such that each cluster is composed of sequences that have at least 90%
      sequence identity to and 80% overlap with the{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'uniref_seed',
        })}
      >
        seed sequence
      </Link>
      .
    </p>,
  ],
  [
    50,
    <p>
      Similarly,{' '}
      <Link
        to={{
          pathname: LocationToPath[Location.UniRefResults],
          search: stringifyQuery({ query: '(identity:0.5)' }),
        }}
      >
        <b>UniRef50</b>
      </Link>{' '}
      is built by clustering UniRef90 seed sequences that have at least 50%
      sequence identity to and 80% overlap with the longest sequence in the
      cluster.
    </p>,
  ],
]);

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
  'Clusters of protein sequences at 100%, 90% & 50% identity.';

const LandingPage = () => {
  const { data } = useDataApi<SearchResults<never>>(
    apiUrls.search.search({
      namespace: Namespace.uniref,
      query: '*',
      size: 0,
      facets: [FacetsEnum.Identity],
    })
  );

  if (!data) {
    return <Loader />;
  }

  const clusterData = fromPairs(
    data.facets
      ?.find((facet) => facet.name === 'identity')
      ?.values?.map((facet) => [facet.label, facet])
  );

  return (
    <div className={styles['landing-page']}>
      <HTMLHead title="UniRef">
        <meta name="description" content={metaDescription} />
      </HTMLHead>
      <section className="uniprot-grid">
        <h1 className="uniprot-grid-cell--span-12">UniRef</h1>
        <p className="uniprot-grid-cell--span-12">
          The UniProt Reference Clusters (UniRef) provide clustered sets of
          sequences from the{' '}
          <Link
            to={generatePath(LocationToPath[Location.HelpEntry], {
              accession: 'uniprotkb',
            })}
          >
            UniProt Knowledgebase
          </Link>{' '}
          (including{' '}
          <Link
            to={generatePath(LocationToPath[Location.HelpEntry], {
              accession: 'canonical_and_isoforms',
            })}
          >
            isoforms
          </Link>
          ) and selected{' '}
          <Link
            to={generatePath(LocationToPath[Location.HelpEntry], {
              accession: 'uniparc',
            })}
          >
            UniParc
          </Link>{' '}
          records in order to obtain complete coverage of the sequence space at
          several resolutions while hiding redundant sequences from view.
        </p>
        <p className="uniprot-grid-cell--span-12">
          <Link
            to={{
              pathname: LocationToPath[Location.UniRefResults],
              search: stringifyQuery({ query: '*' }),
            }}
          >
            Start searching in UniRef »
          </Link>
        </p>
        {identities.map((identity) => (
          <section className="uniprot-grid-cell--span-12" key={identity}>
            <h2>UniRef{identity}</h2>
            <div className={styles.container}>
              {identityToImage.get(identity)}
              <div>
                {identityToParagraph.get(identity)}
                <br />
                <table>
                  <thead>
                    <tr>
                      <th>
                        Identity <br />
                        percentage
                      </th>
                      <th>
                        Number of
                        <br />
                        UniRef clusters
                      </th>
                      <th>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{clusterData[`${identity}%`].label}</td>
                      <td>
                        <Link
                          to={{
                            pathname: LocationToPath[Location.UniRefResults],
                            search: stringifyQuery({
                              query: `identity:${clusterData[`${identity}%`].value}`,
                            }),
                          }}
                        >
                          <LongNumber>
                            {clusterData[`${identity}%`].count}
                          </LongNumber>{' '}
                          clusters
                        </Link>
                      </td>
                      <td>{getFTPLinks(clusterData[`${identity}%`].label)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ))}

        {/* Help links */}
        <section className="uniprot-grid-cell--span-4">
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
            <li>
              <Link
                to={{
                  pathname: LocationToPath[Location.HelpResults],
                  search: stringifyQuery({ query: 'uniref' }),
                }}
              >
                More UniRef documentation
              </Link>
            </li>
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
