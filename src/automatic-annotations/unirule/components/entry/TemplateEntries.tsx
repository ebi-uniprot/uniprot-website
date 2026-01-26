import { Fragment } from 'react';

import AccessionView from '../../../../shared/components/results/AccessionView';
import { Namespace } from '../../../../shared/types/namespaces';
import listFormat from '../../../../shared/utils/listFormat';
import { pluralise } from '../../../../shared/utils/utils';
import { type Information } from '../../../shared/model';

const TemplateEntries = ({
  entries,
}: {
  entries: Information['uniProtAccessions'];
}) => {
  if (!entries?.length) {
    return null;
  }

  return (
    <p>
      The annotation and conditions in this rule are derived from the following{' '}
      {pluralise('entry', entries.length, 'entries')}:{' '}
      {entries.map((entry, index) => (
        <Fragment key={entry}>
          {listFormat(index, entries)}
          <AccessionView id={entry} namespace={Namespace.uniprotkb} />
        </Fragment>
      ))}
    </p>
  );
};

export default TemplateEntries;
