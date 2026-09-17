---
title: Checksum
type: help
categories: manual,Technical
---

The checksum is a form of redundancy check that is calculated from the sequence. It is useful for tracking sequence updates.

It should be noted that while, in theory, two different sequences could have the same checksum value, the likelihood that this would happen is extremely low.

However UniProtKB may contain entries with identical sequences in case of multiple genes (paralogs).

The checksum is computed as a [MD5](https://en.wikipedia.org/wiki/MD5) hash.

Initially, the checksum was computed as the sequence 64-bit Cyclic Redundancy Check value (CRC64) using the generator polynomial: x64 + x4 + x3 + x + 1. The algorithm is described in the ISO 3309 standard.

Press W.H., Flannery B.P., Teukolsky S.A. and Vetterling W.T.
Cyclic redundancy and other checksums
Numerical recipes in C 2nd ed., pp896-902, Cambridge University Press (1993)

Both checksums are available in the UniProt data, although we recommend using the MD5 algorithm as the probability of checksum collisions for different sequences is lower.
