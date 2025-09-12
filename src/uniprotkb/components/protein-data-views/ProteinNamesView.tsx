import { ExpandableList, InfoList } from 'franklin-sites';
import { Fragment } from 'react';
import { Link } from 'react-router';

import { Location, LocationToPath } from '../../../app/config/urls';
import ExternalLink from '../../../shared/components/ExternalLink';
import externalUrls from '../../../shared/config/externalUrls';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import { getUrlFromDatabaseInfo } from '../../../shared/utils/xrefs';
import {
  ProteinDescription,
  ProteinNames,
  ProteinNamesData,
} from '../../adapters/namesAndTaxonomyConverter';
import { ValueWithEvidence } from '../../types/modelTypes';
import { stringToID } from '../../utils';
import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

const ProteinName = ({
  value,
  withLink,
}: {
  value: string;
  withLink: boolean;
}) => (
  <>
    {withLink ? (
      <Link
        to={{
          pathname: '.',
          hash: stringToID(value),
        }}
      >
        {value}
      </Link>
    ) : (
      value
    )}
  </>
);

export const NameWithEvidence = ({
  data,
  withLink = false,
}: {
  data: ValueWithEvidence;
  withLink?: boolean;
}) => (
  <>
    <ProteinName value={data.value} withLink={withLink} />
    {data.evidences && (
      <>
        {' '}
        <UniProtKBEvidenceTag evidences={data.evidences} />
      </>
    )}
  </>
);

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
  const databaseInfoMaps = useDatabaseInfoMaps();
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
          <ExternalLink
            url={getUrlFromDatabaseInfo(databaseInfoMaps, 'ENZYME', {
              ec: ecNumber.value,
            })}
          >
            ENZYME
          </ExternalLink>{' '}
          |{' '}
          <ExternalLink url={externalUrls.RheaSearch(`ec:${ecNumber.value}`)}>
            Rhea
          </ExternalLink>
          )
        </>
      )}
      {!noEvidence && <UniProtKBEvidenceTag evidences={ecNumber.evidences} />}
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

type ProteinNamesViewFlatProps = {
  names?: ProteinNames;
  noEvidence?: boolean;
  withLink?: boolean;
};

const ProteinNamesViewFlat = ({
  names,
  noEvidence = false,
  withLink = false,
}: ProteinNamesViewFlatProps) => {
  if (!names) {
    return null;
  }
  return (
    <>
      {noEvidence ? (
        <ProteinName value={names.fullName.value} withLink={withLink} />
      ) : (
        <NameWithEvidence data={names.fullName} withLink={withLink} />
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
      {names.ecNumbers && (
        <>
          {' ('}
          <ECNumbersView
            ecNumbers={names.ecNumbers}
            noEvidence={noEvidence}
            noLinks={!withLink}
          />
          {') '}
        </>
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
      <ProteinNamesViewFlat
        names={proteinDescription.recommendedName}
        withLink
      />
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
          <i>Alternative names: </i>
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
  if (proteinNames.allergenName) {
    infoData.push({
      title: 'Allergen name',
      content: noEvidence ? (
        <>{proteinNames.allergenName.value}</>
      ) : (
        <NameWithEvidence data={proteinNames.allergenName} />
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
