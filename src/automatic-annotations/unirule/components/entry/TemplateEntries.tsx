import { Fragment } from 'react';

import AccessionView from '../../../../shared/components/results/AccessionView';

import { pluralise } from '../../../../shared/utils/utils';
import listFormat from '../../../../shared/utils/listFormat';

import { Namespace } from '../../../../shared/types/namespaces';
import { Information } from '../../../shared/model';

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
