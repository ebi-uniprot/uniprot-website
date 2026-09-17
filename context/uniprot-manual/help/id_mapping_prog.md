---
title: Programmatic Access for ID Mapping
type: help
categories: Programmatic_access,Technical,Website,help
---

To explore and try out the ID mapping services on the website, please refer to the [ID mapping website tool](https://www.uniprot.org/id-mapping).  
For technical documentation for the ID mapping API, please refer to our [Swagger document](https://www.uniprot.org/api-documentation/idmapping).

# Overview

The ID mapping service can map between the identifiers used in one database, to the identifiers of another, e.g.,
from UniProt to Ensembl, or to PomBase, etc. If you map to UniProtKB, UniParc or UniRef data, the full entries will be returned to you for convenience.

This document serves as a basic guide to using the ID mapping services offered.

# Submitting an ID mapping job

> POST /idmapping/run

For example, to map UniProtKB entries P21802, P12345, we could POST a request to the above REST end-point as follows:

> **Request**
>
> ```bash
> % curl --request POST 'https://rest.uniprot.org/idmapping/run' --form 'ids="P21802,P12345"' --form 'from="UniProtKB_AC-ID"' --form 'to="UniRef90"'
> ```
>
> **Response**
>
> ```bash
> {"jobId":"ecuuh9h0Md"}
> ```

Be sure to take note of the `jobId`. This will be used later to:

- poll the status of the job
- fetch/download the results
- get details about the job

# Various limits on ID mapping job submission

| **Limit** |                                    **Details**                                     |
|:---------:| :--------------------------------------------------------------------------------: |
|  100,000  | Total number of ids allowed in comma separated param `ids` in `/idmapping/run` api |
|  500,000  |                      Total number of "mapped to" ids allowed                       |
|  100,000  |       Total number of "mapped to" ids allowed to be enriched by UniProt data       |
|  25,000   |               Total number of "mapped to" ids allowed with filtering               |

Note: Very large mapping requests are likely to fail. Please do verify that your list does not contain any duplicates, and try to split it into smaller chunks in case of problems. If you prefer to run your mapping locally, you can also [download the data underlying this service](https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/idmapping/).

# Valid _from_ and _to_ databases pairs

You can map `from` one database `to` another database. To find the name of all the possible valid databases pairs (both from and to), use the below curl command:

```bash
% curl https://rest.uniprot.org/configure/idmapping/fields
```

# How to interpret the response

The response has two top sections:

- groups
  - items
- rules

Each group represents a logical group of databases, represented as an array of `items`.

The value of `groupName` is used by website user-interface to group together related databases, e.g., Sequence databases
like EMBL/GenBank/DDBJ.

Each item in the `items` array has the following attributes:

- displayName : Used by the [website user-interface](https://www.uniprot.org/id-mapping). It is not used in subsequent
  API calls.
- name : Name of `from` or `to` database to be passed in the API request.
- from: Boolean flag indicating whether `name` can be used as a `from` database. Defaults to false.
- to: Boolean flag indicating whether `name` can be used as a `to` database. Defaults to false.
- ruleId: Refers a rule in the `rules` section to find all possible values of `to` databases.

Each rule in the `rules` array describes all possible `to` databases for a given `from` database.
It has the following attributes:

- ruleId : Unique identifier of the rule. Referred to by individual items within `groups.items`.
- tos: List of possible `to` databases for a given `from` item.
- defaultTo: Used by the website user-interface to be selected by default in its dropdown menu. This field is not
  relevant to standard programmatic users.
- taxonId: Boolean flag indicating whether a third optional param `taxId`(Taxonomy Id) is allowed in API requests
  in addition to the `from` and `to` request parameters.

## Example: finding which databases UniParc identifiers can be mapped to

1. Given the response from the above request and looking within the `groups.items` entities, find an
   item where `displayName` or `name` matches `UniParc` and, importantly, `from` is `true`. The relevant `item` is:

```json
{
  "displayName": "UniParc",
  "name": "UniParc",
  "from": true,
  "to": true,
  "ruleId": 2
}
```

The important parts of this JSON object to note are:

- `from`: since this is `true`, we know that the value of `name` (`UniParc`) can be used as the `from` request parameter
  in a POST request to [`/idmapping/run`](https://www.uniprot.org/help/id_mapping_prog#submitting-an-id-mapping-job).
- `to`: since this is `true`, we know that the value of `name` (`UniParc`) can be used as the `to` request parameter in
  a POST request to [`/idmapping/run`](https://www.uniprot.org/help/id_mapping_prog#submitting-an-id-mapping-job).
- `ruleId`: take note of the value, `2`, as this will be used to identify _all_ valid databases that UniParc identifiers
  can be mapped to.

2. Given the response from the [above request](https://www.uniprot.org/help/id_mapping_prog#example_uniparc) and looking within the `rules` array, find a rule where
   `ruleId` is 2. The relevant JSON object is given below:

```json
{
  "ruleId": 2,
  "tos": ["UniProtKB", "UniProtKB-Swiss-Prot", "UniParc"],
  "defaultTo": "UniProtKB",
  "taxonId": false
}
```

The important parts of this object to note are:

- `tos`: this array lists _all possible valid_ `to` values for a POST request to [`/idmapping/run`](https://www.uniprot.org/help/id_mapping_prog#submitting-an-id-mapping-job), when
  `UniParc` is used as `from` request parameter value. Passing anything other than the values listed in `tos` will result
  in an error.
- `taxonId`: The `taxonId` flag is set to false, indicating that this `from` and `to` combination does not accept an
  optional `taxId` (taxonomy identifier) when submitting the job.

3. Putting the findings into practice, we can now construct ID mapping POST requests as follows:

```bash
% curl --request POST 'https://rest.uniprot.org/idmapping/run' \
    --form 'ids="<YOUR UNIPARC ID LIST IN COMMA SEPARATED FORM>"' \
    --form 'from="UniParc"' \
    --form 'to="<UniProtKB or UniProtKB-Swiss-Prot or UniParc>"'
```

Giving a concrete example:

```bash
% curl --request POST 'https://rest.uniprot.org/idmapping/run' \
   --form 'ids="UPI0000000001,UPI0000000002"' \
   --form 'from="UniParc"' \
   --form 'to="UniProtKB"'
```

# Polling the status of a job

> GET /idmapping/status/{jobId}

Continuing the above example, we can use the `jobId` to find out the status of the job as follows:

> **Request**
>
> ```bash
> % curl -i 'https://rest.uniprot.org/idmapping/status/ecuuh9h0Md'
> ```
>
> **Response**
>
> ```bash
> HTTP/1.1 303
> Server: nginx/1.17.7
> Location: https://rest.uniprot.org/idmapping/uniref/results/ecuuh9h0Md
> Content-Type: application/json
> Access-Control-Allow-Origin: *
> ...
> {"jobStatus":"FINISHED"}
> ```

Note that the `jobStatus` is finished, indicating that the job's results are ready to be fetched. Note also the [HTTP 303](https://httpstatuses.com/303)
header that indicates the results can be retrieved via the URL in the `Location` header.

# Fetching the results of a job

## Paged results

The results of a job can be retrieved one page at a time using one of following end-points:

> GET /idmapping/results/{jobId}<br>
> GET /idmapping/{uniprot_db}/results/{jobId} ## where {uniprot_db} is one of UniParc, UniProtKB or UniRef

For example, when mapping P21802, P12345 to UniRef90 could do:

> **Request**
>
> ```bash
> % curl -s "https://rest.uniprot.org/idmapping/uniref/results/ecuuh9h0Md"
> ```
>
> **Response**
>
> ```bash
> {
>   "results": [
>     {
>       "from": "P21802",
>       "to": {
>         "id": "UniRef90_P21802",
>         "name": "Cluster: Fibroblast growth factor receptor 2",
>         "updated": "2021-06-02",
>         "entryType": "UniRef90",
>  ...
> ```

Note the `from` and `to` attributes, denoting the source identifiers and corresponding mapped identifier. Also,
since the `to` database is UniRef90, we return also the target entry details.

If your result set contains more than 25 results as you can see in the
[`x-total-results`](https://www.uniprot.org/help/rest-api-headers#x-total-results)
header, you'll have to take into consideration the pagination of results by
using a [bigger page size](https://www.uniprot.org/help/api_queries#tips) and/or
[paginating through the results](https://www.uniprot.org/help/api_queries#12-large-number-of-results-use-pagination).

Alternatively, the stream endpoint detailed in the next section can be used.

## Downloading results

Downloading the results of a job is achieved via one of the following end-points:

> GET /idmapping/stream/{jobId}<br>
> GET /idmapping/{uniprot_db}/results/stream/{jobId}

Continuing our example above, we would download the results by making a request to the following URL:

> **Request**
>
> ```bash
> % curl -s "https://rest.uniprot.org/idmapping/uniref/results/stream/ecuuh9h0Md"
> ```
>
> **Response**
>
> ```bash
> {
>   "results": [
>     {
>       "from": "P21802",
>       "to": {
>         "id": "UniRef90_P21802",
>         "name": "Cluster: Fibroblast growth factor receptor 2",
>         "updated": "2021-06-02",
>         "entryType": "UniRef90",
>  ...
> ```

> **NOTE** to add the content-disposition header, e.g., so that a download file dialogue appears in a browser, include
> the request parameter, `download=true`.

## Warnings and errors for /results

| **Problem Type** | **Code** |                                             **Message**                                             |
| :--------------: | :------: |:---------------------------------------------------------------------------------------------------:|
|     Warning      |    20    |               Filters are not supported for mapping results with IDs more than 25,000               |
|     Warning      |    21    | UniProt data enrichment is not supported for mapping results with "mapped to" IDs more than 100,000 |
|      Error       |    40    |     Id Mapping API is not supported for mapping results with "mapped to" IDs more than 500,000      |
|      Error       |    50    |                               \<Actual application error as message\>                               |

<br>

# Fetching details about a job

Details of a submitted job, including the `from`, `to` and `ids` to map, can be obtained via this end-point:

> GET /idmapping/details/{jobId}

For example:

> **Request**
>
> ```bash
> % curl -s "https://rest.uniprot.org/idmapping/uniref/details/ecuuh9h0Md"
> ```
>
> **Response**
>
> ```bash
> {
>   "from": "UniProtKB_AC-ID",
>   "to": "UniRef90",
>   "ids": "P21802,P12345",
>   "taxId": null,
>   "redirectURL": "https://rest.uniprot.org/idmapping/uniref/results/ecuuh9h0Md"
> }
> ```

# Python example

```
import re
import time
import json
import zlib
from xml.etree import ElementTree
from urllib.parse import urlparse, parse_qs, urlencode
import requests
from requests.adapters import HTTPAdapter, Retry


POLLING_INTERVAL = 3
API_URL = "https://rest.uniprot.org"


retries = Retry(total=5, backoff_factor=0.25, status_forcelist=[500, 502, 503, 504])
session = requests.Session()
session.mount("https://", HTTPAdapter(max_retries=retries))


def check_response(response):
    try:
        response.raise_for_status()
    except requests.HTTPError:
        print(response.json())
        raise


def submit_id_mapping(from_db, to_db, ids):
    request = requests.post(
        f"{API_URL}/idmapping/run",
        data={"from": from_db, "to": to_db, "ids": ",".join(ids)},
    )
    check_response(request)
    return request.json()["jobId"]


def get_next_link(headers):
    re_next_link = re.compile(r'<(.+)>; rel="next"')
    if "Link" in headers:
        match = re_next_link.match(headers["Link"])
        if match:
            return match.group(1)


def check_id_mapping_results_ready(job_id):
    while True:
        request = session.get(f"{API_URL}/idmapping/status/{job_id}")
        check_response(request)
        j = request.json()
        if "jobStatus" in j:
            if j["jobStatus"] in ("NEW", "RUNNING"):
                print(f"Retrying in {POLLING_INTERVAL}s")
                time.sleep(POLLING_INTERVAL)
            else:
                raise Exception(j["jobStatus"])
        else:
            return bool(j["results"] or j["failedIds"])


def get_batch(batch_response, file_format, compressed):
    batch_url = get_next_link(batch_response.headers)
    while batch_url:
        batch_response = session.get(batch_url)
        batch_response.raise_for_status()
        yield decode_results(batch_response, file_format, compressed)
        batch_url = get_next_link(batch_response.headers)


def combine_batches(all_results, batch_results, file_format):
    if file_format == "json":
        for key in ("results", "failedIds"):
            if key in batch_results and batch_results[key]:
                all_results[key] += batch_results[key]
    elif file_format == "tsv":
        return all_results + batch_results[1:]
    else:
        return all_results + batch_results
    return all_results


def get_id_mapping_results_link(job_id):
    url = f"{API_URL}/idmapping/details/{job_id}"
    request = session.get(url)
    check_response(request)
    return request.json()["redirectURL"]


def decode_results(response, file_format, compressed):
    if compressed:
        decompressed = zlib.decompress(response.content, 16 + zlib.MAX_WBITS)
        if file_format == "json":
            j = json.loads(decompressed.decode("utf-8"))
            return j
        elif file_format == "tsv":
            return [line for line in decompressed.decode("utf-8").split("\n") if line]
        elif file_format == "xlsx":
            return [decompressed]
        elif file_format == "xml":
            return [decompressed.decode("utf-8")]
        else:
            return decompressed.decode("utf-8")
    elif file_format == "json":
        return response.json()
    elif file_format == "tsv":
        return [line for line in response.text.split("\n") if line]
    elif file_format == "xlsx":
        return [response.content]
    elif file_format == "xml":
        return [response.text]
    return response.text


def get_xml_namespace(element):
    m = re.match(r"\{(.*)\}", element.tag)
    return m.groups()[0] if m else ""


def merge_xml_results(xml_results):
    merged_root = ElementTree.fromstring(xml_results[0])
    for result in xml_results[1:]:
        root = ElementTree.fromstring(result)
        for child in root.findall("{http://uniprot.org/uniprot}entry"):
            merged_root.insert(-1, child)
    ElementTree.register_namespace("", get_xml_namespace(merged_root[0]))
    return ElementTree.tostring(merged_root, encoding="utf-8", xml_declaration=True)


def print_progress_batches(batch_index, size, total):
    n_fetched = min((batch_index + 1) * size, total)
    print(f"Fetched: {n_fetched} / {total}")


def get_id_mapping_results_search(url):
    parsed = urlparse(url)
    query = parse_qs(parsed.query)
    file_format = query["format"][0] if "format" in query else "json"
    if "size" in query:
        size = int(query["size"][0])
    else:
        size = 500
        query["size"] = size
    compressed = (
        query["compressed"][0].lower() == "true" if "compressed" in query else False
    )
    parsed = parsed._replace(query=urlencode(query, doseq=True))
    url = parsed.geturl()
    request = session.get(url)
    check_response(request)
    results = decode_results(request, file_format, compressed)
    total = int(request.headers["x-total-results"])
    print_progress_batches(0, size, total)
    for i, batch in enumerate(get_batch(request, file_format, compressed), 1):
        results = combine_batches(results, batch, file_format)
        print_progress_batches(i, size, total)
    if file_format == "xml":
        return merge_xml_results(results)
    return results


def get_id_mapping_results_stream(url):
    if "/stream/" not in url:
        url = url.replace("/results/", "/results/stream/")
    request = session.get(url)
    check_response(request)
    parsed = urlparse(url)
    query = parse_qs(parsed.query)
    file_format = query["format"][0] if "format" in query else "json"
    compressed = (
        query["compressed"][0].lower() == "true" if "compressed" in query else False
    )
    return decode_results(request, file_format, compressed)


job_id = submit_id_mapping(
    from_db="UniProtKB_AC-ID", to_db="ChEMBL", ids=["P05067", "P12345"]
)
if check_id_mapping_results_ready(job_id):
    link = get_id_mapping_results_link(job_id)
    results = get_id_mapping_results_search(link)
    # Equivalently using the stream endpoint which is more demanding
    # on the API and so is less stable:
    # results = get_id_mapping_results_stream(link)

print(results)
# {'results': [{'from': 'P05067', 'to': 'CHEMBL2487'}], 'failedIds': ['P12345']}
```

# Retrieving website results programmatically

If a job has been submitted from the website you can download these programmatically:

1. From the ID mapping results page click `Download`
2. Select the desired file format and if a tabular format is selected fields can be selected and reordered
3. Click `Generate URL for API`
4. There are two choices for the URL:

**i. Stream**: this endpoint is more demanding on the API and so may be less stable. Copy the stream url and paste as an argument to the `get_id_mapping_results_stream` function defined above. For example the following uses the TSV format and has several fields selected:

```
get_id_mapping_results_stream("https://rest.uniprot.org/idmapping/uniprotkb/results/stream/77035de28771bdd279b1c5ce66c3aebe8ec8b028?compressed=true&fields=accession%2Creviewed%2Cid%2Cprotein_name%2Cgene_names%2Corganism_name%2Clength%2Ccc_developmental_stage%2Ccc_induction%2Cft_chain%2Cxref_ccds%2Cxref_embl&format=tsv")
```

**ii. Search**: this endpoint works by fetching batches of results at a time and is lighter for the API to handle. Copy the search url and paste as an argument to the `get_id_mapping_results_search` function defined above. For example the following fetches FASTAs:

```
get_id_mapping_results_search("https://rest.uniprot.org/idmapping/uniprotkb/results/2a0489825ffd01e63a6682b3ae89ba43bfe47169?format=fasta&size=500")
```

# Getting a Pandas DataFrame from results

## From TSV results

```
import csv
import pandas as pd

def get_data_frame_from_tsv_results(tsv_results):
    reader = csv.DictReader(tsv_results, delimiter="\t", quotechar='"')
    return pd.DataFrame(list(reader))
```

## From Excel/XLSX results

```
import io
import pandas as pd

def get_data_frame_from_xlsx_results(xlxs_results):
    return pd.concat(
        [pd.read_excel(io.BytesIO(result)) for result in xlxs_results],
        ignore_index=True,
    )

```

# R example

```
library(httr)

isJobReady <- function(jobId) {
  pollingInterval = 5
  nTries = 20
  for (i in 1:nTries) {
    url <- paste("https://rest.uniprot.org/idmapping/status/", jobId, sep = "")
    r <- GET(url = url, accept_json())
    status <- content(r, as = "parsed")
    if (!is.null(status[["results"]]) || !is.null(status[["failedIds"]])) {
      return(TRUE)
    }
    if (!is.null(status[["messages"]])) {
      print(status[["messages"]])
      return (FALSE)
    }
    Sys.sleep(pollingInterval)
  }
  return(FALSE)
}

getResultsURL <- function(redirectURL) {
  if (grepl("/idmapping/results/", redirectURL, fixed = TRUE)) {
    url <- gsub("/idmapping/results/", "/idmapping/stream/", redirectURL)
  } else {
    url <- gsub("/results/", "/results/stream/", redirectURL)
  }
}

files = list(
  ids = "P21802,P12345",
  from = "UniProtKB_AC-ID",
  to = "UniRef90"
)
r <- POST(url = "https://rest.uniprot.org/idmapping/run", body = files, encode = "multipart", accept_json())
submission <- content(r, as = "parsed")

if (isJobReady(submission[["jobId"]])) {
  url <- paste("https://rest.uniprot.org/idmapping/details/", submission[["jobId"]], sep = "")
  r <- GET(url = url, accept_json())
  details <- content(r, as = "parsed")
  url <- getResultsURL(details[["redirectURL"]])
  # Using TSV format see: https://www.uniprot.org/help/api_queries#what-formats-are-available
  url <- paste(url, "?format=tsv", sep = "")
  r <- GET(url = url, accept_json())
  resultsTable = read.table(text = content(r), sep = "\t", header=TRUE)
  print(resultsTable)
}
```
