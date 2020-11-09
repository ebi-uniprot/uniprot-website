/* eslint-disable camelcase */
import React, { Fragment } from 'react';
import { ExpandableList, Sequence } from 'franklin-sites';
import { flatten } from 'lodash-es';
import { Link } from 'react-router-dom';

import SimpleView from '../components/protein-data-views/SimpleView';
import ProteinNamesView, {
  ECNumbersView,
} from '../components/protein-data-views/ProteinNamesView';
import TaxonomyView, {
  TaxonomyLineage,
  TaxonomyId,
} from '../../shared/components/entry/TaxonomyView';
import GeneNamesView, {
  geneAlternativeNamesView,
} from '../components/protein-data-views/GeneNamesView';
import { UniProtkbUIModel } from '../adapters/uniProtkbConverter';
import numberView, { Unit } from '../components/protein-data-views/NumberView';
import ProteomesView from '../components/protein-data-views/ProteomesView';
import FeaturesView from '../components/protein-data-views/FeaturesView';
import EntrySection from '../types/entrySection';
import {
  SequenceCautionView,
  MassSpectrometryView,
  RNAEditingView,
  IsoformView,
} from '../../shared/components/entry/SequenceView';
import { Flag } from '../adapters/sequenceConverter';
import FeatureType from '../types/featureType';
import FreeTextView, {
  TextView,
} from '../components/protein-data-views/FreeTextView';
import {
  AbsorptionView,
  KineticsView,
  CofactorView,
} from '../components/entry/FunctionSection';
import {
  FunctionUIModel,
  CofactorComment,
  GoAspect,
  GoTerm,
} from '../adapters/functionConverter';
import { UniProtKBColumn } from '../types/columnTypes';
import {
  CommentType,
  FreeTextComment,
  Xref,
  InteractionComment,
  InteractionType,
  DiseaseComment,
  CatalyticActivityComment,
  SubcellularLocationComment,
} from '../types/commentTypes';
import AnnotationScoreDoughnutChart, {
  DoughnutChartSize,
} from '../components/protein-data-views/AnnotationScoreDoughnutChart';
import { getAllKeywords } from '../utils/KeywordsUtil';
import { KeywordList } from '../components/protein-data-views/KeywordView';
import { ReviewedUnreviewed } from '../../shared/components/entry/EntryTitle';
import { DatabaseList } from '../components/protein-data-views/XRefView';
import {
  databaseNameToCategory,
  getDatabaseNameToEntrySection,
  getDatabaseInfoByName,
} from './database';
import DiseaseInvolvementView from '../components/protein-data-views/DiseaseInvolvementView';
import CatalyticActivityView from '../components/protein-data-views/CatalyticActivityView';
import VariationView from '../components/protein-data-views/VariationView';
import { StructureUIModel } from '../adapters/structureConverter';
import SubcellularLocationView from '../components/protein-data-views/SubcellularLocationView';
import { GOTermsView } from '../components/protein-data-views/GOView';
import externalUrls from './externalUrls';

