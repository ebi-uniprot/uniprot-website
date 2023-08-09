import { Fragment, HTMLAttributes } from 'react';
import { ExpandableList } from 'franklin-sites';
import cn from 'classnames';

import ExternalLink from '../../../shared/components/ExternalLink';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import externalUrls from '../../../shared/config/externalUrls';

import { GoTerm } from '../../adapters/functionConverter';

type Props = { data: GoTerm[] } & HTMLAttributes<HTMLDivElement>;

const GOTermsView = ({ data, className, ...props }: Props) => (
  <section className={cn('text-block', className)} {...props}>
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
