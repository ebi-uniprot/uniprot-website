import ExternalLink from '../../../shared/components/ExternalLink';

import Table from '../../../shared/components/table/Table';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import {
  getDatabaseInfoAttribute,
  processUrlTemplate,
} from '../../../shared/utils/xrefs';

import { Xref } from '../../../shared/types/apiModel';
import { PropertyKey } from '../../types/modelTypes';

const EMBLXrefProperties: Record<string, string> = {
  Genomic_DNA: 'Genomic DNA Translation',
  Genomic_RNA: 'Genomic RNA Translation',
  Other_DNA: 'Other DNA Translation',
  Other_RNA: 'Other RNA Translation',
  Transcribed_RNA: 'Transcribed RNA Translation',
  Unassigned_DNA: 'Unassigned DNA Translation',
  Unassigned_RNA: 'Unassigned RNA Translation',
  Viral_cRNA: 'Viral cRNA Translation',
  mRNA: 'mRNA Translation',
  ALT_FRAME: 'Frameshift',
  ALT_INIT: 'Different initiation',
  ALT_SEQ: 'Sequence problems.',
  ALT_TERM: 'Different termination.',
  NOT_ANNOTATED_CDS: 'No translation available.',
};

const processData = (xrefs: Xref[]) =>
  xrefs.flatMap(({ id, properties, additionalIds }) => {
    if (!properties) {
      return null;
    }
    const allIds = [id, ...(additionalIds || [])];
    const { MoleculeType, ProteinId, Status } = properties;
    return allIds.map((sequenceId) => ({
      sequenceId,
      proteinId: ProteinId === '-' ? null : ProteinId,
      moleculeType: MoleculeType && EMBLXrefProperties[MoleculeType],
      status: Status && EMBLXrefProperties[Status],
    }));
  });

export type ProtvistaPDB = {
  sequenceId: string;
  proteinId: string;
  moleculeType: string;
  status?: string;
};

const EMBLView = ({ xrefs }: { xrefs: Xref[] }) => {
  const data = processData(xrefs);

  const databaseInfoMaps = useDatabaseInfoMaps();

  const databaseToDatabaseInfo = databaseInfoMaps?.databaseToDatabaseInfo;

  const emblInfo = databaseToDatabaseInfo?.EMBL;
  const genBankInfo = databaseToDatabaseInfo?.GenBank;
  const ddbjInfo = databaseToDatabaseInfo?.DDBJ;

  const emblDnaLink = getDatabaseInfoAttribute(
    emblInfo?.attributes,
    PropertyKey.ProteinId
  )?.uriLink;
  const genBankDnaLink = getDatabaseInfoAttribute(
    genBankInfo?.attributes,
    PropertyKey.ProteinId
  )?.uriLink;
  const ddbjDnaLink = getDatabaseInfoAttribute(
    ddbjInfo?.attributes,
    PropertyKey.ProteinId
  )?.uriLink;

  return (
    <Table expandable={data.length > 10}>
      <Table.Head>
        <th>Nucleotide Sequence</th>
        <th>Protein Sequence</th>
        <th>Molecule Type</th>
        <th>Status</th>
      </Table.Head>
      <Table.Body translate="no">
        {data.map(
          (d, i) =>
            d &&
            (d.proteinId || d.sequenceId) && (
              <Table.Row
                isOdd={i % 2 === 1}
                key={`${d.sequenceId}-${d.proteinId}-${d.moleculeType}`}
              >
                <td>
                  {d.sequenceId ? (
                    <>
                      {d.sequenceId}
                      <br />
                      <ExternalLink
                        url={processUrlTemplate(emblDnaLink, {
                          ProteinId: d.sequenceId,
                        })}
                      >
                        EMBL
                      </ExternalLink>
                      {'· '}
                      <ExternalLink
                        url={processUrlTemplate(genBankDnaLink, {
                          ProteinId: d.sequenceId,
                        })}
                      >
                        GenBank
                      </ExternalLink>
                      {'· '}
                      <ExternalLink
                        url={processUrlTemplate(ddbjDnaLink, {
                          ProteinId: d.sequenceId,
                        })}
                      >
                        DDBJ
                      </ExternalLink>
                    </>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {d.proteinId ? (
                    <>
                      {d.proteinId}
                      <br />
                      <ExternalLink
                        url={processUrlTemplate(emblInfo?.uriLink, {
                          id: d.proteinId,
                        })}
                      >
                        EMBL
                      </ExternalLink>
                      {'· '}
                      <ExternalLink
                        url={processUrlTemplate(genBankInfo?.uriLink, {
                          id: d.proteinId,
                        })}
                      >
                        GenBank
                      </ExternalLink>
                      {'· '}
                      <ExternalLink
                        url={processUrlTemplate(ddbjInfo?.uriLink, {
                          id: d.proteinId,
                        })}
                      >
                        DDBJ
                      </ExternalLink>
                    </>
                  ) : (
                    '-'
                  )}
                </td>
                <td translate="yes">
                  {d.moleculeType
                    ? d.moleculeType.replace(/translation/i, '')
                    : '-'}
                </td>
                <td translate="yes">{d.status}</td>
              </Table.Row>
            )
        )}
      </Table.Body>
    </Table>
  );
};

export default EMBLView;
