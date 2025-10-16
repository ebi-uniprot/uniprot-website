import cn from 'classnames';
import { Message } from 'franklin-sites';
import { FC } from 'react';
import { generatePath, Link } from 'react-router-dom';
import joinUrl from 'url-join';

import { Location, LocationToPath } from '../../app/config/urls';
import ContactLink from '../../contact/components/ContactLink';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import {
  UniProtkbAPIModel,
  UniProtKBSimplifiedTaxonomy,
} from '../../uniprotkb/adapters/uniProtkbConverter';
import { apiPrefix } from '../config/apiUrls/apiPrefix';
import { Namespace } from '../types/namespaces';
import ExternalLink from './ExternalLink';
import styles from './styles/ref-prot-move-messages.module.scss';

const blogEntryUrl =
  'https://insideuniprot.blogspot.com/2025/06/capturing-diversity-of-life.html';

const ftpProteomes = 'https://ftp.ebi.ac.uk/pub/contrib/UniProt/proteomes/';

export const checkMoveUrl = joinUrl(apiPrefix, 'refprotmove-check/check-move');

const release = '2026_02';
const releaseDate = 'first half of 2026';
const rpChangesRelease = '2025_04';
const rpChangesReleaseDate = 'October 2025';

const UniProtKBGenericPreamble = () => (
  <div>
    <strong>
      The unreviewed UniProtKB/TrEMBL database will be reduced in size in
      release {release} ({releaseDate}).
    </strong>
    <br />✅ Entries to be retained:
    <ul className={styles['retained']}>
      <li>Entries from reference proteomes</li>
      <li>All reviewed (Swiss-Prot) entries</li>
      <li>
        Selected unreviewed (TrEMBL) entries with experimental or biologically
        important data
      </li>
    </ul>
    ❌ Entries to be removed: Unreviewed (TrEMBL) entries that are not part of a
    reference proteome
  </div>
);

const UniProtKBRemovePreamble: FC<{ accession: string }> = ({ accession }) => (
  <>
    <strong>
      Entry {accession} is scheduled for removal from UniProtKB/TrEMBL as it is
      not part of a reference proteome.
    </strong>
    <br />
    From release {release} ({releaseDate}), UniProtKB/TrEMBL will include only:
    <ul className={styles['retained']}>
      <li>Entries from reference proteomes</li>
      <li>
        Selected unreviewed (TrEMBL) entries with experimental or biologically
        important data
      </li>
    </ul>
  </>
);

const HelpFtpContact: FC<{
  accession?: string;
  organism?: UniProtKBSimplifiedTaxonomy;
  upids?: string[];
}> = ({ accession, organism, upids }) => (
  <>
    Read our{' '}
    <Link
      to={generatePath(LocationToPath[Location.HelpEntry], {
        accession: 'refprot_only_changes',
      })}
    >
      help page
    </Link>
    , view{' '}
    <ExternalLink url={ftpProteomes} className={styles['no-right-margin']}>
      affected entries and proteomes
    </ExternalLink>
    , or{' '}
    <ContactLink
      to={
        accession && organism && upids
          ? {
              pathname: LocationToPath[Location.ContactGeneric],
              state: {
                formValues: {
                  context: [
                    `UniProtKB accession: ${accession}`,
                    `Proteome IDs for this UniProtKB entry: ${upids.join(', ') || '<none>'}`,
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

const UniProtKBGenericMain: FC<{
  accession?: string;
  organism?: UniProtKBSimplifiedTaxonomy;
  upids?: string[];
}> = ({ accession, organism, upids }) => (
  <div className={styles['generic']}>
    Entries removed from UniProtKB/TrEMBL will remain accessible in the UniParc
    sequence archive.
    <HelpFtpContact accession={accession} organism={organism} upids={upids} />
  </div>
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
    We are updating the reference proteome selection procedure. As a result, in
    release 2025_04 (October 2025) some proteomes may lose their reference
    proteome status, but all proteomes will remain accessible in the Proteomes
    database.
    <br />
    <br />
    Additionally, starting with release {release} ({releaseDate}), Unreviewed
    UniProtKB/TrEMBL will include only proteins from reference proteomes
    selected by the new procedure, along with selected entries with experimental
    and biologically important data. Please see{' '}
    <ExternalLink url={blogEntryUrl}>this short article</ExternalLink> for more
    information, view the{' '}
    <ExternalLink url={ftpProteomes} className={styles['no-right-margin']}>
      list of affected proteins and proteomes
    </ExternalLink>
    , or{' '}
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

export const RefProtMoveHomePage = () => (
  <Message
    level="warning"
    className={cn('uniprot-grid-cell--span-12', styles['homepage'])}
  >
    Our Proteomes and UniProtKB/TrEMBL resources are undergoing a significant
    transition. <HelpFtpContact />
  </Message>
);

export const RefProtMoveHelpLandingPage = () => (
  <Message
    level="warning"
    className={cn('uniprot-grid-cell--span-12', styles['help-landing-page'])}
  >
    Our Proteomes and UniProtKB/TrEMBL resources are undergoing a significant
    transition. <HelpFtpContact />
  </Message>
);

export const RefProtMoveHelpEntry = () => (
  <Message
    level="warning"
    className={cn('uniprot-grid-cell--span-12', styles['help-entry'])}
  >
    Our Proteomes and UniProtKB/TrEMBL resources are undergoing a significant
    transition. <HelpFtpContact />
  </Message>
);

export const RefProtMoveHelpResults = () => (
  <Message
    level="warning"
    className={cn('uniprot-grid-cell--span-12', styles['help-results'])}
  >
    Our Proteomes and UniProtKB/TrEMBL resources are undergoing a significant
    transition. <HelpFtpContact />
  </Message>
);

export const RefProtMoveSwaggerDocs = () => (
  <Message
    level="warning"
    className={cn('uniprot-grid-cell--span-12', styles['swagger-docs'])}
  >
    Our Proteomes and UniProtKB/TrEMBL resources are undergoing a significant
    transition. <HelpFtpContact />
  </Message>
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
      className={cn('uniprot-grid-cell--span-12', styles['results-message'])}
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
export const biologicallyRelevant = (entry: UniProtkbAPIModel) => {
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

export const getProteomes = getCrossRefsFor('Proteomes');

export type CheckMoveResponse = {
  move?: string[];
  stay?: string[];
  unknown?: string[];
};

export const referenceProteomeTypes = new Set([
  'Reference and representative proteome',
  'Reference proteome',
  'Representative proteome',
]);

export const RefProtMoveProteomesEntryMessage: FC<{
  id: string;
  taxonomy: TaxonomyDatum;
  becomingNonRP: boolean;
}> = ({ id, taxonomy, becomingNonRP }) =>
  becomingNonRP ? (
    <Message
      level="failure"
      className={cn('uniprot-grid-cell--span-12', styles['entry-message'])}
    >
      <strong>
        {id} is currently under review and may lose its reference proteome
        status in release {rpChangesRelease} ({rpChangesReleaseDate}). If this
        happens, its Unreviewed UniProtKB/TrEMBL entries will be removed from
        UniProtKB, but their sequences will remain accessible in the UniParc
        sequence archive.
      </strong>
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

export const RefProtMoveUniProtKBEntryMessage: FC<{
  accession: string;
  upids?: string[];
  organism?: UniProtKBSimplifiedTaxonomy;
}> = ({ accession, upids, organism }) => (
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
