import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { InfoList, ExpandableList } from 'franklin-sites';

import ExternalLink from '../../../shared/components/ExternalLink';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import externalUrls from '../../../shared/config/externalUrls';

import { Location, LocationToPath } from '../../../app/config/urls';

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

type ProteinNamesViewFlatProps = {
  names?: ProteinNames;
  noEvidence?: boolean;
};

const ProteinNamesViewFlat = ({
  names,
  noEvidence = false,
}: ProteinNamesViewFlatProps) => {
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

type ECNumbersViewProps = {
  ecNumbers?: ValueWithEvidence[];
  noEvidence?: boolean;
  noLinks?: boolean;
  orientation?: 'horizontal' | 'vertical';
};

export const ECNumbersView = ({
  ecNumbers,
  noEvidence = false,
  noLinks = false,
  orientation = 'horizontal',
}: ECNumbersViewProps) => {
  const content = ecNumbers?.map((ecNumber) => (
    <Fragment key={ecNumber.value}>
      {`EC:${ecNumber.value}`}
      {noLinks ? null : (
        <>
          {' ('}
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              search: `query=ec:${ecNumber.value}`,
            }}
          >
            UniProtKB
          </Link>{' '}
          |{' '}
          <ExternalLink url={externalUrls.ENZYME(ecNumber.value)}>
            ENZYME
          </ExternalLink>{' '}
          |{' '}
          <ExternalLink url={externalUrls.RheaSearch(`ec:${ecNumber.value}`)}>
            Rhea
          </ExternalLink>
          )
        </>
      )}
      {!noEvidence && ecNumber.evidences?.length && (
        <UniProtKBEvidenceTag evidences={ecNumber.evidences} />
      )}
    </Fragment>
  ));

  if (!content) {
    return null;
  }

  return (
    <>
      {orientation === 'horizontal' ? (
        content.map((ecInfo, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            {index > 0 && ', '}
            {ecInfo}
          </Fragment>
        ))
      ) : (
        <ExpandableList>{content}</ExpandableList>
      )}
    </>
  );
};

const ProteinDescriptionView = ({
  proteinDescription,
}: {
  proteinDescription?: ProteinDescription;
}) => {
  if (!proteinDescription) {
    return null;
  }
  return (
    <>
      <ProteinNamesViewFlat names={proteinDescription.recommendedName} />
      {proteinDescription.recommendedName?.ecNumbers?.length && (
        <small>
          <ECNumbersView
            ecNumbers={proteinDescription.recommendedName?.ecNumbers}
            orientation="vertical"
          />
        </small>
      )}
      {proteinDescription.alternativeNames && (
        <>
          {' '}
          <strong>Alternative names: </strong>
          {proteinDescription.alternativeNames.map(
            (alternativeName, index): JSX.Element => (
              <Fragment key={alternativeName.fullName.value}>
                <ProteinNamesViewFlat names={alternativeName} />
                {index <
                  (proteinDescription.alternativeNames?.length || 0) - 1 &&
                  ', '}
              </Fragment>
            )
          )}
        </>
      )}
    </>
  );
};

const getInfoListForNames = (name: ProteinNames, noEvidence: boolean) => {
  const infoData = [];

  if (name.fullName) {
    infoData.push({
      title: 'Recommended name',
      content: (
        <strong>
          {noEvidence ? (
            <>{name.fullName.value}</>
          ) : (
            <NameWithEvidence data={name.fullName} />
          )}
        </strong>
      ),
    });
  }
  if (name.ecNumbers) {
    infoData.push({
      title: 'EC number',
      content: (
        <ECNumbersView
          ecNumbers={name.ecNumbers}
          noEvidence={noEvidence}
          orientation="vertical"
        />
      ),
    });
  }
  if (name.shortNames) {
    infoData.push({
      title: 'Short names',
      content: (
        <>
          {name.shortNames.map((shortName, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={i}>
              {i > 0 && '; '}
              {noEvidence ? (
                shortName.value
              ) : (
                <NameWithEvidence data={shortName} />
              )}
            </Fragment>
          ))}
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
            <Fragment
              key={index} // eslint-disable-line react/no-array-index-key
            >
              <ProteinNamesViewFlat
                names={alternativeName}
                noEvidence={noEvidence}
              />
              {alternativeName.ecNumbers?.length ? (
                <small>
                  .{' '}
                  <ECNumbersView
                    ecNumbers={alternativeName.ecNumbers}
                    noEvidence={noEvidence}
                  />
                </small>
              ) : null}
            </Fragment>
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
      title: 'Submitted names',
      content: (
        <ExpandableList descriptionString="submitted names">
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
