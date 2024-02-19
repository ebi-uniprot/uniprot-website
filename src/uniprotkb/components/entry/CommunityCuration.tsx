import { ExternalLink } from 'franklin-sites';

import {
  Reference,
  SourceCategory,
} from '../../../supporting-data/citations/adapters/citationsConverter';

export const filterReferencesByCategory = (
  communityReferences: Reference[],
  category: SourceCategory
) =>
  communityReferences.filter((reference) =>
    reference.sourceCategories?.includes(category)
  );

const CommunityCuration = ({
  communityReferences,
}: {
  communityReferences: Reference[];
}) => {
  if (communityReferences.length) {
    return (
      <div>
        Community Curation
        {communityReferences.map((reference) => (
          <div key={reference.source?.id}>
            {reference.communityAnnotation?.proteinOrGene}
            {reference.communityAnnotation?.function}
            {reference.communityAnnotation?.disease}
            <br />
            {reference.communityAnnotation?.comment}
            Source: {reference.citationId}
            Contributor: {reference.source?.id}
            <ExternalLink url={null}>View submission</ExternalLink>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default CommunityCuration;
