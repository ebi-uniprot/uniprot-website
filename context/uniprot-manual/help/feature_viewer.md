---
title: Feature viewer
type: help
categories: manual
---

The feature viewer is a comprehensive graphical representation of protein sequence features that are mapped to a protein's amino acid sequence. It includes a range of data from multiple sources such as domains, sites, post-translational modifications, mutagenesis, proteomics-derived peptides, antigenic sequences and natural variants. Data is composed of a mixture of UniProtKB curated and imported data from [cross-referenced](https://www.uniprot.org/database?query=*) databases and collaboration initiatives.
The feature viewer facilitates understanding of multiple aspects of a protein's function by providing an overview of all the protein's features in a single graphical view.

## Navigating the feature viewer

Protein features are displayed in tracks. Each track represents a biological category of features, many of which can be expanded into sub-tracks for a more detailed overview. Selecting a feature displays more detailed information, including the amino acid residue numbers involved, feature description and source of the data. Selecting a feature also results in a yellow vertical highlight at those amino acid residues across all tracks on the feature viewer, which assists in identification of co-occurring features at those residues.

When 3D structure information is available for a protein, an interactive graphic of the structure is shown below the feature table, with options below the graphic to change the structure shown (if [multiple structures are available](https://www.uniprot.org/help/structure_section#structure_coverage)). Selecting a feature in the feature viewer  highlights the residues involved on the 3D structure graphic, provided that the structure covers the [sequence portion](https://www.uniprot.org/help/structure_subseq) on which the feature occurs.

## Where to find the feature viewer

The feature viewer can be found in the ‘Feature viewer’ tab at the top of a protein entry page. 
Some tracks from the feature viewer can also be found within the protein entry, such as in the PTM/Processing section.

## How to download data found in the feature viewer
Information found in the feature viewer can be downloaded by using the ‘Download’ option in the top left of the feature viewer window. 
- Download UniProtKB > Entry will download all information shown in the [UniProtKB entry view](https://www.uniprot.org/help/explore_uniprotkb_entry) for this protein.
- Download UniProtKB > Features Only will download all protein sequence features in the entry that are mapped to amino acid residues from within the UniProtKB entry.
- Download Additional Datasets > downloads imported data associated with that track from datasets that are sourced from [cross-referenced databases](https://www.uniprot.org/database?query=*).

## Feature viewer tracks and associated help pages
Each track within the feature viewer shows a category of biological data for the protein displayed. Some tracks can be expanded into sub-tracks which show further categories within that track and allow a more detailed view of the features. 
Tracks will only be shown if there is data available for that feature type for a selected protein.

Find below a list of all possible tracks, sub-tracks and their associated help pages.

<table>
  <thead>
    <tr>
      <th><strong>Track</strong></th>
      <th><strong>Sub-track</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="6">Molecule processing</td>
      <td><a href="https://www.uniprot.org/help/signal">Signal peptide</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/chain">Chain</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/transit">Transit peptide</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/init_met">Initiator methionine</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/propep">Propeptide</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/peptide">Peptide</a></td>
    </tr>
    <tr>
      <td rowspan="6">Sequence information</td>
      <td><a href="https://www.uniprot.org/help/compbias">Compositional bias</a></td>
    </tr>
    <tr>
    <td><a href="https://www.uniprot.org/help/conflict">Sequence conflict</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/non_cons">Non-adjacent residues</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/non_ter">Non-terminal residues</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/unsure">Sequence uncertainty</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/non_std">Non-standard residue</a></td>
    </tr>
    <tr>
      <td rowspan="3">Topology</td>
      <td><a href="https://www.uniprot.org/help/topo_dom">Topological domain</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/transmem">Transmembrane</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/intramem">Intramembrane</a></td>
    </tr>
    <tr>
      <td rowspan="6">Domains</td>
      <td><a href="https://www.uniprot.org/help/domain">Domain</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/InterPro_rep_domain">InterPro Representative Domain</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/region">Region</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/repeat">Repeat</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/motif">Motif</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/zn_fing">Zinc finger</a></td>
    </tr>
    <tr>
      <td rowspan="7">Sites</td>
      <td><a href="https://www.uniprot.org/help/binding">Metal binding</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/site">Site</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/binding">Calcium binding</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/dna_bind">DNA binding</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/binding">Nucleotide binding</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/binding">Binding site</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/act_site">Active site</a></td>
    </tr>
    <tr>
      <td rowspan="6">PTM</td>
      <td><a href="https://www.uniprot.org/help/mod_res">Modified residue</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/mod_res_large_scale">Modified residue (large scale data)</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/carbohyd">Glycosylation</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/disulfid">Disulfide bond</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/crosslnk">Cross-link</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/lipid">Lipidation</a></td>
    </tr>
    <tr>
      <td>Epitopes</td>
      <td><a href="https://www.uniprot.org/help/epitopes">Epitope</a></td>
    </tr>
    <tr>
      <td>Antigenic sequences</td>
      <td><a href="https://www.uniprot.org/help/Antibody_binding_sequences">Antibody binding sequences</a></td>
    </tr>
    <tr>
      <td rowspan="2">Mutagenesis</td>
      <td><a href="https://www.uniprot.org/help/mutagen">Mutagenesis</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/mutagen">Mutagenesis (large scale data)</a></td>
    </tr>
    <tr>
      <td colspan="2"><a href="https://www.uniprot.org/help/variant_viewer">Variants</a></td>
    </tr>
    <tr>
      <td colspan="2"><a href="https://www.uniprot.org/help/rna_editing">RNA Editing</a></td>
    </tr>
    <tr>
      <td rowspan="4">Proteomics</td>
      <td><a href="https://www.uniprot.org/help/proteomics#1-data-from-public-mass-spectrometry-based-proteomics-resources">Unique peptide</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/proteomics#1-data-from-public-mass-spectrometry-based-proteomics-resources">Non-unique peptide</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/proteomics#3-human-proteome-project">Human proteome project</a></td>
    </tr>
    <tr>
      <td><a href="https://www.uniprot.org/help/proteomics#4-post-translational-modification-ptm-data-derived-from-large-scale-mass-spectrometry-ms-datasets">PTM-containing peptide</a></td>
    </tr>
    <tr>
      <td>PDBe 3D structure coverage</td>
      <td><a href="https://www.uniprot.org/help/structure_section#structure-coverage">PDBe coverage</a></td>
    </tr>
    <tr>
      <td colspan="2"><a href="https://www.uniprot.org/help/structure_section#alphafold-structural-models">AlphaFold Confidence</a></td>
    </tr>
    <tr>
      <td colspan="2"><a href="https://www.uniprot.org/help/structure_section#alphamissense-prediction-of-genetic-variation-consequence-in-the-feature-viewer">AlphaMissense Pathogenicity</a></td>
    </tr>
  </tbody>
</table>
