import { FC } from 'react';
import { v1 } from 'uuid';
import { SubcellularLocationComment } from '../../types/commentTypes';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import { TextView } from './FreeTextView';

const SubcellularLocationView: FC<{
  comments?: SubcellularLocationComment[];
}> = ({ comments }) => {
  if (!comments || !comments.length) {
    return null;
  }
  return (
    <>
      {comments.map(
        (subcellData) =>
          subcellData.subcellularLocations && (
            <section
              className="text-block"
              key={subcellData.molecule ? subcellData.molecule : v1()}
            >
              <h3>{subcellData.molecule}</h3>
              {subcellData.subcellularLocations.map((subcellularLocation) => (
                <div
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
