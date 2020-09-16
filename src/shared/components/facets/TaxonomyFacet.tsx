import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import qs from 'query-string';

import SlidingPanel from '../layouts/SlidingPanel';
import Field from '../../../uniprotkb/components/query-builder/Field';
import AdvancedSearchContainer from '../../../uniprotkb/components/query-builder/AdvancedSearchContainer';

import { dataType, itemType } from '../../../uniprotkb/types/searchTypes';

// const TaxRE = /taxonomy_id:"(\d+)"/g
// const parse = (string: string) => {

//   const parsed = qs.parse(string);

//   if (!parsed.query) {
//     return parsed;
//   }

//   const query = (parsed.query || '').split()
// }

const field = {
  id: 'id_taxonomy',
  label: 'Taxonomy [OC]',
  term: 'taxonomy',
  itemType: itemType.single,
  dataType: dataType.string,
  autoComplete: '/uniprot/api/suggester?dict=taxonomy&query=?',
  description: 'Search by NCBI taxonomy',
  example: 'human',
  termSuffix: true,
};

const TaxonomyFacet: FC = () => {
  const location = useLocation();

  const [displayPanel, setDisplayPanel] = useState(false);

  console.log(location.search);

  // const search = parse(location.search);

  // console.log(search.query);

  // copy structure of Franklin's facets
  return (
    <>
      {displayPanel && (
        <SlidingPanel position="right">
          {/* <ResultDownload
              onToggleDisplay={() =>
                setDisplayPanel(!displayPanel)
              }
            /> */}
          panel
          <Field
            field={field}
            handleInputChange={(value, id) => console.log(value, id)}
          />
          <AdvancedSearchContainer />
        </SlidingPanel>
      )}
      <div className="facets">
        <ul className="no-bullet">
          <li>
            <div className="facet-name">Taxonomy</div>
            <ul className="expandable-list no-bullet">
              <li>
                <a>Homo Sapiens</a>
              </li>
              <li>
                <button
                  className="button tertiary expandable-list__action"
                  type="button"
                  onClick={() =>
                    setDisplayPanel((displayPanel) => !displayPanel)
                  }
                >
                  Add filter
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default TaxonomyFacet;
