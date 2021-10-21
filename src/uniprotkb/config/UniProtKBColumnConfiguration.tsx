/* eslint-disable camelcase */
import { ExpandableList, LongNumber, Sequence } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { omit } from 'lodash-es';
import SimpleView from '../../shared/components/views/SimpleView';
import { ECNumbersView } from '../components/protein-data-views/ProteinNamesView';
import TaxonomyView, {
  TaxonomyLineage,
} from '../../shared/components/entry/TaxonomyView';
import { UniProtkbUIModel } from '../adapters/uniProtkbConverter';
import ProteomesView from '../components/protein-data-views/ProteomesView';
import FeaturesView from '../components/protein-data-views/UniProtKBFeaturesView';
import EntrySection from '../types/entrySection';
import {
  SequenceCautionView,
  MassSpectrometryView,
  RNAEditingView,
  IsoformView,
} from '../../shared/components/entry/SequenceView';
import {
  fragmentFlags,
  sequenceFeaturesToColumns,
} from '../adapters/sequenceConverter';
import FeatureType, {
  DiseaseAndDrugsFeatures,
  FunctionFeatures,
  ProteinProcessingFeatures,
  SequenceFeatures,
  SubcellularLocationFeatures,
} from '../types/featureType';
import FreeTextView, {
  TextView,
} from '../components/protein-data-views/FreeTextView';
import {
  AbsorptionView,
  KineticsView,
  CofactorView,
} from '../components/entry/FunctionSection';
import {
  functionFeaturesToColumns,
  FunctionUIModel,
  GoAspect,
  GoTerm,
} from '../adapters/functionConverter';
import { UniProtKBColumn } from '../types/columnTypes';
import {
  CofactorComment,
  FreeTextComment,
  InteractionComment,
  InteractionType,
  DiseaseComment,
  CatalyticActivityComment,
  SubcellularLocationComment,
} from '../types/commentTypes';
import AnnotationScoreDoughnutChart, {
  DoughnutChartSize,
} from '../components/protein-data-views/AnnotationScoreDoughnutChart';
import { KeywordList } from '../components/protein-data-views/KeywordView';
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
import GOTermsView from '../components/protein-data-views/GOTermsView';
import EntryTypeIcon, {
  EntryType,
} from '../../shared/components/entry/EntryTypeIcon';
import AccessionView from '../../shared/components/results/AccessionView';
import CSVView from '../components/protein-data-views/CSVView';

import { getAllKeywords } from '../utils/KeywordsUtil';
import externalUrls from '../../shared/config/externalUrls';
import { getEntryPath } from '../../app/config/urls';
import { fromColumnConfig } from '../../tools/id-mapping/config/IdMappingColumnConfiguration';
import { sortInteractionData } from '../utils/resultsUtils';
import * as logging from '../../shared/utils/logging';

import { Namespace } from '../../shared/types/namespaces';
import { ColumnConfiguration } from '../../shared/types/columnConfiguration';
import { Interactant } from '../adapters/interactionConverter';

import helper from '../../shared/styles/helper.module.scss';
import { diseaseAndDrugsFeaturesToColumns } from '../adapters/diseaseAndDrugs';
import { subcellularLocationFeaturesToColumns } from '../adapters/subcellularLocationConverter';
import { proteinProcessingFeaturesToColumns } from '../adapters/proteinProcessingConverter';

export const defaultColumns = [
  UniProtKBColumn.accession,
  UniProtKBColumn.reviewed,
  UniProtKBColumn.id,
  UniProtKBColumn.proteinName,
  UniProtKBColumn.geneNames,
  UniProtKBColumn.organismName,
];

export const primaryKeyColumns = [UniProtKBColumn.accession];

