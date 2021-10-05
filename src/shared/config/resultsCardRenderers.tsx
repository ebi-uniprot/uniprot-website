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

import { getIdKeyFor } from '../utils/getIdKeyForNamespace';

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
  namespace: Namespace,
  selectedEntries: string[],
  handleEntrySelection: (rowId: string) => void
): ((data: APIModel) => ReactNode) => {
  const getIdKey = getIdKeyFor(namespace);
  switch (namespace) {
    case Namespace.uniprotkb: {
      return (cardData) => (
        <UniProtKBCard
          data={cardData as UniProtkbAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.uniref: {
      return (cardData) => (
        <UniRefCard
          data={cardData as UniRefLiteAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.uniparc: {
      return (cardData) => (
        <UniParcCard
          data={cardData as UniParcAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.proteomes: {
      return (cardData) => (
        <ProteomesCard
          data={cardData as ProteomesAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.taxonomy: {
      return (cardData) => (
        <TaxonomyCard
          data={cardData as TaxonomyAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.keywords: {
      return (cardData) => (
        <KeywordsCard
          data={cardData as KeywordsAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.citations: {
      return (cardData) => (
        <CitationsCard
          data={cardData as CitationsAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.diseases: {
      return (cardData) => (
        <DiseasesCard
          data={cardData as DiseasesAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.database: {
      return (cardData) => (
        <DatabaseCard
          data={cardData as DatabaseAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.locations: {
      return (cardData) => (
        <LocationsCard
          data={cardData as LocationsAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.unirule: {
      return (cardData) => (
        <UniRuleCard
          data={cardData as UniRuleAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.arba: {
      return (cardData) => (
        <ARBACard
          data={cardData as ARBAAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    default:
      return () => (
        <div className="warning">{`${namespace} has no card renderer yet`}</div>
      );
  }
};

export default cardRenderer;
