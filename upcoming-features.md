# Upcoming features and known bugs

This is a non exhaustive list of features which will be added to the website in the coming weeks/months, as well as known bugs. Please read before submitting a bug report.

## General

- The website is not responsive yet, and best viewed on laptop/desktops with a resolution above 1024x768px until then.
- Only "modern" browsers such as Chrome, Firefox, Safari, Edge, etc... are supported. Internet Explorer is not supported.

## Homepage

- News are not dynamically loaded.
- "Tiles" will eventually point to landing pages for each resource.
- Some of the links currently link to the current UniProt website. These links will be updated as sections are added.

## Query builder

- Search with genome location
- [BUG](https://www.ebi.ac.uk/panda/jira/browse/TRM-21994) AND/OR shouldn't be displayed for the first option.
- [BUG](https://www.ebi.ac.uk/panda/jira/browse/TRM-23247) / [BUG](https://www.ebi.ac.uk/panda/jira/browse/TRM-25581) GO term search syntax is wrong
- [BUG](https://www.ebi.ac.uk/panda/jira/browse/TRM-25557) Change namespace when on other namespace results page causes it to search in that namespace instead.
- [BUG](https://www.ebi.ac.uk/panda/jira/browse/TRM-25580) Searching for " \* " in database xref generates the wrong query string.
- [BUG](https://www.ebi.ac.uk/panda/jira/browse/TRM-25888) Double quotes get added to some search fields.
- [BUG](https://www.ebi.ac.uk/panda/jira/browse/TRM-25889) Proteomes Taxonomy suggester not working for non-UniProtKB searches.

## UniProtKB Results

- Proteome filter
- Nicer lineage component
- [BUG](https://www.ebi.ac.uk/panda/jira/browse/TRM-24893) Interacts with column stays empty.

## UniProtKB Entry

- GO terms is currently using the GO Ribbons widget and displaying data from AGR. We will update this and display UniProt data instead.
- Entry history.
- Inline PubMed IDs to be turned into links.
- "Search for EC number" link
- Suggested terms - TRM-20293
- [BUG](https://www.ebi.ac.uk/panda/jira/browse/TRM-25578) Scroll to hash not always working (impact on protein highlights from results card).

## UniRef Results

## UniRef Entry

## UniParc Results

- Timeline column

## UniParc Entry

- Download functionality

## Proteomes Results

## Proteomes Entry

- Add annotation program information

## Supporting Data

- UniRule and ARBA
- Keywords graphical representation
- Nicer lineage component
- Disease cross-reference links

## BLAST

- Currently missing BLAST against UniRef/UniParc.
- "Filter by Taxonomy" to be able to add any taxonomy node as a filter, not only suggested ones.
- Sort (TBD)

## Align

## Peptide Search

- Results

## Upload Lists / ID Mapping

-Results

## Tools Results (Dashboard)

## Basket

- Not yet implemented

## "View by" functionality (renamed to "Statistics")

- Not yet implemented. Looking into the possibility of doing enrichment analysis.

## Help

We are working on an overhaul of the Help center.

## Programmatic Access documnentation

- Not yet implemented

## Release Statistics

- Not yet implemented
