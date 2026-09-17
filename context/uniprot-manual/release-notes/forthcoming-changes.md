---
title: Forthcoming changes
type: releaseNotes
date: 2099-01-01
---

**Table of contents**

   * [Simplification of UniParc XML root tag](#simplification-of-uniparc-xml-root-tag) - **From November 4, 2026**
   
# Simplification of UniParc XML root tag

Due to a technical limitation of the high-performance data processing framework used to generate UniParc XML, we have to simplify the root tag of the UniParc XML format by removing all attributes except the namespace:

```xml
<uniparc xmlns="http://uniprot.org/uniparc">
```

**Impact:** Any code that parses the root tag and expects attributes other than the namespace must be updated to not rely on them.
