---
title: How can I download the sequences corresponding to a specified domain or region, or the sequences of mature chains or peptides, from a list of UniProt entries?
type: help
categories: UniProtKB,Download,Sequence,Text_search,Family_and_domains,faq
---

## Download the sequences of all annotated disintegrin domains

Run your query, e.g. to retrieve the UniProtKB entries annotated to contain [disintegrin domains](https://www.uniprot.org/uniprotkb?query%3D%28ft_domain%3Adisintegrin%29), (or alternatively, with a [list of identifiers](https://www.uniprot.org/uniprotkb?query=ADA18_HUMAN%20OR%20ADA19_HUMAN%20OR%20ADA21_HUMAN%20OR%20ADA22_HUMAN%20OR%20ADA23_HUMAN)).

Then click on "Download" and choose to download the results in [GFF format](https://en.wikipedia.org/wiki/General_feature_format).  
You can modify the GFF file as follows:

Keep only the lines containing your domain/region, (e.g. "Disintegrin", "Cytoplasmic" or "Transit") and ignore all other lines (e.g. using grep). These lines include information about extent of the domains/regions.

Transform the relevant lines (e.g. using a scripting language, or a word processor) from

    Q9R158 UniProtKB Domain 392 478 . . . Note=Disintegrin
    Q10741 UniProtKB Domain 457 551 . . . Note=Disintegrin
    O14672 UniProtKB Domain 457 551 . . . Note=Disintegrin

to

    Q9R158[392-478]
    Q10741[457-551]
    O14672[457-551]

and ignore all other lines.

You will then be able to use the [Retrieve/ID mapping](https://www.uniprot.org/id-mapping) service to upload the file you obtained from modifying the GFF, and retrieve the corresponding entries. To download the subsequences, select the format "FASTA (subsequence)" from the download menu.

If you only have a short list of entries, you can also select the domains manually from the entry views by clicking on "Add to basket" at the right hand side of the feature descriptions in the section "Family and domains" of these entries. When you have finished selecting your domains, open the [basket](https://www.uniprot.org/help/basket) and click on "Download".

## Download the sequences of all mature chains or peptides, e.g. cleavage products in case of viral polyprotein entries

There is no pre-computed database carrying the sequence data for mature chains or peptides.  
However, for any given query or even for the complete database, you can proceed as described above and download the gff format and when following the subsequent steps, just replace "Domain" by "Chain" and / or "Peptide", and optionally use product names such as "glycoprotein" in the case of viral polyprotein entries.
