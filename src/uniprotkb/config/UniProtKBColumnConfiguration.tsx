/* eslint-disable camelcase */
import { Fragment } from 'react';
import { ExpandableList, LongNumber, Sequence } from 'franklin-sites';
import { Link } from 'react-router-dom';

import SimpleView from '../../shared/components/views/SimpleView';
import ProteinNamesView, {
  ECNumbersView,
} from '../components/protein-data-views/ProteinNamesView';
import TaxonomyView, {
  TaxonomyLineage,
} from '../../shared/components/entry/TaxonomyView';
import GeneNamesView, {
  geneAlternativeNamesView,
} from '../components/protein-data-views/GeneNamesView';
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
import { fragmentFlags } from '../adapters/sequenceConverter';
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
import { getAllKeywords } from '../utils/KeywordsUtil';
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
import { GOTermsView } from '../components/protein-data-views/GOView';
import externalUrls from '../../shared/config/externalUrls';
import EntryTypeIcon, {
  EntryType,
} from '../../shared/components/entry/EntryTypeIcon';

import { getEntryPath } from '../../app/config/urls';

import { Namespace } from '../../shared/types/namespaces';
import { ColumnConfiguration } from '../../shared/types/columnConfiguration';
import AccessionView from '../../shared/components/results/AccessionView';

export const defaultColumns = [
  UniProtKBColumn.accession,
  UniProtKBColumn.reviewed,
  UniProtKBColumn.id,
  UniProtKBColumn.proteinName,
  UniProtKBColumn.geneNames,
  UniProtKBColumn.organismName,
];

export const primaryKeyColumn = UniProtKBColumn.accession;

