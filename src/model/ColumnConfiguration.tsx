/* eslint-disable @typescript-eslint/camelcase */
import React, { Fragment } from 'react';
import { ExpandableList, Sequence } from 'franklin-sites';
import idx from 'idx';
import { flatten } from 'lodash';
import { Link } from 'react-router-dom';

import SimpleView from '../view/uniprotkb/components/SimpleView';
import ProteinNamesView, {
  ECNumbersView,
} from '../view/uniprotkb/components/ProteinNamesView';
import OrganismView, {
  OrganismLineage,
  OrganismId,
} from '../view/uniprotkb/components/OrganismView';
import GeneNamesView, {
  geneAlternativeNamesView,
} from '../view/uniprotkb/components/GeneNamesView';
import { UniProtkbUIModel } from './uniprotkb/UniProtkbConverter';
import numberView, { Unit } from '../view/uniprotkb/components/NumberView';
import ProteomesView from '../view/uniprotkb/components/ProteomesView';
import FeaturesView from '../view/uniprotkb/components/FeaturesView';
import EntrySection from './types/EntrySection';
import {
  SequenceCautionView,
  MassSpectrometryView,
  RNAEditingView,
  IsoformView,
} from '../view/uniprotkb/components/SequenceView';
import { Flag } from './uniprotkb/sections/SequenceConverter';
import FeatureType from './types/FeatureType';
import FreeTextView, {
  TextView,
} from '../view/uniprotkb/components/FreeTextView';
import {
  AbsorptionView,
  KineticsView,
  CofactorView,
} from '../view/uniprotkb/FunctionSection';
import {
  FunctionUIModel,
  CofactorComment,
  GoAspect,
  GoTerm,
} from './uniprotkb/sections/FunctionConverter';
import { Column } from './types/ColumnTypes';
import {
  CommentType,
  FreeTextComment,
  Xref,
  InteractionComment,
  InteractionType,
  DiseaseComment,
  CatalyticActivityComment,
  SubcellularLocationComment,
} from './types/CommentTypes';
import AnnotationScoreDoughnutChart, {
  DoughnutChartSize,
} from '../view/uniprotkb/components/AnnotationScoreDoughnutChart';
import { ValueWithEvidence } from './types/modelTypes';
import { getAllKeywords } from './utils/KeywordsUtil';
import { KeywordList } from '../view/uniprotkb/components/KeywordView';
import { ReviewedUnreviewed } from '../view/uniprotkb/components/UniProtTitle';
import { DatabaseList } from '../view/uniprotkb/components/XRefView';
import {
  databaseNameToCategory,
  getDatabaseNameToEntrySection,
  getDatabaseInfoByName,
} from '../data/database';
import DiseaseInvolvementView from '../view/uniprotkb/components/DiseaseInvolvementView';
import CatalyticActivityView from '../view/uniprotkb/components/CatalyticActivityView';
import VariationView from '../view/uniprotkb/components/VariationView';
import { StructureUIModel } from './uniprotkb/sections/StructureConverter';
import SubcellularLocationView from '../view/uniprotkb/components/SubcellularLocationView';
import { GOTermsView } from '../view/uniprotkb/components/GOView';
import externalUrls from '../utils/externalUrls';

const getFeatureColumn = (type: FeatureType) => {
  return {
    label: type,
    render: (data: UniProtkbUIModel) => {
      const { featuresData } = data[EntrySection.Sequence];
      return (
        featuresData && (
          <FeaturesView
            features={featuresData.filter(feature => feature.type === type)}
          />
        )
      );
    },
  };
};

const getGOColumnForAspect = (aspect: GoAspect) => {
  return {
    label: `Gene Ontology - ${aspect}`,
    render: (data: UniProtkbUIModel) => {
      const { goTerms } = data[EntrySection.Function] as FunctionUIModel;
      const goProcessTerms = goTerms && goTerms.get(aspect);
      return goProcessTerms && <GOTermsView data={goProcessTerms} />;
    },
  };
};

export const ColumnConfiguration = new Map<
  Column,
  {
    label: string;
    sortable?: boolean | undefined;
    render: (data: UniProtkbUIModel) => JSX.Element | string | undefined;
  }
>();

