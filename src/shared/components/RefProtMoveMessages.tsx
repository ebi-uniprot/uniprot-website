import cn from 'classnames';
import { Message } from 'franklin-sites';
import { FC, useEffect, useMemo, useState } from 'react';
import joinUrl from 'url-join';

import { Location, LocationToPath } from '../../app/config/urls';
import ContactLink from '../../contact/components/ContactLink';
import { ProteomeType } from '../../proteomes/adapters/proteomesConverter';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import {
  UniProtkbAPIModel,
  UniProtKBSimplifiedTaxonomy,
} from '../../uniprotkb/adapters/uniProtkbConverter';
import { apiPrefix } from '../config/apiUrls/apiPrefix';
import useDataApi from '../hooks/useDataApi';
import { Namespace } from '../types/namespaces';
import { stringifyUrl } from '../utils/url';
import ExternalLink from './ExternalLink';
import styles from './styles/ref-prot-move-messages.module.scss';

const blogEntryUrl =
  'https://insideuniprot.blogspot.com/2025/06/capturing-diversity-of-life.html';

const checkMoveUrl = joinUrl(apiPrefix, 'refprotmove-check/check-move');

const release = '2026_02';
const releaseDate = 'first half of 2026';

const UniProtKBGenericPreamble = () => (
  <>
    The Unreviewed UniProtKB/TrEMBL database will reduce in size from release{' '}
    {release} (planned for the {releaseDate}).
  </>
);

const UniProtKBRemovePreamble: FC<{ accession: string }> = ({ accession }) => (
  <b>
    This entry ({accession}) is under consideration for removal in release{' '}
    {release} (planned for the {releaseDate}).
  </b>
);

const UniProtKBGenericMain: FC<{
  accession?: string;
  organism?: UniProtKBSimplifiedTaxonomy;
  upids?: string[];
}> = ({ accession, organism, upids }) => (
  <>
    <br />
    <br />
    From {release} onwards, Unreviewed UniProtKB/TrEMBL will include only
    proteins from reference proteomes and selected entries with experimental or
    biologically important data. Entries removed from Unreviewed
    UniProtKB/TrEMBL will remain accessible in the UniParc sequence archive.
    Please see{' '}
    <ExternalLink url={blogEntryUrl}>this short article</ExternalLink> for more
    information, or{' '}
    <ContactLink
      to={
        accession && organism && upids
          ? {
              pathname: LocationToPath[Location.ContactGeneric],
              state: {
                formValues: {
                  context: [
                    `UniProtKB accession: ${accession}`,
                    `UniParc UPIDs for this UniProtKB entry: ${upids.join(', ') || '<none>'}`,
                    `Organism: ${organism.scientificName || organism.commonName || '<no name>'}`,
                    `Taxon ID: ${organism.taxonId}`,
                  ].join('\n'),
                  subject: `Question about UniProtKB entry ${accession} being removed in ${release}`,
                },
              },
            }
          : {
              pathname: LocationToPath[Location.ContactGeneric],
              state: {
                formValues: {
                  subject: `Question about Unreviewed UniProtKB/TrEMBL changes in ${release}`,
                },
              },
            }
      }
    >
      contact us
    </ContactLink>{' '}
    with any questions.
  </>
);

const UniProtKBGenericMessage = () => (
  <>
    <UniProtKBGenericPreamble />
    <UniProtKBGenericMain />
  </>
);

const ProteomesMessage: FC<{ id?: string; taxonomy?: TaxonomyDatum }> = ({
  id,
  taxonomy,
}) => (
  <>
    We are updating the reference proteome selection procedure. As a result,
    some proteomes may lose their reference proteome status, but all proteomes
    will remain accessible in the Proteomes database. Additionally, starting
    with release {release}, Unreviewed UniProtKB/TrEMBL will include only
    proteins from reference proteomes selected by the new procedure, along with
    selected entries with experimental or biologically important data.
    <br />
    <br />
    Entries removed from Unreviewed UniProtKB/TrEMBL will remain accessible in
    the UniParc sequence archive. Please see{' '}
    <ExternalLink url={blogEntryUrl}>this short article</ExternalLink> for more
    information, or{' '}
    <ContactLink
      to={
        id && taxonomy
          ? {
              pathname: LocationToPath[Location.ContactGeneric],
              state: {
                formValues: {
                  context: [
                    `Proteome ID: ${id}`,
                    `Organism: ${taxonomy.scientificName}`,
                    `Taxon ID: ${taxonomy.taxonId}`,
                    `Mnemonic: ${taxonomy.mnemonic}`,
                  ].join('\n'),
                  subject: `Question about proteome ${id} status in ${release}`,
                },
              },
            }
          : {
              pathname: LocationToPath[Location.ContactGeneric],
              state: {
                formValues: {
                  subject: `Question about proteomes changes in ${release}`,
                },
              },
            }
      }
    >
      contact us
    </ContactLink>{' '}
    with any questions.
  </>
);

