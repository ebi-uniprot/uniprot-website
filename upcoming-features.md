# Upcoming features and known bugs

This is a non exhaustive list of features which will be added to the website in the coming weeks/months, as well as known bugs. Please read before submitting a bug report.

## General

- The website is not responsive yet, and best viewed on laptop/desktops with a resolution above 1024x768px until then.
- Only "modern" browsers such as Chrome, Firefox, Safari, etc... are supported. Internet Explorer is not supported.

## Homepage

- News are not dynamically loaded.
- "Tiles" will eventually point to landing pages for each resource.
- Some of the links currently link to the current UniProt website. These links will be updated as sections are added.

## Query builder
- Search with genome location
- [BUG] AND/OR shouldn't be displayed for the first option TRM-21994
- [BUG] GO term search syntax is wrong TRM-23247 / TRM-25581
- [BUG] Change namespace when on other namespace results page causes it to search in that namespace instead TRM-25557
- [BUG] Searching for " * " in database xref generates the wrong query string TRM-25580
- [BUG] Double quotes get added to some search fields TRM-25888
- [BUG] Proteomes Taxonomy suggester not working TRM-25889


## UniProtKB Results
- Proteome filter
- Nicer lineage component
- [BUG] Interacts with column stays empty TRM-24893

## UniProtKB Entry

- GO terms is currently using the GO Ribbons widget and displaying data from AGR. We will update this and display UniProt data instead.
- Entry history.
- Inline PubMed IDs to be turned into links.
- "Search for EC number" link
- Suggested terms - TRM-20293
- [BUG] Scroll to hash not always working (impact on protein highlights from results card). TRM-25578

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
