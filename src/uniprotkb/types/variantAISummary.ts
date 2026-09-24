export type VariantAISummary = {
  protein_acc: string;
  variants: Variant[];
};

export type Variant = {
  variant_name: string;
  synthesis_summary: SynthesisSummary;
  abstract_summaries: AbstractSummary[];
  impact_sentences: ImpactSentence[];
};

export type SynthesisSummary = {
  pmids: number[];
  summary: string;
};

export type AbstractSummary = {
  pmid: number;
  summary: string;
};

export type ImpactSentence = {
  pmids: number[];
  sentence: string;
};
