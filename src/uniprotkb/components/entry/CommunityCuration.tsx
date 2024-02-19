import { useState } from 'react';
import {
  Button,
  ExternalLink,
  HeroContainer,
  CommunityAnnotationIcon,
} from 'franklin-sites';

import {
  Reference,
  SourceCategory,
} from '../../../supporting-data/citations/adapters/citationsConverter';

import externalUrls from '../../../shared/config/externalUrls';

import styles from './styles/community-curation.module.scss';

import ORCIDiDLogo from '../../../images/ORCIDiD_icon.png';

export const filterReferencesByCategory = (
  communityReferences: Reference[],
  category: SourceCategory
) =>
  communityReferences.filter((reference) =>
    reference.sourceCategories?.includes(category)
  );

const CommunityCuration = ({
  accession,
  communityReferences,
}: {
  accession: string;
  communityReferences: Reference[];
}) => {
  const [toggleView, setToggleView] = useState(false);
  if (communityReferences.length) {
    return (
      <div>
        <Button variant="tertiary" onClick={() => setToggleView(!toggleView)}>
          <CommunityAnnotationIcon />
          {`Community curation (${communityReferences.length})`}
        </Button>
        {toggleView && (
          <HeroContainer className={styles.content}>
            {communityReferences.map((reference) => (
              <div key={reference.source?.id}>
                {reference.communityAnnotation?.proteinOrGene && (
                  <b>{reference.communityAnnotation.proteinOrGene}</b>
                )}
                <p>
                  {reference.communityAnnotation?.function}
                  {reference.communityAnnotation?.disease}
                </p>
                <p>{reference.communityAnnotation?.comment}</p>
                <div className={styles['contributor-details']}>
                  {reference.citationId && (
                    <span>
                      Source:&nbsp;&nbsp;
                      <ExternalLink
                        url={externalUrls.PubMed(reference.citationId)}
                        noIcon
                      >
                        PMID - {reference.citationId}
                      </ExternalLink>
                    </span>
                  )}
                  <span>
                    Contributor:&nbsp;&nbsp;
                    <ExternalLink
                      url={`https://orcid.org/${reference.source?.id}`}
                      noIcon
                    >
                      <img src={ORCIDiDLogo} alt="" width="15" height="15" />
                      {reference.source?.id}
                    </ExternalLink>
                  </span>
                  <ExternalLink
                    url={externalUrls.CommunityCurationGet(accession)}
                  >
                    View submission
                  </ExternalLink>
                </div>
              </div>
            ))}
          </HeroContainer>
        )}
      </div>
    );
  }
  return null;
};

export default CommunityCuration;
