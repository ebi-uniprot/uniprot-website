import { ExternalLink, Loader } from 'franklin-sites';

import useCustomElement from '../../../shared/hooks/useCustomElement';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import { getDatabaseInfoAttribute, processUrlTemplate } from './XRefView';
import { Xref } from '../../../shared/types/apiModel';

import EMBLXrefProperties from '../../config/emblXrefPropertiesData.json';
import { PropertyKey } from '../../types/modelTypes';

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
      moleculeType:
        MoleculeType &&
        EMBLXrefProperties[MoleculeType as keyof typeof EMBLXrefProperties],
      status:
        Status && EMBLXrefProperties[Status as keyof typeof EMBLXrefProperties],
    }));
  });

export type ProtvistaPDB = {
  sequenceId: string;
  proteinId: string;
  moleculeType: string;
  status?: string;
};

const EMBLView = ({ xrefs }: { xrefs: Xref[] }) => {
  const datatableElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );
  const data = processData(xrefs);
  const databaseInfoMaps = useDatabaseInfoMaps();

  if (!databaseInfoMaps) {
    return <Loader />;
  }

  const { databaseToDatabaseInfo } = databaseInfoMaps;

  const emblInfo = databaseToDatabaseInfo.EMBL;
  const genBankInfo = databaseToDatabaseInfo.GenBank;
  const ddbjInfo = databaseToDatabaseInfo.DDBJ;

  const emblProteinLink = emblInfo.uriLink;
  const genBankProteinLink = genBankInfo.uriLink;
  const ddbjProteinLink = ddbjInfo.uriLink;

  if (!emblInfo.attributes || !genBankInfo.attributes || !ddbjInfo.attributes) {
    return null;
  }

  const emblDnaLink = getDatabaseInfoAttribute(
    emblInfo?.attributes,
    PropertyKey.ProteinId
  )?.uriLink;
  const genBankDnaLink = getDatabaseInfoAttribute(
    genBankInfo.attributes,
    PropertyKey.ProteinId
  )?.uriLink;
  const ddbjDnaLink = getDatabaseInfoAttribute(
    ddbjInfo.attributes,
    PropertyKey.ProteinId
  )?.uriLink;

  if (
    !emblProteinLink ||
    !genBankProteinLink ||
    !ddbjProteinLink ||
    !emblDnaLink ||
    !genBankDnaLink ||
    !ddbjDnaLink
  ) {
    return null;
  }

  return (
    <datatableElement.name>
      <table>
        <thead>
          <tr>
            <th>Sequence</th>
            <th>Protein</th>
            <th>Molecule Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (d) =>
              d &&
              d.proteinId &&
              d.sequenceId && (
                <tr key={`${d.sequenceId}-${d.proteinId}-${d.moleculeType}`}>
                  <td>
                    {d.sequenceId}
                    {' ('}
                    <ExternalLink
                      url={processUrlTemplate(emblDnaLink, {
                        ProteinId: d.sequenceId,
                      })}
                    >
                      EMBL
                    </ExternalLink>
                    {' | '}
                    <ExternalLink
                      url={processUrlTemplate(genBankDnaLink, {
                        ProteinId: d.sequenceId,
                      })}
                    >
                      GenBank
                    </ExternalLink>
                    {' | '}
                    <ExternalLink
                      url={processUrlTemplate(ddbjDnaLink, {
                        ProteinId: d.sequenceId,
                      })}
                    >
                      DDBJ
                    </ExternalLink>
                    )
                  </td>
                  <td>
                    {d.proteinId}
                    {' ('}
                    <ExternalLink
                      url={processUrlTemplate(emblProteinLink, {
                        id: d.proteinId,
                      })}
                    >
                      EMBL
                    </ExternalLink>
                    {' | '}
                    <ExternalLink
                      url={processUrlTemplate(genBankProteinLink, {
                        id: d.proteinId,
                      })}
                    >
                      GenBank
                    </ExternalLink>
                    {' | '}
                    <ExternalLink
                      url={processUrlTemplate(ddbjProteinLink, {
                        id: d.proteinId,
                      })}
                    >
                      DDBJ
                    </ExternalLink>
                    )
                  </td>
                  <td>{d.moleculeType}</td>
                  <td>{d.status}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </datatableElement.name>
  );
};

export default EMBLView;
