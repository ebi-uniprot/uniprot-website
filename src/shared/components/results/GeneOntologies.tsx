import { ExpandableList, ExternalLink } from 'franklin-sites';
import useDatabaseInfoMaps from '../../hooks/useDatabaseInfoMaps';

import { getUrlFromDatabaseInfo } from '../../utils/xrefs';

import { KeywordsAPIModel } from '../../../supporting-data/keywords/adapters/keywordsConverter';

const GeneOntologies = ({ geneOntologies }: Partial<KeywordsAPIModel>) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
  return geneOntologies?.length ? (
    <ExpandableList descriptionString="GO terms" displayNumberOfHiddenItems>
      {geneOntologies?.map(({ name, goId }) => (
        <ExternalLink
          key={goId}
          url={getUrlFromDatabaseInfo(databaseInfoMaps, 'GO', { id: goId })}
        >
          {name} ({goId})
        </ExternalLink>
      ))}
    </ExpandableList>
  ) : null;
};

export default GeneOntologies;
