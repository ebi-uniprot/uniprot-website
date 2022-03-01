/* eslint-disable camelcase */
import {
  ExpandableList,
  ExternalLink,
  LongNumber,
  SearchIcon,
  Sequence,
  SequenceTools,
} from 'franklin-sites';
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
import EntrySection, { EntrySectionWithFeatures } from '../types/entrySection';
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
  FamilyAndDomainsFeatures,
  FunctionFeatures,
  ProteinProcessingFeatures,
  SequenceFeatures,
  StructureFeatures,
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
  GOAspectLabel,
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
  CommentType,
} from '../types/commentTypes';
import AnnotationScoreDoughnutChart, {
  DoughnutChartSize,
} from '../components/protein-data-views/AnnotationScoreDoughnutChart';
import { KeywordList } from '../components/protein-data-views/KeywordView';
// import { DatabaseList } from '../components/protein-data-views/XRefView';
import DiseaseInvolvementView from '../components/protein-data-views/DiseaseInvolvementView';
import CatalyticActivityView, {
  getRheaId,
  isRheaReactionReference,
} from '../components/protein-data-views/CatalyticActivityView';
import VariationView from '../components/protein-data-views/VariationView';
import {
  structureFeaturesToColumns,
  StructureUIModel,
} from '../adapters/structureConverter';
import SubcellularLocationView from '../components/protein-data-views/SubcellularLocationView';
import GOTermsView from '../components/protein-data-views/GOTermsView';
import EntryTypeIcon, {
  EntryType,
} from '../../shared/components/entry/EntryTypeIcon';
import AccessionView from '../../shared/components/results/AccessionView';
import CSVView from '../components/protein-data-views/CSVView';
import { DatabaseList } from '../components/protein-data-views/XRefView';
import { PeptideSearchMatches } from '../../tools/peptide-search/components/PeptideSearchMatches';

import useDatabaseInfoMaps from '../../shared/hooks/useDatabaseInfoMaps';

import { getAllKeywords } from '../utils/KeywordsUtil';
import externalUrls from '../../shared/config/externalUrls';
import { getEntryPath, LocationToPath, Location } from '../../app/config/urls';
import { fromColumnConfig } from '../../tools/id-mapping/config/IdMappingColumnConfiguration';
import { sortInteractionData } from '../utils/resultsUtils';
import getLabelAndTooltip from '../../shared/utils/getLabelAndTooltip';
import getFeatureLabelAndTooltip from '../../help/config/featureColumnHeaders';
import * as logging from '../../shared/utils/logging';
import { getDatabaseNameFromColumn, isDatabaseColumn } from '../utils/database';
import { diseaseAndDrugsFeaturesToColumns } from '../adapters/diseaseAndDrugs';
import { subcellularLocationFeaturesToColumns } from '../adapters/subcellularLocationConverter';
import { proteinProcessingFeaturesToColumns } from '../adapters/proteinProcessingConverter';
import { familyAndDomainsFeaturesToColumns } from '../adapters/familyAndDomainsConverter';

import SharedColumnConfiguration from '../../shared/config/ColumnConfiguration';

import { Namespace } from '../../shared/types/namespaces';
import { ColumnConfiguration } from '../../shared/types/columnConfiguration';
import { Interactant } from '../adapters/interactionConverter';
import { ValueWithEvidence } from '../types/modelTypes';

import helper from '../../shared/styles/helper.module.scss';

export const defaultColumns = [
  UniProtKBColumn.accession,
  UniProtKBColumn.reviewed,
  UniProtKBColumn.id,
  UniProtKBColumn.proteinName,
  UniProtKBColumn.geneNames,
  UniProtKBColumn.organismName,
  UniProtKBColumn.length,
];

export const primaryKeyColumns = [UniProtKBColumn.accession];

const getFeatureColumn = (
  type: FeatureType,
  section: EntrySectionWithFeatures,
  column: UniProtKBColumn
) => ({
  ...getFeatureLabelAndTooltip(type, column),
  render: (data: UniProtkbUIModel) => {
    const { featuresData } = data[section];
    return (
      featuresData && (
        <FeaturesView
          primaryAccession={data.primaryAccession}
          features={featuresData.filter((feature) => feature.type === type)}
          withDataTable={false}
        />
      )
    );
  },
});

