import React, { FC, useCallback } from 'react';
import { Card } from 'franklin-sites';

import useCustomElement from '../../../shared/hooks/useCustomElement';

import { hasContent } from '../../../shared/utils/utils';

import EntrySection, { EntrySectionIDs } from '../../types/entrySection';

import {
  UniRefMember,
  RepresentativeMember,
} from '../../adapters/uniRefConverter';

const MembersSection: FC<{ data: { members: UniRefMember[] } }> = ({
  data,
}) => {
  // NOTE: not sure if that what we should use here, or rather a generic version
  // NOTE: of what is in the search result pages
  const ceDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  const setTableData = useCallback(
    (node) => {
      if (node && ceDefined) {
        // eslint-disable-next-line no-param-reassign
        node.data = data.members;
        // eslint-disable-next-line no-param-reassign
        node.columns = {
          members: {
            label: 'Cluster Members',
            resolver: ({ accessions }: UniRefMember) => accessions[0],
          },
          entryNames: {
            label: 'Entry names',
            resolver: ({ memberId }: UniRefMember) => memberId,
          },
          reviewed: {
            resolver: () => '?', // TODO
          },
          proteinNames: {
            label: 'Protein names',
            resolver: ({ proteinName }: UniRefMember) => proteinName,
          },
          organisms: {
            label: 'Organisms',
            resolver: ({ organismName }: UniRefMember) => organismName,
          },
          organismIDs: {
            label: 'Organism IDs',
            resolver: ({ organismTaxId }: UniRefMember) => organismTaxId,
          },
          relatedClusters: {
            label: 'Related clusters',
            resolver: () => '?', // TODO
          },
          lengths: {
            label: 'Lengths',
            resolver: ({ sequenceLength }: UniRefMember) => sequenceLength,
          },
          roles: {
            label: 'Roles',
            // eslint-disable-next-line consistent-return
            resolver: (member: UniRefMember | RepresentativeMember) => {
              if (member.seed && 'sequence' in member) {
                return 'seed & representative';
              }
              if (member.seed) {
                return 'seed';
              }
              if ('sequence' in member) {
                return 'representative';
              }
            },
          },
        };
      }
    },
    [data.members, ceDefined]
  );

  if (!hasContent(data)) {
    return null;
  }

  return (
    <div id={EntrySectionIDs[EntrySection.Members]} data-entry-section>
      <Card title={EntrySection.Members}>
        <protvista-datatable ref={setTableData} />
      </Card>
    </div>
  );
};

export default MembersSection;
