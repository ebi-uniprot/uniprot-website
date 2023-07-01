import { Link } from 'react-router-dom';
import { LocationPinIcon } from 'franklin-sites';

import { TextView } from './FreeTextView';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import { getEntryPath } from '../../../app/config/urls';

import { SubcellularLocationComment } from '../../types/commentTypes';
import { Namespace } from '../../../shared/types/namespaces';

import './styles/sub-cell-viz.scss';

const getSwissBioPicLocationId = (id: string) => `${id.replace('-', '')}term`;

type Props = { comments?: SubcellularLocationComment[] };

const SubcellularLocationView = ({ comments }: Props) => {
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
              {subcellData.subcellularLocations.map(
                ({ location, topology }) => (
                  <div
                    // id is used in the case that this component is used in conjunction
                    // with @swissprot/swissbiopics-visualizer
                    id={location.id && getSwissBioPicLocationId(location.id)}
                    key={`${location.value}${topology?.value}`}
                  >
                    <LocationPinIcon
                      className="sub-cell-viz__in-view-pin"
                      height="1em"
                    />
                    <strong>
                      {location.id ? (
                        <Link
                          to={getEntryPath(Namespace.locations, location.id)}
                        >
                          {location.value}
                        </Link>
                      ) : (
                        location.value
                      )}
                    </strong>{' '}
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
                <TextView comments={subcellData.note.texts}>Note: </TextView>
              )}
            </section>
          )
      )}
    </>
  );
};

export default SubcellularLocationView;
