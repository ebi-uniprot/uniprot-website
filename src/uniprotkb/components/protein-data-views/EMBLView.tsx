import { ExternalLink, Loader } from 'franklin-sites';

import useCustomElement from '../../../shared/hooks/useCustomElement';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import { getPDBMirrorsInfo } from '../../config/database';
import { processUrlTemplate } from './XRefView';
import { Xref } from '../../../shared/types/apiModel';

import EMBLXrefProperties from '../../config/emblXrefPropertiesData.json';

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
  console.log(xrefs);
  const data = processData(xrefs);
  console.log(data);

  const databaseInfoMaps = useDatabaseInfoMaps();

  if (!databaseInfoMaps) {
    return <Loader />;
  }

  // const { databaseToDatabaseInfo } = databaseInfoMaps;
  return (
    <datatableElement.name>
      <table>
        <thead>
          <tr>
            <th>Sequence ID</th>
            <th>Protein ID</th>
            <th>Molecule Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (d) =>
              d && (
                <tr key={`${d.sequenceId}-${d.proteinId}-${d.moleculeType}`}>
                  <td>{d.sequenceId}</td>
                  <td>{d.proteinId}</td>
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
