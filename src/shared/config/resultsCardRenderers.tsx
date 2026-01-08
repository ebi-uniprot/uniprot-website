import { type ReactNode } from 'react';

import { type ARBAAPIModel } from '../../automatic-annotations/arba/adapters/arbaConverter';
import ARBACard from '../../automatic-annotations/arba/components/results/ARBACard';
import { type UniRuleAPIModel } from '../../automatic-annotations/unirule/adapters/uniRuleConverter';
import UniRuleCard from '../../automatic-annotations/unirule/components/results/UniRuleCard';
import { type ProteomesAPIModel } from '../../proteomes/adapters/proteomesConverter';
import ProteomesCard from '../../proteomes/components/results/ProteomesCard';
import { type CitationsAPIModel } from '../../supporting-data/citations/adapters/citationsConverter';
import CitationsCard from '../../supporting-data/citations/components/results/CitationsCard';
import { type DatabaseAPIModel } from '../../supporting-data/database/adapters/databaseConverter';
import DatabaseCard from '../../supporting-data/database/components/results/DatabaseCard';
import { type DiseasesAPIModel } from '../../supporting-data/diseases/adapters/diseasesConverter';
import DiseasesCard from '../../supporting-data/diseases/components/results/DiseasesCard';
import { type KeywordsAPIModel } from '../../supporting-data/keywords/adapters/keywordsConverter';
import KeywordsCard from '../../supporting-data/keywords/components/results/KeywordsCard';
import { type LocationsAPIModel } from '../../supporting-data/locations/adapters/locationsConverter';
import LocationsCard from '../../supporting-data/locations/components/results/LocationsCard';
import { type TaxonomyAPIModel } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import TaxonomyCard from '../../supporting-data/taxonomy/components/results/TaxonomyCard';
import { type UniParcLiteAPIModel } from '../../uniparc/adapters/uniParcConverter';
import UniParcCard from '../../uniparc/components/results/UniParcCard';
import { type UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import UniProtKBCard from '../../uniprotkb/components/results/UniProtKBCard';
import { type UniRefLiteAPIModel } from '../../uniref/adapters/uniRefConverter';
import UniRefCard from '../../uniref/components/results/UniRefCard';
import { type APIModel } from '../types/apiModel';
import { Namespace } from '../types/namespaces';

const cardRenderer = (
  namespace: Namespace
): ((data: APIModel) => ReactNode) => {
  switch (namespace) {
    case Namespace.uniprotkb: {
      return (cardData) => (
        <UniProtKBCard data={cardData as UniProtkbAPIModel} />
      );
    }
    case Namespace.uniref: {
      return (cardData) => <UniRefCard data={cardData as UniRefLiteAPIModel} />;
    }
    case Namespace.uniparc: {
      return (cardData) => (
        <UniParcCard data={cardData as UniParcLiteAPIModel} />
      );
    }
    case Namespace.proteomes: {
      return (cardData) => (
        <ProteomesCard data={cardData as ProteomesAPIModel} />
      );
    }
    case Namespace.taxonomy: {
      return (cardData) => <TaxonomyCard data={cardData as TaxonomyAPIModel} />;
    }
    case Namespace.keywords: {
      return (cardData) => <KeywordsCard data={cardData as KeywordsAPIModel} />;
    }
    case Namespace.citations: {
      return (cardData) => (
        <CitationsCard data={cardData as CitationsAPIModel} />
      );
    }
    case Namespace.diseases: {
      return (cardData) => <DiseasesCard data={cardData as DiseasesAPIModel} />;
    }
    case Namespace.database: {
      return (cardData) => <DatabaseCard data={cardData as DatabaseAPIModel} />;
    }
    case Namespace.locations: {
      return (cardData) => (
        <LocationsCard data={cardData as LocationsAPIModel} />
      );
    }
    case Namespace.unirule: {
      return (cardData) => <UniRuleCard data={cardData as UniRuleAPIModel} />;
    }
    case Namespace.arba: {
      return (cardData) => <ARBACard data={cardData as ARBAAPIModel} />;
    }
    default:
      return () => (
        <div className="warning">{`${namespace} has no card renderer yet`}</div>
      );
  }
};

export default cardRenderer;
