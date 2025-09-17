import { Message } from 'franklin-sites';
import { FC, useMemo } from 'react';
import joinUrl from 'url-join';

import { Location, LocationToPath } from '../../app/config/urls';
import ContactLink from '../../contact/components/ContactLink';
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

const blogEntryUrl =
  'https://insideuniprot.blogspot.com/2025/06/capturing-diversity-of-life.html';

const checkMoveUrl = joinUrl(apiPrefix, 'refprotmove-check/check-move');

const UniProtKBGenericPreamble = () => (
  <>
    The Unreviewed UniProtKB/TrEMBL database will reduce in size in release
    2026_01 (planned for the first quarter of 2026).
  </>
);

const UniProtKBRemovePreamble: FC<{ accession: string }> = ({ accession }) => (
  <b>
    This entry ({accession}) is under consideration for removal in release
    2026_01 (planned for the first quarter of 2026).
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
    From 2026_01 onwards, Unreviewed UniProtKB/TrEMBL will only include
    reference proteomes and selected entries with experimental or biologically
    important data. Entries removed from Unreviewed UniProtKB/TrEMBL will remain
    accessible in UniParc. Please see{' '}
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
                  subject: `Question about UniProtKB entry ${accession} being removed in 2026_01`,
                },
              },
            }
          : {
              pathname: LocationToPath[Location.ContactGeneric],
              state: {
                formValues: {
                  subject: `Question about UniProtKB/TrEMBL changes in 2026_01`,
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
    We are updating the reference proteomes selection procedure (planned for the
    first quarter of 2026). While all proteomes will remain accessible through
    the proteomes database, proteins in Unreviewed UniProtKB/TrEMBL will only
    include reference proteomes and selected entries with experimental or
    biologically important data.
    <br />
    <br />
    Entries removed from Unreviewed UniProtKB/TrEMBL will remain accessible in
    UniParc. Please see{' '}
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
                  subject: `Question about Proteome ${id} being removed in 2026_01`,
                },
              },
            }
          : {
              pathname: LocationToPath[Location.ContactGeneric],
              state: {
                formValues: {
                  subject: `Question about Proteomes changes in 2026_01`,
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
      className="uniprot-grid-cell--span-12"
      style={{ marginBottom: '-0.75rem', marginTop: '0.5rem' }}
    >
      {(namespace === Namespace.uniprotkb && <UniProtKBGenericMessage />) ||
        (namespace === Namespace.proteomes && <ProteomesMessage />)}
    </Message>
  );
};

export const RefProtMoveProteomesEntryMessage: FC<{
  id: string;
  taxonomy: TaxonomyDatum;
}> = ({ id, taxonomy }) => (
  <Message
    level="warning"
    className="uniprot-grid-cell--span-12"
    style={{ marginBottom: '1rem', marginTop: '1rem' }}
  >
    <ProteomesMessage id={id} taxonomy={taxonomy} />
  </Message>
);

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
      className="uniprot-grid-cell--span-12"
      style={{ marginBottom: '1rem', marginTop: '1rem' }}
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
