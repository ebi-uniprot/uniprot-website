import { FC, useMemo } from 'react';
import { DataTable, DENSITY_COMPACT, Loader, Message } from 'franklin-sites';
import { getAccessionsURL } from '../../../../shared/config/apiUrls';
import useDataApi from '../../../../shared/hooks/useDataApi';
import { UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';
import { UniProtKBColumn } from '../../../types/columnTypes';
import EntryTypeIcon from '../../../../shared/components/entry/EntryTypeIcon';
import TaxonomyView from '../../../../shared/components/entry/TaxonomyView';
import { generatePath } from 'react-router-dom';
import { Location, LocationToPath } from '../../../../app/config/urls';
import SimpleView from '../../protein-data-views/SimpleView';

const columns = [
  UniProtKBColumn.accession,
  UniProtKBColumn.id,
  UniProtKBColumn.reviewed,
  UniProtKBColumn.organismName,
  UniProtKBColumn.proteinName,
  UniProtKBColumn.sequence,
];

const SimilarProteinsTable: FC<{ members: string[] }> = ({ members }) => {
  const memberList = useMemo(() => {
    // Remove UniParc entries
    return members.filter((member) => !member.startsWith('UPI'));
    return [];
  }, [members]);

  const columnConfig = [
    {
      label: 'Accession',
      render: (row: UniProtkbAPIModel) => (
        <>
          <EntryTypeIcon entryType={row.entryType} />
          <SimpleView
            termValue={row.primaryAccession}
            linkTo={generatePath(LocationToPath[Location.UniProtKBEntry], {
              accession: row.primaryAccession,
            })}
          />
        </>
      ),
    },
    {
      label: 'Protein name',
      render: (row: UniProtkbAPIModel) =>
        row.proteinDescription?.recommendedName?.fullName.value,
    },
    {
      label: 'Organism',
      render: (row: UniProtkbAPIModel) =>
        row.organism && <TaxonomyView data={row.organism} />,
    },
    {
      label: 'Length',
      render: (row: UniProtkbAPIModel) => row.sequence?.length,
    },
  ];

  const membersURL = getAccessionsURL(memberList, {
    facets: [],
    columns,
  });
  const { loading, data, error } = useDataApi<{
    results: UniProtkbAPIModel[];
  }>(membersURL);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message level="failure">{error?.message}</Message>;
  }
  if (!data) {
    return null;
  }

  const { results } = data;

  return (
    <DataTable
      data={results}
      columns={columnConfig}
      getIdKey={(row: UniProtkbAPIModel) => row.primaryAccession}
      density={DENSITY_COMPACT}
    />
  );
  //   <table>
  //     <tbody>
  //       {/* Note: move following to its own component  */}
  //       {row.members
  //         ?.filter(
  //           (member) => member !== representativeId
  //         )
  //         .map((member) => (
  //           <tr key={member}>
  //             <td>
  //               <Link
  //                 to={generatePath(
  //                   LocationToPath[
  //                     Location.UniProtKBEntry
  //                   ],
  //                   {
  //                     accession: member,
  //                   }
  //                 )}
  //               >
  //                 {member}
  //               </Link>
  //             </td>
  //           </tr>
  //         ))}
  //       {row.members &&
  //         row.memberCount > row.members?.length && (
  //           <li>{row.memberCount} more</li>
  //         )}
  //     </tbody>
  //   </table>
};

export default SimilarProteinsTable;
