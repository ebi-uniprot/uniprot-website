# Upcoming features and known bugs

This is a non exhaustive list of features which will be added to the website in the coming weeks/months, as well as known bugs. Please read before submitting a bug report.

## General

- The website is not responsive yet, and best viewed on laptop/desktops with a resolution above 1024x768px until then.
- Only "modern" browsers such as Chrome, Firefox, Safari, Edge, etc... are supported. Internet Explorer is not supported.

## Performance

- There is a known issue with response caching (at the traffic manager level), meaning searches are not performing as
  quickly as they should be. We are working on a solution to this.

## Homepage

- News are not dynamically loaded.
- "Tiles" will eventually point to landing pages for each resource.
- Some of the links currently link to the current UniProt website. These links will be updated as sections are added.

## Query builder

- Search with genome location
- [BUG](https://www.ebi.ac.uk/panda/jira/browse/TRM-25889) Proteomes Taxonomy suggester not working for non-UniProtKB searches.

## UniProtKB Results

- Proteome filter
- Nicer lineage component
- [BUG](https://www.ebi.ac.uk/panda/jira/browse/TRM-24893) Interacts with column stays empty.

## UniProtKB Entry

- GO terms is currently using the GO Ribbons widget and displaying data from AGR. We will update this and display UniProt data instead.
- Entry history.
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
- Alignment visualisation sometimes jumps by a few pixels when interacting

## Align

- Alignment visualisation sometimes jumps by a few pixels when interacting

## Peptide Search

- Missing sequence matching column

## Upload Lists / ID Mapping

- Column selection for UniParc and UniRef results

## Tools Results (Dashboard)

## Basket

- Display of basket contents as table
- Basket buttons

## "View by" functionality (renamed to "Statistics")

- Not yet implemented. Looking into the possibility of doing enrichment analysis.

## Help

We are working on an overhaul of the Help center.

## Programmatic Access documnentation

- Not yet implemented

## Release Statistics

- Not yet implemented
