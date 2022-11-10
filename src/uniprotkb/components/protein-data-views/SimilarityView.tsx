import { Link } from 'react-router-dom';

import { LocationToPath, Location } from '../../../app/config/urls';

const familyRegEx = /(Belongs to the .+family)/i;
const familyExtractor = /( the |\. )([^.]+(?:sub|super|sub-sub)?family)/;
const subFamilyRegEx = /(subfamily|sub-subfamily)+/;

const SimilarityView = ({ children }: { children?: string }) => {
  const familyLink = (term: string, link?: string) => {
    let family = term;
    let plainText;
    // if it ends up with the full string 'Belongs to the x.x.x family'
    const exceptionRegEx = /(belongs to the )/i;
    if (exceptionRegEx.test(term)) {
      [plainText, family] = term
        .split(exceptionRegEx)
        .filter((entry) => /\S/.test(entry));
    }
    return (
      <>
        {plainText && `${plainText} `}
        <Link
          key={family}
          to={{
            pathname: LocationToPath[Location.UniProtKBResults],
            search: `query=(family:"${link || family}")`,
          }}
        >
          {family}
        </Link>
      </>
    );
  };
  return (
    <>
      {children?.split(familyRegEx).map((part, index, { length }) => {
        let familyTree = '';
        return part.split(familyExtractor).map((familyPart) => {
          if (familyPart.endsWith('family')) {
            // Separate subfamily and sub-sub family if present
            if (subFamilyRegEx.test(familyPart)) {
              const subFamilies = familyPart.split(subFamilyRegEx);
              const families = [];
              for (let i = 0; i < subFamilies.length; i += 2) {
                if (subFamilies[i] && subFamilies[i + 1]) {
                  families.push(`${subFamilies[i]}${subFamilies[i + 1]}`);
                }
              }
              return families.map((name) => {
                const link = `${familyTree} ${name.replace(/^\.\s?/, '')}`;
                familyTree = link;
                return familyLink(name, link);
              });
            }
            familyTree = familyPart;
            return familyLink(familyPart);
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
