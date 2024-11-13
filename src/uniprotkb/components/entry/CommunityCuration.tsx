import {
  ExternalLink,
  HeroContainer,
  CommunityAnnotationIcon,
  ChevronDownIcon,
  Card,
  InfoList,
} from 'franklin-sites';
import cn from 'classnames';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import { processUrlTemplate } from '../../../shared/utils/xrefs';
import externalUrls from '../../../shared/config/externalUrls';

import {
  CommunityAnnotation,
  Reference,
} from '../../../supporting-data/citations/adapters/citationsConverter';
import EntrySection from '../../types/entrySection';

import styles from './styles/community-curation.module.scss';

import ORCIDiDLogo from '../../../images/ORCIDiD_icon.png';
import { defaultdict } from '../../../shared/utils/utils';

const annotationGetter = (section: EntrySection) => {
  switch (section) {
    case EntrySection.Function:
      return (communityAnnotation?: CommunityAnnotation) =>
        communityAnnotation?.function;
    case EntrySection.DiseaseVariants:
    case EntrySection.PhenotypesVariants:
      return (communityAnnotation?: CommunityAnnotation) =>
        communityAnnotation?.disease;
    case EntrySection.NamesAndTaxonomy:
      return (communityAnnotation?: CommunityAnnotation) =>
        communityAnnotation?.proteinOrGene;
    default:
      return null;
  }
};

const groupByCommunityAnnotation = (
  section: EntrySection,
  communityReferences: Reference[]
) => {
  const getAnnotation = annotationGetter(section);
  if (!getAnnotation) {
    return null;
  }
  const annotationToCommunityReferences = new Map<string, Reference[]>();
  for (const communityReference of communityReferences) {
    const annotation = getAnnotation(communityReference.communityAnnotation);
    if (annotation) {
      const annotations = annotationToCommunityReferences.get(annotation) || [];
      annotations.push(communityReference);
      annotationToCommunityReferences.set(annotations);
    }
  }
  return annotationToCommunityReferences;
};

const CommunityCuration = ({
  accession,
  section,
  communityReferences,
}: {
  accession: string;
  section: EntrySection;
  communityReferences: Reference[];
}) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
  const groupedCommunityReferences = groupByCommunityAnnotation(
    section,
    communityReferences
  );
  if (groupedCommunityReferences?.size) {
    return (
      <details className={styles['community-annotation-details']}>
        <summary className={styles.header}>
          <span
            className={cn('button', 'tertiary', styles['community-button'])}
          >
            <CommunityAnnotationIcon width="1ch" />
            {`Community curation (${communityReferences.length}) `}
            <ChevronDownIcon width="1ch" className={styles['chevron-icon']} />
          </span>
          <hr className={styles.separator} />
        </summary>
        <HeroContainer className={styles.content}>
          {communityReferences.map(
            ({ source, communityAnnotation, citationId }) => {
              const contributorElement = (
                <div
                  className={cn(
                    styles['contributor-details'],
                    section === EntrySection.NamesAndTaxonomy
                      ? styles['names-section']
                      : ''
                  )}
                >
                  {citationId && (
                    <span>
                      Source:&nbsp;&nbsp;
                      <ExternalLink url={externalUrls.PubMed(citationId)}>
                        PMID - {citationId}
                      </ExternalLink>
                    </span>
                  )}
                  {communityAnnotation?.submissionDate && (
                    <span>
                      Submission date:&nbsp;&nbsp;
                      {communityAnnotation?.submissionDate}
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
                            ]?.uriLink,
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
              );

              return (
                <Card key={citationId} className={styles['reference-card']}>
                  {(section === EntrySection.Function ||
                    section === EntrySection.PhenotypesVariants ||
                    section === EntrySection.DiseaseVariants) && (
                    <>
                      <p>
                        {section === EntrySection.Function &&
                          communityAnnotation?.function}
                        {(section === EntrySection.DiseaseVariants ||
                          section === EntrySection.PhenotypesVariants) &&
                          communityAnnotation?.disease}
                      </p>
                      {contributorElement}
                    </>
                  )}
                  {section === EntrySection.NamesAndTaxonomy && (
                    <InfoList
                      infoData={[
                        {
                          title: 'Community suggested names',
                          content: (
                            <>
                              {communityAnnotation?.proteinOrGene}
                              {contributorElement}
                            </>
                          ),
                        },
                      ]}
                    />
                  )}
                </Card>
              );
            }
          )}
        </HeroContainer>
      </details>
    );
  }
  return null;
};

export default CommunityCuration;
