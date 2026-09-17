---
title: Topological domain
type: help
categories: Subcellular_location,manual
---

This subsection of the ['Subcellular location'](https://www.uniprot.org/help/subcellular_location_section) section describes the subcellular compartment where each non-membrane region of a membrane-spanning protein is found.

Topological domains are annotated according to a controlled vocabulary, the elements of which are listed below.

**Common topological domains**

-   Chloroplast intermembrane
-   Cytoplasmic
-   Extracellular
-   Intravacuolar
-   Intravirion
-   Lumenal
-   Lumenal, thylakoid
-   Lumenal, vesicle
-   Mitochondrial intermembrane
-   Mitochondrial matrix
-   Periplasmic
-   Peroxisomal
-   Peroxisomal matrix
-   Nuclear
-   Perinuclear space
-   Stromal
-   Vacuolar
-   Vesicular
-   Virion surface

**Rare topological domains**

-   Lumenal, melanosome
-   Mother cell cytoplasmic
-   Forespore intermembrane space
-   Intragranular
-   In membrane
-   Pore forming
-   Exoplasmic loop

Examples: [Q8BJ48](https://www.uniprot.org/uniprotkb/Q8BJ48#subcellular_location), [O14300](https://www.uniprot.org/uniprotkb/Q9BDE0#subcellular_location), [Q93ZB2](https://www.uniprot.org/uniprotkb/Q93ZB2#subcellular_location), [Q9LD37](https://www.uniprot.org/uniprotkb/Q9LD37#subcellular_location), [P43524](https://www.uniprot.org/uniprotkb/P43524#subcellular_location), [Q9NR77](https://www.uniprot.org/uniprotkb/Q9NR77#subcellular_location), [P25818](https://www.uniprot.org/uniprotkb/P25818#subcellular_location), [O15155](https://www.uniprot.org/uniprotkb/O15155#subcellular_location), [Q9H598](https://www.uniprot.org/uniprotkb/Q9H598#subcellular_location), [P0A221](https://www.uniprot.org/uniprotkb/P0A221#subcellular_location)

Note that in each case the subcellular location of the protein as a whole is defined in the ['Subcellular location'](https://www.uniprot.org/help/subcellular_location) subsection.

We annotate both experimentally determined and predicted topological domains.

# 1. Annotation of experimentally proven topological domains:

Most often, there is proof for the **existence** of transmembrane domains, but not for their **boundaries**. As a consequence, the **extents** of [transmembrane regions](https://www.uniprot.org/help/transmem) and the corresponding neighboring topological domains are predicted. Even when supporting experimental evidence is available for the assignment of a particular region of a protein to a particular cellular compartment, the topological domains of a protein are therefore generally annotated using the evidence ['Sequence analysis'](https://www.uniprot.org/help/evidences#ECO:0000255).  
Example: [Q8TCT9](https://www.uniprot.org/uniprotkb/Q8TCT9#subcellular_location)

When there is clear experimental proof for the location of the N-terminus or the C-terminus in the cytoplasm (or some other cellular compartment), this is labeled with ['Experimental'](https://www.uniprot.org/help/evidences#ECO:0000269) or ['Curated'](https://www.uniprot.org/help/evidences#ECO:0000305) evidence depending on the level of confidence. In this case, the positions of the topological domains can be propagated to related entries ['By similarity'](https://www.uniprot.org/help/evidences#ECO:0000250) if applicable.  
Examples: [Q8TCT9](https://www.uniprot.org/uniprotkb/Q8TCT9#subcellular_location) (experimental), [Q9D8V0](https://www.uniprot.org/uniprotkb/Q9D8V0#subcellular_location) (propagated by similarity)

However when the experimental technique used allows the assignment of the transmembrane boundary to a particular position (X-ray crystallography, etc.), the topological domain is labeled with ['Experimental'](https://www.uniprot.org/help/evidences#ECO:0000269) or ['Curated'](https://www.uniprot.org/help/evidences#ECO:0000305) evidence. In this case, the positions of the topological domains can be propagated to related entries ['By similarity'](https://www.uniprot.org/help/evidences#ECO:0000250) if applicable.  
Examples: [P63142](https://www.uniprot.org/uniprotkb/P63142#subcellular_location) (experimental), [P22459](https://www.uniprot.org/uniprotkb/P22459#subcellular_location) (propagated by similarity)

Having said this, unfortunately [not all UniProtKB/Swiss-Prot annotations have evidence](https://www.uniprot.org/help/evidence_in_swissprot). The annotations which are missing evidence were created before we started to manually curate information with evidence in UniProtKB/Swiss-Prot, and manual attribution of evidence to these existing annotations was not possible due to the huge amount of existing data. In such cases, the absence of any evidence for topological domains may in many cases be interpreted as 'Experimental' or 'Curated'.

# 2. Annotation of predicted topological domains:

We also annotate topological domains based on the predictions provided by the program TMHMM, which returns a probability that non-transmembrane regions of a protein are in a cytoplasmic compartment (specified as 'in') or a non-cytoplasmic compartment (specified as 'out'). When TMHMM returns a high confidence topology prediction for a protein of known subcellular location, the notional 'in' and 'out' predictions from TMHMM are specified using a controlled vocabulary as described above. For instance, we may specify 'in' as 'cytoplasmic' and 'out' as 'periplasmic'.  
Example: [Q8BJ48](https://www.uniprot.org/uniprotkb/Q8BJ48#subcellular_location)

When nothing is known about the subcellular location of the protein, we annotate the topological domains based on TMHMM predictions using the default values of 'cytoplasmic' and 'extracellular'. In all cases, predicted topological domains are annotated with ['Sequence analysis'](https://www.uniprot.org/help/evidences#ECO:0000255).

# See also

-   [Evidence](https://www.uniprot.org/help/evidences)
-   [Transmembrane](https://www.uniprot.org/help/transmem)
-   [Sequence annotation (features)](https://www.uniprot.org/help/sequence_annotation)
