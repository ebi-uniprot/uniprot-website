import { Fragment } from 'react';
import { ExpandableList } from 'franklin-sites';

import ExternalLink from '../../../shared/components/ExternalLink';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import externalUrls from '../../../shared/config/externalUrls';

import { GoTerm } from '../../adapters/functionConverter';

const GOTermsView = ({ data }: { data: GoTerm[] }) => (
  <section className="text-block">
    <ExpandableList descriptionString="terms">
      {data.map(
        ({ id, evidences, termDescription }) =>
          id && (
            <Fragment key={id}>
              <ExternalLink url={externalUrls.QuickGO(id)}>
                {termDescription}
              </ExternalLink>
              {/* TODO: currently not displaying the GoEvidenceType property
        which will have to be displayed like an evidence tag */}
              {evidences && <UniProtKBEvidenceTag evidences={evidences} />}
            </Fragment>
          )
      )}
    </ExpandableList>
  </section>
);

export default GOTermsView;
