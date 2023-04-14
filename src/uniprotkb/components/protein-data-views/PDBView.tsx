import { Loader } from 'franklin-sites';

import ExternalLink from '../../../shared/components/ExternalLink';
import DatatableWithToggle from '../../../shared/components/views/DatatableWithToggle';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import { getPDBMirrorsInfo } from '../../config/database';
import { processUrlTemplate } from './XRefView';
import { Xref } from '../../../shared/types/apiModel';

const processData = (xrefs: Xref[]) =>
  xrefs.map(({ id, properties }) => {
    if (!properties) {
      return null;
    }
    const { Chains, Resolution, Method } = properties;
    let chain;
    let positions;
    if (Chains) {
      const tokens = Chains.split('=');
      if (tokens.length === 2) {
        [chain, positions] = tokens;
      }
    }
    return {
      id,
      method: Method,
      resolution: !Resolution || Resolution === '-' ? null : Resolution,
      chain,
      positions,
      protvistaFeatureId: id,
    };
  });

export type ProtvistaPDB = {
  id: string;
  method: string;
  resolution: string;
  positions: string;
  chain: string;
};

const PDBView = ({ xrefs }: { xrefs: Xref[] }) => {
  /**
   * Note: this view is duplicated in protvista-uniprot-structure
   * This is because the AF data is not currently available as part of the entry
   * Eventually it might make sense to just use protvista-structure and
   * protvista-datatable.
   */
  const data = processData(xrefs);

  const databaseInfoMaps = useDatabaseInfoMaps();

  if (!databaseInfoMaps) {
    return <Loader />;
  }

  const { databaseToDatabaseInfo } = databaseInfoMaps;

  return (
    <DatatableWithToggle>
      <table>
        <thead>
          <tr>
            <th>PDB Entry</th>
            <th>Method</th>
            <th>Resolution</th>
            <th>Chain</th>
            <th>Positions</th>
            <th>Links</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (d) =>
              d && (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.method}</td>
                  <td>{d.resolution?.replace('A', 'Å')}</td>
                  <td>{d.chain}</td>
                  <td>{d.positions}</td>
                  <td>
                    {getPDBMirrorsInfo(databaseToDatabaseInfo)
                      .map(({ displayName, uriLink }) =>
                        d.id && uriLink ? (
                          <ExternalLink
                            url={processUrlTemplate(uriLink, { id: d.id })}
                          >
                            {displayName}
                          </ExternalLink>
                        ) : (
                          { displayName }
                        )
                      )
                      .reduce((prev, curr) => (
                        <>
                          {prev} · {curr}
                        </>
                      ))}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </DatatableWithToggle>
  );
};

export default PDBView;