const getFeatureColumn = (
  type: FeatureType,
  section:
    | EntrySection.DiseaseAndDrugs
    | EntrySection.FamilyAndDomains
    | EntrySection.Function
    | EntrySection.ProteinProcessing
    | EntrySection.Sequence
    | EntrySection.Structure
    | EntrySection.SubCellularLocation
) => ({
  label: type,
  render: (data: UniProtkbUIModel) => {
    const { featuresData } = data[section];
    return (
      featuresData && (
        <FeaturesView
          features={featuresData.filter((feature) => feature.type === type)}
        />
      )
    );
  },
});

const getGOColumnForAspect = (aspect: GoAspect) => ({
  label: `Gene Ontology - ${aspect}`,
  render: (data: UniProtkbUIModel) => {
    const { goTerms } = data[EntrySection.Function] as FunctionUIModel;
    const goProcessTerms = goTerms && goTerms.get(aspect);
    return goProcessTerms && <GOTermsView data={goProcessTerms} />;
  },
});

export const UniProtKBColumnConfiguration: ColumnConfiguration<
  UniProtKBColumn,
  UniProtkbUIModel
> = new Map();

UniProtKBColumnConfiguration.set(UniProtKBColumn.accession, {
  label: 'Entry',
  render: (data) => (
    <AccessionView id={data.primaryAccession} namespace={Namespace.uniprotkb} />
  ),
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.id, {
  label: 'Entry Name',
  render: (data) => <SimpleView termValue={data.uniProtkbId} />,
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.proteinName, {
  label: 'Protein Names',
  render: (data) => {
    const { proteinNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <CSVView
        data={omit(proteinNamesData, 'contains')}
        bolderFirst={Boolean(proteinNamesData?.recommendedName)}
      />
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.geneNames, {
  label: 'Gene Names',
  render: (data) => (
    <CSVView
      data={data[EntrySection.NamesAndTaxonomy].geneNamesData}
      bolderFirst
    />
  ),
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.organismName, {
  label: 'Organism',
  render: (data) => {
    const { organismData } = data[EntrySection.NamesAndTaxonomy];
    return organismData && <TaxonomyView data={organismData} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.length, {
  label: 'Length',
  render(data) {
    const { sequence } = data[EntrySection.Sequence];
    return (
      sequence?.length && (
        <>
          <LongNumber>{sequence.length}</LongNumber>
          {' AA'}
        </>
      )
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.genePrimary, {
  label: 'Gene Names (Primary)',
  render(data) {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];

    const names = geneNamesData?.map((geneNames) => geneNames.geneName?.value);

    return (
      <ExpandableList descriptionString="gene names" numberCollapsedItems={1}>
        {names}
      </ExpandableList>
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.geneOln, {
  label: 'Gene Names (Ordered locus)',
  render(data) {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];

    const names = geneNamesData?.flatMap((geneNames) =>
      geneNames.orderedLocusNames?.map((synonym) => synonym.value)
    );

    return (
      <ExpandableList descriptionString="gene names" numberCollapsedItems={1}>
        {names}
      </ExpandableList>
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.geneOrf, {
  label: 'Gene Names (ORF)',
  render(data) {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];

    const names = geneNamesData?.flatMap((geneNames) =>
      geneNames.orfNames?.map((synonym) => synonym.value)
    );

    return (
      <ExpandableList descriptionString="gene names" numberCollapsedItems={1}>
        {names}
      </ExpandableList>
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.geneSynonym, {
  label: 'Gene Names (Synonyms)',
  render(data) {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];

    const names = geneNamesData?.flatMap((geneNames) => [
      geneNames.synonyms?.map((synonym) => synonym.value),
    ]);

    return (
      <ExpandableList descriptionString="gene names" numberCollapsedItems={1}>
        {names}
      </ExpandableList>
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.organismId, {
  label: 'Organism ID',
  render: (data) => {
    const { organismData } = data[EntrySection.NamesAndTaxonomy];
    return organismData && <TaxonomyView data={organismData} displayOnlyID />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.xrefProteomes, {
  label: 'Proteomes',
  render: (data) => {
    const { proteomesData } = data[EntrySection.NamesAndTaxonomy];
    return proteomesData && <ProteomesView data={proteomesData} isCompact />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.lineage, {
  label: 'Lineage',
  render(data) {
    const { organismData } = data[EntrySection.NamesAndTaxonomy];
    return (
      organismData?.lineage && (
        <TaxonomyLineage lineage={organismData.lineage as string[]} />
      )
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.organismHosts, {
  label: 'Virus hosts',
  render: (data) => {
    const { organismHosts } = data[EntrySection.NamesAndTaxonomy];
    return (
      <ExpandableList descriptionString="hosts" displayNumberOfHiddenItems>
        {organismHosts?.map((host) => (
          <TaxonomyView key={host.taxonId} data={host} />
        ))}
      </ExpandableList>
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccAlternativeProducts, {
  label: 'Alternative Products',
  render(data) {
    const { alternativeProducts } = data[EntrySection.Sequence];
    return (
      alternativeProducts && (
        <IsoformView
          alternativeProducts={alternativeProducts}
          includeSequences={false}
          canonicalAccession={data.primaryAccession}
        />
      )
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.sequence, {
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

UniProtKBColumnConfiguration.set(UniProtKBColumn.fragment, {
  label: 'Fragment',
  render: (data) => {
    const { flag } = data[EntrySection.Sequence];
    const isFragment = flag && fragmentFlags.has(flag);
    return flag && (isFragment ? flag : 'N');
  },
});

// gene_location ,  "Invalid fields parameter value 'gene_location'"
UniProtKBColumnConfiguration.set(UniProtKBColumn.mass, {
  label: 'Mass',
  render: (data) => {
    const { molWeight } = data[EntrySection.Sequence];
    return (
      molWeight && (
        <>
          <LongNumber>{molWeight}</LongNumber>
          {' Da'}
        </>
      )
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccMassSpectrometry, {
  label: 'Mass Spectrometry',
  render: (data) => {
    const { massSpectrometry } = data[EntrySection.Sequence];
    return massSpectrometry && <MassSpectrometryView data={massSpectrometry} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ftVariant, {
  label: 'Variants',
  render: (data) => (
    <VariationView primaryAccession={data.primaryAccession} onlyTable />
  ),
});

// TODO abstract to function

for (const featureType in functionFeaturesToColumns) {
  if (
    Object.prototype.hasOwnProperty.call(functionFeaturesToColumns, featureType)
  ) {
    const typedFeatureType = featureType as FunctionFeatures;
    UniProtKBColumnConfiguration.set(
      functionFeaturesToColumns[typedFeatureType],
      getFeatureColumn(typedFeatureType, EntrySection.Function)
    );
  }
}

for (const featureType in sequenceFeaturesToColumns) {
  if (
    Object.prototype.hasOwnProperty.call(sequenceFeaturesToColumns, featureType)
  ) {
    const typedFeatureType = featureType as SequenceFeatures;
    UniProtKBColumnConfiguration.set(
      sequenceFeaturesToColumns[typedFeatureType],
      getFeatureColumn(typedFeatureType, EntrySection.Sequence)
    );
  }
}

for (const featureType in diseaseAndDrugsFeaturesToColumns) {
  if (
    Object.prototype.hasOwnProperty.call(
      diseaseAndDrugsFeaturesToColumns,
      featureType
    )
  ) {
    const typedFeatureType = featureType as DiseaseAndDrugsFeatures;
    UniProtKBColumnConfiguration.set(
      diseaseAndDrugsFeaturesToColumns[typedFeatureType],
      getFeatureColumn(typedFeatureType, EntrySection.DiseaseAndDrugs)
    );
  }
}

for (const featureType in subcellularLocationFeaturesToColumns) {
  if (
    Object.prototype.hasOwnProperty.call(
      subcellularLocationFeaturesToColumns,
      featureType
    )
  ) {
    const typedFeatureType = featureType as SubcellularLocationFeatures;
    UniProtKBColumnConfiguration.set(
      subcellularLocationFeaturesToColumns[typedFeatureType],
      getFeatureColumn(typedFeatureType, EntrySection.SubCellularLocation)
    );
  }
}

for (const featureType in proteinProcessingFeaturesToColumns) {
  if (
    Object.prototype.hasOwnProperty.call(
      proteinProcessingFeaturesToColumns,
      featureType
    )
  ) {
    const typedFeatureType = featureType as ProteinProcessingFeatures;
    UniProtKBColumnConfiguration.set(
      proteinProcessingFeaturesToColumns[typedFeatureType],
      getFeatureColumn(typedFeatureType, EntrySection.ProteinProcessing)
    );
  }
}

// TODO END

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccPolymorphism, {
  label: 'polymorphism',
  render: (data) => {
    const { polymorphism } = data[EntrySection.Sequence];
    return <FreeTextView comments={polymorphism} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccRnaEditing, {
  label: 'RNA Editing',
  render: (data) => {
    const { rnaEditing } = data[EntrySection.Sequence];
    return rnaEditing && <RNAEditingView data={rnaEditing} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.errorGmodelPred, {
  label: 'Sequence Caution',
  render: (data) => {
    const { sequenceCaution } = data[EntrySection.Sequence];
    return sequenceCaution && <SequenceCautionView data={sequenceCaution} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.sequenceVersion, {
  label: 'Sequence Version',
  render: (data) => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && <span>{entryAudit.sequenceVersion}</span>;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.absorption, {
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

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccCatalyticActivity, {
  label: 'Catalytic Activity',
  render: (data) => {
    const catalyticActivityComments = data[
      EntrySection.Function
    ].commentsData.get('CATALYTIC ACTIVITY') as
      | CatalyticActivityComment[]
      | undefined;
    return (
      catalyticActivityComments && (
        <CatalyticActivityView comments={catalyticActivityComments} />
      )
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccCofactor, {
  label: 'Cofactor',
  render: (data) => {
    const cofactorComments = data[EntrySection.Function].commentsData.get(
      'COFACTOR'
    ) as CofactorComment[] | undefined;
    return cofactorComments && <CofactorView cofactors={cofactorComments} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ec, {
  label: 'EC Number',
  render: (data) => {
    const { proteinNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <ECNumbersView
        ecNumbers={proteinNamesData?.recommendedName?.ecNumbers}
        noEvidence
      />
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccActivityRegulation, {
  label: 'Activity Regulation',
  render: (data) => {
    const activityRegulationComments = data[
      EntrySection.Function
    ].commentsData.get('ACTIVITY REGULATION') as FreeTextComment[] | undefined;
    return (
      <ExpandableList numberCollapsedItems={1}>
        {activityRegulationComments}
      </ExpandableList>
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccFunction, {
  label: 'Function',
  render: (data) => {
    const functionComments = data[EntrySection.Function].commentsData.get(
      'FUNCTION'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={functionComments} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.kinetics, {
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

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccPathway, {
  label: 'Pathway',
  render: (data) => {
    const pathwayComments = data[EntrySection.Function].commentsData.get(
      'PATHWAY'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={pathwayComments} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.phDependence, {
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

UniProtKBColumnConfiguration.set(UniProtKBColumn.redoxPotential, {
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

UniProtKBColumnConfiguration.set(UniProtKBColumn.tempDependence, {
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

UniProtKBColumnConfiguration.set(UniProtKBColumn.annotationScore, {
  label: 'Score',
  render: (data) => (
    <AnnotationScoreDoughnutChart
      score={data.annotationScore}
      size={DoughnutChartSize.medium}
    />
  ),
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccSequenceCaution, {
  label: 'Sequence Caution',
  render: (data) => {
    const { sequenceCaution } = data[EntrySection.Sequence];
    return sequenceCaution && <SequenceCautionView data={sequenceCaution} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.featureCount, {
  label: 'Features',
  render: (data) => {
    const counts = data?.extraAttributes?.countByFeatureType;
    return (
      counts && (
        <ExpandableList displayNumberOfHiddenItems descriptionString="features">
          {Object.keys(counts)
            .sort()
            .map((feature) => `${feature} (${counts[feature as FeatureType]})`)}
        </ExpandableList>
      )
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.keyword, {
  label: 'Keywords',
  render: (data) => <KeywordList keywords={getAllKeywords(data)} />,
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.keywordid, {
  label: 'Keyword IDs',
  render: (data) => <KeywordList keywords={getAllKeywords(data)} idOnly />,
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccMiscellaneous, {
  label: 'Miscellaneous [CC]',
  render: (data) => {
    const miscellaneousComments = data[EntrySection.Function].commentsData.get(
      'MISCELLANEOUS'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={miscellaneousComments} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.proteinExistence, {
  label: 'Protein existence',
  render: (data) => data.proteinExistence,
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.reviewed, {
  label: '',
  render: (data) => <EntryTypeIcon entryType={data.entryType} />,
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.uniparcId, {
  label: (
    <>
      <EntryTypeIcon entryType={EntryType.UNIPARC} />
      UniParc
    </>
  ),
  render(data) {
    const accession = data.extraAttributes?.uniParcId as string | undefined;
    return (
      accession && (
        <Link to={getEntryPath(Namespace.uniparc, accession)}>{accession}</Link>
      )
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccInteraction, {
  label: 'Interacts with',
  render: (data) => {
    const interactionComments = data[EntrySection.Interaction].commentsData.get(
      'INTERACTION'
    ) as InteractionComment[] | undefined;
    const { primaryAccession } = data;

    const interactionDataMap = new Map<
      string,
      Interactant | InteractionType.SELF
    >();

    interactionComments?.forEach((interactionCC) =>
      interactionCC.interactions.forEach((interaction) => {
        // Note: currently the interaction type is missing from the request.
        // Check again when it has been added.
        if (
          interaction.type === InteractionType.SELF ||
          (interaction.interactantOne.uniProtKBAccession === primaryAccession &&
            interaction.interactantTwo.uniProtKBAccession === primaryAccession)
        ) {
          interactionDataMap.set(InteractionType.SELF, InteractionType.SELF);
        } else if (
          interaction.interactantOne.uniProtKBAccession === primaryAccession &&
          interaction.interactantTwo.uniProtKBAccession
        ) {
          interactionDataMap.set(
            interaction.interactantTwo.uniProtKBAccession,
            interaction.interactantTwo
          );
        } else if (
          interaction.interactantTwo.uniProtKBAccession === primaryAccession &&
          interaction.interactantOne.uniProtKBAccession
        ) {
          interactionDataMap.set(
            interaction.interactantOne.uniProtKBAccession,
            interaction.interactantOne
          );
        }
        // Some of the interactions are second level so don't feature the primaryAccession
        // just ignore them.
      })
    );

    const sortedInteractions = sortInteractionData(interactionDataMap);

    return (
      <ExpandableList displayNumberOfHiddenItems>
        {sortedInteractions.map((interactant) =>
          interactant === InteractionType.SELF ? (
            'Itself'
          ) : (
            <div
              key={interactant.uniProtKBAccession}
              className={helper['no-wrap']}
            >
              {interactant.uniProtKBAccession && (
                <Link
                  to={getEntryPath(
                    Namespace.uniprotkb,
                    interactant.uniProtKBAccession
                  )}
                >
                  {interactant.uniProtKBAccession}
                </Link>
              )}{' '}
              {interactant.geneName && `(${interactant.geneName})`}
            </div>
          )
        )}
      </ExpandableList>
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccSubunit, {
  label: 'Subunit structure',
  render: (data) => {
    const subunitComments = data[EntrySection.Interaction].commentsData.get(
      'SUBUNIT'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={subunitComments} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccDevelopmentalStage, {
  label: 'Developmental stage',
  render: (data) => {
    const developmentComments = data[EntrySection.Expression].commentsData.get(
      'DEVELOPMENTAL STAGE'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={developmentComments} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccInduction, {
  label: 'Induction',
  render: (data) => {
    const inductionComments = data[EntrySection.Expression].commentsData.get(
      'INDUCTION'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={inductionComments} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccTissueSpecificity, {
  label: 'Tissue Specificity',
  render: (data) => {
    const tissueComment = data[EntrySection.Expression].commentsData.get(
      'TISSUE SPECIFICITY'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={tissueComment} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.goP,
  getGOColumnForAspect(GoAspect.P)
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.goC,
  getGOColumnForAspect(GoAspect.C)
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.goF,
  getGOColumnForAspect(GoAspect.F)
);

UniProtKBColumnConfiguration.set(UniProtKBColumn.go, {
  label: 'Gene Ontology',
  render(data) {
    const { goTerms } = data[EntrySection.Function] as FunctionUIModel;
    return (
      goTerms && <GOTermsView data={Array.from(goTerms.values()).flat()} />
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.goId, {
  label: 'Gene Ontology IDs',
  render(data) {
    const { goTerms } = data[EntrySection.Function] as FunctionUIModel;
    return (
      goTerms && (
        <section className="text-block">
          <ExpandableList descriptionString="IDs" displayNumberOfHiddenItems>
            {Array.from(goTerms.values())
              .flat()
              .map(
                ({ id }: GoTerm) =>
                  id && (
                    <a key={id} href={externalUrls.QuickGO(id)}>
                      {id}
                    </a>
                  )
              )}
          </ExpandableList>
        </section>
      )
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.structure3D, {
  label: '3D structures',
  render: (data) => {
    const structureData = (data[EntrySection.Structure] as StructureUIModel)
      .structures;
    return (
      structureData && (
        <>
          {Object.entries(structureData).map(([method, xrefs]) => (
            <div key={method}>
              {xrefs && (
                <>
                  {method}: {xrefs.length}
                </>
              )}
            </div>
          ))}
        </>
      )
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccSubcellularLocation, {
  label: 'Subcellular Location',
  render: (data) => {
    const subcellData = data[EntrySection.SubCellularLocation].commentsData.get(
      'SUBCELLULAR LOCATION'
    ) as SubcellularLocationComment[] | undefined;
    return subcellData && <SubcellularLocationView comments={subcellData} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccDomain, {
  label: 'Domain',
  render: (data) => {
    const domainData = data[EntrySection.FamilyAndDomains].commentsData.get(
      'DOMAIN'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={domainData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccPtm, {
  label: 'Post-Translational Modification',
  render: (data) => {
    const ptmData = data[EntrySection.ProteinProcessing].commentsData.get(
      'PTM'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={ptmData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccAllergen, {
  label: 'Allergenic Properties',
  render: (data) => {
    const allergenData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'ALLERGEN'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={allergenData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccBiotechnology, {
  label: 'Biotechnological Use',
  render: (data) => {
    const biotechData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'BIOTECHNOLOGY'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={biotechData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccDisruptionPhenotype, {
  label: 'Disruption Phenotype',
  render: (data) => {
    const disruptionData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'DISRUPTION PHENOTYPE'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={disruptionData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccDisease, {
  label: 'Disease Involvement',
  render: (data) => {
    const diseaseComments = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'DISEASE'
    ) as DiseaseComment[] | undefined;
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

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccPharmaceutical, {
  label: 'Pharmaceutical Use',
  render: (data) => {
    const pharmaData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'PHARMACEUTICAL'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={pharmaData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccToxicDose, {
  label: 'Toxic Dose',
  render: (data) => {
    const toxicData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'TOXIC DOSE'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={toxicData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftStrand,
  getFeatureColumn('Beta strand', EntrySection.Structure)
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftHelix,
  getFeatureColumn('Helix', EntrySection.Structure)
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftTurn,
  getFeatureColumn('Turn', EntrySection.Structure)
);

UniProtKBColumnConfiguration.set(UniProtKBColumn.litPubmedId, {
  label: 'Citation ID',
  render: (data) => (
    <ExpandableList descriptionString="IDs" displayNumberOfHiddenItems>
      {data.references?.map(
        (reference) =>
          reference.citation && (
            <Link
              key={reference.citation.id}
              to={getEntryPath(Namespace.citations, reference.citation.id)}
            >
              {reference.citation.id}
            </Link>
          )
      )}
    </ExpandableList>
  ),
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.mappedPubmedId, {
  label: 'Mapped PubMed ID',
  render: () =>
    // TODO This is currently not implemented in the backend see TRM-23257
    // depending on the format, this could use the same processing as PubMed ID
    '',
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.dateCreated, {
  label: 'Date Created',
  render: (data) => data[EntrySection.Sequence]?.entryAudit?.firstPublicDate,
});
UniProtKBColumnConfiguration.set(UniProtKBColumn.dateModified, {
  label: 'Date Modified',
  render: (data) =>
    data[EntrySection.Sequence]?.entryAudit?.lastAnnotationUpdateDate,
});
UniProtKBColumnConfiguration.set(UniProtKBColumn.dateSequenceModified, {
  label: 'Date Sequence Modified',
  render: (data) =>
    data[EntrySection.Sequence]?.entryAudit?.lastSequenceUpdateDate,
});
UniProtKBColumnConfiguration.set(UniProtKBColumn.version, {
  label: 'Version',
  render: (data) => data[EntrySection.Sequence]?.entryAudit?.entryVersion,
});
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftDomain,
  getFeatureColumn('Domain', EntrySection.FamilyAndDomains)
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftMotif,
  getFeatureColumn('Motif', EntrySection.FamilyAndDomains)
);

UniProtKBColumnConfiguration.set(UniProtKBColumn.proteinFamilies, {
  label: 'Protein Families',
  render: (data) => {
    // TODO this actually seems to be a subset of this with a query on link?
    // Could maybe be removed
    const familiesData = data[EntrySection.FamilyAndDomains].commentsData.get(
      'SIMILARITY'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={familiesData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftRegion,
  getFeatureColumn('Region', EntrySection.FamilyAndDomains)
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftRepeat,
  getFeatureColumn('Repeat', EntrySection.FamilyAndDomains)
);

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccSimilarity, {
  label: 'Sequence Similarities',
  render: (data) => {
    const familiesData = data[EntrySection.FamilyAndDomains].commentsData.get(
      'SIMILARITY'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={familiesData} noEvidence />;
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

// TODO: review below if fields are still needed
// sc_epred:  can't see in current website
// organelle: can't see in current website
// cc_caution
// similarity: this field is wrongly named in the API json (should be cc_similarity). Jira.
// ft_non_cons

const reXrefPrefix = /^xref_/;
// Add all database cross-reference columns
Object.values(UniProtKBColumn)
  .filter((col) => col.match(reXrefPrefix))
  .forEach((colName) => {
    const databaseInfo = getDatabaseInfoByName(
      colName.replace(reXrefPrefix, '')
    );
    if (!databaseInfo || !databaseInfo.name) {
      logging.error(`No database found for ${colName}`);
      return;
    }
    UniProtKBColumnConfiguration.set(colName, getXrefColumn(databaseInfo.name));
  });

UniProtKBColumnConfiguration.set(UniProtKBColumn.from, fromColumnConfig);

export default UniProtKBColumnConfiguration;
