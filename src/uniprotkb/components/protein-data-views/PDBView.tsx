import { Fragment } from 'react';

import ExternalLink from '../../../shared/components/ExternalLink';
import Table from '../../../shared/components/table/Table';

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
      accession: id,
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
    <Table expandable>
      <Table.Head>
        <th>PDB Entry</th>
        <th>Method</th>
        <th>Resolution</th>
        <th>Chain</th>
        <th>Positions</th>
        <th>Links</th>
      </Table.Head>
      <Table.Body translate="no">
        {data.map(
          (d, i) =>
            d && (
              <Table.Row isOdd={i % 2 === 0} key={d.id}>
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
              </Table.Row>
            )
        )}
      </Table.Body>
    </Table>
  );
};

export default PDBView;
