import { Fragment, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import {
  ExternalLink,
  LongNumber,
  ReferenceProteomeIcon,
  TremblIcon,
} from 'franklin-sites';
import cn from 'classnames';

// import StatisticsChart from './StatisticsChart';
import HTMLHead from '../../../shared/components/HTMLHead';
import YouTubeEmbed from '../../../shared/components/YouTubeEmbed';

import useDataApi from '../../../shared/hooks/useDataApi';
import useUniProtDataVersion from '../../../shared/hooks/useUniProtDataVersion';

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
// import { FacetsEnum } from '../../config/UniProtKBFacetConfiguration';

import styles from './styles/landing-page.module.scss';

import SpeciesIllustration from '../../../images/species_illustration.img.svg';

const availableFTPFormats = {
  fasta: 'fasta',
  text: 'dat',
  xml: 'xml',
};

const tutorialsInfo = [
  {
    id: 'yp1O1gDK8oA',
    title: 'How to search UniProtKB',
    date: new Date('2021-10-26'),
  },
  {
    id: 'BHu88Sv--mc',
    title: 'How to explore a UniProt entry',
    date: new Date('2022-02-17'),
  },
  {
    id: 'p4_gGkM-Rfs',
    title: 'How to download embeddings in UniProt',
    date: new Date('2023-06-25'),
  },
];

const metaDescription =
  'Protein sets for species with sequenced genomes from across the tree of life.';

const LandingPage = () => {
  const release = useUniProtDataVersion();

  const { data } = useDataApi<SearchResults<never>>(
    apiUrls.search.search({
      namespace: Namespace.uniprotkb,
      query: '*',
      size: 0,
      //   facets: [FacetsEnum.Reviewed],
    })
  );

  let numberReviewed: undefined | number;
  let numberUnreviewed: undefined | number;

  if (data?.facets?.[0].values?.length) {
    numberReviewed = data?.facets?.[0].values.find(
      (value) => value.value === 'true'
    )?.count;
    numberUnreviewed = data?.facets?.[0].values.find(
      (value) => value.value === 'false'
    )?.count;
  }

  //   const [reviewedHovered, setReviewedHovered] = useState(false);
  //   const [unreviewedHovered, setUnreviewedHovered] = useState(false);

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
          <img src={SpeciesIllustration} width={250} height={250} alt="" />
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
        <section className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-5">
          <h2>Statistics</h2>
          <div className={styles.statistics}>
            <div className={styles.chart}>
              <h3 className="tiny">
                <Link
                  to={{
                    pathname: LocationToPath[Location.UniProtKBResults],
                    search: stringifyQuery({ groupBy: 'taxonomy', query: '*' }),
                  }}
                >
                  Taxonomic origin
                </Link>
              </h3>

              {/* <StatisticsChart
                releaseNumber={release?.releaseNumber}
                reviewed={!unreviewedHovered}
                unreviewed={!reviewedHovered}
              /> */}
            </div>
          </div>
        </section>

        {/* Proteome Status */}
        <section className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-4">
          <h2>Proteome Status</h2>
          <h3 className="tiny">Number of Entries</h3>
          <br />
          <p
          // onPointerEnter={() => setReviewedHovered(true)}
          // onFocus={() => setReviewedHovered(true)}
          // onPointerLeave={() => setReviewedHovered(false)}
          // onBlur={() => setReviewedHovered(false)}
          >
            <ReferenceProteomeIcon
              width="2em"
              className={styles['ref-prot-icon']}
            />
            <span>
              Reference proteomes
              <br />
              {numberReviewed && (
                <Link
                  to={{
                    pathname: LocationToPath[Location.ProteomesResults],
                    search: stringifyQuery({
                      query: `* AND (proteome_type:1)`,
                    }),
                  }}
                >
                  <LongNumber>{numberReviewed}</LongNumber> entries
                </Link>
              )}
            </span>
          </p>
          <p
          // onPointerEnter={() => setUnreviewedHovered(true)}
          // onFocus={() => setUnreviewedHovered(true)}
          // onPointerLeave={() => setUnreviewedHovered(false)}
          // onBlur={() => setUnreviewedHovered(false)}
          >
            <TremblIcon width="2em" className={styles['unreviewed-icon']} />
            <span>
              Non-reference proteomes
              <br />
              {numberUnreviewed && (
                <Link
                  to={{
                    pathname: LocationToPath[Location.UniProtKBResults],
                    search: `facets=reviewed:false&query=*`,
                  }}
                >
                  <LongNumber>{numberUnreviewed}</LongNumber> entries
                </Link>
              )}
            </span>
          </p>
          <p>
            Search
            <Link to={LocationToPath[Location.UniProtKBStatistics]}>
              redundant
            </Link>
            and
            <Link to={LocationToPath[Location.UniProtKBStatistics]}>
              excluded
            </Link>
            proteomes
          </p>
        </section>

        {/* Downloads */}
        <section className="uniprot-grid-cell--small-span-12 uniprot-grid-cell--medium-span-3">
          <h2>Downloads</h2>
          <div className={styles.download}>
            <br />
            <br />
            <p>
              Reviewed (Swiss-Prot)
              <br />
              {Object.entries(availableFTPFormats).map(([key, value]) => (
                <ExternalLink
                  url={`${ftpUrls.uniprotkbReviewed}.${value}.gz`}
                  key={key}
                >
                  {key}
                </ExternalLink>
              ))}
            </p>
            <p>
              Unreviewed (TrEMBL)
              <br />
              {Object.entries(availableFTPFormats).map(([key, value]) => (
                <ExternalLink
                  url={`${ftpUrls.uniprotkbUnreviewed}.${value}.gz`}
                  key={key}
                >
                  {key}
                </ExternalLink>
              ))}
            </p>
            <p>
              <ExternalLink url={ftpUrls.uniprotkb}>
                Explore more in FTP
              </ExternalLink>
            </p>
          </div>
        </section>

        {/* Tutorials */}
        <h2 className="uniprot-grid-cell--span-12">Resources & Webinars</h2>
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
        ))}
      </section>
    </div>
  );
};

export default LandingPage;
