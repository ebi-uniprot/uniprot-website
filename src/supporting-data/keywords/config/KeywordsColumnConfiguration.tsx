import { Link } from 'react-router-dom';
import { ExpandableList } from 'franklin-sites';

import ExternalLink from '../../../shared/components/ExternalLink';
import KeywordsGraph from '../components/entry/KeywordsGraph';
import GeneOntologies from '../../../shared/components/results/GeneOnotologies';

import { getEntryPathFor } from '../../../app/config/urls';
import { mapToLinks } from '../../../shared/components/MapTo';

import { KeywordsAPIModel, KeywordsLite } from '../adapters/keywordsConverter';
import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';

const CUTOFF = 10;

export enum KeywordsColumn {
  category = 'category',
  children = 'children',
  definition = 'definition',
  // Called "gene_ontologies" in the locations schema...
  geneOntologies = 'gene_ontologies',
  id = 'id',
  name = 'name',
  parents = 'parents',
  // Those are links, not biological sites
  links = 'links',
  statistics = 'statistics',
  synonyms = 'synonyms',
  graphical = 'graph',
}

export const defaultColumns = [
  KeywordsColumn.id,
  KeywordsColumn.name,
  KeywordsColumn.category,
  KeywordsColumn.geneOntologies,
];

export const primaryKeyColumns = [KeywordsColumn.id];

const getEntryPath = getEntryPathFor(Namespace.keywords);

export const KeywordsColumnConfiguration: ColumnConfiguration<
  KeywordsColumn,
  Partial<KeywordsAPIModel>
> = new Map();

// COLUMN RENDERERS BELOW
KeywordsColumnConfiguration.set(KeywordsColumn.category, {
  label: 'Category',
  render: ({ category }) =>
    category && <Link to={getEntryPath(category.id)}>{category.name}</Link>,
});

// NOTE: since these will be used in an info list, we need to return null when
// NOTE: no content, otherwise it gets a truthy empty fragment instead
KeywordsColumnConfiguration.set(KeywordsColumn.children, {
  label: 'Ancestors',
  render: ({ parents }) =>
    parents?.length ? (
      <ExpandableList descriptionString="ancestors" displayNumberOfHiddenItems>
        {parents?.map((parent) => (
          <Link key={parent.keyword.id} to={getEntryPath(parent.keyword.id)}>
            {parent.keyword.name}
          </Link>
        ))}
      </ExpandableList>
    ) : null,
});

KeywordsColumnConfiguration.set(KeywordsColumn.definition, {
  label: 'Definition',
  render: ({ definition }) => definition,
});

KeywordsColumnConfiguration.set(KeywordsColumn.geneOntologies, {
  label: 'Gene Ontology (GO)',
  render: ({ geneOntologies }) => (
    <GeneOntologies geneOntologies={geneOntologies} />
  ),
});

KeywordsColumnConfiguration.set(KeywordsColumn.id, {
  label: 'ID',
  render: ({ keyword }) =>
    keyword && <Link to={getEntryPath(keyword.id)}>{keyword.id}</Link>,
});

KeywordsColumnConfiguration.set(KeywordsColumn.name, {
  label: 'Name',
  render: ({ keyword }) => keyword?.name,
});

KeywordsColumnConfiguration.set(KeywordsColumn.parents, {
  label: 'Descendants',
  render: ({ children }) =>
    children?.length ? (
      <ExpandableList
        descriptionString="descendants"
        displayNumberOfHiddenItems
      >
        {children?.map((child) => (
          <Link key={child.keyword.id} to={getEntryPath(child.keyword.id)}>
            {child.keyword.name}
          </Link>
        ))}
      </ExpandableList>
    ) : null,
});

KeywordsColumnConfiguration.set(KeywordsColumn.links, {
  label: 'Links',
  render: ({ links }) =>
    links?.length ? (
      <ExpandableList descriptionString="links" displayNumberOfHiddenItems>
        {links?.map((link) => (
          <ExternalLink key={link} url={link} tidyUrl />
        ))}
      </ExpandableList>
    ) : null,
});

