/* eslint-disable camelcase */
/* Parameters of a blast job as required by the server */
// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast?wadl
// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameters

import { Namespace } from '../../../shared/types/namespaces';

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/program
// The BLAST program to be used for the Sequence Similarity Search.
export type Program =
  | 'blastp' // default for protein context
  | 'blastx'
  | 'blastn'
  | 'tblastx'
  | 'tblastn';

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/task
// Task option (only selectable for blastn)
export type Task =
  | 'blastp' // default for protein context
  | 'blastn' // default for nucleotide and vector contexts
  | 'megaplast';

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/matrix
// (Protein searches) The substitution matrix used for scoring alignments when searching the database.
export type Matrix =
  | 'BLOSUM45'
  | 'BLOSUM50'
  | 'BLOSUM62' // default for protein context
  | 'BLOSUM80'
  | 'BLOSUM90'
  | 'PAM30'
  | 'PAM70'
  | 'PAM250'
  | 'NONE'; // default for nucleotide and vector contexts

// NOTE: see note below Scores section
// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/alignments
// Maximum number of match alignments reported in the result output.
export type Alignments =
  | 0
  | 5
  | 10
  | 20
  | 50 // default
  | 100
  | 150
  | 200
  | 250
  | 500
  | 750
  | 1000;

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/scores
// Maximum number of match score summaries reported in the result output.
export type Scores =
  | 0
  | 5
  | 10
  | 20
  | 50 // default
  | 100
  | 150
  | 200
  | 250
  | 500
  | 750
  | 1000;

// NOTE: to effectively limit the number of results, you need to set BOTH the
// 'alignments' AND the 'scores' parameters. Otherwise it will return whatever
// number of result is highest

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/exp
// Limits the number of scores and alignments reported based on the expectation value.
// This is the maximum number of times the match is expected to occur by chance.
export type Exp =
  | '1e-200'
  | '1e-100'
  | '1e-50'
  | '1e-10'
  | '1e-5'
  | '1e-4'
  | '1e-3'
  | '1e-2'
  | '1e-1'
  | '1.0' // watch out, need to use the exact string ("1", 1, or 1.0 are invalid)
  | '10' // default
  | '100'
  | '1000';

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/dropoff
// The amount a score can drop before gapped extension of word hits is halted
export type Dropoff =
  | 0 // default
  | 2
  | 4
  | 6
  | 8
  | 10;

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/match_scores
// (Nucleotide searches) The match score is the bonus to the alignment score when matching the same base.
// The mismatch is the penalty when failing to match.
export type MatchScores =
  | '1,-4'
  | '2,-7'
  | '1,-3' // default for nucleotide and vector contexts (null for protein)
  | '2,-5'
  | '1,-2'
  | '2,-3'
  | '1,-1'
  | '5,-4'
  | '4,-5';
// NOTE: it might accept other number tuples (at least it is accepted by server)

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/gapopen
// Penalty taken away from the score when a gap is created in sequence.
// Increasing the gap openning penalty will decrease the number of gaps in the final alignment.
export type GapOpen =
  | -1 // default
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 25;

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/gapext
// Penalty taken away from the score for each base or residue in the gap.
// Increasing the gap extension penalty favors short gaps in the final alignment, conversly decreasing the gap extension penalty favors long gaps in the final alignment.
export type GapExt =
  | -1 // default
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 8
  | 10;

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/filter
// Filter regions of low sequence complexity.
// This can avoid issues with low complexity sequences where matches are found due to composition rather than meaningful sequence similarity.
// However in some cases filtering also masks regions of interest and so should be used with caution.
export type Filter =
  | 'F' // default for protein context
  | 'T'; // default for nucleotide and vector contexts

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/seqrange
// Specify a range or section of the input sequence to use in the search.
// Example: Specifying '34-89' in an input sequence of total length 100, will tell BLAST to only use residues 34 to 89, inclusive.
export type SeqRange = string;

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/gapalign
// This is a true/false setting that tells the program the perform optimised alignments within regions involving gaps.
// If set to true, the program will perform an alignment using gaps.
// Otherwise, if it is set to false, it will report only individual HSP where two sequence match each other, and thus will not produce alignments with gaps.
export type GapAlign = boolean; // default: true

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/wordsize
// Word size for wordfinder algorithm
export type WordSize =
  | 6 // default for protein context
  | 11 // default for nucleotide context
  | 28; // default for vector context
