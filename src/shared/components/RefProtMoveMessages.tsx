import { ExternalLink, Loader, Message } from 'franklin-sites';
import { FC } from 'react';

import { Location, LocationToPath } from '../../app/config/urls';
import ContactLink from '../../contact/components/ContactLink';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import useDataApi from '../hooks/useDataApi';
import { Namespace } from '../types/namespaces';
import { stringifyUrl } from '../utils/url';

const blogEntryUrl =
  'https://insideuniprot.blogspot.com/2025/06/capturing-diversity-of-life.html';

const checkMoveUrl =
  'https://wwwdev.ebi.ac.uk/uniprot/api/refprotmove-check/check-move';

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
  scientificName?: string;
  taxonId?: string;
  upids?: string[];
}> = ({ accession, scientificName, taxonId, upids }) => (
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
        accession && scientificName && taxonId && upids
          ? {
              pathname: LocationToPath[Location.ContactGeneric],
              state: {
                formValues: {
                  context: [
                    `UniProtKB accession: ${accession}`,
                    `UniParc UPIDs for this UniProtKB entry: ${upids.join(', ')}`,
                    `Organism: ${scientificName}`,
                    `Taxon ID: ${taxonId}`,
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

type CheckMoveResponse = {
  move?: string[];
  stay?: string[];
  unknown?: string[];
};

export const RefProtMoveUniProtKBEntryMessage: FC<{
  accession: string;
  upids: string[];
  scientificName: string;
  taxonId: string;
}> = ({ accession, upids, scientificName, taxonId }) => {
  const { data, loading } = useDataApi<CheckMoveResponse>(
    upids.length ? stringifyUrl(checkMoveUrl, { upids }) : null
  );
  if (loading) {
    return <Loader />;
  }
  return !data?.move?.length ? null : (
    <Message
      level="failure"
      className="uniprot-grid-cell--span-12"
      style={{ marginBottom: '1rem', marginTop: '1rem' }}
    >
      <UniProtKBRemovePreamble accession={accession} />
      <UniProtKBGenericMain
        accession={accession}
        scientificName={scientificName}
        taxonId={taxonId}
        upids={upids}
      />
    </Message>
  );
};
