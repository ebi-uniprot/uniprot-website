import { Link } from 'react-router-dom';

import { LocationToPath, Location } from '../../../app/config/urls';

const familyRegEx = /(Belongs to the .+family)/i;
const familyExtractor = /( the |\. )([^.]+ (?:sub|super|sub-sub)?family)/;
const subFamilyRegEx = /(subfamily|sub-subfamily)+/;

const SimilarityView = ({ children }: { children?: string }) => {
  const familyLink = (term: string, link?: string) => (
    <Link
      key={term}
      to={{
        pathname: LocationToPath[Location.UniProtKBResults],
        search: `query=(family:"${link || term}")`,
      }}
    >
      {term}
    </Link>
  );
  return (
    <>
      {children?.split(familyRegEx).map((part, index, { length }) => {
        let encounteredFamilies = '';
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
                const link = `${encounteredFamilies} ${name.replace(
                  /^\.\s?/,
                  ''
                )}`;
                encounteredFamilies = link;
                return familyLink(name, link);
              });
            }
            encounteredFamilies = familyPart;
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
