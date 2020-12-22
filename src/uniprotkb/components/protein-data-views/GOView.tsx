import { Fragment, FC } from 'react';
import { ExpandableList } from 'franklin-sites';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import externalUrls from '../../../shared/config/externalUrls';

import { GoTerm, GroupedGoTerms } from '../../adapters/functionConverter';

export const GOTermsView: FC<{ data: GoTerm[] }> = ({ data }) => (
  <section className="text-block">
    <ExpandableList descriptionString="terms">
      {data
        .filter(({ id }) => id)
        .map(
          ({ id, evidences, termDescription }) =>
            id && (
              <Fragment key={id}>
                <a href={externalUrls.QuickGO(id)}>{termDescription}</a>
                {/* TODO: currently not displaying the GoEvidenceType property
        which will have to be displayed like an evidence tag */}
                {evidences && <UniProtKBEvidenceTag evidences={evidences} />}
              </Fragment>
            )
        )}
    </ExpandableList>
  </section>
);

const GOView: FC<{ data: GroupedGoTerms }> = ({ data }) => (
  <>
    {Array.from(data.entries()).map(([aspect, terms]) => (
      <section className="text-block" key={aspect}>
        <h4>{aspect}</h4>
        {terms && <GOTermsView data={terms} />}
      </section>
    ))}
  </>
);

export default GOView;
