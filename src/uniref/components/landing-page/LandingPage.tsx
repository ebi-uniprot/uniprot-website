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

import SpeciesIllustration from '../../../images/cluster_illustration.img.svg';

const datasets = ['UniRef100', 'UniRef90', 'UniRef50'];

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

const getFTPLinks = (resource: string) => (
  <>
    <ExternalLink url={`${ftpUrls.uniref}/${resource}/README`}>
      README
    </ExternalLink>
    <ExternalLink url={`${ftpUrls.uniref}/${resource}`}>FTP</ExternalLink>
  </>
);

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

const LandingPage = () => {
  const { data } = useDataApi<SearchResults<never>>(
    apiUrls.search.search({
      namespace: Namespace.uniref,
      query: '*',
      size: 0,
      facets: [FacetsEnum.Identity],
    })
  );

  let identity100Count: undefined | number;
  let identity90Count: undefined | number;
  let identity50Count: undefined | number;

  if (data?.facets?.[0].values?.length) {
    identity100Count = data?.facets?.[0].values.find(
      (value) => value.value === '1.0'
    )?.count;
    identity90Count = data?.facets?.[0].values
      .filter((value) => value.value === '0.9')
      ?.reduce((sum, value) => sum + value.count, 0);
    identity50Count = data?.facets?.[0].values
      .filter((value) => value.value === '0.5')
      ?.reduce((sum, value) => sum + value.count, 0);
  }

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
          <img src={SpeciesIllustration} width={300} height={250} alt="" />
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
        <section className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-9">
          <h2>Percent Identity Clusters</h2>
          <div className={styles.statistics}>
            {/* Find an image that best describes UniRef clustering */}
            <section className={styles['entries-count']}>
              <br />
              <p className={styles['stats-count']}>
                <b>100%</b>
                <span>
                  {identity100Count && (
                    <Link
                      to={{
                        pathname: LocationToPath[Location.UniRefResults],
                        search: stringifyQuery({
                          query: 'identity:1.0',
                        }),
                      }}
                    >
                      <LongNumber>{identity100Count}</LongNumber> clusters
                    </Link>
                  )}
                </span>
              </p>
              <p className={styles['stats-count']}>
                <b>90%</b>
                <span>
                  {identity90Count && (
                    <Link
                      to={{
                        pathname: LocationToPath[Location.UniRefResults],
                        search: stringifyQuery({
                          query: 'identity:0.9',
                        }),
                      }}
                    >
                      <LongNumber>{identity90Count}</LongNumber> clusters
                    </Link>
                  )}
                </span>
              </p>
              <p className={styles['stats-count']}>
                <b>50%</b>
                <span>
                  {identity50Count && (
                    <Link
                      to={{
                        pathname: LocationToPath[Location.UniRefResults],
                        search: stringifyQuery({
                          query: 'identity:0.5',
                        }),
                      }}
                    >
                      <LongNumber>{identity50Count}</LongNumber> clusters
                    </Link>
                  )}
                </span>
              </p>
            </section>
          </div>
        </section>

        {/* Downloads */}
        <section className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-3">
          <h2>Downloads</h2>
          <div className={styles.download}>
            <br />
            {datasets.map((dataset) => (
              <p className={styles['ftp-link']}>
                {dataset}
                <br />
                {getFTPLinks(dataset.toLowerCase())}
              </p>
            ))}
            <p>
              <ExternalLink url={ftpUrls.uniref}>
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