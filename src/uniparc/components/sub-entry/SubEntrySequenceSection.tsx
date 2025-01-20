import { Card, LongNumber, Sequence } from 'franklin-sites';

import { hasContent } from '../../../shared/utils/utils';

import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';

import EntrySection from '../../types/subEntry';
import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';

import helper from '../../../shared/styles/helper.module.scss';

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
      <Sequence sequence={sequence.value} infoData={infoData} />
    </Card>
  );
};

export default SubEntrySequenceSection;
