import { FC, useEffect, useRef } from 'react';

import { TextView } from './FreeTextView';
import { OrganismData } from '../../adapters/namesAndTaxonomyConverter';

import { SubcellularLocationComment } from '../../types/commentTypes';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

enum Superkingdom {
  Viruses = 'Viruses',
}

const isVirus = ([superkingdom]: string[]) =>
  superkingdom === Superkingdom.Viruses;

const getSwissBioPicLocationId = (id: string) => `${id.replace('-', '')}term`;

const reSL = /SL-(\d+)/;

const getSubcelluarLocationId = (id: string) => {
  const match = id.match(reSL);
  if (match?.[1]) {
    return match[1];
  }
  return null;
};

const SubcellularLocationView: FC<{
  comments?: SubcellularLocationComment[];
  taxonId: OrganismData['taxonId'];
  lineage: OrganismData['lineage'];
}> = ({ comments, taxonId, lineage }) => {
  const ref = useRef(null);

  // TODO: injecting HTML because of the way the web component is implemented. See here for details: https://stackoverflow.com/questions/43836886/failed-to-construct-customelement-error-when-javascript-file-is-placed-in-head
  // TODO: reference colors directly?
  // TODO: the graphic top is an estimate but instead should be based on the size of the entry header
  useEffect(() => {
    const sls = comments?.flatMap(({ subcellularLocations }) =>
      subcellularLocations
        ?.flatMap(({ location }) => getSubcelluarLocationId(location.id))
        .filter(Boolean)
        .join(',')
    );
    if (lineage && taxonId && comments && !isVirus(lineage)) {
      ref.current.insertAdjacentHTML(
        'afterbegin',
        `<sib-swissbiopics-sl taxid="${taxonId}" sls="${sls}" contentid="swissBioPicsSlData"/>
      <template id="sibSwissBioPicsStyle">
        <style>
          #swissBioPicsSlData {
            grid-area: terms;
          }
          .lookedAt {
            background-color: #abc7d6 !important;          
            stroke: black !important;
            fill: #abc7d6 !important;
            fill-opacity: 1 !important;
          }
          #swissbiopic > svg {
            position: sticky;
            top: 4rem;
          }
       </style>
     </template>`
      );
    }
  }, [comments, lineage, taxonId, ref]);

  if (!comments || !comments.length) {
    return null;
  }

  return (
    <div id="swissviz" ref={ref}>
      <div id="swissBioPicsSlData">
        {comments.map(
          (subcellData, index) =>
            subcellData.subcellularLocations && (
              <section
                className="text-block"
                key={subcellData.molecule || index}
              >
                <h3>{subcellData.molecule}</h3>
                {/* <div id="SL0094term">Early endosome</div> */}
                {subcellData.subcellularLocations.map((subcellularLocation) => (
                  <div
                    id={getSwissBioPicLocationId(
                      subcellularLocation.location.id
                    )}
                    key={`${subcellularLocation.location.value}${
                      subcellularLocation.topology &&
                      subcellularLocation.topology.value
                    }`}
                  >
                    <strong>{subcellularLocation.location.value}</strong>{' '}
                    {subcellularLocation.location.evidences && (
                      <UniProtKBEvidenceTag
                        evidences={subcellularLocation.location.evidences}
                      />
                    )}
                    {subcellularLocation.topology && (
                      <>
                        {`: ${subcellularLocation.topology.value} `}
                        {subcellularLocation.topology.evidences && (
                          <UniProtKBEvidenceTag
                            evidences={subcellularLocation.topology.evidences}
                          />
                        )}
                      </>
                    )}
                  </div>
                ))}
                {subcellData.note && (
                  <TextView comments={subcellData.note.texts} />
                )}
              </section>
            )
        )}
      </div>
    </div>
  );
};

export default SubcellularLocationView;
