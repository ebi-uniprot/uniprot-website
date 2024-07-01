import { Card, LongNumber, Sequence } from 'franklin-sites';

import SimpleSequence from '../../../shared/components/simple-sequence/SimpleSequence';

import { hasContent } from '../../../shared/utils/utils';
import { getEntrySectionNameAndId } from '../../utils/entrySection';

import EntrySection from '../../types/entrySection';
import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import { useMediumScreen } from '../../../shared/hooks/useMatchMedia';

const SubEntrySequenceSection = ({
  data,
}: {
  data?: UniParcSubEntryUIModel;
  isCollapsible?: boolean;
}) => {
  console.log(data);
  if (!data || !hasContent(data) || !data.entry[EntrySection.Sequence]) {
    return null;
  }

  const sequence = data.entry[EntrySection.Sequence];

  const mediumScreen = useMediumScreen();

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
      title: <span data-article-id="checksum">Checksum</span>,
      content: sequence.crc64,
    },
    {
      title: 'Source',
      content: data.subEntry.source?.database,
    },
  ];

  return (
    <Card
      header={<h2>{getEntrySectionNameAndId(EntrySection.Sequence).name}</h2>}
      id={EntrySection.Sequence}
    >
      <Sequence
        sequence={sequence.value}
        infoData={infoData}
        isCollapsible={
          mediumScreen
            ? sequence.value.length > 200
            : sequence.value.length > 400
        }
      />
    </Card>
  );
};

export default SubEntrySequenceSection;
