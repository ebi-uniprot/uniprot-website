import { Fragment } from 'react';

import ExternalLink from '../../../shared/components/ExternalLink';
import DatatableWrapper from '../../../shared/components/views/DatatableWrapper';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import { processUrlTemplate } from '../../../shared/utils/xrefs';
import { getPDBMirrorsInfo } from '../../config/database';

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

  return (
    <DatatableWrapper>
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
        <tbody translate="no">
          {data.map(
            (d) =>
              d && (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td translate="yes">{d.method}</td>
                  <td>{d.resolution?.replace('A', 'Å')}</td>
                  <td>{d.chain}</td>
                  <td>{d.positions}</td>
                  <td>
                    {databaseInfoMaps &&
                      getPDBMirrorsInfo(
                        databaseInfoMaps.databaseToDatabaseInfo
                      ).map(({ displayName, uriLink }, index) => (
                        <Fragment key={uriLink}>
                          {index ? ' · ' : null}
                          <ExternalLink
                            url={
                              d.id
                                ? processUrlTemplate(uriLink, { id: d.id })
                                : null
                            }
                          >
                            {displayName}
                          </ExternalLink>
                        </Fragment>
                      ))}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </DatatableWrapper>
  );
};

export default PDBView;