ColumnConfiguration.set(Column.accession, {
  label: 'Entry',
  sortable: true,
  render: (data: { primaryAccession: string; entryType: string }) => (
    <SimpleView
      termValue={data.primaryAccession}
      linkTo={`/uniprotkb/${data.primaryAccession}`}
    />
  ),
});

ColumnConfiguration.set(Column.id, {
  label: 'Entry Name',
  sortable: true,
  render: (data: { uniProtkbId: string }) => (
    <SimpleView termValue={data.uniProtkbId} />
  ),
});

ColumnConfiguration.set(Column.proteinName, {
  label: 'Protein names',
  sortable: true,
  render: data => {
    const { proteinNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      proteinNamesData && (
        <ProteinNamesView proteinNames={proteinNamesData} isCompact />
      )
    );
  },
});

ColumnConfiguration.set(Column.geneNames, {
  label: 'Gene Names',
  sortable: true,
  render: data => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      geneNamesData && <GeneNamesView geneNamesData={geneNamesData} isCompact />
    );
  },
});

ColumnConfiguration.set(Column.organism, {
  label: 'Organism',
  sortable: true,
  render: data => {
    const { organismData } = data[EntrySection.NamesAndTaxonomy];
    return organismData && <OrganismView data={organismData} />;
  },
});

ColumnConfiguration.set(Column.length, {
  label: 'Length',
  render: data => {
    const sequenceData = data[EntrySection.Sequence];
    return (
      sequenceData.sequence &&
      numberView({ value: sequenceData.sequence.length, unit: Unit.AA })
    );
  },
});

ColumnConfiguration.set(Column.genePrimary, {
  label: 'Gene names (Primary)',
  render: data => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <Fragment>
        {geneNamesData &&
          geneNamesData.map(geneData => {
            return (
              geneData.geneName && (
                <div key={geneData.geneName.value}>
                  {geneData.geneName.value}
                </div>
              )
            );
          })}
      </Fragment>
    );
  },
});

ColumnConfiguration.set(Column.geneOln, {
  label: 'Gene names (Ordered locus)',
  render: data => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <Fragment>
        {geneNamesData &&
          geneNamesData.map(
            geneData =>
              geneData.orderedLocusNames && (
                <Fragment key={geneData.orderedLocusNames.join('')}>
                  {geneAlternativeNamesView(geneData.orderedLocusNames, false)}
                </Fragment>
              )
          )}
      </Fragment>
    );
  },
});

ColumnConfiguration.set(Column.geneOrf, {
  label: 'Gene names (ORF)',
  render: data => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <Fragment>
        {geneNamesData &&
          geneNamesData.map(
            geneData =>
              geneData.orfNames && (
                <Fragment key={geneData.orfNames.join('')}>
                  {geneAlternativeNamesView(geneData.orfNames, false)}
                </Fragment>
              )
          )}
      </Fragment>
    );
  },
});

ColumnConfiguration.set(Column.geneSynonym, {
  label: 'Gene names (Synonyms)',
  render: data => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <Fragment>
        {geneNamesData &&
          geneNamesData.map(
            geneData =>
              geneData.synonyms && (
                <Fragment key={geneData.synonyms.join('')}>
                  {geneAlternativeNamesView(geneData.synonyms, false)}
                </Fragment>
              )
          )}
      </Fragment>
    );
  },
});
ColumnConfiguration.set(Column.organismId, {
  label: 'Organism',
  render: data => {
    const { organismData } = data[EntrySection.NamesAndTaxonomy];
    return organismData && <OrganismId taxonId={organismData.taxonId} />;
  },
});

ColumnConfiguration.set(Column.proteinName, {
  label: 'Protein names',
  render: data => {
    const { proteinNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      proteinNamesData && (
        <ProteinNamesView proteinNames={proteinNamesData} isCompact />
      )
    );
  },
});

