import { ExternalLink } from 'franklin-sites';

import { Reference } from '../../../supporting-data/citations/adapters/citationsConverter';

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
