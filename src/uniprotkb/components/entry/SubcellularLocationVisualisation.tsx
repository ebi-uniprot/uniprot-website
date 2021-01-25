import { FC, useEffect, useRef } from 'react';
import useCustomElement from '../../../shared/hooks/useCustomElement';
import useSafeState from '../../../shared/hooks/useSafeState';
import '@swissprot/swissbiopics-visualizer';
import { OrganismData } from '../../adapters/namesAndTaxonomyConverter';
import { UIModel } from '../../adapters/sectionConverter';
import {
  CommentType,
  SubcellularLocationComment,
} from '../../types/commentTypes';

const reSL = /SL-(\d+)/;

const getSubcelluarLocationId = (id: string) => {
  const match = id.match(reSL);
  if (match?.[1]) {
    return match[1];
  }
};

const SubcellularLocationVisualisation: FC<{
  locations: SubcellularLocationComment[];
  taxonId: OrganismData['taxonId'];
  lineage: OrganismData['lineage'];
}> = ({ locations, taxonId, lineage }): JSX.Element | null => {
  // const [ceLoaded, setCELoaded] = useSafeState(false);

  // const ceDefined = useCustomElement(
  //   /* istanbul ignore next */
  //   () =>
  //     import(
  //       /* webpackChunkName: "swissbiopics-visualizer" */ '@swissprot/swissbiopics-visualizer'
  //     ),
  //   'sib-swissbiopics-sl'
  // );

  // console.log(ceDefined);

  // if (!ceDefined) {
  //   return null;
  // }

  // useEffect(() => {
  //   import('@swissprot/swissbiopics-visualizer').then(
  //     () => setCELoaded(true),
  //     // eslint-disable-next-line no-console
  //     (error) => console.error(error)
  //   );
  // }, [setCELoaded]);

  // if (!ceLoaded) {
  //   return null;
  // }

  // TODO: https://stackoverflow.com/questions/43836886/failed-to-construct-customelement-error-when-javascript-file-is-placed-in-head
  console.log(locations);
  const sls = locations.flatMap(({ subcellularLocations }) =>
    subcellularLocations
      ?.flatMap(({ location }) => getSubcelluarLocationId(location.id))
      .filter(Boolean)
      .join(',')
  );
  console.log(sls);
  // Note that SLS is the cellular location id eg https://www.uniprot.org/locations/491
  const ref = useRef(null);
  useEffect(() => {
    ref.current.innerHTML = `<sib-swissbiopics-sl taxid="${taxonId}" sls="${sls}" />
      <template id="sibSwissBioPicsStyle">
      <style>
        ul > li > a {
          font-style: oblique;
        }
        ul.notpresent li {
          display: none;
        }
        ul.subcell_present li::before {
          content: none; 
        }
        ul.subcell_present li {
          background: inherit;
        }
        ul.subcell_present li:hover {
          background: lightblue;
        }


      </style>
    </template>
    <template id="sibSwissBioPicsSlLiItem">
      <li class="subcellular_location">
        <a class="subcell_name"></a>
        <span class="subcell_description"></span>
      </li>
    </template>
      `;
  }, [sls, taxonId]);

  return <div ref={ref} />;
};

export default SubcellularLocationVisualisation;