const getGOColumnForAspect = (aspect: GOAspectLabel) => ({
  ...getLabelAndTooltip(
    `Gene Ontology - ${aspect}`,
    'Gene Ontology (GO) terms associated with the entry',
    'gene_ontology'
  ),
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
  ...getLabelAndTooltip('Entry', 'Unique and stable entry identifier.'),
  render: (data) => (
    <AccessionView id={data.primaryAccession} namespace={Namespace.uniprotkb} />
  ),
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.id, {
  ...getLabelAndTooltip(
    'Entry Name',
    'Mnemonic identifier of a UniProtKB entry',
    'entry_name'
  ),
  render: (data) => <SimpleView termValue={data.uniProtkbId} />,
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.proteinName, {
  ...getLabelAndTooltip(
    'Protein Names',
    'Name(s) and synonym(s) of the protein',
    'protein_names'
  ),
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
  ...getLabelAndTooltip(
    'Gene Names',
    'Name(s) of the gene(s) encoding the protein',
    'gene_name'
  ),
  render: (data) => (
    <CSVView
      data={data[EntrySection.NamesAndTaxonomy].geneNamesData}
      bolderFirst
    />
  ),
});

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.organismName,
  SharedColumnConfiguration.organism(
    (data: UniProtkbUIModel) => data[EntrySection.NamesAndTaxonomy].organismData
  )
);

UniProtKBColumnConfiguration.set(UniProtKBColumn.length, {
  ...getLabelAndTooltip('Length', 'Length of the canonical sequence'),
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
  ...getLabelAndTooltip(
    'Gene Names (Primary)',
    'Name(s) of the gene(s) encoding the protein',
    'gene_name'
  ),
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
  ...getLabelAndTooltip(
    'Gene Names (Ordered locus)',
    'Name(s) of the gene(s) encoding the protein',
    'gene_name'
  ),
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
  ...getLabelAndTooltip(
    'Gene Names (ORF)',
    'Name(s) of the gene(s) encoding the protein',
    'gene_name'
  ),
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
  ...getLabelAndTooltip(
    'Gene Names (Synonyms)',
    'Name(s) of the gene(s) encoding the protein',
    'gene_name'
  ),
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

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.organismId,
  SharedColumnConfiguration.organism_id(
    (data: UniProtkbUIModel) => data[EntrySection.NamesAndTaxonomy].organismData
  )
);

// NOTE: - Presently referred to as "organelle" by the API in search-fields
//       - Historically called "Gene encoded by" by uniprot.org
UniProtKBColumnConfiguration.set(UniProtKBColumn.organelle, {
  ...getLabelAndTooltip(
    'Encoded in',
    'Location of the gene if not on the main chromosomal element(s)',
    'encoded_on'
  ),
  render: (data) => (
    <ExpandableList displayNumberOfHiddenItems descriptionString="comments">
      {data[EntrySection.NamesAndTaxonomy].geneLocations?.map(
        ({ geneEncodingType }) => geneEncodingType
      )}
    </ExpandableList>
  ),
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.xrefProteomes, {
  ...getLabelAndTooltip(
    'Proteomes',
    'Unique proteome identifier(s) and component(s)'
  ),
  render: (data) => {
    const { proteomesData } = data[EntrySection.NamesAndTaxonomy];
    return proteomesData && <ProteomesView data={proteomesData} isCompact />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.lineage, {
  ...getLabelAndTooltip(
    'Lineage',
    'Hierarchical classification of the source organism',
    'taxonomic_lineage'
  ),
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
  ...getLabelAndTooltip(
    'Virus hosts',
    'Species that can be infected by a specific virus',
    'virus_host'
  ),
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
  ...getLabelAndTooltip(
    'Alternative Products',
    'Information on the different isoforms encoded by the same gene',
    'alternative_products'
  ),
  render(data) {
    const { alternativeProducts } = data[EntrySection.Sequence];
    return (
      alternativeProducts && (
        <IsoformView
          alternativeProducts={alternativeProducts}
          includeSequences={false}
          accession={data.primaryAccession}
        />
      )
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.sequence, {
  ...getLabelAndTooltip(
    'Sequence',
    'Canonical protein sequence as displayed by default in the entry'
  ),
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
  ...getLabelAndTooltip(
    'Fragment',
    'Indicates if the protein sequence is a fragment'
  ),
  render: (data) => {
    const { flag } = data[EntrySection.Sequence];
    const isFragment = flag && fragmentFlags.has(flag);
    return flag && (isFragment ? flag : 'N');
  },
});

// gene_location ,  "Invalid fields parameter value 'gene_location'"
UniProtKBColumnConfiguration.set(UniProtKBColumn.mass, {
  ...getLabelAndTooltip(
    'Mass',
    'Molecular mass in Daltons (Da), calculated from the full precursor canonical sequence, without PTMs and other sequence features considered.'
  ),
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
  ...getLabelAndTooltip(
    'Mass Spectrometry',
    'Information derived from mass spectrometry experiments',
    'mass_spectrometry'
  ),
  render: (data) => {
    const { massSpectrometry } = data[EntrySection.Sequence];
    return massSpectrometry && <MassSpectrometryView data={massSpectrometry} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ftVariant, {
  ...getLabelAndTooltip(
    'Natural Variants',
    'Description of a natural variant of the protein',
    'variant'
  ),
  render: (data) => (
    <VariationView primaryAccession={data.primaryAccession} onlyTable />
  ),
});

function addFeaturesToConfiguration<T extends FeatureType>(
  featuresToColumns: Record<T, UniProtKBColumn>,
  section: EntrySectionWithFeatures
) {
  for (const featureType in featuresToColumns) {
    if (Object.prototype.hasOwnProperty.call(featuresToColumns, featureType)) {
      const typedFeatureType = featureType as T;
      UniProtKBColumnConfiguration.set(
        featuresToColumns[typedFeatureType],
        getFeatureColumn(
          typedFeatureType,
          section,
          featuresToColumns[typedFeatureType]
        )
      );
    }
  }
}

addFeaturesToConfiguration<FunctionFeatures>(
  functionFeaturesToColumns,
  EntrySection.Function
);
addFeaturesToConfiguration<SequenceFeatures>(
  sequenceFeaturesToColumns,
  EntrySection.Sequence
);
addFeaturesToConfiguration<DiseaseAndDrugsFeatures>(
  diseaseAndDrugsFeaturesToColumns,
  EntrySection.DiseaseAndDrugs
);
addFeaturesToConfiguration<SubcellularLocationFeatures>(
  subcellularLocationFeaturesToColumns,
  EntrySection.SubCellularLocation
);
addFeaturesToConfiguration<ProteinProcessingFeatures>(
  proteinProcessingFeaturesToColumns,
  EntrySection.ProteinProcessing
);
addFeaturesToConfiguration<StructureFeatures>(
  structureFeaturesToColumns,
  EntrySection.Structure
);
addFeaturesToConfiguration<FamilyAndDomainsFeatures>(
  familyAndDomainsFeaturesToColumns,
  EntrySection.FamilyAndDomains
);

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccPolymorphism, {
  ...getLabelAndTooltip(
    'polymorphism',
    'Sequence position-independent description of amino acid polymorphism(s)',
    'polymorphism'
  ),
  render: (data) => {
    const { polymorphism } = data[EntrySection.Sequence];
    return <FreeTextView comments={polymorphism} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccRnaEditing, {
  ...getLabelAndTooltip(
    'RNA Editing',
    'Description of RNA editing events',
    'rna_editing'
  ),
  render: (data) => {
    const { rnaEditing } = data[EntrySection.Sequence];
    return rnaEditing && <RNAEditingView data={rnaEditing} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.errorGmodelPred, {
  ...getLabelAndTooltip(
    'Sequence Caution',
    'Discrepancies between the canonical and submitted sequences due to an erroneous gene model predictionk'
  ),
  render: (data) => {
    const { sequenceCaution } = data[EntrySection.Sequence];
    return sequenceCaution && <SequenceCautionView data={sequenceCaution} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.sequenceVersion, {
  ...getLabelAndTooltip(
    'Sequence Version',
    'Sequence version provided by the source database'
  ),
  render: (data) => {
    const { entryAudit } = data[EntrySection.Sequence];
    return entryAudit && <span>{entryAudit.sequenceVersion}</span>;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.absorption, {
  ...getLabelAndTooltip(
    'Absorption',
    'Indicates the wavelength at which photoreactive protein shows maximal light absorption',
    'biophysicochemical_properties'
  ),
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

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccCaution, {
  ...getLabelAndTooltip(
    'Caution',
    'Warning about possible errors and/or grounds for confusion',
    'caution'
  ),
  render: (data) => {
    const cautionComments = data[EntrySection.Function].commentsData.get(
      'CAUTION'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={cautionComments} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccCatalyticActivity, {
  ...getLabelAndTooltip(
    'Catalytic Activity',
    'Reaction(s) catalyzed by an enzyme',
    'catalytic_activity'
  ),
  render: (data) => {
    const catalyticActivityComments = data[
      EntrySection.Function
    ].commentsData.get('CATALYTIC ACTIVITY') as
      | CatalyticActivityComment[]
      | undefined;
    return (
      catalyticActivityComments && (
        <CatalyticActivityView
          comments={catalyticActivityComments}
          defaultHideAllReactions
          noEvidence
        />
      )
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.rhea, {
  ...getLabelAndTooltip(
    'Rhea ID',
    'Rhea Ids associated to UniProtKB entries via catalytic activity annotation',
    'catalytic_activity'
  ),
  render: (data) => {
    const catalyticActivityComments = data[
      EntrySection.Function
    ].commentsData.get('CATALYTIC ACTIVITY') as
      | CatalyticActivityComment[]
      | undefined;
    return (
      <ExpandableList displayNumberOfHiddenItems>
        {catalyticActivityComments?.map(({ reaction }) =>
          reaction?.reactionCrossReferences
            ?.filter(isRheaReactionReference)
            .map(({ id }) => {
              const rheaId = getRheaId(id);
              return (
                rheaId !== null && (
                  <span key={rheaId} className={helper['no-wrap']}>
                    {rheaId}
                    {' ( '}
                    <Link
                      to={{
                        pathname: LocationToPath[Location.UniProtKBResults],
                        search: `query=(cc_catalytic_activity:"rhea:${rheaId}")`,
                      }}
                    >
                      UniProtKB <SearchIcon width="1.333ch" />
                    </Link>
                    {' | '}
                    <ExternalLink url={externalUrls.RheaEntry(rheaId)}>
                      Rhea
                    </ExternalLink>
                    )
                  </span>
                )
              );
            })
        )}
      </ExpandableList>
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccCofactor, {
  ...getLabelAndTooltip(
    'Cofactor',
    'List of non-protein substance(s) required for the enzyme activity',
    'cofactor'
  ),
  render: (data) => {
    const cofactorComments = data[EntrySection.Function].commentsData.get(
      'COFACTOR'
    ) as CofactorComment[] | undefined;
    return cofactorComments && <CofactorView cofactors={cofactorComments} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ec, {
  ...getLabelAndTooltip(
    'EC Number',
    'Enzyme Commission (EC) number assigned to the protein'
  ),
  render: (data) => {
    const { proteinNamesData } = data[EntrySection.NamesAndTaxonomy];
    const ecNumbers: ValueWithEvidence[] = [];
    if (proteinNamesData?.recommendedName?.ecNumbers) {
      ecNumbers.push(...proteinNamesData.recommendedName.ecNumbers);
    }
    for (const alternativeName of proteinNamesData?.alternativeNames || []) {
      if (alternativeName.ecNumbers) {
        ecNumbers.push(...alternativeName.ecNumbers);
      }
    }

    return (
      <ECNumbersView
        ecNumbers={ecNumbers.length ? ecNumbers : undefined}
        noEvidence
        orientation="vertical"
      />
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccActivityRegulation, {
  ...getLabelAndTooltip(
    'Activity Regulation',
    'Description of the regulation of the catalytic activity of an enzyme, transporter, transcription factor',
    'activity_regulation'
  ),
  render: (data) => {
    const activityRegulationComments = data[
      EntrySection.Function
    ].commentsData.get('ACTIVITY REGULATION') as FreeTextComment[] | undefined;
    return <FreeTextView comments={activityRegulationComments} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccFunction, {
  ...getLabelAndTooltip(
    'Function',
    "General description of a protein's function(s)",
    'function'
  ),
  render: (data) => {
    const functionComments = data[EntrySection.Function].commentsData.get(
      'FUNCTION'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={functionComments} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.kinetics, {
  ...getLabelAndTooltip(
    'Kinetics',
    'Description of kinetic data, including the Michaelis-Menten constant (KM) and maximal velocity (Vmax)',
    'biophysicochemical_properties'
  ),
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
  ...getLabelAndTooltip(
    'Pathway',
    'Pathway in which the protein is involved',
    'pathway'
  ),
  render: (data) => {
    const pathwayComments = data[EntrySection.Function].commentsData.get(
      'PATHWAY'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={pathwayComments} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.phDependence, {
  ...getLabelAndTooltip(
    'pH Dependence',
    'Optimum pH for protein activity, effect of pH variation and pH stability of the protein',
    'biophysicochemical_properties'
  ),
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
  ...getLabelAndTooltip(
    'Redox Potential',
    'Value of the standard (midpoint) oxido-reduction potential(s) for electron transport proteins',
    'biophysicochemical_properties'
  ),
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
  ...getLabelAndTooltip(
    'Temperature Dependence',
    'Optimum temperature for enzyme activity and/or effect of temperature variation on activity',
    'biophysicochemical_properties'
  ),
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
  ...getLabelAndTooltip('Annotation', 'Annotation score'),
  render: (data) => (
    <AnnotationScoreDoughnutChart
      score={data.annotationScore}
      size={DoughnutChartSize.medium}
    />
  ),
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccSequenceCaution, {
  ...getLabelAndTooltip(
    'Sequence Caution',
    'Warning about possible errors related to a protein sequence',
    'sequence_caution'
  ),
  render: (data) => {
    const { sequenceCaution } = data[EntrySection.Sequence];
    return sequenceCaution && <SequenceCautionView data={sequenceCaution} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.featureCount, {
  ...getLabelAndTooltip('Features', 'Type(s) and number of annotated features'),
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

UniProtKBColumnConfiguration.set(UniProtKBColumn.commentCount, {
  ...getLabelAndTooltip(
    'Comments',
    'Sequence position-independent annotation (comments)',
    'general_annotation'
  ),
  render: (data) => {
    const counts = data?.extraAttributes?.countByCommentType;
    return (
      counts && (
        <ExpandableList displayNumberOfHiddenItems descriptionString="comments">
          {Object.keys(counts)
            .sort()
            .map((comment) => (
              <span className={helper.capitalize} key={comment}>
                {`${comment.toLowerCase()} (${counts[comment as CommentType]})`}
              </span>
            ))}
        </ExpandableList>
      )
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.keyword, {
  ...getLabelAndTooltip(
    'Keywords',
    'List of UniProtKB keywords (controlled vocabulary)',
    'keywords'
  ),
  render: (data) => <KeywordList keywords={getAllKeywords(data)} />,
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.keywordid, {
  ...getLabelAndTooltip('Keyword IDs', 'Keyword identifier'),
  render: (data) => <KeywordList keywords={getAllKeywords(data)} idOnly />,
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccMiscellaneous, {
  ...getLabelAndTooltip(
    'Miscellaneous [CC]',
    'Any relevant information that could not be stored in any other UniProtKB sections ',
    'miscellaneous'
  ),
  render: (data) => {
    const miscellaneousComments = data[EntrySection.Function].commentsData.get(
      'MISCELLANEOUS'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={miscellaneousComments} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.proteinExistence, {
  ...getLabelAndTooltip(
    'Protein existence',
    'Evidence supporting the existence of the protein ',
    'protein_existence'
  ),
  render: (data) => data.proteinExistence,
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.reviewed, {
  label: '',
  render: (data) => <EntryTypeIcon entryType={data.entryType} />,
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.uniparcId, {
  ...getLabelAndTooltip(
    <>
      <EntryTypeIcon entryType={EntryType.UNIPARC} />
      UniParc
    </>,
    'UniParc identifier',
    'uniparc'
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
  ...getLabelAndTooltip(
    'Interacts with',
    'Cross-references to UniProtKB entries describing protein interactors, as reported in the Intact database',
    'binary_interactions'
  ),
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
  ...getLabelAndTooltip(
    'Subunit structure',
    'Description of protein interaction and quaternary structure',
    'subunit_structure'
  ),
  render: (data) => {
    const subunitComments = data[EntrySection.Interaction].commentsData.get(
      'SUBUNIT'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={subunitComments} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccDevelopmentalStage, {
  ...getLabelAndTooltip(
    'Developmental stage',
    'Description of expression during the stage of cell, tissue or organism development',
    'developmental_stage'
  ),
  render: (data) => {
    const developmentComments = data[EntrySection.Expression].commentsData.get(
      'DEVELOPMENTAL STAGE'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={developmentComments} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccInduction, {
  ...getLabelAndTooltip(
    'Induction',
    'Description of the regulation of gene expression by environmental factors',
    'induction'
  ),
  render: (data) => {
    const inductionComments = data[EntrySection.Expression].commentsData.get(
      'INDUCTION'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={inductionComments} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccTissueSpecificity, {
  ...getLabelAndTooltip(
    'Tissue Specificity',
    'Description of the expression of a gene in tissues (at the protein and/or RNA level)',
    'tissue_specificity'
  ),
  render: (data) => {
    const tissueComment = data[EntrySection.Expression].commentsData.get(
      'TISSUE SPECIFICITY'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={tissueComment} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.goP,
  getGOColumnForAspect('Biological Process')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.goC,
  getGOColumnForAspect('Cellular Component')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.goF,
  getGOColumnForAspect('Molecular Function')
);

UniProtKBColumnConfiguration.set(UniProtKBColumn.go, {
  ...getLabelAndTooltip(
    'Gene Ontology',
    'Gene Ontology (GO) terms associated with the entry',
    'gene_ontology'
  ),
  render(data) {
    const { goTerms } = data[EntrySection.Function] as FunctionUIModel;
    return (
      goTerms && <GOTermsView data={Array.from(goTerms.values()).flat()} />
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.goId, {
  ...getLabelAndTooltip(
    'Gene Ontology IDs',
    'Gene Ontology (GO) identifiers associated with the entry',
    'gene_ontology'
  ),
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
  ...getLabelAndTooltip(
    '3D structures',
    'Experimental method(s) used to obtain 3D structure(s), when available (number of PDB cross-references)'
  ),
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
  ...getLabelAndTooltip(
    'Subcellular Location',
    'Description of the subcellular location(s) of the mature protein',
    'subcellular_location'
  ),
  render: (data) => {
    const subcellData = data[EntrySection.SubCellularLocation].commentsData.get(
      'SUBCELLULAR LOCATION'
    ) as SubcellularLocationComment[] | undefined;
    return subcellData && <SubcellularLocationView comments={subcellData} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccDomain, {
  ...getLabelAndTooltip(
    'Domain',
    "Type (and number) of domains in the canonical sequence, as listed in the 'General annotation (Comments)' section"
  ),
  render: (data) => {
    const domainData = data[EntrySection.FamilyAndDomains].commentsData.get(
      'DOMAIN'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={domainData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccPtm, {
  ...getLabelAndTooltip(
    'Post-Translational Modification',
    'Sequence position-independent description of post-translational modifications',
    'post-translational_modification'
  ),
  render: (data) => {
    const ptmData = data[EntrySection.ProteinProcessing].commentsData.get(
      'PTM'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={ptmData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccAllergen, {
  ...getLabelAndTooltip(
    'Allergenic Properties',
    'Information relevant to allergenic proteins',
    'allergenic_properties'
  ),
  render: (data) => {
    const allergenData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'ALLERGEN'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={allergenData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccBiotechnology, {
  ...getLabelAndTooltip(
    'Biotechnological Use',
    'Use of a protein in a biotechnological process',
    'biotechnological_use'
  ),
  render: (data) => {
    const biotechData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'BIOTECHNOLOGY'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={biotechData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccDisruptionPhenotype, {
  ...getLabelAndTooltip(
    'Disruption Phenotype',
    'Description of the phenotype(s) associated with the experimental disruption of the gene',
    'disruption_phenotype'
  ),
  render: (data) => {
    const disruptionData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'DISRUPTION PHENOTYPE'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={disruptionData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccDisease, {
  ...getLabelAndTooltip(
    'Disease Involvement',
    'Description of the disease(s) associated with the defect in a protein',
    'involvement_in_disease'
  ),
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
  ...getLabelAndTooltip(
    'Pharmaceutical Use',
    'Use of a protein as a pharmaceutical drug',
    'pharmaceutical_use'
  ),
  render: (data) => {
    const pharmaData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'PHARMACEUTICAL'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={pharmaData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccToxicDose, {
  ...getLabelAndTooltip(
    'Toxic Dose',
    'Lethal, paralytic, or effect dose, or lethal concentration of a toxin',
    'toxic_dose'
  ),
  render: (data) => {
    const toxicData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'TOXIC DOSE'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={toxicData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.litPubmedId, {
  ...getLabelAndTooltip('Citation ID', 'Mapped PubMed ID'),
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

UniProtKBColumnConfiguration.set(UniProtKBColumn.dateCreated, {
  ...getLabelAndTooltip('Date Created', 'Date of the entry creation'),
  render: (data) => data[EntrySection.Sequence]?.entryAudit?.firstPublicDate,
});
UniProtKBColumnConfiguration.set(UniProtKBColumn.dateModified, {
  ...getLabelAndTooltip(
    'Date Modified',
    'Date of the latest annotation update'
  ),
  render: (data) =>
    data[EntrySection.Sequence]?.entryAudit?.lastAnnotationUpdateDate,
});
UniProtKBColumnConfiguration.set(UniProtKBColumn.dateSequenceModified, {
  ...getLabelAndTooltip(
    'Date Sequence Modified',
    'Date of last sequence modification'
  ),
  render: (data) =>
    data[EntrySection.Sequence]?.entryAudit?.lastSequenceUpdateDate,
});
UniProtKBColumnConfiguration.set(UniProtKBColumn.version, {
  ...getLabelAndTooltip(
    'Version',
    'Sequence version provided by the source database'
  ),
  render: (data) => data[EntrySection.Sequence]?.entryAudit?.entryVersion,
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.proteinFamilies, {
  ...getLabelAndTooltip(
    'Protein Families',
    'Name of family(ies) to which the protein belongs to'
  ),
  render: (data) => {
    // TODO this actually seems to be a subset of this with a query on link?
    // Could maybe be removed
    const familiesData = data[EntrySection.FamilyAndDomains].commentsData.get(
      'SIMILARITY'
    ) as FreeTextComment[] | undefined;
    return <FreeTextView comments={familiesData} noEvidence />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.tools, {
  ...getLabelAndTooltip(
    'Tools',
    'Links to sequence analysis tools, including Blast, PeptideCutter, etc.'
  ),
  render: (data) => <SequenceTools accession={data.primaryAccession} />,
});

const getXrefColumn = (databaseName: string) => {
  const Label = () => {
    const databaseInfoMaps = useDatabaseInfoMaps();
    if (!databaseInfoMaps) {
      return null;
    }
    const { databaseToDatabaseInfo } = databaseInfoMaps;
    const databaseInfoKey = Object.keys(databaseToDatabaseInfo).find(
      (database) => database.toLowerCase() === databaseName
    );
    if (!databaseInfoKey) {
      logging.error(`No database found for ${databaseName}`);
      return null;
    }
    const { displayName } = databaseToDatabaseInfo[databaseInfoKey];
    return <>{`${displayName} cross-reference`}</>;
  };

  const Renderer = ({ data }: { data: UniProtkbUIModel }) => {
    const databaseInfoMaps = useDatabaseInfoMaps();
    if (!databaseInfoMaps) {
      return null;
    }
    const xrefs = data?.uniProtKBCrossReferences?.filter(
      ({ database }) => database?.toLowerCase() === databaseName
    );
    const database = xrefs?.[0]?.database;
    if (!database) {
      // This is fine - the entry just doesn't have xrefs for this DB so just render nothing
      return null;
    }
    const xrefsGoupedByDatabase = {
      database,
      xrefs,
    };
    return (
      <DatabaseList
        xrefsGoupedByDatabase={xrefsGoupedByDatabase}
        primaryAccession={data.primaryAccession}
        databaseToDatabaseInfo={databaseInfoMaps.databaseToDatabaseInfo}
      />
    );
  };
  return {
    label: () => <Label />,
    render: (data: UniProtkbUIModel) => <Renderer data={data} />,
  };
};

// Add all database cross-reference columns
Object.values(UniProtKBColumn)
  .filter(isDatabaseColumn)
  .forEach((column) => {
    UniProtKBColumnConfiguration.set(
      column,
      getXrefColumn(getDatabaseNameFromColumn(column))
    );
  });

UniProtKBColumnConfiguration.set(UniProtKBColumn.from, fromColumnConfig);

UniProtKBColumnConfiguration.set(UniProtKBColumn.match, {
  ...getLabelAndTooltip(
    'Match',
    "Start and end coordinates of the entry's sequence which matched the peptide search query sequence(s)"
  ),
  render: ({ peptideSearchMatches }) => (
    <PeptideSearchMatches matches={peptideSearchMatches} />
  ),
});

export default UniProtKBColumnConfiguration;
