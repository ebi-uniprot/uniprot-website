import React, { useCallback, FC } from 'react';
import ProtvistaManager from 'protvista-manager';
import ProtvistaDatatable from 'protvista-datatable';
import ProtvistaStructure from 'protvista-structure';
import { TemplateResult, html } from 'lit-html';
import { loadWebComponent } from '../../../shared/utils/utils';
import { PDBMirrorsInfo } from '../../config/database';
import { processUrlTemplate } from './XRefView';
import { Xref } from '../../types/commentTypes';
import 'litemol/dist/css/LiteMol-plugin.css';

loadWebComponent('protvista-manager', ProtvistaManager);
loadWebComponent('protvista-datatable', ProtvistaDatatable);
loadWebComponent('protvista-structure', ProtvistaStructure);

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

const getColumnConfig = () => ({
  type: {
    label: 'PDB Entry',
    resolver: ({ id }: ProtvistaPDB): string => id,
  },
  method: {
    label: 'Method',
    resolver: ({ method }: ProtvistaPDB): string => method,
  },
  resolution: {
    label: 'Resolution',
    resolver: ({ resolution }: ProtvistaPDB): string =>
      resolution && resolution.replace('A', 'Å'),
  },
  chain: {
    label: 'Chain',
    resolver: ({ chain }: ProtvistaPDB): string => chain,
  },
  positions: {
    label: 'Positions',
    resolver: ({ positions }: ProtvistaPDB): string => positions,
  },
  links: {
    label: 'Links',
    resolver: ({ id }: ProtvistaPDB): TemplateResult =>
      html`
        ${PDBMirrorsInfo.map(
          ({ displayName, uriLink }) =>
            html`
              <a href="${processUrlTemplate(uriLink, { id })}"
                >${displayName}</a
              >
            `
        ).reduce(
          (prev, curr) =>
            html`
              ${prev} · ${curr}
            `
        )}
      `,
  },
});

const PDBView: FC<{
  xrefs: Xref[];
  noStructure?: boolean;
  primaryAccession?: string;
}> = ({ xrefs, noStructure = false, primaryAccession }) => {
  const data = processData(xrefs);
  const setTableData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = data;
        // eslint-disable-next-line no-param-reassign
        node.columns = getColumnConfig();
        // eslint-disable-next-line no-param-reassign
        node.rowClickEvent = ({ id }: { id: string }) => ({ 'pdb-id': id });
      }
    },
    [data]
  );

  if (noStructure) {
    return <protvista-datatable ref={setTableData} />;
  }

  const sortedIds = xrefs.map(({ id }) => id).sort();
  const firstId = sortedIds && sortedIds.length ? sortedIds[0] : '';
  return (
    <protvista-manager attributes="pdb-id">
      <protvista-structure pdb-id={firstId} accession={primaryAccession} />
      <protvista-datatable
        ref={setTableData}
        selectedId={firstId}
        noScrollToRow
        noDeselect
        filter-scroll
      />
    </protvista-manager>
  );
};

export default PDBView;
