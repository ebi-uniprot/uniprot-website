import React, { FC, useCallback, useEffect } from 'react';
import { Card } from 'franklin-sites';
import ProtvistaDatatable from 'protvista-datatable';

import {
  /* hasContent, */ loadWebComponent,
} from '../../../shared/utils/utils';

import EntrySection from '../../types/entrySection';

import {
  UniRefMember,
  RepresentativeMember,
} from '../../adapters/uniRefConverter';

const MembersSection: FC<{ data: UniRefMember[] }> = ({ data }) => {
  // if (!hasContent(data)) {
  //   return null;
  // }

  // NOTE: not sure if that what we should use here, or rather a generic version
  // NOTE: of what is in the search result pages
  useEffect(() => {
    loadWebComponent('protvista-datatable', ProtvistaDatatable);
  }, []);

  const setTableData = useCallback(
    (node) => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = data;
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
              if (member.seed) {
                return 'Seed';
              }
              if ('sequence' in member) {
                return 'Representative';
              }
            },
          },
        };
      }
    },
    [data]
  );

  return (
    <div id={EntrySection.Members}>
      <Card title={EntrySection.Members}>
        <protvista-datatable ref={setTableData} />
      </Card>
    </div>
  );
};

export default MembersSection;
