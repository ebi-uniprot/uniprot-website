import { ReactNode } from 'react';

// card renderers for card views
import UniProtKBCard from '../../uniprotkb/components/results/UniProtKBCard';
import UniRefCard from '../../uniref/components/results/UniRefCard';
import UniParcCard from '../../uniparc/components/results/UniParcCard';
import ProteomesCard from '../../proteomes/components/results/ProteomesCard';

import TaxonomyCard from '../../supporting-data/taxonomy/components/results/TaxonomyCard';
import KeywordsCard from '../../supporting-data/keywords/components/results/KeywordsCard';
import CitationsCard from '../../supporting-data/citations/components/results/CitationsCard';
import DiseasesCard from '../../supporting-data/diseases/components/results/DiseasesCard';
import DatabaseCard from '../../supporting-data/database/components/results/DatabaseCard';
import LocationsCard from '../../supporting-data/locations/components/results/LocationsCard';

import UniRuleCard from '../../automatic-annotations/unirule/components/results/UniRuleCard';
import ARBACard from '../../automatic-annotations/arba/components/results/ARBACard';

import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';
import { ProteomesAPIModel } from '../../proteomes/adapters/proteomesConverter';

import { TaxonomyAPIModel } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { KeywordsAPIModel } from '../../supporting-data/keywords/adapters/keywordsConverter';
import { CitationsAPIModel } from '../../supporting-data/citations/adapters/citationsConverter';
import { DiseasesAPIModel } from '../../supporting-data/diseases/adapters/diseasesConverter';
import { DatabaseAPIModel } from '../../supporting-data/database/adapters/databaseConverter';
import { LocationsAPIModel } from '../../supporting-data/locations/adapters/locationsConverter';

import { UniRuleAPIModel } from '../../automatic-annotations/unirule/adapters/uniRuleConverter';
import { ARBAAPIModel } from '../../automatic-annotations/arba/adapters/arbaConverter';

import { Namespace } from '../types/namespaces';
import { APIModel } from '../types/apiModel';

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
      return (cardData) => <UniParcCard data={cardData as UniParcAPIModel} />;
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
