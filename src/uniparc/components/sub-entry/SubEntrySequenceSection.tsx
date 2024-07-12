import { Card, LongNumber, Sequence } from 'franklin-sites';

import { hasContent } from '../../../shared/utils/utils';

import uniParcSubEntryConfig from '../../config/UniParcSubEntryConfig';

import EntrySection from '../../types/subEntry';
import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';

const SubEntrySequenceSection = ({
  data,
}: {
  data?: UniParcSubEntryUIModel;
}) => {
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
      title: <span data-article-id="checksum">Checksum</span>,
      content: sequence.crc64,
    },
    {
      title: 'Source',
      content: data.subEntry.source?.database, // TODO: add external link
    },
  ];

  return (
    <Card
      header={<h2>{uniParcSubEntryConfig[EntrySection.Sequence].label}</h2>}
      id={EntrySection.Sequence}
    >
      <Sequence sequence={sequence.value} infoData={infoData} />
    </Card>
  );
};

export default SubEntrySequenceSection;
