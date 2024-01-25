// Main data
import { Facets as UniProtKBFacets } from '../../uniprotkb/config/UniProtKBFacetConfiguration';
import { Facets as UniRefFacets } from '../../uniref/config/UniRefFacetConfiguration';
import { Facets as UniParcFacets } from '../../uniparc/config/UniParcFacetConfiguration';
import { Facets as ProteomesFacets } from '../../proteomes/config/ProteomesFacetConfiguration';
// Supporting data
import { Facets as TaxonomyFacets } from '../../supporting-data/taxonomy/config/TaxonomyFacetConfiguration';
import { Facets as KeywordsFacets } from '../../supporting-data/keywords/config/KeywordsFacetConfiguration';
import { Facets as CitationsFacets } from '../../supporting-data/citations/config/CitationsFacetConfiguration';
import { Facets as DiseasesFacets } from '../../supporting-data/diseases/config/DiseasesFacetConfiguration';
import { Facets as DatabaseFacets } from '../../supporting-data/database/config/DatabaseFacetConfiguration';
import { Facets as LocationsFacets } from '../../supporting-data/locations/config/LocationsFacetConfiguration';
// Rules
import { Facets as UniRuleFacets } from '../../automatic-annotations/unirule/config/UniRuleFacetConfiguration';
import { Facets as ARBAFacets } from '../../automatic-annotations/arba/config/ARBAFacetConfiguration';

export type Facets =
  | UniProtKBFacets
  | UniRefFacets
  | UniParcFacets
  | ProteomesFacets
  | TaxonomyFacets
  | KeywordsFacets
  | CitationsFacets
  | DiseasesFacets
  | DatabaseFacets
  | LocationsFacets
  | UniRuleFacets
  | ARBAFacets;
