/* eslint-disable camelcase */
// TODO: remove this when implementing
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { ReactNode } from 'react';
import { Link, generatePath } from 'react-router-dom';

import { UniParcAPIModel } from '../adapters/uniParcConverter';

import { Location, LocationToPath } from '../../app/config/urls';

export enum UniParcColumn {
  // Names & taxonomy
  upi = 'upi',
  gene = 'gene',
  organismID = 'organism_id',
  organism = 'organism',
  protein = 'protein',
  proteome = 'proteome',
  // Sequences
  checksum = 'checksum',
  length = 'length',
  sequence = 'sequence',
  // Miscellaneous
  accession = 'accession',
  // Date of
  firstSeen = 'first_seen',
  lastSeen = 'last_seen',
  // Family & domains
  cdd = 'CDD',
  gene3D = 'Gene3D',
  hamap = 'HAMAP',
  panther = 'PANTHER',
  pfam = 'Pfam',
  pirsf = 'PIRSF',
  prints = 'PRINTS',
  prosite = 'PROSITE',
  sfld = 'SFLD',
  smart = 'SMART',
  supfam = 'SUPFAM',
  tigrfams = 'TIGRFAMs',
}

export const defaultColumns = [
  UniParcColumn.upi,
  UniParcColumn.organism,
  UniParcColumn.length,
  UniParcColumn.accession,
  UniParcColumn.firstSeen,
  UniParcColumn.lastSeen,
];

export const primaryKeyColumn = UniParcColumn.upi;

export const UniParcColumnConfiguration = new Map<
  UniParcColumn,
  {
    label: ReactNode;
    render: (data: UniParcAPIModel) => ReactNode;
  }
>();

UniParcColumnConfiguration.set(UniParcColumn.upi, {
  label: 'Entry',
  render: ({ uniParcId }) => (
    <Link
      to={generatePath(LocationToPath[Location.UniParcEntry], {
        accession: uniParcId,
      })}
    >
      {uniParcId}
    </Link>
  ),
});

UniParcColumnConfiguration.set(UniParcColumn.gene, {
  label: 'Gene names',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.organismID, {
  label: 'Organism IDs',
  // render: ({ taxonomies }) => {
  //   return taxonomies;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.organism, {
  label: 'Organisms',
  // render: ({ taxonomies }) => {
  //   return taxonomies;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.protein, {
  label: 'Protein names',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.proteome, {
  label: 'Proteomes',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.checksum, {
  label: 'Checksum',
  render: ({ sequence: { crc64 } }) => crc64,
});

UniParcColumnConfiguration.set(UniParcColumn.length, {
  label: 'Length',
  render: ({ sequence: { length } }) => length,
});

UniParcColumnConfiguration.set(UniParcColumn.sequence, {
  label: 'Sequence',
  render: ({ sequence: { value } }) => value,
});

UniParcColumnConfiguration.set(UniParcColumn.accession, {
  label: 'UniProtKB',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.firstSeen, {
  label: 'First seen',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.lastSeen, {
  label: 'Last seen',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.cdd, {
  label: 'CDD',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.gene3D, {
  label: 'Gene3D',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.hamap, {
  label: 'HAMAP',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.panther, {
  label: 'PANTHER',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.pfam, {
  label: 'Pfam',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.pirsf, {
  label: 'PIRSF',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.prints, {
  label: 'PRINTS',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.prosite, {
  label: 'PROSITE',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.sfld, {
  label: 'SFLD',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.smart, {
  label: 'SMART',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.supfam, {
  label: 'SUPFAM',
  // render: ({ name }) => {
  //   return name;
  // },
});

UniParcColumnConfiguration.set(UniParcColumn.tigrfams, {
  label: 'TIGRFAMs',
  // render: ({ name }) => {
  //   return name;
  // },
});

// UniParcColumnConfiguration.set(UniParcColumn.commonTaxon, {
//   label: 'Common taxon',
//   render: ({ commonTaxon }) => {
//     return commonTaxon;
//   },
// });

// UniParcColumnConfiguration.set(UniParcColumn.commonTaxonid, {
//   label: 'Common taxon ID',
//   render: ({ commonTaxonId }) => {
//     return <Link to={`/taxonomy/${commonTaxonId}`}>{commonTaxonId}</Link>;
//   },
// });

// UniParcColumnConfiguration.set(UniParcColumn.organismId, {
//   label: 'Organism IDs',
//   render: ({ organismIds }) => {
//     return (
//       <ul className="no-bullet">
//         {organismIds?.map((organismId) => (
//           <li key={organismId}>
//             <Link to={`/taxonomy/${organismId}`}>{organismId}</Link>
//           </li>
//         ))}
//       </ul>
//     );
//   },
// });

// UniParcColumnConfiguration.set(UniParcColumn.organism, {
//   label: 'Organisms',
//   render: ({ organisms }) => {
//     return (
//       <ul className="no-bullet">
//         {organisms?.map((organism) => (
//           <li key={organism}>{organism}</li>
//         ))}
//       </ul>
//     );
//   },
// });

// UniParcColumnConfiguration.set(UniParcColumn.identity, {
//   label: 'Identity',
//   render: ({ entryType }) => {
//     return <>{entryType}</>;
//   },
// });

// UniParcColumnConfiguration.set(UniParcColumn.length, {
//   label: 'Length',
//   render: ({ sequenceLength }) => sequenceLength,
// });

// UniParcColumnConfiguration.set(UniParcColumn.sequence, {
//   label: 'Reference sequence',
//   render: ({ sequence }) => {
//     return <span className="break-anywhere">{sequence}</span>;
//   },
// });

// UniParcColumnConfiguration.set(UniParcColumn.types, {
//   label: 'Types',
//   render: ({ memberIdTypes }) => {
//     return (
//       <>
//         {memberIdTypes?.map((memberType) => (
//           <EntryTypeIcon entryType={memberType} key={memberType} />
//         ))}
//       </>
//     );
//   },
// });

// UniParcColumnConfiguration.set(UniParcColumn.members, {
//   label: 'Members',
//   render: ({ members }) => {
//     return (
//       <ul className="no-bullet">
//         {members?.map((member) => (
//           <li key={member}>
//             <Link to={`/uniprotkb/${member}`}>{member}</Link>
//           </li>
//         ))}
//       </ul>
//     );
//   },
// });

// UniParcColumnConfiguration.set(UniParcColumn.count, {
//   label: 'Size',
//   render: ({ memberCount }) => {
//     return (
//       <>
//         {memberCount} member{memberCount > 1 && 's'}
//       </>
//     );
//   },
// });

// UniParcColumnConfiguration.set(UniParcColumn.created, {
//   label: 'Last updated',
//   render: ({ updated }) => {
//     return updated;
//   },
// });

export default UniParcColumnConfiguration;
