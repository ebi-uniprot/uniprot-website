import cn from 'classnames';
import { ExpandableList } from 'franklin-sites';
import { Fragment, HTMLAttributes } from 'react';

import ExternalLink from '../../../shared/components/ExternalLink';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import { getUrlFromDatabaseInfo } from '../../../shared/utils/xrefs';
import { GoTerm } from '../../adapters/functionConverter';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

type Props = { data: GoTerm[] } & HTMLAttributes<HTMLDivElement>;

const GOTermsView = ({ data, className, ...props }: Props) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
  return (
    <section className={cn('text-block', className)} {...props}>
      <ExpandableList descriptionString="terms">
        {data.map(
          ({ id, evidences, termDescription }) =>
            id && (
              <Fragment key={id}>
                <ExternalLink
                  url={getUrlFromDatabaseInfo(databaseInfoMaps, 'GO', { id })}
                >
                  {termDescription}
                </ExternalLink>
                {/* TODO: currently not displaying the GoEvidenceType property
        which will have to be displayed like an evidence tag */}
                <UniProtKBEvidenceTag evidences={evidences} />
              </Fragment>
            )
        )}
      </ExpandableList>
    </section>
  );
};
export default GOTermsView;