KeywordsColumnConfiguration.set(KeywordsColumn.synonyms, {
  label: 'Synonyms',
  render: ({ synonyms }) =>
    synonyms?.length ? (
      <ExpandableList descriptionString="synonyms" displayNumberOfHiddenItems>
        {synonyms}
      </ExpandableList>
    ) : null,
});

KeywordsColumnConfiguration.set(KeywordsColumn.statistics, {
  label: 'Statistics',
  render: ({ keyword, statistics }) => (
    <ExpandableList>
      {mapToLinks(Namespace.keywords, keyword?.id, statistics)?.map(
        ({ key, link, name }) => (
          // eslint-disable-next-line uniprot-website/use-config-location
          <Link key={key} to={link}>
            {name}
          </Link>
        )
      )}
    </ExpandableList>
  ),
});

KeywordsColumnConfiguration.set(KeywordsColumn.graphical, {
  label: 'Graphical',
  render: ({ keyword, parents, children }) => {
    // If the number of nodes are more than the cutoff, no graph is drawn
    if (
      (children && children?.length > CUTOFF) ||
      (parents && parents?.length > CUTOFF)
    ) {
      return null;
    }

    type tlevels = {
      [key: number]: string[];
    };

    const levels: tlevels = {};
    const links: Set<string> = new Set();
    const keywordIdMap: Map<string, string> = new Map();
    const ancestorHierarchy: string[] = [];

    // Ancestors
    const findHierarchy = (obj: KeywordsLite, str: string) => {
      keywordIdMap.set(obj.keyword.name, obj.keyword.id);
      let hierarchyString = str;
      hierarchyString += `${obj.keyword?.name}|`;
      obj.parents?.forEach((el) => {
        if (el.parents?.length) {
          findHierarchy(el, hierarchyString);
        } else {
          keywordIdMap.set(el.keyword.name, el.keyword.id);
          hierarchyString += `${el.keyword.name}`;
        }
      });
      if (!ancestorHierarchy.some((str) => str === hierarchyString)) {
        ancestorHierarchy.push(hierarchyString);
      }
    };

    if (parents?.length) {
      parents.forEach((parent) => {
        findHierarchy(parent, '');
      });
    }

    ancestorHierarchy.forEach((h) => {
      const nodes = h.split('|').reverse().filter(Boolean);
      // Finding the levels of each node
      for (let i = 0; i < nodes.length; i += 1) {
        if (levels[i]) {
          if (!Object.values(levels).flat().includes(nodes[i])) {
            levels[i].push(nodes[i]);
          }
        } else {
          levels[i] = [nodes[i]];
        }
      }

      // Populating the links
      const fullHierarchy = `${keyword?.name}|${h}`;
      const ptcHierarchy = fullHierarchy.split('|').reverse().filter(Boolean);
      for (let i = 0; i < ptcHierarchy.length - 1; i += 1) {
        const link = `${ptcHierarchy[i]}|${ptcHierarchy[i + 1]}`;
        links.add(link);
      }
    });

    // Adding the keyword into the levels after the ancestors
    const presentAncestorsCount = Object.keys(levels).length;
    if (keyword?.name && keyword?.id) {
      keywordIdMap.set(keyword.name, keyword.id);
      levels[presentAncestorsCount] = [keyword.name];
    }

    // Descendants
    if (children?.length) {
      levels[presentAncestorsCount + 1] = [];
      children.forEach((desc) => {
        levels[presentAncestorsCount + 1].push(desc.keyword.name);
        links.add(`${keyword?.name}|${desc.keyword.name}`);
        keywordIdMap.set(desc.keyword.name, desc.keyword.id);
      });
    }

    return (
      <KeywordsGraph
        nodes={levels}
        links={links}
        keywords={keywordIdMap}
        currentKeyword={keyword?.id}
      />
    );
  },
});

export default KeywordsColumnConfiguration;
