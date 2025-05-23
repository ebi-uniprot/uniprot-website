import { Card, LongNumber, Sequence } from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import { applicableTools } from '../../../shared/components/common-sequence/CommonSequenceSection';
import helper from '../../../shared/styles/helper.module.scss';
import { Namespace } from '../../../shared/types/namespaces';
import { hasContent } from '../../../shared/utils/utils';
import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import EntrySection from '../../types/subEntrySection';

function SubEntrySequenceSection({ data }: { data?: UniParcSubEntryUIModel }) {
  const history = useHistory();

  const sequence = data?.entry[EntrySection.Sequence];
  if (!data || !hasContent(data) || !sequence) {
    return null;
  }
  const infoData = [
    {
      title: 'Length',
      content: sequence.length,
    },
    {
      title: 'Mass (Da)',
      content: <LongNumber>{sequence.molWeight}</LongNumber>,
    },
    {
      title: <span data-article-id="checksum">MD5 Checksum</span>,
      content: <span className={helper['break-anywhere']}>{sequence.md5}</span>,
    },
    {
      title: 'Source',
      content: data.subEntry.source?.database, // TODO: add external link
    },
  ];

  return (
    <Card
      header={<h2>{entrySectionToLabel[EntrySection.Sequence]}</h2>}
      id={EntrySection.Sequence}
    >
      <Sequence
        accession={data.entry.uniParcId}
        sequence={sequence.value}
        infoData={infoData}
        onBlastClick={() =>
          history.push(LocationToPath[Location.Blast], {
            parameters: { sequence: sequence.value },
          })
        }
        sequenceTools={applicableTools[Namespace.uniparc]}
      />
    </Card>
  );
}

export default SubEntrySequenceSection;
