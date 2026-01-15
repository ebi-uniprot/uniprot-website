import { type StatisticsCategory } from './StatisticsPage';
import StatsTable from './StatsTable';
import { setAminoAcidsTotalCount } from './utils';

const nameToThreeLetterCode = new Map([
  ['AMINO_ACID_X', 'Xaa'],
  ['AMINO_ACID_U', 'Sec'],
  ['AMINO_ACID_B', 'Asx'],
  ['AMINO_ACID_Z', 'Glx'],
  ['AMINO_ACID_O', 'Pyl'],
]);

const threeToOneLetterCode = new Map([
  ['Ala', 'A'],
  ['Arg', 'R'],
  ['Asn', 'N'],
  ['Asp', 'D'],
  ['Cys', 'C'],
  ['Gln', 'Q'],
  ['Glu', 'E'],
  ['Gly', 'G'],
  ['His', 'H'],
  ['Ile', 'I'],
  ['Leu', 'L'],
  ['Lys', 'K'],
  ['Met', 'M'],
  ['Phe', 'F'],
  ['Pro', 'P'],
  ['Ser', 'S'],
  ['Thr', 'T'],
  ['Trp', 'W'],
  ['Tyr', 'Y'],
  ['Val', 'V'],
  ['Xaa', 'X'],
  ['Sec', 'U'],
  ['Asx', 'B'],
  ['Glx', 'Z'],
  ['Pyl', 'O'],
]);

type Props = {
  dataset: 'UniProtKB' | 'reviewed' | 'unreviewed';
  data: StatisticsCategory;
  numberReleaseEntries: number;
};

const AminoAcidCompositionTable = ({
  dataset,
  data,
  numberReleaseEntries,
}: Props) => {
  const transformedItems = data.items.map((item) =>
    item.label ? item : { ...item, label: nameToThreeLetterCode.get(item.name) }
  );

  return (
    <StatsTable
      key={dataset.toLowerCase()}
      dataset={dataset}
      category={setAminoAcidsTotalCount({ ...data, items: transformedItems })}
      nameLabel="Amino acid"
      alwaysExpand
      numberReleaseEntries={numberReleaseEntries}
      abbreviationLabel="1-letter code"
      nameToAbbreviation={threeToOneLetterCode}
    />
  );
};

export default AminoAcidCompositionTable;
