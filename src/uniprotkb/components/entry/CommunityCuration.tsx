import { useState } from 'react';
import {
  Button,
  ExternalLink,
  HeroContainer,
  CommunityAnnotationIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from 'franklin-sites';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import { processUrlTemplate } from '../../../shared/utils/xrefs';
import externalUrls from '../../../shared/config/externalUrls';

import {
  Reference,
  SourceCategory,
} from '../../../supporting-data/citations/adapters/citationsConverter';

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
  const databaseInfoMaps = useDatabaseInfoMaps();

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
            {communityReferences.map(
              ({ source, communityAnnotation, citationId }) => (
                <div key={source?.id}>
                  {communityAnnotation?.proteinOrGene && (
                    <b>{communityAnnotation.proteinOrGene}</b>
                  )}
                  {(communityAnnotation?.function ||
                    communityAnnotation?.disease) && (
                    <p>
                      {communityAnnotation?.function}
                      {communityAnnotation?.disease}
                    </p>
                  )}
                  {communityAnnotation?.comment && (
                    <p>{communityAnnotation?.comment}</p>
                  )}
                  <div className={styles['contributor-details']}>
                    {citationId && (
                      <span>
                        Source:&nbsp;&nbsp;
                        <ExternalLink url={externalUrls.PubMed(citationId)}>
                          PMID - {citationId}
                        </ExternalLink>
                      </span>
                    )}
                    {source && (
                      <span>
                        Contributor:&nbsp;&nbsp;
                        {source.id && source.id !== 'Anonymous' ? (
                          <ExternalLink
                            url={processUrlTemplate(
                              databaseInfoMaps?.databaseToDatabaseInfo[
                                source.name
                              ].uriLink,
                              { id: source.id }
                            )}
                          >
                            <img
                              src={ORCIDiDLogo}
                              alt=""
                              width="15"
                              height="15"
                            />
                            {source.id}
                          </ExternalLink>
                        ) : (
                          source.id
                        )}
                      </span>
                    )}
                    <ExternalLink
                      url={externalUrls.CommunityCurationGet(accession)}
                    >
                      View submission
                    </ExternalLink>
                  </div>
                </div>
              )
            )}
          </HeroContainer>
        )}
      </div>
    );
  }
  return null;
};

export default CommunityCuration;
