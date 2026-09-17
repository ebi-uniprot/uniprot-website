---
title: SAM - Sequence Analysis Methods for automatic annotation
type: help
categories: help
---

UniProt's [Automatic Annotation pipeline](https://www.uniprot.org/help/automatic_annotation) has been designed to enhance the **unreviewed records (in UniProtKB/TrEMBL** by enriching them with automatic classification and annotation. In this context, we use a suite of Sequence Analysis Methods (SAM) to annotate extra sequence-specific information, some of which are also applied to **reviewed records (in UniProtKB/Swiss-Prot)**.

# Methods

Predictions of sequence features such as [Signal](https://www.uniprot.org/help/signal), [Transmembrane](https://www.uniprot.org/help/transmem), [Coiled coil](https://www.uniprot.org/help/coiled) and [intrinsically disordered](https://en.wikipedia.org/wiki/Intrinsically_disordered_proteins) regions (the latter described in [Region](https://www.uniprot.org/help/region) and [Compositional bias](https://www.uniprot.org/help/compbias) annotations) are generated using the following software from external providers:

- [TMHMM](https://services.healthtech.dtu.dk/services/TMHMM-2.0/)
- [SignalP](https://services.healthtech.dtu.dk/services/SignalP-5.0/)
- [Phobius](https://phobius.sbc.su.se/)
- [Coils](http://embnet.vital-it.ch/software/COILS_form.html)
- [MobiDB-lite](https://protein.bio.unipd.it/mobidblite/)

These methods are applied to UniProtKB sequences by [InterPro](https://www.ebi.ac.uk/interpro) to predict sequence features. More annotations (mainly [keywords](https://www.uniprot.org/help/keywords)) are then added automatically to enrich the generated predictions. The new predictions are propagated to all the UniProtKB/TrEMBL records that do not already contain such feature predictions from the [UniRule](https://www.uniprot.org/help/unirule) automatic annotation system.

# Overlaps and sanity checks

We use the overlap of different methods to confirm the presence of a predicted sequence feature.

## Transmembrane region

TMHMM and Phobius predictors are used to infer transmembrane regions. If there is an overlap of at least 10 amino acids between TMHMM and Phobius results, the transmembrane region is annotated using the sequence ranges predicted by Phobius. Otherwise, if there is no such overlap, no predictions are generated.

# See also

- [Transmembrane regions in reviewed entries](https://www.uniprot.org/help/transmem)

![image](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/sam-13.png)

## Signal peptide

TMHMM, SignalP and Phobius predictors are used to infer signal peptides. If there is a prediction from SignalP and none from TMHMM in the same range, the signal peptide is annotated.  
If SignalP and Phobius both predict a signal peptide, then it is annotated.  
When predicted N-terminal signal peptides (as predicted by SignalP) and transmembrane regions (as predicted by TMHMM) overlap, then the prediction returned by Phobius is used to discriminate between the two possibilities.  
In all the above cases, we annotate the sequence region predicted by SignalP.

### See also

- [Signal peptides in reviewed entries](https://www.uniprot.org/help/signal)

## Coiled coil region

Only the Coils method is used to predict coiled coil regions. If a disordered region is predicted in the same range by MobiDB-lite, the coiled coil region is not annotated.

### See also

- [Coiled coil regions in reviewed entries](https://www.uniprot.org/help/coiled)

## Intrinsically disordered region

The [MobiDB-lite method](https://doi.org/10.1093/bioinformatics/btx015) uses several different predictors to derive a consensus prediction for regions that are intrinsically disordered (or have a compositional bias). These predictions can be found in both reviewed and unreviewed entries.

### See also

- [Region](https://www.uniprot.org/help/region)
- [Compositional bias](https://www.uniprot.org/help/compbias)
