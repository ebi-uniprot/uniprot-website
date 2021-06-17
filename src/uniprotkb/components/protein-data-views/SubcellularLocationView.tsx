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
    <>
      {comments.map(
        (subcellData, index) =>
          subcellData.subcellularLocations && (
            <section className="text-block" key={subcellData.molecule || index}>
              <h3>{subcellData.molecule}</h3>
              {subcellData.subcellularLocations.map((subcellularLocation) => (
                <div
                  // id is used in the case that this component is used in conjunction
                  // with @swissprot/swissbiopics-visualizer
                  id={
                    subcellularLocation.location.id &&
                    getSwissBioPicLocationId(subcellularLocation.location.id)
                  }
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
    </>
  );
};

export default SubcellularLocationView;