const getFeatureColumn = (type: FeatureType) => {
  return {
    label: type,
    render: (data: UniProtkbUIModel) => {
      const { featuresData } = data[EntrySection.Sequence];
      return (
        featuresData && (
          <FeaturesView
            features={featuresData.filter((feature) => feature.type === type)}
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
  UniProtKBColumn,
  {
    label: string;
    render: (data: UniProtkbUIModel) => JSX.Element | string | undefined;
  }
>();

ColumnConfiguration.set(UniProtKBColumn.accession, {
  label: 'Entry',
  render: (data: { primaryAccession: string; entryType: string }) => (
    <SimpleView
      termValue={data.primaryAccession}
      linkTo={`/uniprotkb/${data.primaryAccession}`}
    />
  ),
});

ColumnConfiguration.set(UniProtKBColumn.id, {
  label: 'Entry Name',
  render: (data: { uniProtkbId: string }) => (
    <SimpleView termValue={data.uniProtkbId} />
  ),
});

ColumnConfiguration.set(UniProtKBColumn.proteinName, {
  label: 'Protein names',
  render: (data) => {
    const { proteinNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      proteinNamesData && (
        <ProteinNamesView proteinNames={proteinNamesData} noTitles />
      )
    );
  },
});

ColumnConfiguration.set(UniProtKBColumn.geneNames, {
  label: 'Gene Names',
  render: (data) => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      geneNamesData && <GeneNamesView geneNamesData={geneNamesData} noTitles />
    );
  },
});

ColumnConfiguration.set(UniProtKBColumn.organismName, {
  label: 'Organism',
  render: (data) => {
    const { organismData } = data[EntrySection.NamesAndTaxonomy];
    return organismData && <TaxonomyView data={organismData} />;
  },
});

ColumnConfiguration.set(UniProtKBColumn.length, {
  label: 'Length',
  render: (data) => {
    const sequenceData = data[EntrySection.Sequence];
    return (
      sequenceData.sequence &&
      numberView({ value: sequenceData.sequence.length, unit: Unit.AA })
    );
  },
});

ColumnConfiguration.set(UniProtKBColumn.genePrimary, {
  label: 'Gene names (Primary)',
  render: (data) => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <Fragment>
        {geneNamesData &&
          geneNamesData.map((geneData) => {
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

ColumnConfiguration.set(UniProtKBColumn.geneOln, {
  label: 'Gene names (Ordered locus)',
  render: (data) => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <Fragment>
        {geneNamesData &&
          geneNamesData.map(
            (geneData) =>
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

ColumnConfiguration.set(UniProtKBColumn.geneOrf, {
  label: 'Gene names (ORF)',
  render: (data) => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <Fragment>
        {geneNamesData &&
          geneNamesData.map(
            (geneData) =>
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

ColumnConfiguration.set(UniProtKBColumn.geneSynonym, {
  label: 'Gene names (Synonyms)',
  render: (data) => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <Fragment>
        {geneNamesData &&
          geneNamesData.map(
            (geneData) =>
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
ColumnConfiguration.set(UniProtKBColumn.organismId, {
  label: 'Organism',
  render: (data) => {
    const { organismData } = data[EntrySection.NamesAndTaxonomy];
    return organismData && <TaxonomyId taxonId={organismData.taxonId} />;
  },
});

ColumnConfiguration.set(UniProtKBColumn.xrefProteomes, {
  label: 'Proteomes',
  render: (data) => {
    const { proteomesData } = data[EntrySection.NamesAndTaxonomy];
    return proteomesData && <ProteomesView data={proteomesData} isCompact />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.lineage, {
  label: 'Lineage',
  render: (data) => {
    const { organismData } = data[EntrySection.NamesAndTaxonomy];
    return (
      organismData &&
      organismData.lineage && <TaxonomyLineage lineage={organismData.lineage} />
    );
  },
});
ColumnConfiguration.set(UniProtKBColumn.virusHosts, {
  label: 'Virus hosts',
  render: (data) => {
    const { virusHosts } = data[EntrySection.NamesAndTaxonomy];
    return (
      virusHosts && (
        <Fragment>
          {virusHosts.map((host) => (
            <p key={host.taxonId}>
              <TaxonomyView data={host} />
            </p>
          ))}
        </Fragment>
      )
    );
  },
});
ColumnConfiguration.set(UniProtKBColumn.ccAlternativeProducts, {
  label: 'Alternative Products',
  render: (data) => {
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
ColumnConfiguration.set(UniProtKBColumn.sequence, {
  label: 'Sequence',
  render: (data) => {
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

ColumnConfiguration.set(UniProtKBColumn.ftVarSeq, {
  label: 'Alternative sequence',
  render: (data) => {
    const { featuresData } = data[EntrySection.Sequence];
    return (
      <Fragment>
        {featuresData && <FeaturesView features={featuresData} />}
      </Fragment>
    );
  },
});
ColumnConfiguration.set(UniProtKBColumn.fragment, {
  label: 'Fragment',
  render: (data) => {
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
ColumnConfiguration.set(UniProtKBColumn.mass, {
  label: 'Mass',
  render: (data) => {
    const { molWeight } = data[EntrySection.Sequence];
    return numberView({ value: molWeight, unit: Unit.DA });
  },
});

ColumnConfiguration.set(UniProtKBColumn.ccMassSpectrometry, {
  label: 'Mass Spectrometry',
  render: (data) => {
    const { massSpectrometry } = data[EntrySection.Sequence];
    return massSpectrometry && <MassSpectrometryView data={massSpectrometry} />;
  },
});

ColumnConfiguration.set(UniProtKBColumn.ftVariant, {
  label: 'Variants',
  render: (data) => (
    <VariationView primaryAccession={data.primaryAccession} hasTable={false} />
  ),
});

ColumnConfiguration.set(
  UniProtKBColumn.ftNonCon,
  getFeatureColumn(FeatureType.NON_CONS)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftNonStd,
  getFeatureColumn(FeatureType.NON_STD)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftNonTer,
  getFeatureColumn(FeatureType.NON_TER)
);

ColumnConfiguration.set(UniProtKBColumn.ccPolymorphism, {
  label: 'Polymorphysm',
  render: (data) => {
    const { polymorphysm } = data[EntrySection.Sequence];
    return polymorphysm && <FreeTextView comments={polymorphysm} />;
  },
});

ColumnConfiguration.set(UniProtKBColumn.ccRnaEditing, {
  label: 'RNA Editing',
  render: (data) => {
    const { rnaEditing } = data[EntrySection.Sequence];
    return rnaEditing && <RNAEditingView data={rnaEditing} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.errorGmodelPred, {
  label: 'Sequence Caution',
  render: (data) => {
    const { sequenceCaution } = data[EntrySection.Sequence];
    return sequenceCaution && <SequenceCautionView data={sequenceCaution} />;
  },
});

ColumnConfiguration.set(
  UniProtKBColumn.ftConflict,
  getFeatureColumn(FeatureType.CONFLICT)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftUnsure,
  getFeatureColumn(FeatureType.UNSURE)
);
ColumnConfiguration.set(UniProtKBColumn.sequenceVersion, {
  label: 'Sequence Version',
  render: (data) => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && <span>{entryAudit.sequenceVersion}</span>;
  },
});
ColumnConfiguration.set(UniProtKBColumn.absorption, {
  label: 'Absorption',
  render: (data) => {
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
  UniProtKBColumn.ftActSite,
  getFeatureColumn(FeatureType.ACT_SITE)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftBinding,
  getFeatureColumn(FeatureType.BINDING)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftCaBind,
  getFeatureColumn(FeatureType.CA_BIND)
);
ColumnConfiguration.set(UniProtKBColumn.ccCatalyticActivity, {
  label: 'Catalytic Activity',
  render: (data) => {
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
ColumnConfiguration.set(UniProtKBColumn.ccCofactor, {
  label: 'Cofactor',
  render: (data) => {
    const cofactorComments = data[EntrySection.Function].commentsData.get(
      CommentType.COFACTOR
    ) as CofactorComment[];
    return cofactorComments && <CofactorView cofactors={cofactorComments} />;
  },
});
ColumnConfiguration.set(
  UniProtKBColumn.ftDnaBind,
  getFeatureColumn(FeatureType.DNA_BIND)
);
ColumnConfiguration.set(UniProtKBColumn.ec, {
  label: 'EC Number',
  render: (data) => {
    const { proteinNamesData } = data[EntrySection.NamesAndTaxonomy];
    const ecNumbers = proteinNamesData?.recommendedName?.ecNumbers;
    return ecNumbers && <ECNumbersView ecNumbers={ecNumbers} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.ccActivityRegulation, {
  label: 'Activity Regulation',
  render: (data) => {
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
ColumnConfiguration.set(UniProtKBColumn.ccFunction, {
  label: 'Function',
  render: (data) => {
    const functionComments = data[EntrySection.Function].commentsData.get(
      CommentType.FUNCTION
    ) as FreeTextComment[];
    return functionComments && <FreeTextView comments={functionComments} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.kinetics, {
  label: 'Kinetics',
  render: (data) => {
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
ColumnConfiguration.set(
  UniProtKBColumn.ftMetal,
  getFeatureColumn(FeatureType.METAL)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftNpBind,
  getFeatureColumn(FeatureType.NP_BINDL)
);
ColumnConfiguration.set(UniProtKBColumn.ccPathway, {
  label: 'Pathway',
  render: (data) => {
    const pathwayComments = data[EntrySection.Function].commentsData.get(
      CommentType.PATHWAY
    ) as FreeTextComment[];
    return pathwayComments && <FreeTextView comments={pathwayComments} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.phDependence, {
  label: 'pH Dependence',
  render: (data) => {
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
ColumnConfiguration.set(UniProtKBColumn.redoxPotential, {
  label: 'Redox Potential',
  render: (data) => {
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
ColumnConfiguration.set(
  UniProtKBColumn.ftSite,
  getFeatureColumn(FeatureType.SITE)
);
ColumnConfiguration.set(UniProtKBColumn.tempDependence, {
  label: 'Temperature Dependence',
  render: (data) => {
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
ColumnConfiguration.set(UniProtKBColumn.annotationScore, {
  label: 'Score',
  render: (data) => (
    <AnnotationScoreDoughnutChart
      score={data.annotationScore}
      size={DoughnutChartSize.medium}
    />
  ),
});
ColumnConfiguration.set(UniProtKBColumn.ccSequenceCaution, {
  label: 'Sequence Caution',
  render: (data) => {
    const { sequenceCaution } = data[EntrySection.Sequence];
    return sequenceCaution && <SequenceCautionView data={sequenceCaution} />;
  },
});
// feature ,
ColumnConfiguration.set(UniProtKBColumn.keyword, {
  label: 'Keywords',
  render: (data) => {
    const keywords = getAllKeywords(data);
    return <KeywordList keywords={keywords} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.keywordid, {
  label: 'Keyword IDs',
  render: (data) => {
    const keywords = getAllKeywords(data);
    return <KeywordList keywords={keywords} idOnly />;
  },
});
// matched_text: this field is not provided anymore ,
ColumnConfiguration.set(UniProtKBColumn.ccMiscellaneous, {
  label: 'Miscellaneous [CC]',
  render: (data) => {
    const miscellaneousComments = data[EntrySection.Function].commentsData.get(
      CommentType.MISCELLANEOUS
    ) as FreeTextComment[];
    return (
      miscellaneousComments && <FreeTextView comments={miscellaneousComments} />
    );
  },
});
ColumnConfiguration.set(UniProtKBColumn.proteinExistence, {
  label: 'Protein existence',
  render: (data) => data.proteinExistence,
});
ColumnConfiguration.set(UniProtKBColumn.reviewed, {
  label: '',
  render: (data) => <ReviewedUnreviewed entryType={data.entryType} />,
});
// tools: UX review is this needed?? ,
// uniparc_id: leo re-indexing today 02/12/2019,
ColumnConfiguration.set(UniProtKBColumn.ccInteraction, {
  label: 'Interacts with',
  render: (data) => {
    const interactionComments = data[EntrySection.Interaction].commentsData.get(
      CommentType.INTERACTION
    ) as InteractionComment[];
    return (
      interactionComments && (
        <Fragment>
          {interactionComments.map((interactionCC) =>
            interactionCC.interactions.map((interaction) => (
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
ColumnConfiguration.set(UniProtKBColumn.ccSubunit, {
  label: 'Subunit structure',
  render: (data) => {
    const subunitComments = data[EntrySection.Interaction].commentsData.get(
      CommentType.SUBUNIT
    ) as FreeTextComment[];
    return subunitComments && <FreeTextView comments={subunitComments} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.ccDevelopmentalStage, {
  label: 'Developmental stage',
  render: (data) => {
    const developmentComments = data[EntrySection.Expression].commentsData.get(
      CommentType.DEVELOPMENTAL_STAGE
    ) as FreeTextComment[];
    return (
      developmentComments && <FreeTextView comments={developmentComments} />
    );
  },
});
ColumnConfiguration.set(UniProtKBColumn.ccInduction, {
  label: 'Induction',
  render: (data) => {
    const inductionComments = data[EntrySection.Expression].commentsData.get(
      CommentType.INDUCTION
    ) as FreeTextComment[];
    return inductionComments && <FreeTextView comments={inductionComments} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.ccTissueSpecificity, {
  label: 'Tissue Specificity',
  render: (data) => {
    const tissueComment = data[EntrySection.Expression].commentsData.get(
      CommentType.TISSUE_SPECIFICITY
    ) as FreeTextComment[];
    return tissueComment && <FreeTextView comments={tissueComment} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.goP, getGOColumnForAspect(GoAspect.P));
ColumnConfiguration.set(UniProtKBColumn.goC, getGOColumnForAspect(GoAspect.C));
ColumnConfiguration.set(UniProtKBColumn.goF, getGOColumnForAspect(GoAspect.F));
ColumnConfiguration.set(UniProtKBColumn.go, {
  label: 'Gene Ontology',
  render: (data) => {
    const { goTerms } = data[EntrySection.Function] as FunctionUIModel;
    const allGOTerms = goTerms && flatten(Object.values(goTerms));
    return allGOTerms && <GOTermsView data={allGOTerms} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.goId, {
  label: 'Gene Ontology IDs',
  render: (data) => {
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
ColumnConfiguration.set(UniProtKBColumn.structure3D, {
  label: '3D structures',
  render: (data) => {
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
ColumnConfiguration.set(UniProtKBColumn.ccSubcellularLocation, {
  label: 'Subcellular Location',
  render: (data) => {
    const subcellData = data[EntrySection.SubCellularLocation].commentsData.get(
      CommentType.SUBCELLULAR_LOCATION
    ) as SubcellularLocationComment[];
    return subcellData && <SubcellularLocationView comments={subcellData} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.ccDomain, {
  label: 'Domain',
  render: (data) => {
    const domainData = data[EntrySection.FamilyAndDomains].commentsData.get(
      CommentType.DOMAIN
    ) as FreeTextComment[];
    return domainData && <FreeTextView comments={domainData} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.ccPtm, {
  label: 'Post-Translational Modification',
  render: (data) => {
    const ptmData = data[EntrySection.ProteinProcessing].commentsData.get(
      CommentType.PTM
    ) as FreeTextComment[];
    return ptmData && <FreeTextView comments={ptmData} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.ccAllergen, {
  label: 'Allergenic Properties',
  render: (data) => {
    const allergenData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      CommentType.ALLERGEN
    ) as FreeTextComment[];
    return allergenData && <FreeTextView comments={allergenData} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.ccBiotechnology, {
  label: 'Biotechnological Use',
  render: (data) => {
    const biotechData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      CommentType.BIOTECHNOLOGY
    ) as FreeTextComment[];
    return biotechData && <FreeTextView comments={biotechData} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.ccDisruptionPhenotype, {
  label: 'Disruption Phenotype',
  render: (data) => {
    const disruptionData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      CommentType.DISRUPTION_PHENOTYPE
    ) as FreeTextComment[];
    return disruptionData && <FreeTextView comments={disruptionData} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.ccDisease, {
  label: 'Disease Involvement',
  render: (data) => {
    const diseaseComments = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      CommentType.DISEASE
    ) as DiseaseComment[];
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
  UniProtKBColumn.ftMutagen,
  getFeatureColumn(FeatureType.MUTAGEN)
);
ColumnConfiguration.set(UniProtKBColumn.ccPharmaceutical, {
  label: 'Pharmaceutical Use',
  render: (data) => {
    const pharmaData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      CommentType.PHARMACEUTICAL
    ) as FreeTextComment[];
    return pharmaData && <FreeTextView comments={pharmaData} />;
  },
});
ColumnConfiguration.set(UniProtKBColumn.ccToxicDose, {
  label: 'Toxic Dose',
  render: (data) => {
    const toxicData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      CommentType.TOXIC_DOSE
    ) as FreeTextComment[];
    return toxicData && <FreeTextView comments={toxicData} />;
  },
});
ColumnConfiguration.set(
  UniProtKBColumn.ftIntramem,
  getFeatureColumn(FeatureType.INTRAMEM)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftTopDom,
  getFeatureColumn(FeatureType.TOPO_DOM)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftTransmem,
  getFeatureColumn(FeatureType.TRANSMEM)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftChain,
  getFeatureColumn(FeatureType.CHAIN)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftCrosslnk,
  getFeatureColumn(FeatureType.CROSSLNK)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftDisulfide,
  getFeatureColumn(FeatureType.DISULFID)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftCarbohyd,
  getFeatureColumn(FeatureType.CARBOHYD)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftInitMet,
  getFeatureColumn(FeatureType.INIT_MET)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftLipid,
  getFeatureColumn(FeatureType.LIPID)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftModRes,
  getFeatureColumn(FeatureType.MOD_RES)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftPeptide,
  getFeatureColumn(FeatureType.PEPTIDE)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftPropep,
  getFeatureColumn(FeatureType.PROPEP)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftSignal,
  getFeatureColumn(FeatureType.SIGNAL)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftTransit,
  getFeatureColumn(FeatureType.TRANSIT)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftStrand,
  getFeatureColumn(FeatureType.STRAND)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftHelix,
  getFeatureColumn(FeatureType.HELIX)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftTurn,
  getFeatureColumn(FeatureType.TURN)
);
ColumnConfiguration.set(UniProtKBColumn.litPubmedId, {
  label: 'PubMed ID',
  render: (data) => {
    let ids: Xref[] = [];
    if (data.references) {
      ids = data.references.reduce<Xref[]>((acc, citation) => {
        const xrefs = citation.citation.citationCrossReferences;
        return xrefs
          ? acc.concat(xrefs.filter((xref) => xref.database === 'PubMed'))
          : acc;
      }, []);
    }
    return (
      <ExpandableList>
        {ids.map((xref) => ({
          id: xref.id,
          content: <Link to={`citations/${xref.id}`}>{xref.id}</Link>,
        }))}
      </ExpandableList>
    );
  },
});
ColumnConfiguration.set(UniProtKBColumn.mappedPubmedId, {
  label: 'Mapped PubMed ID',
  render: () => {
    // TODO This is currently not implemented in the backend see TRM-23257
    // depending on the format, this could use the same processing as PubMed ID
    return '';
  },
});
ColumnConfiguration.set(UniProtKBColumn.dateCreated, {
  label: 'Date Created',
  render: (data) => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && entryAudit.firstPublicDate;
  },
});
ColumnConfiguration.set(UniProtKBColumn.dateModified, {
  label: 'Date Modified',
  render: (data) => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && entryAudit.lastAnnotationUpdateDate;
  },
});
ColumnConfiguration.set(UniProtKBColumn.dateSequenceModified, {
  label: 'Date Sequence Modified',
  render: (data) => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && entryAudit.lastSequenceUpdateDate;
  },
});
ColumnConfiguration.set(UniProtKBColumn.version, {
  label: 'Version',
  render: (data) => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && <Fragment>{entryAudit.entryVersion}</Fragment>;
  },
});
ColumnConfiguration.set(
  UniProtKBColumn.ftCoiled,
  getFeatureColumn(FeatureType.COILED)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftCompbias,
  getFeatureColumn(FeatureType.COMPBIAS)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftDomain,
  getFeatureColumn(FeatureType.DOMAIN)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftMotif,
  getFeatureColumn(FeatureType.MOTIF)
);
ColumnConfiguration.set(UniProtKBColumn.proteinFamilies, {
  label: 'Protein Families',
  render: (data) => {
    // TODO this actually seems to be a subset of this with a query on link?
    // Could maybe be removed
    const familiesData = data[EntrySection.FamilyAndDomains].commentsData.get(
      CommentType.SIMILARITY
    ) as FreeTextComment[];
    return familiesData && <FreeTextView comments={familiesData} />;
  },
});
ColumnConfiguration.set(
  UniProtKBColumn.ftRegion,
  getFeatureColumn(FeatureType.REGION)
);
ColumnConfiguration.set(
  UniProtKBColumn.ftRepeat,
  getFeatureColumn(FeatureType.REPEAT)
);
ColumnConfiguration.set(UniProtKBColumn.ccSimilarity, {
  label: 'Sequence Similarities',
  render: (data) => {
    const familiesData = data[EntrySection.FamilyAndDomains].commentsData.get(
      CommentType.SIMILARITY
    ) as FreeTextComment[];
    return familiesData && <FreeTextView comments={familiesData} />;
  },
});
ColumnConfiguration.set(
  UniProtKBColumn.ftZnFing,
  getFeatureColumn(FeatureType.ZN_FING)
);
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
    const category = xrefData?.find(
      (xrefCategory) =>
        xrefCategory.category === databaseNameToCategory.get(databaseName)
    );
    if (!category) {
      return undefined;
    }
    // Get the database based on the name
    const xrefsGoupedByDatabase = category.databases.find(
      (databaseGroup) => databaseGroup.database === databaseName
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
Object.values(UniProtKBColumn)
  .filter((col) => col.startsWith('dr_'))
  .forEach((colName) => {
    const databaseInfo = getDatabaseInfoByName(colName.substring(3));
    if (!databaseInfo || !databaseInfo.name) {
      /* eslint-disable no-console */
      console.error(`No database found for ${colName}`);
      return;
    }
    ColumnConfiguration.set(colName, getXrefColumn(databaseInfo.name));
  });

export default ColumnConfiguration;
