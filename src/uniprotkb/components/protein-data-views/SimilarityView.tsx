import { Fragment } from 'react';
import { generatePath, Link } from 'react-router-dom';

import { LocationToPath, Location } from '../../../app/config/urls';
import { stringifyUrl } from '../../../shared/utils/url';

const familyRegEx = /(Belongs to the .+family)/i;
const familyExtractor = /( the |\. )([^.]+(?:sub|super|sub-sub)?family)/;
const familyHierarchyRegEx = /(superfamily|\sfamily|subfamily|sub-subfamily)+/;

type SimilarityViewProps = { children?: string; justLinks?: boolean };

const SimilarityView = ({ children, justLinks }: SimilarityViewProps) => {
  const splitFamilyFromPlainText = (term: string) => {
    // if it ends up with the full string 'Belongs to the x.x.x family'
    const exceptionRegEx = /(belongs to the)/i;
    if (exceptionRegEx.test(term)) {
      return term.split(exceptionRegEx).filter((entry) => /\S/.test(entry));
    }
    return ['', term];
  };

  let linkIndex = 0;

  const familyLink = (term: string, link?: string) => {
    const [plainText, family] = splitFamilyFromPlainText(term);

    linkIndex++; // eslint-disable-line no-plusplus

    return (
      <Fragment key={family}>
        {!justLinks && plainText && `${plainText} `}
        {justLinks && linkIndex > 1 && ', '}
        <Link
          to={stringifyUrl(
            generatePath(LocationToPath[Location.UniProtKBResults]),
            {
              query: `(family:"${link?.trim() || family}")`,
            }
          )}
        >
          {/* Remove the leading dot for 'justLinks' as they are joined by ',' already */}
          {justLinks ? family.replace(/^\./, '') : family}
        </Link>
      </Fragment>
    );
  };
  return (
    <>
      {children?.split(familyRegEx).map((part, index, { length }) => {
        let familyTree = '';
        return part.split(familyExtractor).map((familyPart) => {
          if (familyHierarchyRegEx.test(familyPart)) {
            const subFamilies = familyPart.split(familyHierarchyRegEx);
            const families = [];
            for (let i = 0; i < subFamilies.length; i += 2) {
              if (subFamilies[i] && subFamilies[i + 1]) {
                families.push(`${subFamilies[i]}${subFamilies[i + 1]}`);
              }
            }
            return families.map((name) => {
              const [, term] = splitFamilyFromPlainText(name);
              const link = `${familyTree} ${term.replace(/^\.\s?/, '')}`;
              familyTree = link;
              return familyLink(name, link);
            });
          }

          if (!justLinks) {
            if (index + 1 === length && !part.endsWith('.')) {
              return `${part}.`;
            }
            return familyPart;
          }
          return null;
        });
      })}
    </>
  );
};
export default SimilarityView;
