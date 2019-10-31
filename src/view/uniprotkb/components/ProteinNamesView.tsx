import React, { Fragment } from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';
import { v1 } from 'uuid';
import {
  ProteinNames,
  ProteinNamesData,
  ProteinDescription,
} from '../../../model/uniprotkb/sections/NamesAndTaxonomyConverter';
import UniProtEvidenceTag from '../../../components/UniProtEvidenceTag';
import { ValueWithEvidence } from '../../../model/types/modelTypes';

const NameWithEvidence: React.FC<{ data: ValueWithEvidence }> = ({
  data,
}): JSX.Element => (
  <Fragment>
    {`${data.value} `}
    {data.evidences && <UniProtEvidenceTag evidences={data.evidences} />}
  </Fragment>
);

const ProteinNamesViewFlat: React.FC<{
  names?: ProteinNames;
  includeEvidence?: boolean;
}> = ({ names, includeEvidence = false }): JSX.Element | null => {
  if (!names) {
    return null;
  }
  return (
    <Fragment>
      {includeEvidence ? (
        <NameWithEvidence data={names.fullName} />
      ) : (
        `${names.fullName.value}`
      )}
      {names.shortNames && (
        <Fragment>
          {' ('}
          {names.shortNames.map(
            (shortName, index): JSX.Element => (
              <Fragment key={v1()}>
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
        </Fragment>
      )}
    </Fragment>
  );
};

const ProteinDescriptionView: React.FC<{
  proteinDescription?: ProteinDescription;
}> = ({ proteinDescription }): JSX.Element | null => {
  if (!proteinDescription) {
    return null;
  }
  return (
    <Fragment>
      <ProteinNamesViewFlat names={proteinDescription.recommendedName} />
      {proteinDescription.alternativeNames && (
        <Fragment>
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
        </Fragment>
      )}
    </Fragment>
  );
};

const getInfoListForNames = (
  name: ProteinNames,
  isCompact: boolean
): { title: string; content: JSX.Element }[] => {
  const infoData = [];

  if (name.fullName) {
    infoData.push({
      title: 'Recommended name',
      content: isCompact ? (
        <Fragment>{name.fullName.value}</Fragment>
      ) : (
        <NameWithEvidence data={name.fullName} />
      ),
    });
  }
  if (name.ecNumbers) {
    infoData.push({
      title: 'EC number',
      content: (
        <Fragment>
          {name.ecNumbers.map(
            (ecNumber): JSX.Element =>
              isCompact ? (
                <Fragment key={v1()}>{ecNumber.value}</Fragment>
              ) : (
                <NameWithEvidence data={ecNumber} key={v1()} />
              )
          )}
        </Fragment>
      ),
    });
  }
  if (name.shortNames) {
    infoData.push({
      title: 'Short names',
      content: (
        <Fragment>
          {name.shortNames.map(
            (shortName, i): JSX.Element => (
              <Fragment key={v1()}>
                {i > 0 && '; '}
                {isCompact ? (
                  shortName.value
                ) : (
                  <NameWithEvidence data={shortName} />
                )}
              </Fragment>
            )
          )}
        </Fragment>
      ),
    });
  }
  return infoData;
};

type ListElement = {
  id: string;
  content: JSX.Element;
};

const ProteinNamesView: React.FC<{
  proteinNames?: ProteinNamesData;
  isCompact?: boolean;
}> = ({ proteinNames, isCompact = false }): JSX.Element | null => {
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
          {proteinNames.alternativeNames.map(
            (alternativeName): ListElement => ({
              id: v1(),
              content: (
                <ProteinNamesViewFlat
                  names={alternativeName}
                  includeEvidence={!isCompact}
                />
              ),
            })
          )}
        </ExpandableList>
      ),
    });
  }
  if (proteinNames.contains) {
    infoData.push({
      title: `Cleaved into ${proteinNames.contains.length} chains`,
      content: (
        <ExpandableList descriptionString="chains">
          {proteinNames.contains.map(
            (contains): ListElement => ({
              id: v1(),
              content: <ProteinDescriptionView proteinDescription={contains} />,
            })
          )}
        </ExpandableList>
      ),
    });
  }
  if (proteinNames.submissionNames) {
    infoData.push({
      title: 'Submission names',
      content: (
        <ExpandableList descriptionString="submission names">
          {proteinNames.submissionNames.map(
            (submission): ListElement => ({
              id: v1(),
              content: (
                <ProteinNamesViewFlat
                  names={submission}
                  includeEvidence={!isCompact}
                />
              ),
            })
          )}
        </ExpandableList>
      ),
    });
  }
  if (proteinNames.biotechName) {
    infoData.push({
      title: 'Biotech name',
      content: isCompact ? (
        <Fragment>{proteinNames.biotechName.value}</Fragment>
      ) : (
        <NameWithEvidence data={proteinNames.biotechName} />
      ),
    });
  }

  if (proteinNames.cdAntigenNames) {
    infoData.push({
      title: 'CD Antigen Name',
      content: isCompact ? (
        <Fragment>{proteinNames.cdAntigenNames.value}</Fragment>
      ) : (
        <NameWithEvidence data={proteinNames.cdAntigenNames} />
      ),
    });
  }

  if (proteinNames.innNames) {
    infoData.push({
      title: 'INN Name',
      content: isCompact ? (
        <Fragment>{proteinNames.innNames.value}</Fragment>
      ) : (
        <NameWithEvidence data={proteinNames.innNames} />
      ),
    });
  }

  return (
    <InfoList
      infoData={infoData}
      isCompact={isCompact}
      highlightFirstItem={isCompact}
    />
  );
};

export default ProteinNamesView;
