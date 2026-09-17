---
title: Programmatic access - Retrieving entries via queries
type: help
categories: UniProtKB,UniRef,UniParc,Programmatic_access,Text_search,Technical,help
---

You can use any query to define the set of entries that you are interested in. It is perhaps simplest to start with an interactive [text search](https://www.uniprot.org/help/text%2Dsearch) on the website to find the URL for your set, e.g., all reviewed human entries:

```
https://www.uniprot.org/uniprotkb?query=(reviewed:true)%20AND%20(organism_id:9606)
```

The data for the website is provided by our REST API. For the above example, the request to retrieve the first batch of data would be:

```bash
https://rest.uniprot.org/uniprotkb/search?query=(reviewed:true)%20AND%20(organism_id:9606)
```

The rest of this page details how you can customise the retrieved data, and how to paginate through all the pages of data that the API is exposing.

# Formats

Formats for search results / an entry can be requested in several ways.

## Format Parameter

All requests allow the `format` parameter, which can be used to indicate the desired format. For example:

```bash
# TAB SEPARATED VALUES
"https://rest.uniprot.org/uniprotkb/search?query=reviewed:true+AND+organism_id:9606&format=tsv"

# XML
"https://rest.uniprot.org/uniprotkb/P12345?format=xml"
```

## Accept Header

As is typical with REST requests, the desired format can be specified as an Accept header. For example:

```bash
# TAB SEPARATED VALUES
curl -H "Accept: text/plain; format=tsv" "https://rest.uniprot.org/uniprotkb/search?query=reviewed:true+AND+organism_id:9606"

# XML
curl -H "Accept: application/xml" "https://rest.uniprot.org/uniprotkb/P12345"
```

# What formats are available?

The different end-points in our API provide different formats, though generally, JSON and tab-separated-values formats (TSV) are
available throughout.

## List of all formats

| Description                                                            | Accept Header Media Type    | Format Parameter |
| ---------------------------------------------------------------------- | --------------------------- | ---------------- |
| JavaScript Object Notation (JSON)                                      | application/json            | json             |
| Extensible Markup Language (XML)                                       | application/xml             | xml              |
| Text file representation                                               | text/plain; format=flatfile | txt              |
| List of one or more IDs                                                | text/plain; format=list     | list             |
| Tab-Separated-Values                                                   | text/plain; format=tsv      | tsv              |
| FASTA: a text-based format representing nucleotide / peptide sequences | text/plain; format=fasta    | fasta            |
| Genomic Feature Format (GFF)                                           | text/plain; format=gff      | gff              |
| Open Biomedical Ontologies (OBO)                                       | text/plain; format=obo      | obo              |
| Resource Description Framework (RDF)                                   | application/rdf+xml         | rdf              |
| Excel                                                                  | application/vnd.ms-excel    | xlsx             |

Some examples are given in the following:

```bash
## Accept header
curl -H "Accept: text/plain; format=flatfile" "https://rest.uniprot.org/uniprotkb/P12345"

## Format Parameter
curl "https://rest.uniprot.org/uniprotkb/search?query=human&format=gff"
```

# Tips

- Familiarise yourself with the [advanced search builder](https://www.uniprot.org/help/advanced_search) by clicking on **Advanced**.
- Click [Customize data](https://www.uniprot.org/help/customize) on the search results page to select the columns to show in the results table.
- You can also look up your relevant column names in the full list of [UniProtKB column names for programmatic access](https://www.uniprot.org/help/return_fields).

The URL for a query result consists of a data set name (e.g. `uniprot`, `uniref`, `uniparc`, `taxonomy`,...) and the actual query. The following query parameters are supported:

| Parameter        | Values                                     | Description                                                                                                                                                                                                                                                                               |
| ---------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `query`          | _string_                                   | See [query syntax](https://www.uniprot.org/help/text-search) <br> and [query fields for UniProtKB](https://www.uniprot.org/help/query-fields). <br>An empty query string will retrieve all entries in a data set. **Tip:** Refine your search by clicking **Advanced** in the search bar. |
| `format`         | See section, "What formats are available?" | See section, "What formats are available?"                                                                                                                                                                                                                                                |
| `fields`         | comma-separated list of column names       | Columns to retrieve in the results. Applies to `tsv`, `xslx` and `json` formats only. <br>(For UniProtKB you can also read the [full list of UniProtKB column names](https://www.uniprot.org/help/return_fields)).                                                                        |
| `includeIsoform` | `true` or `false`                          | Whether or not to include isoforms in the search results. _Note:_ Only applies to UniProtKB searches.                                                                                                                                                                                     |
| `compressed`     | `true` or `false`                          | Return results gzipped. Note that if the client supports HTTP compression, results may be compressed transparently even if this parameter is not set to `true`.                                                                                                                           |
| `size`           | _integer_                                  | Maximum number of results to retrieve. _Note:_ Only takes effect on searches.                                                                                                                                                                                                             |
| `cursor`         | _string_                                   | Specifies the cursor position in the entire result set, from which returned results will begin. Cursors are used to allow paging through results. Typically used together with the `size` parameter.                                                                                      |

The following example retrieves all human entries matching the term '`antigen`' in compressed JSON and tab-separated-values formats, respectively.

```bash
https://rest.uniprot.org/uniprotkb/search?query=organism_id:9606+AND+antigen&format=json&compressed=true
https://rest.uniprot.org/uniprotkb/search?query=organism_id:9606+AND+antigen&format=tsv&compressed=true
```

The next example retrieves all human entries with cross-references to PDB in tab-separated format, showing only the UniProtKB and PDB identifiers.

https://rest.uniprot.org/uniprotkb/search?query=organism_id:9606+AND+database:pdb&format=tsv&fields=id,xref_pdb

# Python Examples

All examples here use `Python 3` with the `requests` library. There are repeated imports to faciliate quick copy and paste of the code.

## 1. Use search results immediately within a Python script

### 1.1 Small number of results: use stream

In this context we want to fetch a small number of search results and save these into a variable in memory so these can then be utilised within the script. To motivate this, we will download the reviewed entries from the organism SARS-CoV-2 in UniProtKB:

#### Stream limitations

- The stream endpoint is expensive for the API to process and for this reason there is a limitation on the number of parallel requests it will handle. In the case of the stream API having too many requests a `429` status will be returned in which case you can either use [pagination](https://www.uniprot.org/help/pagination) (see 1.2) or try stream again later.
- The stream endpoint can handle result sets with at most 10,000,000 entries. If you require more, consider: looking at FTP downloads; reducing your search by being more specific; using [pagination](https://www.uniprot.org/help/pagination) (see 1.2).

#### Steps

1. Visit https://www.uniprot.org/uniprotkb?query=(organism_id:2697049)%20AND%20(reviewed:true)
2. Click `Download` in the toolbar
3. For this example we want the following selected:

- Download all
- Format: FASTA (canonical)
- Compressed: No

4. Click `Generate URL for API`
5. Under the header `API URL using the streaming endpoint` click `Copy` to get the URL which will be used in the following snippet:

```python
import requests
url = 'https://rest.uniprot.org/uniprotkb/stream?compressed=false&format=fasta&query=%28organism_id%3A2697049%29%20AND%20%28reviewed%3Atrue%29'
all_fastas = requests.get(url).text
```

At this point the `all_fastas` will contain a single string of all the FASTA sequences. From here we can create a list of FASTA sequences and find all sequences with header mentioning `SPIKE`:

```python
import re
fasta_list = re.split(r'\n(?=>)', all_fastas)
[fasta for fasta in fasta_list if 'SPIKE' in fasta]
```

    ['>sp|P0DTC2|SPIKE_SARS2 Spike glycoprotein OS=Severe acute respiratory syndrome coronavirus 2 OX=2697049 GN=S PE=1 SV=1\nMFVFLVLLPLVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPFFS\nNVTWFHAIHVSGTNGTKRFDNPVLPFNDGVYFASTEKSNIIRGWIFGTTLDSKTQSLLIV\nNNATNVVIKVCEFQFCNDPFLGVYYHKNNKSWMESEFRVYSSANNCTFEYVSQPFLMDLE\nGKQGNFKNLREFVFKNIDGYFKIYSKHTPINLVRDLPQGFSALEPLVDLPIGINITRFQT\nLLALHRSYLTPGDSSSGWTAGAAAYYVGYLQPRTFLLKYNENGTITDAVDCALDPLSETK\nCTLKSFTVEKGIYQTSNFRVQPTESIVRFPNITNLCPFGEVFNATRFASVYAWNRKRISN\nCVADYSVLYNSASFSTFKCYGVSPTKLNDLCFTNVYADSFVIRGDEVRQIAPGQTGKIAD\nYNYKLPDDFTGCVIAWNSNNLDSKVGGNYNYLYRLFRKSNLKPFERDISTEIYQAGSTPC\nNGVEGFNCYFPLQSYGFQPTNGVGYQPYRVVVLSFELLHAPATVCGPKKSTNLVKNKCVN\nFNFNGLTGTGVLTESNKKFLPFQQFGRDIADTTDAVRDPQTLEILDITPCSFGGVSVITP\nGTNTSNQVAVLYQDVNCTEVPVAIHADQLTPTWRVYSTGSNVFQTRAGCLIGAEHVNNSY\nECDIPIGAGICASYQTQTNSPRRARSVASQSIIAYTMSLGAENSVAYSNNSIAIPTNFTI\nSVTTEILPVSMTKTSVDCTMYICGDSTECSNLLLQYGSFCTQLNRALTGIAVEQDKNTQE\nVFAQVKQIYKTPPIKDFGGFNFSQILPDPSKPSKRSFIEDLLFNKVTLADAGFIKQYGDC\nLGDIAARDLICAQKFNGLTVLPPLLTDEMIAQYTSALLAGTITSGWTFGAGAALQIPFAM\nQMAYRFNGIGVTQNVLYENQKLIANQFNSAIGKIQDSLSSTASALGKLQDVVNQNAQALN\nTLVKQLSSNFGAISSVLNDILSRLDKVEAEVQIDRLITGRLQSLQTYVTQQLIRAAEIRA\nSANLAATKMSECVLGQSKRVDFCGKGYHLMSFPQSAPHGVVFLHVTYVPAQEKNFTTAPA\nICHDGKAHFPREGVFVSNGTHWFVTQRNFYEPQIITTDNTFVSGNCDVVIGIVNNTVYDP\nLQPELDSFKEELDKYFKNHTSPDVDLGDISGINASVVNIQKEIDRLNEVAKNLNESLIDL\nQELGKYEQYIKWPWYIWLGFIAGLIAIVMVTIMLCCMTSCCSCLKGCCSCGSCCKFDEDD\nSEPVLKGVKLHYT']

### 1.2 Large number of results: use pagination

When there are a large number of results to fetch it is advisable to use [pagination](https://www.uniprot.org/help/pagination) which means fetching batches of results one at a time. This is preferable to streaming because:

1. Small memory footprint: if the search result data exceeds your computer's memory, downloading by streaming this at once will cause your Python script to crash. Pagination will only load a subset of the results into your memory at once.
2. Robust to connection issues: if when downloading by streaming the connection is interrupted, the download will need to be completely restarted. When working with pagination, each batch can be reattempted from the point of failure without requiring to restart.
3. Less API resource demand: the stream endpoint is very expensive as it requires a large amount of memory. The pagination endpoint distributes this resource demand over a longer period of time so the API infrastructure is better to deal with this.
4. Process each batch as it arrives: downloading by streaming requires the download to be complete before any processing can take place. Batching allows processing to be interleaved with downloading which may be useful should it be desired to see processed results as soon as possible. The following diagram illustrates this:

```
Stream             Pagination
+------------+     +------------+
| Download n |     | Download n |
| Download n |     | Process  n |
| Download n |     | Download n |
| Process  n |     | Process  n |
| Process  n |     | Download n |
| Process  n |     | Process  n |
+------------+     +------------+
```

To motivate this context we want to find reviewed UniProtKB entries containing the word `Insulin` and sorted by the greatest number of interactions.

#### Steps

1. View the results in the browser here: https://www.uniprot.org/uniprotkb?query=Insulin%20AND%20(reviewed:true)
2. Click `Download` in the toolbar
3. For this example we want the following selected:

- Download all
- Format: TSV
- Compressed: No

4. Click `Generate URL for API`
5. Under the header `API URL using the search endpoint` click `Copy` to get the URL which will be used in the following snippet.
6. Always use `size=500` as this will provide fast performance.

```python
import requests
from requests.adapters import HTTPAdapter, Retry

re_next_link = re.compile(r'<(.+)>; rel="next"')
retries = Retry(total=5, backoff_factor=0.25, status_forcelist=[500, 502, 503, 504])
session = requests.Session()
session.mount("https://", HTTPAdapter(max_retries=retries))

def get_next_link(headers):
    if "Link" in headers:
        match = re_next_link.match(headers["Link"])
        if match:
            return match.group(1)

def get_batch(batch_url):
    while batch_url:
        response = session.get(batch_url)
        response.raise_for_status()
        total = response.headers["x-total-results"]
        yield response, total
        batch_url = get_next_link(response.headers)

url = 'https://rest.uniprot.org/uniprotkb/search?fields=accession%2Ccc_interaction&format=tsv&query=Insulin%20AND%20%28reviewed%3Atrue%29&size=500'
interactions = {}
for batch, total in get_batch(url):
    for line in batch.text.splitlines()[1:]:
        primaryAccession, interactsWith = line.split('\t')
        interactions[primaryAccession] = len(interactsWith.split(';')) if interactsWith else 0
    print(f'{len(interactions)} / {total}')
```

    500 / 4930
    1000 / 4930
    1500 / 4930
    2000 / 4930
    2500 / 4930
    3000 / 4930
    3500 / 4930
    4000 / 4930
    4500 / 4930
    4930 / 4930

Finally to see the accessions with the greatest number of interactions the `interactions` dict is sorted:

```python
sorted_interactions = sorted(interactions.items(), key=lambda item: item[1], reverse=True)
sorted_interactions[:10]
```

```
[('O76024', 467),
 ('P05067', 463),
 ('Q9NRD5', 327),
 ('O14901', 231),
 ('P62993', 197),
 ('O60260', 171),
 ('O43741', 156),
 ('P46379', 150),
 ('P61981', 144),
 ('P01112', 128)]
```

## 2. Save search results to disk

### 2.1 Small number of results: use stream

In this context we want to save to disk search results which have a small number of entries. The example from 1.1 will be used.

#### Stream limitations

- The stream endpoint is expensive for the API to process and for this reason there is a limitation on the number of parallel requests it will handle. In the case of the stream API having too many requests a `429` status will be returned in which case you can either use pagination (see 2.2) or try stream again later.
- The stream endpoint can handle at most result sets with 10,000,000 entries. If you require more consider: looking at FTP downloads; reduce your search by being more specific; using pagination (see 2.2)

#### Steps

1. Visit https://www.uniprot.org/uniprotkb?query=(organism_id:2697049)%20AND%20(reviewed:true)
2. Click `Download` in the toolbar
3. For this example we want the following selected:

- Download all
- Format: FASTA (canonical)
- Compressed: Yes

4. Click `Generate URL for API`
5. Under the header `API URL using the streaming endpoint` click `Copy` to get the URL which will be used in the following snippet:

```python
import requests

url = 'https://rest.uniprot.org/uniprotkb/stream?compressed=true&format=fasta&query=%28organism_id%3A2697049%29%20AND%20%28reviewed%3Atrue%29'
with requests.get(url, stream=True) as request:
    request.raise_for_status()
    with open('SARS-CoV-2.fasta.gz', 'wb') as f:
        for chunk in request.iter_content(chunk_size=2**20):
            f.write(chunk)
```

```
$ gzcat SARS-CoV-2.fasta.gz | head
>sp|P0DTC1|R1A_SARS2 Replicase polyprotein 1a OS=Severe acute respiratory syndrome coronavirus 2 OX=2697049 PE=1 SV=1
MESLVPGFNEKTHVQLSLPVLQVRDVLVRGFGDSVEEVLSEARQHLKDGTCGLVEVEKGV
LPQLEQPYVFIKRSDARTAPHGHVMVELVAELEGIQYGRSGETLGVLVPHVGEIPVAYRK
VLLRKNGNKGAGGHSYGADLKSFDLGDELGTDPYEDFQENWNTKHSSGVTRELMRELNGG
AYTRYVDNNFCGPDGYPLECIKDLLARAGKASCTLSEQLDFIDTKRGVYCCREHEHEIAW
YTERSEKSYELQTPFEIKLAKKFDTFNGECPNFVFPLNSIIKTIQPRVEKKKLDGFMGRI
RSVYPVASPNECNQMCLSTLMKCDHCGETSWQTGDFVKATCEFCGTENLTKEGATTCGYL
PQNAVVKIYCPACHNSEVGPEHSLAEYHNESGLKTILRKGGRTIAFGGCVFSYVGCHNKC
AYWVPRASANIGCNHTGVVGEGSEGLNDNLLEILQKEKVNINIVGDFKLNEEIAIILASF
SASTSAFVETVKGLDYKAFKQIVESCGNFKVTKGKAKKGAWNIGEQKSILSPLYAFASEA
```

### 2.2 Large number of results: use pagination

When dealing with large numbers of results, as in section 1.2, it is preferable to use the pagination endpoint. Points 2 and 3 from section 1.2 still apply:

2. Robust to connection issues
3. Less API resource demand

The example from 1.2 will be used.

#### Steps

1. View the results in the browser here: https://www.uniprot.org/uniprotkb?query=Insulin%20AND%20(reviewed:true)
2. Click `Download` in the toolbar
3. For this example we want the following selected:

- Download all
- Format: TSV
- Compressed: No

4. Click `Generate URL for API`
5. Under the header `API URL using the search endpoint` click `Copy` to get the URL which will be used in the following snippet.
6. Always use `size=500` as this will provide fast performance.

```python
import re
import requests
from requests.adapters import HTTPAdapter, Retry

re_next_link = re.compile(r'<(.+)>; rel="next"')
retries = Retry(total=5, backoff_factor=0.25, status_forcelist=[500, 502, 503, 504])
session = requests.Session()
session.mount("https://", HTTPAdapter(max_retries=retries))

def get_next_link(headers):
    if "Link" in headers:
        match = re_next_link.match(headers["Link"])
        if match:
            return match.group(1)

def get_batch(batch_url):
    while batch_url:
        response = session.get(batch_url)
        response.raise_for_status()
        total = response.headers["x-total-results"]
        yield response, total
        batch_url = get_next_link(response.headers)


url = 'https://rest.uniprot.org/uniprotkb/search?fields=accession%2Ccc_interaction&format=tsv&query=Insulin%20AND%20%28reviewed%3Atrue%29&size=500'
progress = 0
with open('insulin-interactions.tsv', 'w') as f:
    for batch, total in get_batch(url):
        lines = batch.text.splitlines()
        if not progress:
            print(lines[0], file=f)
        for line in lines[1:]:
            print(line, file=f)
        progress += len(lines[1:])
        print(f'{progress} / {total}')
```

    500 / 4930
    1000 / 4930
    1500 / 4930
    2000 / 4930
    2500 / 4930
    3000 / 4930
    3500 / 4930
    4000 / 4930
    4500 / 4930
    4930 / 4930

```
$ head insulin-interactions.tsv
Entry	Interacts with
P06213	Q99490; Q8NEJ0; Q13322; P05019; P35568; Q15323; P27986; P19174; P18031; Q06124; Q15256; Q9NRF2; P29353; P01317; P35570; P32121; P06213-1; P18031; Q92485-2; P81122; Q1XH17; P01308; Q13257; Q92485-2; P01317
P14735	P05067; P10147; PRO_0000000093 [P05067]; P01275; P10997; P14735-1; P01308; Q9J3M8
P35222	P01023; P00519; O43707; Q5JTC6; P25054; P10275; O15169; Q9Y2T1; O00512; A1Z199; P23560-2; Q9Y297; P55212; P35520; Q6P1J9; P12830; P19022; P33151; Q92793; P02511; P35221; Q9UI47-1; Q9NSA3; Q9NYF0; G5E9A7; P26358; P18146; P50402; P29317; Q9UKB1; Q96AC1; Q92915-2; P49789; Q08050; P04406; P14136; Q9BZE0; P49841; Q9UBN7; Q16665; O00291; P07900; P42858; P08069; P46940; Q8WXH2; O75564; Q14678; Q2LD37; P13473-2; Q9UJU2; Q8WVC0; Q14114-3; Q9GZQ8; P51608; P55197; Q92597; P19404; P19838; P29474; O00482-1; P49757; P49757-3; P14618; P14618-1; O75400-2; Q03431; Q13308; P08575; P23470; Q12913; P49023; P62826; Q04206; Q13761; Q9Y265; Q01826; Q9H6I2; Q7Z699; P12931; P15884; P36402; Q9NQB0; O14746; Q9UKE5; P11388; O14656-2; Q13625; O95071; Q9GZV5; P46937; P46937-3; O35625; Q9YGY0; Q67FY2; P33724; P26231; P18012; P27782; Q01887; Q9DBG9; Q9EPK5
P51451	P10275; Q8NDB2; Q13490; P46109; O43281; O43281-2; P00533; Q96Q35-2; P51114-2; P51116; Q13480; Q13322-4; O75031; P08238; Q9UKT9; Q96N16; P10721; Q9UJV3-2; Q9NRD5; P27986-2; Q92569; P49023-2; O14796; Q13239-3; O14543; Q9BWW4; Q9UGK3; P40763; O95551; P08670; A0A0C4DGF1; B2RXF5; Q96BR9; Q6NX45
P04004	Q07021; Q15700; Q92796; Q9HD26; Q9HD26-2; Q9NSN8; Q9UHD9; P75358; P75167; P78007; A0A024A2C9; P75390; P75391; P78031; P75611; Q4KTX9
P49862
Q15119	P42858
Q86YN6
Q9BX66	P00519; O15265; P42858; O15357; Q13177; Q6NSK7; P39052; A0A061I5T4; Q8WWV3
```
