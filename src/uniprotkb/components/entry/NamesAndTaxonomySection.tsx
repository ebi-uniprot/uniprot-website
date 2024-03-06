import { memo, useMemo } from 'react';
import { Card, InfoList } from 'franklin-sites';
import { groupBy } from 'lodash-es';

import ProteinNamesView from '../protein-data-views/ProteinNamesView';
import GeneNamesView from '../protein-data-views/GeneNamesView';
import ProteomesListView from '../protein-data-views/ProteomesView';
import XRefView from '../protein-data-views/XRefView';
import AccessionsView from '../protein-data-views/AccessionsView';
import { TaxonomyListView } from '../../../shared/components/entry/TaxonomyView';
import CommunityCuration from './CommunityCuration';

import { hasContent, pluralise } from '../../../shared/utils/utils';
import { getEntrySectionNameAndId } from '../../utils/entrySection';

import { NamesAndTaxonomyUIModel } from '../../adapters/namesAndTaxonomyConverter';

import EntrySection from '../../types/entrySection';
import UniProtKBEvidenceTag, {
  EvidenceTagSourceTypes,
} from '../protein-data-views/UniProtKBEvidenceTag';
import { UniProtKBReference } from '../../adapters/uniProtkbConverter';
import { ecoCode } from '../../config/evidenceCodes';

import {
  Reference,
  ReferenceComment,
} from '../../../supporting-data/citations/adapters/citationsConverter';
import { Evidence } from '../../types/modelTypes';

type Props = {
  data: NamesAndTaxonomyUIModel;
  primaryAccession: string;
  communityReferences: (Reference | undefined)[];
  references?: UniProtKBReference[];
};

const NamesAndTaxonomySection = ({
  data,
  primaryAccession,
  references,
  communityReferences,
}: Props) => {
  const strains = useMemo(
    () =>
      Object.entries(
        // Group comments if they refer to the same strain
        groupBy(
          references
            ?.flatMap((ref) =>
              // Only get comments refering to strains
              ref.referenceComments?.filter(
                (refComm) => refComm.type === 'STRAIN'
              )
            )
            .filter(
              (
                refComm: undefined | ReferenceComment
              ): refComm is ReferenceComment => Boolean(refComm)
            ),
          (ref) => ref.value
        )
      ).map(([uniqueStrain, refs]) => {
        // Merge multiple strain comments about the same strain together
        const mergedRef: ReferenceComment = {
          type: 'STRAIN',
          value: uniqueStrain,
        };
        // Merge all the evidences from all the comments
        const evidences: Evidence[] = refs
          .flatMap((ref) => ref.evidences)
          .filter(
            (
              evidenceOrUndef: Evidence | undefined
            ): evidenceOrUndef is Evidence => Boolean(evidenceOrUndef)
          );
        if (evidences.length) {
          mergedRef.evidences = evidences;
        }
        return mergedRef;
      }),
    [references]
  );

  const nameRelatedReferences = communityReferences?.filter(
    (reference) => reference?.communityAnnotation?.proteinOrGene
  );

  if (!hasContent(data) && !nameRelatedReferences.length) {
    return null;
  }
  const domains = data.proteinNamesData?.includes;

  return (
    <Card
      header={
        <h2 data-article-id="names_and_taxonomy_section">
          {getEntrySectionNameAndId(EntrySection.NamesAndTaxonomy).name}
        </h2>
      }
      id={EntrySection.NamesAndTaxonomy}
      data-entry-section
    >
      <h3 data-article-id="protein_names">Protein names</h3>
      <ProteinNamesView proteinNames={data.proteinNamesData} />
      {!!domains?.length && (
        <>
          <h4 className="tiny">{`Including ${domains.length} ${pluralise(
            'domain',
            domains.length,
            'domains'
          )}:`}</h4>
          {domains.map((domain, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ProteinNamesView key={index} proteinNames={domain} />
          ))}
        </>
      )}
      <CommunityCuration
        accession={primaryAccession}
        section={EntrySection.NamesAndTaxonomy}
        communityReferences={nameRelatedReferences}
      />
      {data.geneNamesData && (
        <>
          <h3 data-article-id="gene_name">Gene names</h3>
          <GeneNamesView geneNamesData={data.geneNamesData} />
        </>
      )}
      {data.geneLocations?.length && (
        <>
          <h3 data-article-id="encoded_on">Encoded on</h3>
          <div>
            {data.geneLocations.map((og) => {
              let content = og.geneEncodingType;
              if (og.value) {
                content += ` ${og.value}`;
              }
              let evidence;
              if (og.evidences) {
                evidence = <UniProtKBEvidenceTag evidences={og.evidences} />;
              } else if (references) {
                const type = og.geneEncodingType.toLowerCase();
                const value = og.value?.toLowerCase();
                // Mapping the evidences to the corresponding encoding type when the evidences are not parsed in the OG object itself (eg. P09130, P04737)
                const associatedReferences = references.filter((r) =>
                  r.referenceComments?.some(
                    (comment) =>
                      comment.type.toLowerCase() === type &&
                      comment.value.toLowerCase() === value
                  )
                );
                const evidences = associatedReferences.map((ref) => ({
                  // The ECO code is set as 'MI' after discussing with curators.
                  // It may not be the right one (Both MI and NAS were possible candidates for RX line and MI for OG line in the flat file).
                  evidenceCode: `ECO:${ecoCode.MI}` as const,
                  id: ref.citation.id,
                  source: `${EvidenceTagSourceTypes.PUBMED}`,
                }));
                evidence = <UniProtKBEvidenceTag evidences={evidences} />;
              }

              return (
                <InfoList
                  key={`${og.geneEncodingType}${og.value}`}
                  infoData={[
                    {
                      title: <> </>, // Empty title so that it aligns with the rest of the section content
                      content: (
                        <>
                          {content}
                          {evidence}
                        </>
                      ),
                    },
                  ]}
                />
              );
            })}
          </div>
        </>
      )}
      <h3>Organism names</h3>
      <TaxonomyListView
        data={data.organismData}
        hosts={data.organismHosts}
        strains={strains}
      />
      <h3>Accessions</h3>
      <AccessionsView data={data} />
      {!!data.proteomesData?.length && (
        <>
          <h3 data-article-id="proteomes_manual">Proteomes</h3>
          <ProteomesListView data={data.proteomesData} />
        </>
      )}
      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default memo(NamesAndTaxonomySection);
