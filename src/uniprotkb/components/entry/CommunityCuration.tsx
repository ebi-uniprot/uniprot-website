import { useState } from 'react';
import {
  Button,
  ExternalLink,
  HeroContainer,
  CommunityAnnotationIcon,
  ChevronUpIcon,
  ChevronDownIcon,
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
        <div className={styles.header}>
          <Button
            variant="tertiary"
            className={styles['community-curation-button']}
            onClick={() => setToggleView(!toggleView)}
          >
            <CommunityAnnotationIcon />
            {`Community curation (${communityReferences.length}) `}
            {toggleView ? (
              <ChevronUpIcon width="1ch" />
            ) : (
              <ChevronDownIcon width="1ch" />
            )}
          </Button>
          <hr className={styles.separator} />
        </div>

        {toggleView && (
          <HeroContainer className={styles.content}>
            {communityReferences.map((reference) => (
              <div key={reference.source?.id}>
                {reference.communityAnnotation?.proteinOrGene && (
                  <b>{reference.communityAnnotation.proteinOrGene}</b>
                )}
                {(reference.communityAnnotation?.function ||
                  reference.communityAnnotation?.disease) && (
                  <p>
                    {reference.communityAnnotation?.function}
                    {reference.communityAnnotation?.disease}
                  </p>
                )}
                {reference.communityAnnotation?.comment && (
                  <p>{reference.communityAnnotation?.comment}</p>
                )}
                <div className={styles['contributor-details']}>
                  {reference.citationId && (
                    <span>
                      Source:&nbsp;&nbsp;
                      <ExternalLink
                        url={externalUrls.PubMed(reference.citationId)}
                      >
                        PMID - {reference.citationId}
                      </ExternalLink>
                    </span>
                  )}
                  <span>
                    Contributor:&nbsp;&nbsp;
                    <ExternalLink
                      url={`https://orcid.org/${reference.source?.id}`}
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
