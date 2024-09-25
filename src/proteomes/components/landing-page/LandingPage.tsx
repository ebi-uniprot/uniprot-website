import { useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import {
  ExternalLink,
  LongNumber,
  ReferenceProteomeIcon,
  TremblIcon,
} from 'franklin-sites';
import cn from 'classnames';
import joinUrl from 'url-join';

import StatisticsChart from './StatisticsChart';
import HTMLHead from '../../../shared/components/HTMLHead';
// import YouTubeEmbed from '../../../shared/components/YouTubeEmbed';

import useDataApi from '../../../shared/hooks/useDataApi';

import { LocationToPath, Location } from '../../../app/config/urls';
import ftpUrls from '../../../shared/config/ftpUrls';
import { stringifyQuery } from '../../../shared/utils/url';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';

import { SearchResults } from '../../../shared/types/results';
import { Namespace } from '../../../shared/types/namespaces';
import { FacetsEnum } from '../../config/ProteomesFacetConfiguration';

import styles from './styles/landing-page.module.scss';

import SpeciesIllustration from '../../../images/species_illustration.img.svg';

const documentationLinks = [
  {
    label: 'Proteome',
    id: 'proteome',
  },
  {
    label: 'Proteome ID',
    id: 'proteome_id',
  },
  {
    label: 'Pan proteomes',
    id: 'pan_proteomes',
  },
  {
    label: 'Reference Proteome',
    id: 'reference_proteome',
  },
];

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
      namespace: Namespace.proteomes,
      query: '*',
      size: 0,
      facets: [FacetsEnum.ProteomeType],
    })
  );

  let refProtCount: undefined | number;
  let nonRefProtCount: undefined | number;

  if (data?.facets?.[0].values?.length) {
    refProtCount = data?.facets?.[0].values.find(
      (value) => value.value === '1'
    )?.count;
    nonRefProtCount = data?.facets?.[0].values
      .filter((value) => value.value !== '1')
      ?.reduce((sum, value) => sum + value.count, 0);
  }

  const [refProtHovered, setRefProtHovered] = useState(false);
  const [nonRefProtHovered, setNonRefProtHovered] = useState(false);

  return (
    <div className={styles['landing-page']}>
      <HTMLHead title="Proteomes">
        <meta name="description" content={metaDescription} />
      </HTMLHead>
      <section className="uniprot-grid">
        <h1 className="uniprot-grid-cell--span-12">Proteomes</h1>
        <div
          className={cn(
            'uniprot-grid-cell--small-span-12',
            'uniprot-grid-cell--medium-span-4',
            styles['image-container']
          )}
        >
          <img src={SpeciesIllustration} width={260} height={260} alt="" />
        </div>
        <div className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-8">
          <p>
            A proteome is the set of proteins thought to be expressed by an
            organism. The majority of the UniProt proteomes are based on the
            translation of a genome assembly, and will normally include
            sequences that derive from extra-chromosomal elements such as
            plasmids or organellar genomes in organisms where these are present.
            Some proteomes may also include protein sequences based on high
            quality cDNAs that cannot be mapped to the current genome assembly
            due to sequencing errors or gaps. These are only included in the
            proteome following manual review of the supporting evidence,
            including careful analysis of homologous sequences from closely
            related organisms. As more and more genomes of the same organism are
            being sequenced, we introduced{' '}
            <Link
              to={generatePath(LocationToPath[Location.HelpEntry], {
                accession: 'proteome_id',
              })}
            >
              unique proteome identifiers
            </Link>{' '}
            to distinguish individual proteomes from the same{' '}
            <Link
              to={generatePath(LocationToPath[Location.HelpEntry], {
                accession: 'taxonomic_identifier',
              })}
            >
              taxonomy identifier
            </Link>
            .
          </p>
          <p>
            UniProt proteomes may include both manually reviewed
            (UniProtKB/Swiss-Prot) and unreviewed (UniProtKB/TrEMBL) entries.
            The proportion of reviewed entries varies between proteomes, and is
            greater for the proteomes of intensively curated model organisms.
            Some proteomes, such as those of{' '}
            <Link
              to={{
                pathname: LocationToPath[Location.UniProtKBResults],
                search: stringifyQuery({ query: 'proteome:UP000002311' }),
              }}
            >
              Saccharomyces cerevisiae 288C
            </Link>{' '}
            and{' '}
            <Link
              to={{
                pathname: LocationToPath[Location.UniProtKBResults],
                search: stringifyQuery({ query: 'proteome:UP000000625' }),
              }}
            >
              Escherichia coli strain K12
            </Link>{' '}
            consist entirely of reviewed entries. Curation is a continuing
            process, and proteomes are updated in a regular manner as new
            information becomes available: pseudogenes and other dubious
            uncharacterized ORFs may be removed, other newly identified and
            characterized sequences may be added.
          </p>
          <p>
            <Link
              to={{
                pathname: LocationToPath[Location.ProteomesResults],
                search: stringifyQuery({ query: '*' }),
              }}
            >
              Start searching in Proteomes »
            </Link>
          </p>
        </div>

        {/* Statistics */}
        <section className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-9">
          <div className={styles.statistics}>
            <div>
              <h2>Statistics</h2>
              <div className={styles.chart}>
                <h3 className="tiny">Taxonomic origin</h3>
                <StatisticsChart
                  refProt={refProtHovered}
                  nonRefProt={nonRefProtHovered}
                />
              </div>
            </div>

            <section className={styles['entries-count']}>
              <h2>Proteome Status</h2>
              <h3 className="tiny">Number of Entries</h3>
              <br />
              <p
                className={styles['stats-count']}
                onPointerEnter={() => setRefProtHovered(true)}
                onFocus={() => setRefProtHovered(true)}
                onPointerLeave={() => setRefProtHovered(false)}
                onBlur={() => setRefProtHovered(false)}
              >
                <ReferenceProteomeIcon
                  width="3ch"
                  className={styles['ref-prot-icon']}
                />
                <span>
                  Reference proteomes
                  <br />
                  {refProtCount && (
                    <Link
                      to={{
                        pathname: LocationToPath[Location.ProteomesResults],
                        search: stringifyQuery({
                          query: 'proteome_type:1',
                        }),
                      }}
                    >
                      <LongNumber>{refProtCount}</LongNumber> entries
                    </Link>
                  )}
                </span>
              </p>
              <p
                className={styles['stats-count']}
                onPointerEnter={() => setNonRefProtHovered(true)}
                onFocus={() => setNonRefProtHovered(true)}
                onPointerLeave={() => setNonRefProtHovered(false)}
                onBlur={() => setNonRefProtHovered(false)}
              >
                <TremblIcon width="4ch" className={styles['unreviewed-icon']} />
                <span>
                  Non-reference proteomes
                  <br />
                  {nonRefProtCount && (
                    <Link
                      to={{
                        pathname: LocationToPath[Location.ProteomesResults],
                        search: stringifyQuery({
                          query:
                            'proteome_type:2 OR proteome_type:3 OR proteome_type:4',
                        }),
                      }}
                    >
                      <LongNumber>{nonRefProtCount}</LongNumber> entries
                    </Link>
                  )}
                </span>
              </p>
              <p>
                Search{' '}
                <Link
                  to={{
                    pathname: LocationToPath[Location.ProteomesResults],
                    search: stringifyQuery({
                      query: 'proteome_type:3',
                    }),
                  }}
                >
                  redundant
                </Link>{' '}
                and{' '}
                <Link
                  to={{
                    pathname: LocationToPath[Location.ProteomesResults],
                    search: stringifyQuery({
                      query: 'proteome_type:4',
                    }),
                  }}
                >
                  {' '}
                  excluded
                </Link>{' '}
                proteomes
              </p>
            </section>
          </div>
        </section>

        {/* Downloads */}
        <section className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-3">
          <h2>Downloads</h2>
          <div className={styles.download}>
            <br />
            <br />
            <p>
              Reference proteomes
              <br />
              <ExternalLink url={ftpUrls.referenceProteomes()}>
                ftp
              </ExternalLink>
              <ExternalLink url={`${ftpUrls.referenceProteomes()}README`}>
                readme
              </ExternalLink>
            </p>
            <p>
              Pan proteomes
              <br />
              <ExternalLink url={ftpUrls.panProteomes()}>ftp</ExternalLink>
              <ExternalLink url={`${ftpUrls.panProteomes()}README`}>
                readme
              </ExternalLink>
            </p>
            <p>
              <ExternalLink url={joinUrl(ftpUrls.uniprot, 'knowledgebase/')}>
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
