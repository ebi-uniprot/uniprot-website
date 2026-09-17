---
title: What are the date formats accepted in the relevant fields of the query builder (e.g. UniProtKB entry creation or modification dates)?
type: help
categories: Text_search,faq
---

The advanced query form provides a date picker to specify dates for entry creation, annotation update and sequence updates.

The only date formats supported for programmatic access are

-   20060424
-   current
-   \* (for "any")

"current" is transformed into the date of the most recent release, in the format "YYYYMMDD".
