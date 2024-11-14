import {
  ExternalLink,
  HeroContainer,
  CommunityAnnotationIcon,
  ChevronDownIcon,
  Card,
} from 'franklin-sites';
import cn from 'classnames';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import ORCIDiDLogo from '../../../images/ORCIDiD_icon.png';

import { processUrlTemplate } from '../../../shared/utils/xrefs';
import externalUrls from '../../../shared/config/externalUrls';

import {
  Citation,
  CommunityAnnotation,
  Reference,
} from '../../../supporting-data/citations/adapters/citationsConverter';
import EntrySection from '../../types/entrySection';
import { DatabaseInfoMaps } from '../../utils/database';

import styles from './styles/community-curation.module.scss';

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
      const r = annotationToCommunityReferences.get(annotation) || [];
      r.push(communityReference);
      annotationToCommunityReferences.set(annotation, r);
    }
  }
  return annotationToCommunityReferences;
};

const SubmissionDate = ({
  accession,
  citationId,
  submissionDate,
}: {
  accession: string;
  citationId?: Citation['id'];
  submissionDate?: string;
}) => (
  <ExternalLink
    url={
      citationId && citationId.match(/\d+/)
        ? externalUrls.CommunityCurationGetByAccessionAndPmid(
            accession,
            citationId
          )
        : externalUrls.CommunityCurationGetByAccession(accession)
    }
  >
    <time dateTime={submissionDate}>{submissionDate}</time>
  </ExternalLink>
);

const GroupedCommunityReference = ({
  annotation,
  accession,
  references,
  section,
  databaseInfoMaps,
}: {
  annotation: string;
  accession: string;
  references: Reference[];
  section: EntrySection;
  databaseInfoMaps: DatabaseInfoMaps | null;
}) => (
  <Card className={styles['reference-card']}>
    <h4>
      {section === EntrySection.NamesAndTaxonomy
        ? 'Community suggested name: '
        : ''}
      {annotation}
    </h4>
    <table>
      <thead>
        <tr>
          <th>Source</th>
          <th>Submission date</th>
          <th>Contributor</th>
        </tr>
      </thead>
      <tbody>
        {references.map(({ citationId, communityAnnotation, source }) => (
          <tr key={citationId}>
            <td>
              {citationId && (
                <ExternalLink url={externalUrls.PubMed(citationId)}>
                  PubMed:{citationId}
                </ExternalLink>
              )}
            </td>
            <td>
              <SubmissionDate
                accession={accession}
                citationId={citationId}
                submissionDate={communityAnnotation?.submissionDate}
              />
            </td>
            <td>
              {source?.id && source.id !== 'Anonymous' ? (
                <ExternalLink
                  url={processUrlTemplate(
                    databaseInfoMaps?.databaseToDatabaseInfo[source.name]
                      ?.uriLink,
                    { id: source.id }
                  )}
                >
                  <img src={ORCIDiDLogo} alt="" width="15" height="15" />
                  {source.id}
                </ExternalLink>
              ) : (
                source?.id || ''
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
);

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
          {Array.from(groupedCommunityReferences).map(
            ([annotation, references]) => (
              <GroupedCommunityReference
                key={annotation}
                section={section}
                accession={accession}
                annotation={annotation}
                references={references}
                databaseInfoMaps={databaseInfoMaps}
              />
            )
          )}
        </HeroContainer>
      </details>
    );
  }
  return null;
};

export default CommunityCuration;
