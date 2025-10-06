import { Card, InfoList, LongNumber, Sequence } from 'franklin-sites';
import { Fragment } from 'react/jsx-runtime';
import { useHistory } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import { uniParcTools } from '../../../shared/components/common-sequence/CommonSequenceView';
import helper from '../../../shared/styles/helper.module.scss';
import { hasContent } from '../../../shared/utils/utils';
import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';
import { Evidence } from '../../../uniprotkb/types/modelTypes';
import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import EntrySection from '../../types/subEntrySection';

const SubEntrySequenceSection = ({
  data,
}: {
  data?: UniParcSubEntryUIModel;
}) => {
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

  const sourceDatabases = data.subEntry.properties?.filter(
    (property) => property.key === 'sources'
  );

  const flagPredictions =
    data.unifire?.predictions.filter(
      (p) => p.annotationType === 'protein.flag'
    ) || [];

  return (
    <Card
      header={<h2>{entrySectionToLabel[EntrySection.Sequence]}</h2>}
      id={EntrySection.Sequence}
    >
      {flagPredictions.length ? (
        <InfoList
          infoData={[
            {
              title: (
                <span data-article-id="sequence_status">Sequence status</span>
              ),
              content: (
                <div>
                  {flagPredictions.map((p, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={index}>
                      {p.annotationValue}
                      <UniProtKBEvidenceTag
                        evidences={p.evidence as Evidence[]}
                      />
                    </Fragment>
                  ))}
                </div>
              ),
            },
          ]}
        />
      ) : null}
      <Sequence
        accession={data.entry.uniParcId}
        sequence={sequence.value}
        infoData={infoData}
        onBlastClick={() =>
          history.push(LocationToPath[Location.Blast], {
            parameters: { sequence: sequence.value },
          })
        }
        sequenceTools={uniParcTools}
      />
      {sourceDatabases?.length ? (
        <>
          <h3>External sources</h3>

          {sourceDatabases?.map((source) => {
            // EMBL:AC12345:UP000005640:Chromosome
            // TODO when we get sourceDB info from the payload
            // uncomment the following and point to the right external URL
            // const sourceDB = source.value.split(':')[0];
            // const sourceID = source.value.split(':')[1];
            // return <InfoList infoData={[
            // {
            // title: sourceDB,
            // content: <a href={`https://example.com/${sourceID}`}>{sourceID}</a>,
            // }]} />
            const sourceID = source.value.split(':')[0];
            return <div key={sourceID}>{sourceID}</div>;
          })}
        </>
      ) : null}
    </Card>
  );
};

export default SubEntrySequenceSection;
