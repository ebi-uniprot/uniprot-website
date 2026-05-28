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
import { type Evidence } from '../../../uniprotkb/types/modelTypes';
import { type UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import EntrySection from '../../types/subEntrySection';
import { getXrefId } from '../../utils/uniparcXref';
import { type DataDBModel } from '../entry/XRefsSection';

const getTemplateMap = (dataDB?: DataDBModel) =>
  new Map(dataDB?.map((db) => [db.displayName, db.uriLink]));

const SubEntrySequenceSection = ({
  uniparcData,
}: {
  uniparcData?: UniParcSubEntryUIModel;
}) => {
  const history = useHistory();

  const sourceDatabases = uniparcData?.subEntry.properties?.filter(
    (property) => property.key === 'sources'
  );
  const sourceXref = uniparcData?.subEntry.source;

  const dataDB = useDataApi<DataDBModel>(
    sourceDatabases?.length || sourceXref?.database
      ? apiUrls.configure.allDatabases(Namespace.uniparc)
      : undefined
  );
  const templateMap = useMemo(() => getTemplateMap(dataDB.data), [dataDB.data]);

  const sequence = uniparcData?.entry[EntrySection.Sequence];
  if (!uniparcData || !hasContent(uniparcData) || !sequence) {
    return null;
  }

  if (dataDB.loading) {
    return <Loader />;
  }

  const sourceDB = sourceXref?.database;
  const sourceId = sourceXref?.id;
  const sourceTemplate = sourceDB && templateMap.get(sourceDB);
  const sourceContent =
    sourceDB && sourceTemplate && sourceId ? (
      <ExternalLink
        url={sourceTemplate.replace('%id', getXrefId(sourceId, sourceDB))}
      >
        {sourceDB}
      </ExternalLink>
    ) : (
      sourceDB
    );

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
      content: sourceContent,
    },
  ];

  const flagPredictions =
    uniparcData.unifire?.predictions.filter(
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
                    // eslint-disable-next-line @eslint-react/no-array-index-key
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
        accession={uniparcData.entry.uniParcId}
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
            id = getXrefId(id, sourceDB);
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