export const RefProtMoveResultsMessage: FC<{
  namespace: Namespace;
}> = ({ namespace }) => {
  if (namespace !== Namespace.uniprotkb && namespace !== Namespace.proteomes) {
    return null;
  }

  return (
    <Message
      level="warning"
      className={cn('uniprot-grid-cell--span-12', 'results-message')}
    >
      {(namespace === Namespace.uniprotkb && <UniProtKBGenericMessage />) ||
        (namespace === Namespace.proteomes && <ProteomesMessage />)}
    </Message>
  );
};

const getCrossRefsFor = (dbName: string) => (entry: UniProtkbAPIModel) =>
  entry.uniProtKBCrossReferences
    ?.filter((db) => db.database === dbName)
    ?.map((db) => db.id)
    ?.filter((idOrUndef: string | undefined): idOrUndef is string =>
      Boolean(idOrUndef)
    );

const getCrossRefsForPDB = getCrossRefsFor('PDB');
const biologicallyRelevant = (entry: UniProtkbAPIModel) => {
  // The entry is reviewed
  if (entry.entryType.includes('UniProtKB reviewed')) {
    return true;
  }
  // The entry has xrefs to PDB
  if (getCrossRefsForPDB(entry)?.length) {
    return true;
  }
  // Add new conditions here
  return false;
};

const getProteomes = getCrossRefsFor('Proteomes');

type CheckMoveResponse = {
  move?: string[];
  stay?: string[];
  unknown?: string[];
};

const referenceProteomeTypes = new Set([
  'Reference and representative proteome',
  'Reference proteome',
]);

export const RefProtMoveProteomesEntryMessage: FC<{
  id: string;
  taxonomy: TaxonomyDatum;
  proteomeType: ProteomeType;
}> = ({ id, taxonomy, proteomeType }) => {
  const { data, loading } = useDataApi<CheckMoveResponse>(
    referenceProteomeTypes.has(proteomeType)
      ? stringifyUrl(checkMoveUrl, { upids: [id] })
      : null
  );
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (!loading) {
      // once loading is finished, delay hiding skeleton
      const timer = setTimeout(() => setShowSkeleton(false), 750);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (showSkeleton) {
    return (
      <Message
        className={cn(
          'uniprot-grid-cell--span-12',
          styles['entry-message'],
          styles['loading-filler']
        )}
        aria-busy
        aria-live="polite"
      >
        <div className={styles.skeleton}>
          <span className={styles.line} />
          <span className={styles.line} />
          <span className={styles.line} />
          <span className={cn(styles.line, styles.short)} />

          <div className={styles.blockSpace} />

          <span className={styles.line} />
          <span className={styles.line} />
          <span className={cn(styles.line, styles.medium)} />
        </div>
      </Message>
    );
  }

  const becomingNonRP = data?.move?.[0] === id;

  return becomingNonRP ? (
    <Message
      level="failure"
      className={cn('uniprot-grid-cell--span-12', styles['entry-message'])}
    >
      <b>
        {id} is currently under review and may lose its reference proteome
        status from release {release} (planned for the {releaseDate}).
      </b>
      <br />
      <br />
      <ProteomesMessage id={id} taxonomy={taxonomy} />
    </Message>
  ) : (
    <Message
      level="warning"
      className={cn('uniprot-grid-cell--span-12', styles['entry-message'])}
    >
      <ProteomesMessage id={id} taxonomy={taxonomy} />
    </Message>
  );
};

export const RefProtMoveUniProtKBEntryMessage: FC<{
  entry: UniProtkbAPIModel;
}> = ({ entry }) => {
  const upids = useMemo(() => getProteomes(entry), [entry]);
  const isBiologicallyRelevant = useMemo(
    () => biologicallyRelevant(entry),
    [entry]
  );

  const { data, loading } = useDataApi<CheckMoveResponse>(
    upids?.length ? stringifyUrl(checkMoveUrl, { upids }) : null
  );

  // saved through proteome if:
  // 1:     has a proteome
  // and 2: has any proteome that stays
  const hasSavedProteome = Boolean(upids?.length && data?.stay?.length);

  // display message if:
  // 1:     not saved through proteome
  // and 2: not saved as biologically relevant
  const display = !hasSavedProteome && !isBiologicallyRelevant;

  if (loading || !display) {
    // Don't render anything, avoid space being used then disappearing
    return null;
  }

  const accession = entry.primaryAccession;
  const organism = entry.organism;

  return (
    <Message
      level="failure"
      className={cn('uniprot-grid-cell--span-12', styles['entry-message'])}
    >
      <UniProtKBRemovePreamble accession={accession} />
      <UniProtKBGenericMain
        accession={accession}
        organism={organism}
        upids={upids}
      />
    </Message>
  );
};
