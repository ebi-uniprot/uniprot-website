import { Card, LongNumber, Sequence } from 'franklin-sites';
import { useNavigate } from 'react-router';

import { Location, LocationToPath } from '../../../app/config/urls';
import { uniParcTools } from '../../../shared/components/common-sequence/CommonSequenceView';
import helper from '../../../shared/styles/helper.module.scss';
import { hasContent } from '../../../shared/utils/utils';
import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import EntrySection from '../../types/subEntrySection';

function SubEntrySequenceSection({ data }: { data?: UniParcSubEntryUIModel }) {
  const navigate = useNavigate();

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
          navigate(LocationToPath[Location.Blast], {
            state: {
              parameters: { sequence: sequence.value },
            },
          })
        }
        sequenceTools={uniParcTools}
      />
    </Card>
  );
}

export default SubEntrySequenceSection;
