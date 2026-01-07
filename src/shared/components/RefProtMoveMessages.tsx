import cn from 'classnames';
import { Message } from 'franklin-sites';
import { type FC } from 'react';
import { generatePath, Link } from 'react-router-dom';
import joinUrl from 'url-join';

import { Location, LocationToPath } from '../../app/config/urls';
import ContactLink from '../../contact/components/ContactLink';
import { type TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import {
  type UniProtkbAPIModel,
  type UniProtKBSimplifiedTaxonomy,
} from '../../uniprotkb/adapters/uniProtkbConverter';
import { apiPrefix } from '../config/apiUrls/apiPrefix';
import { Namespace } from '../types/namespaces';
import ExternalLink from './ExternalLink';
import styles from './styles/ref-prot-move-messages.module.scss';

const ftpProteomes = 'https://ftp.ebi.ac.uk/pub/contrib/UniProt/proteomes/';

export const checkMoveUrl = joinUrl(apiPrefix, 'refprotmove-check');

const release = '2026_02';
const releaseDate = 'first half of 2026';

const UniProtKBGenericPreamble = () => (
  <div>
    <strong>
      The unreviewed UniProtKB/TrEMBL database will be reduced in size in
      release {release} ({releaseDate}).
    </strong>
    <br />✅ Entries to be retained in UniProtKB:
    <ul className={cn(styles['retained'], styles['indented'])}>
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
    <ul className={cn(styles['retained'])}>
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
    Please read our{' '}
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
                    'Message from RefProt change banner',
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
                  context: 'Message from RefProt change banner',
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
    Entries removed from unreviewed UniProtKB/TrEMBL will remain accessible in
    the UniParc sequence archive.
    <br />
    <HelpFtpContact accession={accession} organism={organism} upids={upids} />
  </div>
);

const UniProtKBGenericMessage = () => (
  <>
    <UniProtKBGenericPreamble />
    <UniProtKBGenericMain />
  </>
);

const ProteomesMessage: FC<{ id?: string; taxonomy?: TaxonomyDatum }> = () => (
  <>
    <strong>
      Our reference proteome selection procedure is being updated, and some
      proteomes may lose their reference proteome status.
    </strong>
    <br />
    From release {release} ({releaseDate}), UniProtKB/TrEMBL will include only:
    <ul className={styles['retained-proteomes']}>
      <li>Entries from reference proteomes</li>
      <li>
        Selected unreviewed (TrEMBL) entries with experimental or biologically
        important data
      </li>
    </ul>
    All proteomes will remain accessible in the Proteomes database. Entries
    removed from unreviewed UniProtKB/TrEMBL will remain accessible in the
    UniParc sequence archive.
    <br />
    <HelpFtpContact />
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
    transition that may affect downstream user workflows.
    <br />
    <HelpFtpContact />
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

export const getProteomes = getCrossRefsFor('Proteomes');

export type ProteomesCheckMoveResponse = {
  status: 'became-non-reference' | 'no-change' | 'unknown';
};

export type UniProtKBCheckMoveResponse = {
  status: 'remove' | 'stay' | 'unknown';
};

// Only show in the case that the proteome is non-reference.
export const RefProtMoveProteomesEntryMessage: FC<{
  id: string;
  taxonomy: TaxonomyDatum;
}> = ({ id, taxonomy }) => (
  <Message
    level="failure"
    className={cn('uniprot-grid-cell--span-12', styles['entry-message'])}
  >
    <strong>
      Proteome {id} is currently not a reference proteome. If it is not selected
      as a reference proteome by release {release} ({releaseDate}), its
      associated:
    </strong>
    <ul>
      <li>
        Unreviewed (TrEMBL) entries will be removed (except selected entries
        with experimental or biologically important data)
      </li>
      <li>Reviewed (Swiss-Prot) entries will be retained</li>
    </ul>
    All proteomes will remain accessible in the Proteomes database. Entries
    removed from unreviewed UniProtKB/TrEMBL will remain accessible in the
    UniParc sequence archive.
    <br />
    Please read our{' '}
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
        id && taxonomy
          ? {
              pathname: LocationToPath[Location.ContactGeneric],
              state: {
                formValues: {
                  context: [
                    'Message from RefProt change banner',
                    `Proteome ID: ${id}`,
                    `Organism: ${taxonomy.scientificName}`,
                    `Taxon ID: ${taxonomy.taxonId}`,
                    `Mnemonic: ${taxonomy.mnemonic}`,
                  ].join('\n'),
                },
              },
            }
          : {
              pathname: LocationToPath[Location.ContactGeneric],
              state: {
                formValues: {
                  context: 'Message from RefProt change banner',
                },
              },
            }
      }
    >
      contact us
    </ContactLink>{' '}
    with any questions.
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
