import { Fragment, FC } from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import {
  ProteinNames,
  ProteinNamesData,
  ProteinDescription,
} from '../../adapters/namesAndTaxonomyConverter';
import { ValueWithEvidence } from '../../types/modelTypes';

export const NameWithEvidence: FC<{ data: ValueWithEvidence }> = ({ data }) => (
  <>
    {data.value}
    {data.evidences && (
      <>
        {' '}
        <UniProtKBEvidenceTag evidences={data.evidences} />
      </>
    )}
  </>
);

const ProteinNamesViewFlat: FC<{
  names?: ProteinNames;
  includeEvidence?: boolean;
}> = ({ names, includeEvidence = false }) => {
  if (!names) {
    return null;
  }
  return (
    <>
      {includeEvidence ? (
        <NameWithEvidence data={names.fullName} />
      ) : (
        `${names.fullName.value}`
      )}
      {names.shortNames && (
        <>
          {' ('}
          {names.shortNames.map(
            (shortName, index): JSX.Element => (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={index}>
                {index > 0 && '; '}
                {includeEvidence ? (
                  <NameWithEvidence data={shortName} />
                ) : (
                  `${shortName.value}`
                )}
              </Fragment>
            )
          )}
          {') '}
        </>
      )}
    </>
  );
};

const ProteinDescriptionView: FC<{
  proteinDescription?: ProteinDescription;
}> = ({ proteinDescription }) => {
  if (!proteinDescription) {
    return null;
  }
  return (
    <>
      <ProteinNamesViewFlat names={proteinDescription.recommendedName} />
      {proteinDescription.alternativeNames && (
        <>
          {' '}
          <strong>Alternative names: </strong>
          {proteinDescription.alternativeNames.map(
            (alternativeName): JSX.Element => (
              <ProteinNamesViewFlat
                names={alternativeName}
                key={alternativeName.fullName.value}
              />
            )
          )}
        </>
      )}
    </>
  );
};

export const ECNumbersView: FC<{
  ecNumbers?: ValueWithEvidence[];
  isCompact?: boolean;
}> = ({ ecNumbers, isCompact = false }) => (
  <>
    {ecNumbers?.map((ecNumber, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        {isCompact ? ecNumber.value : <NameWithEvidence data={ecNumber} />}
      </Fragment>
    ))}
  </>
);

const getInfoListForNames = (
  name: ProteinNames,
  isCompact: boolean
): { title: string; content: JSX.Element }[] => {
  const infoData = [];

  if (name.fullName) {
    infoData.push({
      title: 'Recommended name',
      content: isCompact ? (
        <>{name.fullName.value}</>
      ) : (
        <NameWithEvidence data={name.fullName} />
      ),
    });
  }
  if (name.ecNumbers) {
    infoData.push({
      title: 'EC number',
      content: (
        <ECNumbersView ecNumbers={name.ecNumbers} isCompact={isCompact} />
      ),
    });
  }
  if (name.shortNames) {
    infoData.push({
      title: 'Short names',
      content: (
        <>
          {name.shortNames.map(
            (shortName, i): JSX.Element => (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={i}>
                {i > 0 && '; '}
                {isCompact ? (
                  shortName.value
                ) : (
                  <NameWithEvidence data={shortName} />
                )}
              </Fragment>
            )
          )}
        </>
      ),
    });
  }
  return infoData;
};

type ProteinNamesViewProps = {
  proteinNames?: ProteinNamesData;
  isCompact?: boolean;
  noTitles?: boolean;
};

const ProteinNamesView = ({
  proteinNames,
  isCompact = false,
  noTitles = false,
}: ProteinNamesViewProps) => {
  if (!proteinNames) {
    return null;
  }
  let infoData: { title: string; content: JSX.Element }[] = [];
  if (proteinNames.recommendedName) {
    infoData = getInfoListForNames(proteinNames.recommendedName, isCompact);
  }
  if (proteinNames.alternativeNames) {
    infoData.push({
      title: 'Alternative names',
      content: (
        <ExpandableList descriptionString="alternative names">
          {proteinNames.alternativeNames.map((alternativeName, index) => (
            <ProteinNamesViewFlat
              key={index} // eslint-disable-line react/no-array-index-key
              names={alternativeName}
              includeEvidence={!isCompact}
            />
          ))}
        </ExpandableList>
      ),
    });
  }
  if (proteinNames.contains) {
    infoData.push({
      title: `Cleaved into ${proteinNames.contains.length} chains`,
      content: (
        <ExpandableList descriptionString="chains">
          {proteinNames.contains.map((contains, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ProteinDescriptionView key={index} proteinDescription={contains} />
          ))}
        </ExpandableList>
      ),
    });
  }
  if (proteinNames.submissionNames) {
    infoData.push({
      title: 'Submission names',
      content: (
        <ExpandableList descriptionString="submission names">
          {proteinNames.submissionNames.map((submission, index) => (
            <ProteinNamesViewFlat
              key={index} // eslint-disable-line react/no-array-index-key
              names={submission}
              includeEvidence={!isCompact}
            />
          ))}
        </ExpandableList>
      ),
    });
  }
  if (proteinNames.biotechName) {
    infoData.push({
      title: 'Biotech name',
      content: isCompact ? (
        <>{proteinNames.biotechName.value}</>
      ) : (
        <NameWithEvidence data={proteinNames.biotechName} />
      ),
    });
  }

  if (proteinNames.cdAntigenNames) {
    infoData.push({
      title: 'CD Antigen Name',
      content: (
        <ExpandableList descriptionString="CD antigen names">
          {proteinNames.cdAntigenNames.map((cdAntigenName, index) => (
            <Fragment
              key={index} // eslint-disable-line react/no-array-index-key
            >
              {isCompact ? (
                cdAntigenName.value
              ) : (
                <NameWithEvidence data={cdAntigenName} />
              )}
            </Fragment>
          ))}
        </ExpandableList>
      ),
    });
  }

  if (proteinNames.innNames) {
    infoData.push({
      title: 'INN Name',
      content: (
        <ExpandableList descriptionString="INN names">
          {proteinNames.innNames.map((innName, index) => (
            <Fragment
              key={index} // eslint-disable-line react/no-array-index-key
            >
              {isCompact ? innName.value : <NameWithEvidence data={innName} />}
            </Fragment>
          ))}
        </ExpandableList>
      ),
    });
  }

  return (
    <InfoList
      infoData={infoData}
      isCompact={isCompact}
      highlightFirstItem={isCompact}
      noTitles={noTitles}
    />
  );
};

export default ProteinNamesView;
