/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import SimpleView from '../view/uniprotkb/components/SimpleView';
import { ProteinNamesView } from '../view/uniprotkb/components/ProteinNamesView';
import convertProteinNames from './uniprotkb/ProteinNamesConverter';
import OrganismView from '../view/uniprotkb/components/OrganismView';
import GeneNamesView from '../view/uniprotkb/components/GeneNamesView';
import convertGeneNames from './uniprotkb/GeneNamesConverter';
import { UniProtkbAPIModel } from './uniprotkb/UniProtkbConverter';
import { Column } from './types/ColumnTypes';

export const ColumnConfiguration = new Map<
  Column,
  {
    label: string;
    sortable: boolean;
    render: (data: UniProtkbAPIModel) => JSX.Element | undefined;
  }
>();

// sortable:
// mnemonic = 'mnemonic',
// name = 'name',
// annotation_score = 'annotation_score',
// gene = 'gene',
// length = 'length',
// mass = 'mass',

ColumnConfiguration.set(Column.accession, {
  label: 'Entry',
  sortable: true,
  render: (data: { primaryAccession: string; entryType: string }) => (
    <SimpleView
      termValue={`${data.primaryAccession} (${data.entryType})`}
      linkTo={`/uniprotkb/${data.primaryAccession}`}
    />
  ),
});

ColumnConfiguration.set(Column.id, {
  label: 'Entry Name',
  sortable: true,
  render: (data: { uniProtId: string }) => (
    <SimpleView termValue={data.uniProtId} />
  ),
});

ColumnConfiguration.set(Column.proteinName, {
  label: 'Protein names',
  sortable: true,
  render: data =>
    data.proteinDescription && (
      <ProteinNamesView {...convertProteinNames(data.proteinDescription)} />
    ),
});

ColumnConfiguration.set(Column.geneNames, {
  label: 'Gene Names',
  sortable: true,
  render: data =>
    data.genes && <GeneNamesView {...convertGeneNames(data.genes)} />,
});

ColumnConfiguration.set(Column.organism, {
  label: 'Organism',
  sortable: true,
  render: data => data.organism && <OrganismView data={data.organism} />,
});

export default ColumnConfiguration;
