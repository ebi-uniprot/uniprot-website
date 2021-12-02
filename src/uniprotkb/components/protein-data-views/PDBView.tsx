import { FC } from 'react';
import { ExternalLink, Loader } from 'franklin-sites';

import useCustomElement from '../../../shared/hooks/useCustomElement';
import { useDatabaseInfoMaps } from '../../../shared/contexts/databaseInfoMaps';

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

const PDBView: FC<{
  xrefs: Xref[];
  noStructure?: boolean;
  primaryAccession?: string;
}> = ({ xrefs, noStructure = false, primaryAccession }) => {
  const structureDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-uniprot" */ 'protvista-uniprot'
      ).then((module) => ({ default: module.ProtvistaUniprotStructure })),
    'protvista-uniprot-structure'
  );
  const managerDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-manager" */ 'protvista-manager'),
    'protvista-manager'
  );
  const datatableDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );
  const ceDefined = structureDefined && managerDefined && datatableDefined;

  const data = processData(xrefs);

  const databaseInfoMaps = useDatabaseInfoMaps();

  if (!ceDefined || !databaseInfoMaps) {
    return <Loader />;
  }
  const { databaseToDatabaseInfo } = databaseInfoMaps;

  if (noStructure) {
    return (
      <protvista-datatable>
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
      </protvista-datatable>
    );
  }

  const sortedIds = xrefs.map(({ id }) => id).sort();
  const firstId = sortedIds && sortedIds.length ? sortedIds[0] : '';
  return (
    <protvista-manager attributes="pdb-id">
      <protvista-uniprot-structure
        structureid={firstId}
        accession={primaryAccession}
      />
    </protvista-manager>
  );
};

export default PDBView;
