import { defaultFacets as arbaDefaultFacets } from '../../automatic-annotations/arba/config/ARBAFacetConfiguration';
import { defaultFacets as uniRuleDefaultFacets } from '../../automatic-annotations/unirule/config/UniRuleFacetConfiguration';
import { defaultFacets as proteomesDefaultFacets } from '../../proteomes/config/ProteomesFacetConfiguration';
import { defaultFacets as citationsDefaultFacets } from '../../supporting-data/citations/config/CitationsFacetConfiguration';
import { defaultFacets as databaseDefaultFacets } from '../../supporting-data/database/config/DatabaseFacetConfiguration';
import { defaultFacets as diseasesDefaultFacets } from '../../supporting-data/diseases/config/DiseasesFacetConfiguration';
import { defaultFacets as keywordsDefaultFacets } from '../../supporting-data/keywords/config/KeywordsFacetConfiguration';
import { defaultFacets as locationsDefaultFacets } from '../../supporting-data/locations/config/LocationsFacetConfiguration';
import { defaultFacets as taxonomyDefaultFacets } from '../../supporting-data/taxonomy/config/TaxonomyFacetConfiguration';
import { defaultFacets as uniParcDefaultFacets } from '../../uniparc/config/UniParcFacetConfiguration';
import { defaultFacets as uniProtKBDefaultFacets } from '../../uniprotkb/config/UniProtKBFacetConfiguration';
import { defaultFacets as uniRefDefaultFacets } from '../../uniref/config/UniRefFacetConfiguration';
import { Facets } from '../types/facets';
import { Namespace } from '../types/namespaces';

export const defaultFacets = new Map<Namespace, Facets[]>([
  // Main data
  [Namespace.uniprotkb, uniProtKBDefaultFacets],
  [Namespace.uniref, uniRefDefaultFacets],
  [Namespace.uniparc, uniParcDefaultFacets],
  [Namespace.proteomes, proteomesDefaultFacets],
  // Supporting data
  [Namespace.taxonomy, taxonomyDefaultFacets],
  [Namespace.keywords, keywordsDefaultFacets],
  [Namespace.citations, citationsDefaultFacets],
  [Namespace.diseases, diseasesDefaultFacets],
  [Namespace.database, databaseDefaultFacets],
  [Namespace.locations, locationsDefaultFacets],
  // Rules
  [Namespace.unirule, uniRuleDefaultFacets],
  [Namespace.arba, arbaDefaultFacets],
]);