ColumnConfiguration.set(Column.drProteomes, {
  label: 'Proteomes',
  render: data => {
    const { proteomesData } = data[EntrySection.NamesAndTaxonomy];
    return proteomesData && <ProteomesView data={proteomesData} isCompact />;
  },
});
ColumnConfiguration.set(Column.lineage, {
  label: 'Lineage',
  render: data => {
    const { organismData } = data[EntrySection.NamesAndTaxonomy];
    return (
      organismData &&
      organismData.lineage && <OrganismLineage lineage={organismData.lineage} />
    );
  },
});
ColumnConfiguration.set(Column.organismHost, {
  label: 'Virus hosts',
  render: data => {
    const { organismHosts } = data[EntrySection.NamesAndTaxonomy];
    return (
      organismHosts && (
        <Fragment>
          {organismHosts.map(host => (
            <p key={host.taxonId}>
              <OrganismView data={host} />
            </p>
          ))}
        </Fragment>
      )
    );
  },
});
ColumnConfiguration.set(Column.ccAlternativeProducts, {
  label: 'Alternative Products',
  render: data => {
    const sequenceData = data[EntrySection.Sequence];
    return (
      sequenceData.alternativeProducts && (
        <IsoformView
          alternativeProducts={sequenceData.alternativeProducts}
          includeSequences={false}
          canonicalAccession={data.primaryAccession}
        />
      )
    );
  },
});
ColumnConfiguration.set(Column.sequence, {
  label: 'Sequence',
  render: data => {
    const sequenceData = data[EntrySection.Sequence];
    return (
      <Sequence
        sequence={sequenceData.sequence.value}
        accession={data.primaryAccession}
        showActionBar={false}
      />
    );
  },
});

ColumnConfiguration.set(Column.ftVarSeq, {
  label: 'Alternative sequence',
  render: data => {
    const { featuresData } = data[EntrySection.Sequence];
    return (
      <Fragment>
        {featuresData && <FeaturesView features={featuresData} />}
      </Fragment>
    );
  },
});
ColumnConfiguration.set(Column.fragment, {
  label: 'Fragment',
  render: data => {
    const { flag } = data[EntrySection.Sequence];
    const isFragment =
      flag &&
      [
        Flag.FRAGMENT,
        Flag.FRAGMENTS,
        Flag.FRAGMENTS_PRECURSOR,
        Flag.FRAGMENT_PRECURSOR,
      ].includes(flag);
    return flag && <Fragment>{isFragment ? flag : 'N'}</Fragment>;
  },
});
// gene_location ,  "Invalid fields parameter value 'gene_location'"
ColumnConfiguration.set(Column.mass, {
  label: 'Mass',
  render: data => {
    const { molWeight } = data[EntrySection.Sequence];
    return numberView({ value: molWeight, unit: Unit.DA });
  },
});

ColumnConfiguration.set(Column.ccMassSpectrometry, {
  label: 'Mass Spectrometry',
  render: data => {
    const { massSpectrometry } = data[EntrySection.Sequence];
    return massSpectrometry && <MassSpectrometryView data={massSpectrometry} />;
  },
});

ColumnConfiguration.set(Column.ftVariant, {
  label: 'Variants',
  render: data => (
    <VariationView primaryAccession={data.primaryAccession} hasTable={false} />
  ),
});

ColumnConfiguration.set(
  Column.ftNonCon,
  getFeatureColumn(FeatureType.NON_CONS)
);
ColumnConfiguration.set(Column.ftNonStd, getFeatureColumn(FeatureType.NON_STD));
ColumnConfiguration.set(Column.ftNonTer, getFeatureColumn(FeatureType.NON_TER));

ColumnConfiguration.set(Column.ccPolymorphism, {
  label: 'Polymorphysm',
  render: data => {
    const { polymorphysm } = data[EntrySection.Sequence];
    return polymorphysm && <FreeTextView comments={polymorphysm} />;
  },
});

ColumnConfiguration.set(Column.ccRnaEditing, {
  label: 'RNA Editing',
  render: data => {
    const { rnaEditing } = data[EntrySection.Sequence];
    return rnaEditing && <RNAEditingView data={rnaEditing} />;
  },
});
ColumnConfiguration.set(Column.errorGmodelPred, {
  label: 'Sequence Caution',
  render: data => {
    const { sequenceCaution } = data[EntrySection.Sequence];
    return sequenceCaution && <SequenceCautionView data={sequenceCaution} />;
  },
});

