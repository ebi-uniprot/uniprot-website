import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { LocationToPath, Location } from '../../../app/config/urls';

const familyRegEx = /(Belongs to the .+family)/i;
const familyExtractor = /( the |\. )([^.]+(?:sub|super|sub-sub)?family)/;
const familyHierarchyRegEx = /(superfamily|\sfamily|subfamily|sub-subfamily)+/;

const SimilarityView = ({ children }: { children?: string }) => {
  const splitFamilyFromPlainText = (term: string) => {
    // if it ends up with the full string 'Belongs to the x.x.x family'
    const exceptionRegEx = /(belongs to the)/i;
    if (exceptionRegEx.test(term)) {
      return term.split(exceptionRegEx).filter((entry) => /\S/.test(entry));
    }
    return ['', term];
  };

  const familyLink = (term: string, link?: string) => {
    const [plainText, family] = splitFamilyFromPlainText(term);

    return (
      <Fragment key={family}>
        {plainText && `${plainText} `}
        <Link
          to={{
            pathname: LocationToPath[Location.UniProtKBResults],
            search: `query=(family:"${link?.trim() || family}")`,
          }}
        >
          {family}
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

          if (index + 1 === length && !part.endsWith('.')) {
            return `${part}.`;
          }
          return familyPart;
        });
      })}
    </>
  );
};
export default SimilarityView;
