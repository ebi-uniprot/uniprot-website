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

- Nicer lineage component

## UniProtKB Entry

- GO terms is currently using the GO Ribbons widget and displaying data from AGR. We will update this and display UniProt data instead.
- Suggested terms - TRM-20293

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

- Keywords graphical representation
- Nicer lineage component
- Disease cross-reference links

## BLAST

- Currently missing BLAST against UniRef/UniParc.
- "Filter by Taxonomy" to be able to add any taxonomy node as a filter, not only suggested ones.
- Alignment visualisation sometimes jumps by a few pixels when interacting

## Align

- Alignment visualisation sometimes jumps by a few pixels when interacting

## Peptide Search

- Missing sequence matching column

## Upload Lists / ID Mapping

- Column selection for UniParc and UniRef results

## Tools Results (Dashboard)

## Basket

## "View by" functionality (renamed to "Statistics")

- Not yet implemented. Looking into the possibility of doing enrichment analysis.

## Help

- Contextual help

## Programmatic Access documnentation

- Data & APIs centre

## Release Statistics

- Not yet implemented