ColumnConfiguration.set(
  Column.ftConflict,
  getFeatureColumn(FeatureType.CONFLICT)
);
ColumnConfiguration.set(Column.ftUnsure, getFeatureColumn(FeatureType.UNSURE));
ColumnConfiguration.set(Column.sequenceVersion, {
  label: 'Sequence Version',
  render: data => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && <span>{entryAudit.sequenceVersion}</span>;
  },
});
ColumnConfiguration.set(Column.absorption, {
  label: 'Absorption',
  render: data => {
    const { bioPhysicoChemicalProperties } = data[
      EntrySection.Function
    ] as FunctionUIModel;
    return (
      bioPhysicoChemicalProperties.absorption && (
        <AbsorptionView data={bioPhysicoChemicalProperties.absorption} />
      )
    );
  },
});
ColumnConfiguration.set(
  Column.ftActSite,
  getFeatureColumn(FeatureType.ACT_SITE)
);
ColumnConfiguration.set(
  Column.ftBinding,
  getFeatureColumn(FeatureType.BINDING)
);
ColumnConfiguration.set(Column.ftCaBind, getFeatureColumn(FeatureType.CA_BIND));
ColumnConfiguration.set(Column.ccCatalyticActivity, {
  label: 'Catalytic Activity',
  render: data => {
    const catalyticActivityComments = data[
      EntrySection.Function
    ].commentsData.get(
      CommentType.CATALYTIC_ACTIVITY
    ) as CatalyticActivityComment[];
    return (
      catalyticActivityComments && (
        <CatalyticActivityView comments={catalyticActivityComments} />
      )
    );
  },
});
ColumnConfiguration.set(Column.ccCofactor, {
  label: 'Cofactor',
  render: data => {
    const cofactorComments = data[EntrySection.Function].commentsData.get(
      CommentType.COFACTOR
    ) as CofactorComment[];
    return cofactorComments && <CofactorView cofactors={cofactorComments} />;
  },
});
ColumnConfiguration.set(
  Column.ftDnaBind,
  getFeatureColumn(FeatureType.DNA_BIND)
);
ColumnConfiguration.set(Column.ec, {
  label: 'EC Number',
  render: data => {
    const { proteinNamesData } = data[EntrySection.NamesAndTaxonomy];
    const ecNumbers = idx(
      proteinNamesData,
      proteinName => proteinName.recommendedName.ecNumbers
    ) as ValueWithEvidence[];
    return ecNumbers && <ECNumbersView ecNumbers={ecNumbers} />;
  },
});
ColumnConfiguration.set(Column.ccActivityRegulation, {
  label: 'Activity Regulation',
  render: data => {
    const activityRegulationComments = data[
      EntrySection.Function
    ].commentsData.get(CommentType.ACTIVITY_REGULATION) as FreeTextComment[];
    return (
      activityRegulationComments && (
        <FreeTextView comments={activityRegulationComments} />
      )
    );
  },
});
ColumnConfiguration.set(Column.ccFunction, {
  label: 'Function',
  render: data => {
    const functionComments = data[EntrySection.Function].commentsData.get(
      CommentType.FUNCTION
    ) as FreeTextComment[];
    return functionComments && <FreeTextView comments={functionComments} />;
  },
});
ColumnConfiguration.set(Column.kinetics, {
  label: 'Kinetics',
  render: data => {
    const { bioPhysicoChemicalProperties } = data[
      EntrySection.Function
    ] as FunctionUIModel;
    return (
      bioPhysicoChemicalProperties.kinetics && (
        <KineticsView data={bioPhysicoChemicalProperties.kinetics} />
      )
    );
  },
});
ColumnConfiguration.set(Column.ftMetal, getFeatureColumn(FeatureType.METAL));
ColumnConfiguration.set(
  Column.ftNpBind,
  getFeatureColumn(FeatureType.NP_BINDL)
);
ColumnConfiguration.set(Column.ccPathway, {
  label: 'Pathway',
  render: data => {
    const pathwayComments = data[EntrySection.Function].commentsData.get(
      CommentType.PATHWAY
    ) as FreeTextComment[];
    return pathwayComments && <FreeTextView comments={pathwayComments} />;
  },
});
ColumnConfiguration.set(Column.phDependence, {
  label: 'pH Dependence',
  render: data => {
    const { bioPhysicoChemicalProperties } = data[
      EntrySection.Function
    ] as FunctionUIModel;
    return (
      bioPhysicoChemicalProperties.pHDependence && (
        <TextView comments={bioPhysicoChemicalProperties.pHDependence} />
      )
    );
  },
});
ColumnConfiguration.set(Column.redoxPotential, {
  label: 'Redox Potential',
  render: data => {
    const { bioPhysicoChemicalProperties } = data[
      EntrySection.Function
    ] as FunctionUIModel;
    return (
      bioPhysicoChemicalProperties.redoxPotential && (
        <TextView comments={bioPhysicoChemicalProperties.redoxPotential} />
      )
    );
  },
});
ColumnConfiguration.set(Column.ftSite, getFeatureColumn(FeatureType.SITE));
ColumnConfiguration.set(Column.tempDependence, {
  label: 'Temperature Dependence',
  render: data => {
    const { bioPhysicoChemicalProperties } = data[
      EntrySection.Function
    ] as FunctionUIModel;
    return (
      bioPhysicoChemicalProperties.temperatureDependence && (
        <TextView
          comments={bioPhysicoChemicalProperties.temperatureDependence}
        />
      )
    );
  },
});
ColumnConfiguration.set(Column.score, {
  label: 'Score',
  render: data => (
    <AnnotationScoreDoughnutChart
      score={data.annotationScore}
      size={DoughnutChartSize.medium}
    />
  ),
});
ColumnConfiguration.set(Column.ccSequenceCaution, {
  label: 'Sequence Caution',
  render: data => {
    const { sequenceCaution } = data[EntrySection.Sequence];
    return sequenceCaution && <SequenceCautionView data={sequenceCaution} />;
  },
});
// feature ,
ColumnConfiguration.set(Column.keyword, {
  label: 'Keywords',
  render: data => {
    const keywords = getAllKeywords(data);
    return <KeywordList keywords={keywords} />;
  },
});
ColumnConfiguration.set(Column.keywordid, {
  label: 'Keyword IDs',
  render: data => {
    const keywords = getAllKeywords(data);
    return <KeywordList keywords={keywords} idOnly />;
  },
});
// matched_text: this field is not provided anymore ,
ColumnConfiguration.set(Column.ccMiscellaneous, {
  label: 'Miscellaneous [CC]',
  render: data => {
    const miscellaneousComments = data[EntrySection.Function].commentsData.get(
      CommentType.MISCELLANEOUS
    ) as FreeTextComment[];
    return (
      miscellaneousComments && <FreeTextView comments={miscellaneousComments} />
    );
  },
});
ColumnConfiguration.set(Column.proteinExistence, {
  label: 'Protein existence',
  render: data => data.proteinExistence,
});
ColumnConfiguration.set(Column.reviewed, {
  label: '',
  render: data => <ReviewedUnreviewed entryType={data.entryType} />,
});
// tools: UX review is this needed?? ,
// uniparc_id: leo re-indexing today 02/12/2019,
ColumnConfiguration.set(Column.ccInteraction, {
  label: 'Interacts with',
  render: data => {
    const interactionComments = data[EntrySection.Interaction].commentsData.get(
      CommentType.INTERACTION
    ) as InteractionComment[];
    return (
      interactionComments && (
        <Fragment>
          {interactionComments.map(interactionCC =>
            interactionCC.interactions.map(interaction => (
              <div
                key={
                  interaction.type === InteractionType.SELF
                    ? 'self'
                    : `${interaction.interactantOne.uniProtkbAccession}-${interaction.interactantTwo.uniProtkbAccession}`
                }
              >
                {interaction.type === InteractionType.SELF ? (
                  'Itself'
                ) : (
                  <Link
                    to={`/uniprotkb/${interaction.interactantOne.uniProtkbAccession}`}
                  >
                    {interaction.interactantOne.uniProtkbAccession}
                  </Link>
                )}
              </div>
            ))
          )}
        </Fragment>
      )
    );
  },
});
ColumnConfiguration.set(Column.ccSubunit, {
  label: 'Subunit structure',
  render: data => {
    const subunitComments = data[EntrySection.Interaction].commentsData.get(
      CommentType.SUBUNIT
    ) as FreeTextComment[];
    return subunitComments && <FreeTextView comments={subunitComments} />;
  },
});
ColumnConfiguration.set(Column.ccDevelopmentalStage, {
  label: 'Developmental stage',
  render: data => {
    const developmentComments = data[EntrySection.Expression].commentsData.get(
      CommentType.DEVELOPMENTAL_STAGE
    ) as FreeTextComment[];
    return (
      developmentComments && <FreeTextView comments={developmentComments} />
    );
  },
});
ColumnConfiguration.set(Column.ccInduction, {
  label: 'Induction',
  render: data => {
    const inductionComments = data[EntrySection.Expression].commentsData.get(
      CommentType.INDUCTION
    ) as FreeTextComment[];
    return inductionComments && <FreeTextView comments={inductionComments} />;
  },
});
ColumnConfiguration.set(Column.ccTissueSpecificity, {
  label: 'Tissue Specificity',
  render: data => {
    const tissueComment = data[EntrySection.Expression].commentsData.get(
      CommentType.TISSUE_SPECIFICITY
    ) as FreeTextComment[];
    return tissueComment && <FreeTextView comments={tissueComment} />;
  },
});
ColumnConfiguration.set(Column.goP, getGOColumnForAspect(GoAspect.P));
ColumnConfiguration.set(Column.goC, getGOColumnForAspect(GoAspect.C));
ColumnConfiguration.set(Column.goF, getGOColumnForAspect(GoAspect.F));
ColumnConfiguration.set(Column.go, {
  label: 'Gene Ontology',
  render: data => {
    const { goTerms } = data[EntrySection.Function] as FunctionUIModel;
    const allGOTerms = goTerms && flatten(Object.values(goTerms));
    return allGOTerms && <GOTermsView data={allGOTerms} />;
  },
});
ColumnConfiguration.set(Column.goId, {
  label: 'Gene Ontology IDs',
  render: data => {
    const { goTerms } = data[EntrySection.Function] as FunctionUIModel;
    const allGOTerms = goTerms && flatten(Object.values(goTerms));
    return (
      allGOTerms && (
        <section className="text-block">
          <ExpandableList descriptionString="terms">
            {allGOTerms
              .filter(({ id }: GoTerm) => id)
              .map(({ id }: GoTerm) => ({
                id,
                content: id && <a href={externalUrls.QuickGO(id)}>{id}</a>,
              }))}
          </ExpandableList>
        </section>
      )
    );
  },
});
ColumnConfiguration.set(Column.threeD, {
  label: '3D structures',
  render: data => {
    const structureData = (data[EntrySection.Structure] as StructureUIModel)
      .structures;
    return (
      structureData && (
        <Fragment>
          {Object.entries(structureData).map(([method, xrefs]) => (
            <div key={method}>
              {xrefs && (
                <Fragment>
                  {method}: {(xrefs as Xref[]).length}
                </Fragment>
              )}
            </div>
          ))}
        </Fragment>
      )
    );
  },
});
ColumnConfiguration.set(Column.ccSubcellularLocation, {
  label: 'Subcellular Location',
  render: data => {
    const subcellData = data[EntrySection.SubCellularLocation].commentsData.get(
      CommentType.SUBCELLULAR_LOCATION
    ) as SubcellularLocationComment[];
    return subcellData && <SubcellularLocationView comments={subcellData} />;
  },
});
ColumnConfiguration.set(Column.ccDomain, {
  label: 'Domain',
  render: data => {
    const domainData = data[EntrySection.FamilyAndDomains].commentsData.get(
      CommentType.DOMAIN
    ) as FreeTextComment[];
    return domainData && <FreeTextView comments={domainData} />;
  },
});
ColumnConfiguration.set(Column.ccPtm, {
  label: 'Post-Translational Modification',
  render: data => {
    const ptmData = data[EntrySection.ProteinProcessing].commentsData.get(
      CommentType.PTM
    ) as FreeTextComment[];
    return ptmData && <FreeTextView comments={ptmData} />;
  },
});
ColumnConfiguration.set(Column.ccAllergen, {
  label: 'Allergenic Properties',
  render: data => {
    const allergenData = data[
      EntrySection.PathologyAndBioTech
    ].commentsData.get(CommentType.ALLERGEN) as FreeTextComment[];
    return allergenData && <FreeTextView comments={allergenData} />;
  },
});
ColumnConfiguration.set(Column.ccBiotechnology, {
  label: 'Biotechnological Use',
  render: data => {
    const biotechData = data[EntrySection.PathologyAndBioTech].commentsData.get(
      CommentType.BIOTECHNOLOGY
    ) as FreeTextComment[];
    return biotechData && <FreeTextView comments={biotechData} />;
  },
});
ColumnConfiguration.set(Column.ccDisruptionPhenotype, {
  label: 'Disruption Phenotype',
  render: data => {
    const disruptionData = data[
      EntrySection.PathologyAndBioTech
    ].commentsData.get(CommentType.DISRUPTION_PHENOTYPE) as FreeTextComment[];
    return disruptionData && <FreeTextView comments={disruptionData} />;
  },
});
ColumnConfiguration.set(Column.ccDisease, {
  label: 'Disease Involvement',
  render: data => {
    const diseaseComments = data[
      EntrySection.PathologyAndBioTech
    ].commentsData.get(CommentType.DISEASE) as DiseaseComment[];
    return (
      diseaseComments && (
        <DiseaseInvolvementView
          comments={diseaseComments}
          primaryAccession={data.primaryAccession}
        />
      )
    );
  },
});
ColumnConfiguration.set(
  Column.ftMutagen,
  getFeatureColumn(FeatureType.MUTAGEN)
);
ColumnConfiguration.set(Column.ccPharmaceutical, {
  label: 'Pharmaceutical Use',
  render: data => {
    const pharmaData = data[EntrySection.PathologyAndBioTech].commentsData.get(
      CommentType.PHARMACEUTICAL
    ) as FreeTextComment[];
    return pharmaData && <FreeTextView comments={pharmaData} />;
  },
});
ColumnConfiguration.set(Column.ccToxicDose, {
  label: 'Toxic Dose',
  render: data => {
    const toxicData = data[EntrySection.PathologyAndBioTech].commentsData.get(
      CommentType.TOXIC_DOSE
    ) as FreeTextComment[];
    return toxicData && <FreeTextView comments={toxicData} />;
  },
});
ColumnConfiguration.set(
  Column.ftIntramem,
  getFeatureColumn(FeatureType.INTRAMEM)
);
ColumnConfiguration.set(
  Column.ftTopDom,
  getFeatureColumn(FeatureType.TOPO_DOM)
);
ColumnConfiguration.set(
  Column.ftTransmem,
  getFeatureColumn(FeatureType.TRANSMEM)
);
ColumnConfiguration.set(Column.ftChain, getFeatureColumn(FeatureType.CHAIN));
ColumnConfiguration.set(
  Column.ftCrosslnk,
  getFeatureColumn(FeatureType.CROSSLNK)
);
ColumnConfiguration.set(
  Column.ftDisulfide,
  getFeatureColumn(FeatureType.DISULFID)
);
ColumnConfiguration.set(
  Column.ftCarbohyd,
  getFeatureColumn(FeatureType.CARBOHYD)
);
ColumnConfiguration.set(
  Column.ftInitMet,
  getFeatureColumn(FeatureType.INIT_MET)
);
ColumnConfiguration.set(Column.ftLipid, getFeatureColumn(FeatureType.LIPID));
ColumnConfiguration.set(Column.ftModRes, getFeatureColumn(FeatureType.MOD_RES));
ColumnConfiguration.set(
  Column.ftPeptide,
  getFeatureColumn(FeatureType.PEPTIDE)
);
ColumnConfiguration.set(Column.ftPropep, getFeatureColumn(FeatureType.PROPEP));
ColumnConfiguration.set(Column.ftSignal, getFeatureColumn(FeatureType.SIGNAL));
ColumnConfiguration.set(
  Column.ftTransit,
  getFeatureColumn(FeatureType.TRANSIT)
);
ColumnConfiguration.set(Column.ftStrand, getFeatureColumn(FeatureType.STRAND));
ColumnConfiguration.set(Column.ftHelix, getFeatureColumn(FeatureType.HELIX));
ColumnConfiguration.set(Column.ftTurn, getFeatureColumn(FeatureType.TURN));
ColumnConfiguration.set(Column.pmId, {
  label: 'PubMed ID',
  render: data => {
    let ids: Xref[] = [];
    if (data.references) {
      ids = data.references.reduce<Xref[]>((acc, citation) => {
        const xrefs = citation.citation.citationCrossReferences;
        return xrefs
          ? acc.concat(xrefs.filter(xref => xref.database === 'PubMed'))
          : acc;
      }, []);
    }
    return (
      <ExpandableList>
        {ids.map(xref => ({
          id: xref.id,
          content: <Link to={`citations/${xref.id}`}>{xref.id}</Link>,
        }))}
      </ExpandableList>
    );
  },
});
ColumnConfiguration.set(Column.mappedPmId, {
  label: 'Mapped PubMed ID',
  render: () => {
    // TODO This is currently not implemented in the backend see TRM-23257
    // depending on the format, this could use the same processing as PubMed ID
    return '';
  },
});
ColumnConfiguration.set(Column.dateCreate, {
  label: 'Date Created',
  render: data => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && entryAudit.firstPublicDate;
  },
});
ColumnConfiguration.set(Column.dateMod, {
  label: 'Date Modified',
  render: data => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && entryAudit.lastAnnotationUpdateDate;
  },
});
ColumnConfiguration.set(Column.dateSeqMod, {
  label: 'Date Sequence Modified',
  render: data => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && entryAudit.lastSequenceUpdateDate;
  },
});
ColumnConfiguration.set(Column.version, {
  label: 'Version',
  render: data => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && <Fragment>{entryAudit.entryVersion}</Fragment>;
  },
});
ColumnConfiguration.set(Column.ftCoiled, getFeatureColumn(FeatureType.COILED));
ColumnConfiguration.set(
  Column.ftCompbias,
  getFeatureColumn(FeatureType.COMPBIAS)
);
ColumnConfiguration.set(Column.ftDomain, getFeatureColumn(FeatureType.DOMAIN));
ColumnConfiguration.set(Column.ftMotif, getFeatureColumn(FeatureType.MOTIF));
ColumnConfiguration.set(Column.proteinFamilies, {
  label: 'Protein Families',
  render: data => {
    // TODO this actually seems to be a subset of this with a query on link?
    // Could maybe be removed
    const familiesData = data[EntrySection.FamilyAndDomains].commentsData.get(
      CommentType.SIMILARITY
    ) as FreeTextComment[];
    return familiesData && <FreeTextView comments={familiesData} />;
  },
});
ColumnConfiguration.set(Column.ftRegion, getFeatureColumn(FeatureType.REGION));
ColumnConfiguration.set(Column.ftRepeat, getFeatureColumn(FeatureType.REPEAT));
ColumnConfiguration.set(Column.ccSimilarity, {
  label: 'Sequence Similarities',
  render: data => {
    const familiesData = data[EntrySection.FamilyAndDomains].commentsData.get(
      CommentType.SIMILARITY
    ) as FreeTextComment[];
    return familiesData && <FreeTextView comments={familiesData} />;
  },
});
ColumnConfiguration.set(Column.ftZnFing, getFeatureColumn(FeatureType.ZN_FING));
ColumnConfiguration.set(Column.taxId, {
  label: 'Taxon ID',
  render: data => {
    const { organismData } = data[EntrySection.NamesAndTaxonomy];
    return (
      organismData && (
        <Link to={`/taxonomy/${organismData.taxonId}`}>
          {organismData.taxonId}
        </Link>
      )
    );
  },
});
const getXrefColumn = (databaseName: string) => ({
  label: `${databaseName} cross-reference`,
  render: (data: UniProtkbUIModel) => {
    // Get the entry section for the database name
    const entrySection = getDatabaseNameToEntrySection(databaseName);
    if (!entrySection) {
      return undefined;
    }
    const { xrefData } = data[entrySection];
    // Get the category for the database name in the section
    const category = xrefData.find(
      xrefCategory =>
        xrefCategory.category === databaseNameToCategory.get(databaseName)
    );
    if (!category) {
      return undefined;
    }
    // Get the database based on the name
    const xrefsGoupedByDatabase = category.databases.find(
      databaseGroup => databaseGroup.database === databaseName
    );
    return (
      xrefsGoupedByDatabase && (
        <DatabaseList
          xrefsGoupedByDatabase={xrefsGoupedByDatabase}
          primaryAccession={data.primaryAccession}
        />
      )
    );
  },
});

// sc_epred:  can't see in current website
// organelle: can't see in current website
// cc_caution
// feature: do we need? UX
// similarity: this field is wrongly named in the API json (should be cc_similarity). Jira.

// Add all database cross-reference columns
Object.values(Column)
  .filter(col => col.startsWith('dr_'))
  .forEach(colName => {
    const databaseInfo = getDatabaseInfoByName(colName.substring(3));
    if (!databaseInfo || !databaseInfo.name) {
      /* eslint-disable no-console */
      console.error(`No database found for ${colName}`);
      return;
    }
    ColumnConfiguration.set(colName, getXrefColumn(databaseInfo.name));
  });

export default ColumnConfiguration;