const getFeatureColumn = (type: FeatureType) => ({
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

UniProtKBColumnConfiguration.set(UniProtKBColumn.geneNames, {
  label: 'Gene Names',
  render: (data) => {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      geneNamesData && <GeneNamesView geneNamesData={geneNamesData} noTitles />
    );
  },
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
  label: 'Gene names (Primary)',
  render(data) {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <ExpandableList descriptionString="names" displayNumberOfHiddenItems>
        {geneNamesData &&
          geneNamesData.map(
            (geneData) =>
              geneData.geneName && (
                <div key={geneData.geneName.value}>
                  {geneData.geneName.value}
                </div>
              )
          )}
      </ExpandableList>
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.geneOln, {
  label: 'Gene names (Ordered locus)',
  render(data) {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <ExpandableList descriptionString="names" displayNumberOfHiddenItems>
        {geneNamesData &&
          geneNamesData.map(
            (geneData) =>
              geneData.orderedLocusNames && (
                <Fragment key={geneData.orderedLocusNames.join('')}>
                  {geneAlternativeNamesView(geneData.orderedLocusNames)}
                </Fragment>
              )
          )}
      </ExpandableList>
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.geneOrf, {
  label: 'Gene names (ORF)',
  render(data) {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <ExpandableList descriptionString="names" displayNumberOfHiddenItems>
        {geneNamesData &&
          geneNamesData.map(
            (geneData) =>
              geneData.orfNames && (
                <Fragment key={geneData.orfNames.join('')}>
                  {geneAlternativeNamesView(geneData.orfNames)}
                </Fragment>
              )
          )}
      </ExpandableList>
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.geneSynonym, {
  label: 'Gene names (Synonyms)',
  render(data) {
    const { geneNamesData } = data[EntrySection.NamesAndTaxonomy];
    return (
      <ExpandableList descriptionString="names" displayNumberOfHiddenItems>
        {geneNamesData &&
          geneNamesData.map(
            (geneData) =>
              geneData.synonyms && (
                <Fragment key={geneData.synonyms.join('')}>
                  {geneAlternativeNamesView(geneData.synonyms)}
                </Fragment>
              )
          )}
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

UniProtKBColumnConfiguration.set(UniProtKBColumn.virusHosts, {
  label: 'Virus hosts',
  render: (data) => {
    const { virusHosts } = data[EntrySection.NamesAndTaxonomy];
    return (
      virusHosts && (
        <ExpandableList descriptionString="hosts" displayNumberOfHiddenItems>
          {virusHosts.map((host) => (
            <p key={host.taxonId}>
              <TaxonomyView key={host.taxonId} data={host} />
            </p>
          ))}
        </ExpandableList>
      )
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

UniProtKBColumnConfiguration.set(UniProtKBColumn.ftVarSeq, {
  label: 'Alternative sequence',
  render: (data) => {
    const { featuresData } = data[EntrySection.Sequence];
    return featuresData && <FeaturesView features={featuresData} />;
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
    <VariationView primaryAccession={data.primaryAccession} hasTable={false} />
  ),
});

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftNonCon,
  getFeatureColumn('Non-adjacent residues')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftNonStd,
  getFeatureColumn('Non-standard residue')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftNonTer,
  getFeatureColumn('Non-terminal residue')
);

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccPolymorphism, {
  label: 'Polymorphysm',
  render: (data) => {
    const { polymorphysm } = data[EntrySection.Sequence];
    return polymorphysm && <FreeTextView comments={polymorphysm} />;
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

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftConflict,
  getFeatureColumn('Sequence conflict')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftUnsure,
  getFeatureColumn('Sequence uncertainty')
);

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

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftActSite,
  getFeatureColumn('Active site')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftBinding,
  getFeatureColumn('Binding site')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftCaBind,
  getFeatureColumn('Calcium binding')
);

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccCatalyticActivity, {
  label: 'Catalytic Activity',
  render: (data) => {
    const catalyticActivityComments = data[
      EntrySection.Function
    ].commentsData.get('CATALYTIC ACTIVITY') as CatalyticActivityComment[];
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
    ) as CofactorComment[];
    return cofactorComments && <CofactorView cofactors={cofactorComments} />;
  },
});

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftDnaBind,
  getFeatureColumn('DNA binding')
);

UniProtKBColumnConfiguration.set(UniProtKBColumn.ec, {
  label: 'EC Number',
  render: (data) => {
    const { proteinNamesData } = data[EntrySection.NamesAndTaxonomy];
    const ecNumbers = proteinNamesData?.recommendedName?.ecNumbers;
    return ecNumbers && <ECNumbersView ecNumbers={ecNumbers} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccActivityRegulation, {
  label: 'Activity Regulation',
  render: (data) => {
    const activityRegulationComments = data[
      EntrySection.Function
    ].commentsData.get('ACTIVITY REGULATION') as FreeTextComment[];
    return (
      activityRegulationComments && (
        <FreeTextView comments={activityRegulationComments} />
      )
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccFunction, {
  label: 'Function',
  render: (data) => {
    const functionComments = data[EntrySection.Function].commentsData.get(
      'FUNCTION'
    ) as FreeTextComment[];
    return functionComments && <FreeTextView comments={functionComments} />;
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

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftMetal,
  getFeatureColumn('Metal binding')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftNpBind,
  getFeatureColumn('Nucleotide binding')
);

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccPathway, {
  label: 'Pathway',
  render: (data) => {
    const pathwayComments = data[EntrySection.Function].commentsData.get(
      'PATHWAY'
    ) as FreeTextComment[];
    return pathwayComments && <FreeTextView comments={pathwayComments} />;
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

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftSite,
  getFeatureColumn('Site')
);

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
    ) as FreeTextComment[];
    return (
      miscellaneousComments && <FreeTextView comments={miscellaneousComments} />
    );
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
    ) as InteractionComment[];
    return (
      interactionComments && (
        <ExpandableList displayNumberOfHiddenItems>
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
                    to={getEntryPath(
                      Namespace.uniprotkb,
                      interaction.interactantOne.uniProtkbAccession
                    )}
                  >
                    {interaction.interactantOne.uniProtkbAccession}
                  </Link>
                )}
              </div>
            ))
          )}
        </ExpandableList>
      )
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccSubunit, {
  label: 'Subunit structure',
  render: (data) => {
    const subunitComments = data[EntrySection.Interaction].commentsData.get(
      'SUBUNIT'
    ) as FreeTextComment[];
    return subunitComments && <FreeTextView comments={subunitComments} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccDevelopmentalStage, {
  label: 'Developmental stage',
  render: (data) => {
    const developmentComments = data[EntrySection.Expression].commentsData.get(
      'DEVELOPMENTAL STAGE'
    ) as FreeTextComment[];
    return (
      developmentComments && <FreeTextView comments={developmentComments} />
    );
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccInduction, {
  label: 'Induction',
  render: (data) => {
    const inductionComments = data[EntrySection.Expression].commentsData.get(
      'INDUCTION'
    ) as FreeTextComment[];
    return inductionComments && <FreeTextView comments={inductionComments} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccTissueSpecificity, {
  label: 'Tissue Specificity',
  render: (data) => {
    const tissueComment = data[EntrySection.Expression].commentsData.get(
      'TISSUE SPECIFICITY'
    ) as FreeTextComment[];
    return tissueComment && <FreeTextView comments={tissueComment} />;
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
    ) as SubcellularLocationComment[];
    return subcellData && <SubcellularLocationView comments={subcellData} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccDomain, {
  label: 'Domain',
  render: (data) => {
    const domainData = data[EntrySection.FamilyAndDomains].commentsData.get(
      'DOMAIN'
    ) as FreeTextComment[];
    return domainData && <FreeTextView comments={domainData} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccPtm, {
  label: 'Post-Translational Modification',
  render: (data) => {
    const ptmData = data[EntrySection.ProteinProcessing].commentsData.get(
      'PTM'
    ) as FreeTextComment[];
    return ptmData && <FreeTextView comments={ptmData} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccAllergen, {
  label: 'Allergenic Properties',
  render: (data) => {
    const allergenData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'ALLERGEN'
    ) as FreeTextComment[];
    return allergenData && <FreeTextView comments={allergenData} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccBiotechnology, {
  label: 'Biotechnological Use',
  render: (data) => {
    const biotechData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'BIOTECHNOLOGY'
    ) as FreeTextComment[];
    return biotechData && <FreeTextView comments={biotechData} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccDisruptionPhenotype, {
  label: 'Disruption Phenotype',
  render: (data) => {
    const disruptionData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'DISRUPTION PHENOTYPE'
    ) as FreeTextComment[];
    return disruptionData && <FreeTextView comments={disruptionData} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccDisease, {
  label: 'Disease Involvement',
  render: (data) => {
    const diseaseComments = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'DISEASE'
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

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftMutagen,
  getFeatureColumn('Mutagenesis')
);

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccPharmaceutical, {
  label: 'Pharmaceutical Use',
  render: (data) => {
    const pharmaData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'PHARMACEUTICAL'
    ) as FreeTextComment[];
    return pharmaData && <FreeTextView comments={pharmaData} />;
  },
});

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccToxicDose, {
  label: 'Toxic Dose',
  render: (data) => {
    const toxicData = data[EntrySection.DiseaseAndDrugs].commentsData.get(
      'TOXIC DOSE'
    ) as FreeTextComment[];
    return toxicData && <FreeTextView comments={toxicData} />;
  },
});

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftIntramem,
  getFeatureColumn('Intramembrane')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftTopDom,
  getFeatureColumn('Topological domain')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftTransmem,
  getFeatureColumn('Transmembrane')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftChain,
  getFeatureColumn('Chain')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftCrosslnk,
  getFeatureColumn('Cross-link')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftDisulfide,
  getFeatureColumn('Disulfide bond')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftCarbohyd,
  getFeatureColumn('Glycosylation')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftInitMet,
  getFeatureColumn('Initiator methionine')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftLipid,
  getFeatureColumn('Lipidation')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftModRes,
  getFeatureColumn('Modified residue')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftPeptide,
  getFeatureColumn('Peptide')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftPropep,
  getFeatureColumn('Propeptide')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftSignal,
  getFeatureColumn('Signal')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftTransit,
  getFeatureColumn('Transit peptide')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftStrand,
  getFeatureColumn('Beta strand')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftHelix,
  getFeatureColumn('Helix')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftTurn,
  getFeatureColumn('Turn')
);

UniProtKBColumnConfiguration.set(UniProtKBColumn.litPubmedId, {
  label: 'Citation ID',
  render: (data) =>
    data.references && (
      <ExpandableList descriptionString="IDs" displayNumberOfHiddenItems>
        {data.references.map(
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
  UniProtKBColumn.ftCoiled,
  getFeatureColumn('Coiled coil')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftCompbias,
  getFeatureColumn('Compositional bias')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftDomain,
  getFeatureColumn('Domain')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftMotif,
  getFeatureColumn('Motif')
);

UniProtKBColumnConfiguration.set(UniProtKBColumn.proteinFamilies, {
  label: 'Protein Families',
  render: (data) => {
    // TODO this actually seems to be a subset of this with a query on link?
    // Could maybe be removed
    const familiesData = data[EntrySection.FamilyAndDomains].commentsData.get(
      'SIMILARITY'
    ) as FreeTextComment[];
    return familiesData && <FreeTextView comments={familiesData} />;
  },
});

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftRegion,
  getFeatureColumn('Region')
);
UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftRepeat,
  getFeatureColumn('Repeat')
);

UniProtKBColumnConfiguration.set(UniProtKBColumn.ccSimilarity, {
  label: 'Sequence Similarities',
  render: (data) => {
    const familiesData = data[EntrySection.FamilyAndDomains].commentsData.get(
      'SIMILARITY'
    ) as FreeTextComment[];
    return familiesData && <FreeTextView comments={familiesData} />;
  },
});

UniProtKBColumnConfiguration.set(
  UniProtKBColumn.ftZnFing,
  getFeatureColumn('Zinc finger')
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

// TODO: review below if fields are still needed
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
    UniProtKBColumnConfiguration.set(colName, getXrefColumn(databaseInfo.name));
  });

export default UniProtKBColumnConfiguration;
