import { GOSlimmedData } from '../../GORibbonHandler';

// Source: https://www.ebi.ac.uk/QuickGO/services/ontology/go/slim?relations=is_a,part_of,occurs_in,regulates&slimsFromIds=GO:0004252,GO:0005044,GO:0005576,GO:0005654,GO:0005886,GO:0005887,GO:0006508,GO:0008236,GO:0016540,GO:0046598,GO:0070062&slimsToIds=GO:0000003,GO:0002376,GO:0003677,GO:0003700,GO:0003723,GO:0003824,GO:0005102,GO:0005198,GO:0005215,GO:0005576,GO:0005634,GO:0005694,GO:0005739,GO:0005768,GO:0005773,GO:0005783,GO:0005794,GO:0005829,GO:0005856,GO:0005886,GO:0005975,GO:0006259,GO:0006629,GO:0007049,GO:0007610,GO:0008092,GO:0008134,GO:0008219,GO:0008283,GO:0008289,GO:0009056,GO:0016043,GO:0016070,GO:0019538,GO:0023052,GO:0030054,GO:0030154,GO:0030234,GO:0030246,GO:0031410,GO:0032502,GO:0032991,GO:0036094,GO:0038023,GO:0042592,GO:0042995,GO:0045202,GO:0046872,GO:0050877,GO:0050896,GO:0051234,GO:0097367,GO:1901135
// Retrieved: 2024-06-10
const slimmedData: GOSlimmedData = {
  numberOfHits: 9,
  results: [
    {
      slimsFromId: 'GO:0006508',
      slimsToIds: ['GO:0019538'],
    },
    {
      slimsFromId: 'GO:0016540',
      slimsToIds: ['GO:0019538'],
    },
    {
      slimsFromId: 'GO:0004252',
      slimsToIds: ['GO:0003824'],
    },
    {
      slimsFromId: 'GO:0070062',
      slimsToIds: ['GO:0005576'],
    },
    {
      slimsFromId: 'GO:0008236',
      slimsToIds: ['GO:0003824'],
    },
    {
      slimsFromId: 'GO:0005886',
      slimsToIds: ['GO:0005886'],
    },
    {
      slimsFromId: 'GO:0005576',
      slimsToIds: ['GO:0005576'],
    },
    {
      slimsFromId: 'GO:0005654',
      slimsToIds: ['GO:0005634'],
    },
    {
      slimsFromId: 'GO:0005044',
      slimsToIds: ['GO:0051234'],
    },
  ],
  pageInfo: null,
};

export default slimmedData;
