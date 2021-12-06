import { Fragment, FC } from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import {
  ProteinNames,
  ProteinNamesData,
  ProteinDescription,
} from '../../adapters/namesAndTaxonomyConverter';
import { ValueWithEvidence } from '../../types/modelTypes';

export const NameWithEvidence = ({ data }: { data: ValueWithEvidence }) => (
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
  noEvidence?: boolean;
}> = ({ names, noEvidence = false }) => {
  if (!names) {
    return null;
  }
  return (
    <>
      {noEvidence ? (
        `${names.fullName.value}`
      ) : (
        <NameWithEvidence data={names.fullName} />
      )}
      {names.shortNames && (
        <>
          {' ('}
          {names.shortNames.map(
            (shortName, index): JSX.Element => (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={index}>
                {index > 0 && '; '}
                {noEvidence ? (
                  `${shortName.value}`
                ) : (
                  <NameWithEvidence data={shortName} />
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
  noEvidence?: boolean;
}> = ({ ecNumbers, noEvidence = false }) => (
  <>
    {ecNumbers?.map((ecNumber, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        {noEvidence ? ecNumber.value : <NameWithEvidence data={ecNumber} />}
      </Fragment>
    ))}
  </>
);

const getInfoListForNames = (
  name: ProteinNames,
  noEvidence: boolean
): { title: string; content: JSX.Element }[] => {
  const infoData = [];

  if (name.fullName) {
    infoData.push({
      title: 'Recommended name',
      content: noEvidence ? (
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
        <ECNumbersView ecNumbers={name.ecNumbers} noEvidence={noEvidence} />
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
                {noEvidence ? (
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
  noEvidence?: boolean;
  noTitles?: boolean;
};

const ProteinNamesView = ({
  proteinNames,
  noEvidence = false,
  noTitles = false,
}: ProteinNamesViewProps) => {
  if (!proteinNames) {
    return null;
  }
  let infoData: { title: string; content: JSX.Element }[] = [];
  if (proteinNames.recommendedName) {
    infoData = getInfoListForNames(proteinNames.recommendedName, noEvidence);
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
              noEvidence={noEvidence}
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
              noEvidence={noEvidence}
            />
          ))}
        </ExpandableList>
      ),
    });
  }
  if (proteinNames.biotechName) {
    infoData.push({
      title: 'Biotech name',
      content: noEvidence ? (
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
              {noEvidence ? (
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
              {noEvidence ? innName.value : <NameWithEvidence data={innName} />}
            </Fragment>
          ))}
        </ExpandableList>
      ),
    });
  }

  return (
    <InfoList
      infoData={infoData}
      isCompact={noEvidence}
      highlightFirstItem={noEvidence}
      noTitles={noTitles}
    />
  );
};

export default ProteinNamesView;
