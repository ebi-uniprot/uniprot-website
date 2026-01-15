import { type Facets as ARBAFacets } from '../../automatic-annotations/arba/config/ARBAFacetConfiguration';
import { type Facets as UniRuleFacets } from '../../automatic-annotations/unirule/config/UniRuleFacetConfiguration';
import { type Facets as ProteomesFacets } from '../../proteomes/config/ProteomesFacetConfiguration';
import { type Facets as CitationsFacets } from '../../supporting-data/citations/config/CitationsFacetConfiguration';
import { type Facets as DatabaseFacets } from '../../supporting-data/database/config/DatabaseFacetConfiguration';
import { type Facets as DiseasesFacets } from '../../supporting-data/diseases/config/DiseasesFacetConfiguration';
import { type Facets as KeywordsFacets } from '../../supporting-data/keywords/config/KeywordsFacetConfiguration';
import { type Facets as LocationsFacets } from '../../supporting-data/locations/config/LocationsFacetConfiguration';
import { type Facets as TaxonomyFacets } from '../../supporting-data/taxonomy/config/TaxonomyFacetConfiguration';
import { type Facets as UniParcFacets } from '../../uniparc/config/UniParcFacetConfiguration';
import { type Facets as UniProtKBFacets } from '../../uniprotkb/config/UniProtKBFacetConfiguration';
import { type Facets as UniRefFacets } from '../../uniref/config/UniRefFacetConfiguration';

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
