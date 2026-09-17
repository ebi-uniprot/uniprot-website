---
title: How can I search UniProt for chemical or reaction data?
type: help
categories: Text_search,Function,UniProtKB,faq
---


**Table of contents**

   * [Search for small molecules](https://www.uniprot.org/help/chemical_data_search#search-for-small-molecules)
      * [Search with name or identifier](https://www.uniprot.org/help/chemical_data_search#search-with-name-or-identifier)
      * [Chemical structure search with InChIKey](https://www.uniprot.org/help/chemical_data_search#chemical-structure-search-with-inchikey)
   * [Search for catalytic activity and reaction data](https://www.uniprot.org/help/chemical_data_search#search-for-catalytic-activity-and-reaction-data)
   * [Video tutorial](https://www.youtube.com/watch?v=5eW-eZJ08wc)


# Search for small molecules

UniProt has standardized annotations that involve small molecules with the [ChEBI](https://www.ebi.ac.uk/chebi) (Chemical Entities of Biological Interest) ontology to provide high quality computationally tractable annotations, and to support searches that make use of the chemical data stored in ChEBI for its entities (e.g. name and synonyms, chemical structure, hierarchical and other relationships).

ChEBI terms are used in [Binding site](https://www.uniprot.org/help/binding), [Cofactor](https://www.uniprot.org/help/cofactor) and [Catalytic activity](https://www.uniprot.org/help/catalytic_activity) annotations, and the [Advanced search](https://www.uniprot.org/help/advanced_search) allows to search in each of these fields separately, or in all combined by selecting the "Small molecule" field.

Example: biotin - [ChEBI:57586](https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:57586)

- biotin in "Small molecule":
[(chebi:"CHEBI:57586") AND (reviewed:true)](https://www.uniprot.org/uniprotkb?query=(chebi:%22CHEBI:57586%22)%20AND%20(reviewed:true))
- biotin in "Binding site":
[(ft_binding:"CHEBI:57586") AND (reviewed:true)](https://www.uniprot.org/uniprotkb?query=(ft_binding:%22CHEBI:57586%22)%20AND%20(reviewed:true))
- biotin in "Cofactor":
[(cc_cofactor_chebi:"CHEBI:57586") AND (reviewed:true)](https://www.uniprot.org/uniprotkb?query=(cc_cofactor_chebi:%22CHEBI:57586%22)%20AND%20(reviewed:true))
- biotin in "Catalytic activity":
[(cc_catalytic_activity:"CHEBI:57586") AND (reviewed:true)](https://www.uniprot.org/uniprotkb?query=(cc_catalytic_activity:%22CHEBI:57586%22)%20AND%20(reviewed:true))

The search that is performed is using ChEBI's hierarchical relationships. This allows to search with a general concept, e.g. a compound class like [lipid (CHEBI:18059)](https://www.uniprot.org/uniprotkb?query=(chebi:%22CHEBI:18059%22)%20AND%20(reviewed:true)) and retrieve all annotations that use more specific forms of this concept, e.g. [a fatty acid' (CHEBI:28868)](https://www.uniprot.org/uniprotkb?query=(chebi:%22CHEBI:28868%22)%20AND%20(reviewed:true)), and even more specific forms like [hexadecanoate (CHEBI:7896)](https://www.uniprot.org/uniprotkb?query=(chebi:%22CHEBI:7896%22)%20AND%20(reviewed:true)) or [(8R)-hydroperoxy-(5Z,9E,11Z,14Z)-eicosatetraenoate (CHEBI:57447)](https://www.uniprot.org/uniprotkb?query=(chebi:%22CHEBI:57447%22)%20AND%20(reviewed:true)).


## Search with name or identifier

When you start typing the name of a small molecule, the autocomplete function will propose ChEBI terms whose name or synonyms match your query. Select the desired one and execute the search.

Alternatively, you can also enter directly a ChEBI ID. Note that in UniProt we use the convention to annotate the ChEBI term that represents the major microspecies (the predominant protonation state) at pH7.3. If your ChEBI ID corresponds to a different protonation state, the search will automatically map it to the corresponding ID that is used in UniProt.


## Chemical structure search with InChIKey

You can search small molecules using the InChIKey, a standard hashed representation of the IUPAC International Chemical Identifier ([InChI](https://www.inchi-trust.org/about-the-inchi-standard/)) that provides a unique and compact representation of chemical structure data:

![image](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/inchikey-field-search.png)

The InChIKey is made of layers. You can search with a complete InChIKey, as well as with the connectivity and stereochemistry layers, or the connectivity layer alone:

* Search with the complete InChIKey for [CHEBI:4167](https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:4167) - D-glucopyranose:
[(inchikey:WQZGKKKJIJFFOK-GASJEMHNSA-N)](https://www.uniprot.org/uniprotkb?query=(inchikey:WQZGKKKJIJFFOK-GASJEMHNSA-N))
* Search without the stereochemistry layer:
[(inchikey:WQZGKKKJIJFFOK-GASJEMHNSA)](https://www.uniprot.org/uniprotkb?query=(inchikey:WQZGKKKJIJFFOK-GASJEMHNSA))
* Search with only the connectivity layer (molecular skeleton):
[(inchikey:WQZGKKKJIJFFOK)](https://www.uniprot.org/uniprotkb?query=(inchikey:WQZGKKKJIJFFOK))



# Search for catalytic activity and reaction data

Enzyme-catalysed reactions are annotated in the [Catalytic activity](https://www.uniprot.org/help/catalytic_activity) section.

Historically, UniProt has followed the recommendations of the Nomenclature Committee of the International Union of Biochemistry and Molecular Biology ([NC-IUBMB](https://iubmb.qmul.ac.uk/enzyme/)) for the description of enzymatic activities. The NC-IUBMB use their own names for the reactants, and sometimes the catalytic activity from IUBMB is a free text reaction description. In [2018](https://www.uniprot.org/release-notes/2018-12-05-release), UniProt has started to use the [Rhea](https://www.rhea-db.org/) knowledgebase as a vocabulary to annotate and represent enzyme-catalysed reactions in UniProtKB. Rhea uses ChEBI to represent small molecule reactants and in addition its own compounds for reactants that are not within the scope of ChEBI.

The [Advanced search](https://www.uniprot.org/help/advanced_search) can be used to search in these annotations by reaction participant (name or identifier from [ChEBI](https://www.ebi.ac.uk/chebi/) or [Rhea](https://www.rhea-db.org/)), Rhea reaction identifier, or by [InChIKey](https://www.uniprot.org/help/chemical_data_search#chemical-structure-search-with-inchikey).

The autocompletion mechanism works for all reactants from ChEBI and Rhea.

Example: Select the "Catalytic activity" search field and start to enter 'lysin'. The autocompletion mechanism suggests several compounds from ChEBI, and others from Rhea:

![image](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/chem_search.png)

When searching with a compound name that is from the NC-IUBMB, a simple full text search is performed, because the NC-IUBMB uses no ontology to support autocompletion and hierarchical searches. Example: [(cc_catalytic_activity:PretRNA)](https://www.uniprot.org/uniprotkb?query=(cc_catalytic_activity:PretRNA))

The following query returns all entries that have a catalytic activity annotation that is not sourced from Rhea but from the NC-IUBMB:
[(cc_catalytic_activity:\*) NOT (cc_catalytic_activity:"rhea:\*")](https://www.uniprot.org/uniprotkb?query=(cc_catalytic_activity:*)%20NOT%20(cc_catalytic_activity:%22rhea:*%22))

You can also search Rhea reactions by their identifier, e.g. [RHEA:20856](https://www.rhea-db.org/rhea/20856) describes the reaction
```
an N-acylsphing-4-enine + H2O = a fatty acid + sphing-4-enine
```
You can retrieve all proteins that catalyze this reaction with the query:
[(cc_catalytic_activity:"rhea:20856")](https://www.uniprot.org/uniprotkb?query=(cc_catalytic_activity:%22rhea:20856%22)).

![image](https://github.com/ebi-uniprot/uniprot-manual/raw/main/images/chem_rhea.png)


