import { useState, useEffect } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { ExternalLink, LongNumber } from 'franklin-sites';
import cn from 'classnames';

import HTMLHead from '../../../shared/components/HTMLHead';
// import YouTubeEmbed from '../../../shared/components/YouTubeEmbed';

import useDataApi from '../../../shared/hooks/useDataApi';

import { LocationToPath, Location } from '../../../app/config/urls';
import ftpUrls from '../../../shared/config/ftpUrls';
import { stringifyQuery } from '../../../shared/utils/url';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';

import { SearchResults } from '../../../shared/types/results';
import { Namespace } from '../../../shared/types/namespaces';
import { FacetsEnum } from '../../config/UniRefFacetConfiguration';

import styles from './styles/landing-page.module.scss';

import ClusterIllustration from '../../../images/cluster_illustration.img.svg';

/* classnames within automatically based on the name of the file, if it changes update CSS */
import ClusterAnimationSVG from '../../../images/cluster_animation_illustration.svg';

const clusterLabelMap = new Map([
  ['1.0', 'uniref100'],
  ['0.9', 'uniref90'],
  ['0.5', 'uniref50'],
]);

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

const getFTPLinks = (resource: string) => {
  const cluster = clusterLabelMap.get(resource);
  return (
    <>
      <ExternalLink url={`${ftpUrls.uniref}/${cluster}/README`}>
        README
      </ExternalLink>
      &nbsp;
      <ExternalLink url={`${ftpUrls.uniref}/${cluster}`}>FTP</ExternalLink>
    </>
  );
};

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
  'Protein sets for species with sequenced genomes from across the tree of life.';

const identities = [50, 90, 100] as const;

const LandingPage = () => {
  const { data } = useDataApi<SearchResults<never>>(
    apiUrls.search.search({
      namespace: Namespace.uniref,
      query: '*',
      size: 0,
      facets: [FacetsEnum.Identity],
    })
  );

  // looping automatically
  const [visibleIndex, setVisibleIndex] = useState(0);
  // on user interaction
  const [overrideVisibleIndex, setOverrideVisibleIndex] = useState<
    undefined | number
  >(undefined);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % 3;
      setVisibleIndex(index);
    }, 6_000);
    return () => clearInterval(interval);
  }, []);

  const clusterData = data?.facets?.find((facet) => facet.name === 'identity');

  return (
    <div className={styles['landing-page']}>
      <HTMLHead title="UniRef">
        <meta name="description" content={metaDescription} />
      </HTMLHead>
      <section className="uniprot-grid">
        <h1 className="uniprot-grid-cell--span-12">UniRef</h1>
        <div
          className={cn(
            'uniprot-grid-cell--small-span-12',
            'uniprot-grid-cell--medium-span-4',
            styles['image-container']
          )}
        >
          <img src={ClusterIllustration} width={300} height={250} alt="" />
        </div>
        <div className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-8">
          <p>
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
            records in order to obtain complete coverage of the sequence space
            at several resolutions while hiding redundant sequences from view.
          </p>
          <p>
            <b>UniRef100</b> contains all UniProt Knowledgebase records plus
            selected UniParc records. In UniRef100, all identical sequences and
            subfragments with 11 or more residues are placed into a single
            record.
          </p>
          <p>
            <b>UniRef90</b> is generated by clustered UniRef100 sequences with
            11 or more residues, such that each cluster is composed of sequences
            that have at least 90% sequence identity to and 90% overlap with the{' '}
            <Link
              to={generatePath(LocationToPath[Location.HelpEntry], {
                accession: 'uniref_seed',
              })}
            >
              seed sequence
            </Link>
            .
          </p>
          <p>
            Similarly, <b>UniRef50</b> is built by clustering UniRef90 seed
            sequences that have at least 50% sequence identity to and 80%
            overlap with the longest sequence in the cluster.
          </p>
          <p>
            <Link
              to={{
                pathname: LocationToPath[Location.UniRefResults],
                search: stringifyQuery({ query: '*' }),
              }}
            >
              Start searching in UniRef »
            </Link>
          </p>
        </div>

        {/* Statistics */}
        <h2 className="uniprot-grid-cell--span-12">
          Percent Identity Clusters
        </h2>
        <div
          className={cn(
            'uniprot-grid-cell--small-span-12',
            'uniprot-grid-cell--medium-span-6',
            'uniprot-grid-cell--large-span-4',
            styles['image-container']
          )}
        >
          <ClusterAnimationSVG
            className={styles.animation}
            data-identity={identities[overrideVisibleIndex ?? visibleIndex]}
          />
        </div>
        <table className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-6 uniprot-grid-cell--large-span-8">
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
            {clusterData?.values?.map((cluster, index) => (
              <tr
                key={cluster.value}
                onPointerEnter={() => setOverrideVisibleIndex(index)}
                onFocus={() => setOverrideVisibleIndex(index)}
                onPointerLeave={() => setOverrideVisibleIndex(undefined)}
                onBlur={() => setOverrideVisibleIndex(undefined)}
              >
                <td>{cluster.label}</td>
                <td>
                  <Link
                    to={{
                      pathname: LocationToPath[Location.UniRefResults],
                      search: stringifyQuery({
                        query: `identity:${cluster.value}`,
                      }),
                    }}
                  >
                    <LongNumber>{cluster.count}</LongNumber> clusters
                  </Link>
                </td>
                <td>{getFTPLinks(cluster.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>

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
