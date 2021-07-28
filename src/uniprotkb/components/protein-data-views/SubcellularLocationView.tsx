import { FC } from 'react';

import { TextView } from './FreeTextView';

import { SubcellularLocationComment } from '../../types/commentTypes';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

const getSwissBioPicLocationId = (id: string) => `${id.replace('-', '')}term`;

const SubcellularLocationView: FC<{
  comments?: SubcellularLocationComment[];
}> = ({ comments }) => {
  if (!comments?.length) {
    return null;
  }
  return (
    <div id="uniprotSubcellText">
      {comments.map(
        (subcellData, index) =>
          subcellData.subcellularLocations && (
            <section className="text-block" key={subcellData.molecule || index}>
              <h3>{subcellData.molecule}</h3>
              {subcellData.subcellularLocations.map(
                ({ location, topology }) => (
                  <div
                    // id is used in the case that this component is used in conjunction
                    // with @swissprot/swissbiopics-visualizer
                    id={location.id && getSwissBioPicLocationId(location.id)}
                    key={`${location.value}${topology?.value}`}
                  >
                    <strong>{location.value}</strong>{' '}
                    {location.evidences && (
                      <UniProtKBEvidenceTag evidences={location.evidences} />
                    )}
                    {topology && (
                      <>
                        {`; ${topology.value} `}
                        {topology.evidences && (
                          <UniProtKBEvidenceTag
                            evidences={topology.evidences}
                          />
                        )}
                      </>
                    )}
                  </div>
                )
              )}
              {subcellData.note && (
                <TextView comments={subcellData.note.texts} />
              )}
            </section>
          )
      )}
    </div>
  );
};

export default SubcellularLocationView;
