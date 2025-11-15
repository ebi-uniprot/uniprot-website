import {
  Card,
  ExternalLink,
  InfoList,
  Loader,
  LongNumber,
  Sequence,
} from 'franklin-sites';
import { useMemo } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { useHistory } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import { uniParcTools } from '../../../shared/components/common-sequence/CommonSequenceView';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import helper from '../../../shared/styles/helper.module.scss';
import { Namespace } from '../../../shared/types/namespaces';
import { hasContent } from '../../../shared/utils/utils';
import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';
import { Evidence } from '../../../uniprotkb/types/modelTypes';
import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import EntrySection from '../../types/subEntrySection';
import { DataDBModel } from '../entry/XRefsSection';

const getTemplateMap = (dataDB?: DataDBModel) =>
  new Map(dataDB?.map((db) => [db.displayName, db.uriLink]));

const SubEntrySequenceSection = ({
  data,
}: {
  data?: UniParcSubEntryUIModel;
}) => {
  const history = useHistory();

  const dataDB = useDataApi<DataDBModel>(
    apiUrls.configure.allDatabases(Namespace.uniparc)
  );
  const templateMap = useMemo(() => getTemplateMap(dataDB.data), [dataDB.data]);

  const sequence = data?.entry[EntrySection.Sequence];
  if (!data || !hasContent(data) || !sequence) {
    return null;
  }

  if (dataDB.loading || !dataDB.data) {
    return <Loader />;
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
                        evidences={p.evidence as unknown as Evidence[]}
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
            const [sourceDB, sourceID] = source.value.split(':');

            const template = sourceDB && templateMap.get(sourceDB);
            let id = sourceID;
            // NOTE: exception for FusionGDB we need to remove the underscore number
            if (sourceDB === 'FusionGDB') {
              id = id.replace(/_\d+$/, '');
            }
            const content = template ? (
              <ExternalLink url={template.replace('%id', id)}>
                {sourceID}
              </ExternalLink>
            ) : (
              sourceID
            );
            return (
              <InfoList
                key={sourceDB}
                infoData={[
                  {
                    title: sourceDB,
                    content: content,
                  },
                ]}
              />
            );
          })}
        </>
      ) : null}
    </Card>
  );
};

export default SubEntrySequenceSection;
