---
title: Compression
type: help
categories: Programmatic_access,Website,Technical,help
---

[Data compression](https://en.wikipedia.org/wiki/Data_compression) refers to the
use of algorithms in order to reduce the size of a file. In UniProt, we offer on
most downloads the ability to get compressed files in order to speed up its
download time and reduce network usage. It also allows to have a smaller file on
disk in case it needs to be exchanged or moved (through email or USB drive)
before processing.

The type of files offered through our website and
[APIs](https://www.uniprot.org/help/api) is specifically well fitted for
compression and downloading it in a compressed form yields significant size
reduction.

We are using the [gzip format](https://en.wikipedia.org/wiki/Gzip), which will
be visible by looking at the added extension to the downloaded file `.gz`. This
file is in a binary format, meaning that it won't just be usable as such nor
visible in a normal web browser or basic text editor. In order to extract it
there are multiple options:
- In most operating systems nowadays, a tool to extract compressed file is
present, double-clicking on the file will usually extract it and will create an
uncompressed version of the file in the same folder
- If this is not supported, you will need to use a file archiver software such
as [7-zip](https://www.7-zip.org/).
- In the command line, you can use the command `gzip -d <name-of-file>.gz`

In order to toggle the download of a compressed version, you can:
- In the website download panel, toggle the "compressed" option on or off
- In the API, add `&compressed=true` to your querystring