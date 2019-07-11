import React, { FC } from 'react';
import idx from 'idx';
import { SwissProtIcon, TremblIcon } from 'franklin-sites';
import {
  UniProtkbAPIModel,
  EntryType,
} from '../../../model/uniprotkb/UniProtkbConverter';
import './styles/UniProtCard.scss';
import { Link } from 'react-router-dom';

const UniProtCard: FC<{ data: UniProtkbAPIModel }> = ({ data }) => {
  const recommendedName = idx(
    data,
    _ => _.proteinDescription.recommendedName.fullName.value
  );
  const organismName = idx(data, _ => _.organism.scientificName);
  return (
    <div className="uniprot-card">
      <h5>
        {data.entryType === EntryType.SWISSPROT ? (
          <span className="uniprot-card__status icon--reviewed">
            <SwissProtIcon />
          </span>
        ) : (
          <span className="uniprot-card__status icon--unreviewed">
            <TremblIcon />
          </span>
        )}
        <Link to={`/uniprotkb/${data.primaryAccession}`}>
          {data.primaryAccession}
        </Link>{' '}
        {data.uniProtId}
      </h5>
      <p>
        {recommendedName} <a href="#">{organismName}</a>
      </p>
      <p className="uniprot-card__comment">
        {data.comments &&
          data.comments.map(
            comment => comment.texts && comment.texts.map(text => text.value)
          )}
      </p>
    </div>
  );
};

export default UniProtCard;
