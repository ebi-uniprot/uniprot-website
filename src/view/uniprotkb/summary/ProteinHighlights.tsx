import React, { FC } from 'react';
import { Bubble } from 'franklin-sites';
import { HashLink as Link } from 'react-router-hash-link';
import { UniProtkbAPIModel } from '../../../model/uniprotkb/UniProtkbConverter';
import FeatureType from '../../../model/types/FeatureType';
import Comment from '../../../model/types/Comment';
import { InteractionComment } from '../components/InteractionView';
import { FeatureData } from '../components/FeaturesView';
import { AlternativeProducts } from '../components/SequenceView';
import { DiseaseCommentData } from '../components/DiseaseInvolvementView';
import './ProteinHighlights.scss';
import EntrySection from '../../../model/types/EntrySection';

enum highlightSection {
  domains = 'domains',
  PTM = 'PTM',
  variants = 'variants',
  mutagenesis = 'mutagenesis',
  activeSites = 'active sites',
  isoforms = 'isoforms',
  structures = '3D structures',
  disease = 'disease',
  interactions = 'interactions',
  subcell = 'subcellular location',
  publications = 'reviewed publications',
}

const highlightToEntrySection = {
  [highlightSection.domains]: EntrySection.Function,
  [highlightSection.PTM]: EntrySection.ProteinProcessing,
  [highlightSection.variants]: EntrySection.PathologyAndBioTech,
  [highlightSection.mutagenesis]: EntrySection.PathologyAndBioTech,
  [highlightSection.activeSites]: EntrySection.Function,
  [highlightSection.isoforms]: EntrySection.Sequence,
  [highlightSection.structures]: EntrySection.Structure,
  [highlightSection.disease]: EntrySection.PathologyAndBioTech,
  [highlightSection.interactions]: EntrySection.Interaction,
  [highlightSection.subcell]: EntrySection.SubCellularLocation,
  [highlightSection.publications]: null,
};

const getFeatureCount = (features: FeatureData, type: FeatureType) =>
  features.filter(feature => feature.type === type).length;

const ProteinHighlights: FC<{ data: UniProtkbAPIModel }> = ({ data }) => {
  const highlightsMap = new Map<highlightSection, number>();

  // FEATURES
  if (data.features) {
    // domains
    highlightsMap.set(
      highlightSection.domains,
      getFeatureCount(data.features, FeatureType.DOMAIN)
    );

    // PTMs
    highlightsMap.set(
      highlightSection.PTM,
      getFeatureCount(data.features, FeatureType.MOD_RES)
    );

    // variants
    highlightsMap.set(
      highlightSection.variants,
      getFeatureCount(data.features, FeatureType.VARIANT)
    );

    // mutagenesis
    highlightsMap.set(
      highlightSection.mutagenesis,
      getFeatureCount(data.features, FeatureType.MUTAGEN)
    );

    // active sites
    highlightsMap.set(
      highlightSection.activeSites,
      getFeatureCount(data.features, FeatureType.ACT_SITE)
    );
  }

  if (data.comments) {
    // isoforms
    const isoformsComments = (data.comments.find(
      comment => comment.commentType === Comment.ALTERNATIVE_PRODUCTS
    ) as unknown) as AlternativeProducts;
    highlightsMap.set(
      highlightSection.isoforms,
      isoformsComments ? isoformsComments.isoforms.length : 0
    );

    // interactions
    const interactionComments = (data.comments.find(
      comment => comment.commentType === Comment.INTERACTION
    ) as unknown) as InteractionComment;
    highlightsMap.set(
      highlightSection.interactions,
      interactionComments ? interactionComments.interactions.length : 0
    );

    // diseases
    const diseaseComments = (data.comments.filter(
      comment => comment.commentType === Comment.DISEASE
    ) as unknown) as DiseaseCommentData;
    highlightsMap.set(highlightSection.disease, diseaseComments.length);

    // subcellular location
    const subcellComments = data.comments.filter(
      comment => comment.commentType === Comment.SUBCELLULAR_LOCATION
    );
    highlightsMap.set(highlightSection.subcell, subcellComments.length);
  }

  // XREFS
  // 3D structures
  if (data.databaseCrossReferences) {
    const structures = data.databaseCrossReferences.filter(
      databaseCrossReference => databaseCrossReference.databaseType === 'PDB'
    );
    highlightsMap.set(highlightSection.structures, structures.length);
  }

  // publications
  if (data.references) {
    highlightsMap.set(highlightSection.publications, data.references.length);
  }

  // TODO later
  // expression
  // biotech / distruption phenotype

  return (
    <div className="protein-highlights">
      <h4>Protein Highlights</h4>
      {Array.from(highlightsMap.keys()).map(name => {
        const count = highlightsMap.get(name);
        if (count === 0) {
          return null;
        }
        return (
          <div key={name} className="protein-highlights__item">
            <Link
              to={`/uniprotkb/${data.primaryAccession}#${highlightToEntrySection[name]}`}
            >
              <Bubble
                value={highlightsMap.get(name)}
                colourClass="colour-uniprot-blue"
              />
              {name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProteinHighlights;