// NOTE: It actually accepts any integer >= 1

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/taxids
// Specify one or more TaxIDs so that the BLAST search becomes taxonomically aware.
export type TaxIDs = string;

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/negative_taxids
// TaxIDs excluded from the BLAST search.
export type NegativeTaxIDs = string;

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/compstats
// Use composition-based statistics.
export type CompStats =
  | 'F' // default
  | 'D'
  | '1'
  | '2'
  | '3';

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/align
// Formating for the alignments.
export type Align =
  | 0 // default
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/transltable
// Query Genetic code to use in translation
export type TranslTable = number;

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/stype
// Indicates if the sequence is protein or DNA/RNA.
export type SType =
  | 'protein' // default for protein context
  | 'dna'; // default for nucleotide and vector contexts

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/sequence
// The query sequence can be entered directly into this form.
// The sequence can be in GCG, FASTA, EMBL (Nucleotide only), GenBank, PIR, NBRF, PHYLIP or UniProtKB/Swiss-Prot (Protein only) format.
// A partially formatted sequence is not accepted.
// Adding a return to the end of the sequence may help certain applications understand the input.
// Note that directly using data from word processors may yield unpredictable results as hidden/control characters may be present.
export type Sequence = string;

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/database
// There are 512 possible values, maybe not needed to list them all
// Database
export type Database =
  | 'uniprotkb'
  | 'uniparc'
  | 'uniprotkb_archaea'
  | 'uniprotkb_arthropoda'
  | 'uniprotkb_bacteria'
  | 'uniprotkb_complete_microbial_proteomes'
  | 'uniprotkb_covid19'
  | 'uniprotkb_enzyme'
  | 'uniprotkb_eukaryota'
  | 'uniprotkb_fungi'
  | 'uniprotkb_human'
  | 'uniprotkb_mammals'
  | 'uniprotkb_nematoda'
  | 'uniprotkb_pdb'
  | 'uniprotkb_reference_proteomes'
  | 'uniprotkb_refprotswissprot'
  | 'uniprotkb_rodents'
  | 'uniprotkb_swissprot'
  | 'uniprotkb_swissprotsv'
  | 'uniprotkb_trembl'
  | 'uniprotkb_vertebrates'
  | 'uniprotkb_viridiplantae'
  | 'uniprotkb_viruses'
  | 'uniref100'
  | 'uniref50'
  | 'uniref90';

// https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/parameterdetails/hsps
// HSPs: max number of alignments for each hit; undefined = all
export type HSPs = undefined | number;

export type ServerParameters = {
  program: Program; // program
  task?: Task;
  email: string; // email
  matrix: Matrix; // matrix
  alignments: Alignments; // hits
  scores: Scores; // hits
  exp: Exp; // threshold
  dropoff?: Dropoff;
  match_scores?: MatchScores;
  gapopen?: GapOpen;
  gapext?: GapExt;
  filter: Filter; // filter
  seqrange?: SeqRange;
  gapalign?: GapAlign; // gapped
  wordsize?: WordSize;
  taxids?: TaxIDs; // taxons included
  negative_taxids?: NegativeTaxIDs; // taxons excluded
  compstats?: CompStats;
  align?: Align;
  transltable?: TranslTable;
  stype: SType; // stype
  sequence: Sequence; // sequence
  database: Database;
  hsps: HSPs; // alignments per hit
};

export type PublicServerParameters = Omit<ServerParameters, 'email'>;
