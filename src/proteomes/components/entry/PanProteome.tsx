// ============================================================================
// TEMPORARY AD HOC SOLUTION — remove once the pan proteome data sync is fixed.
// ----------------------------------------------------------------------------
// The release `panproteomeTaxon` metadata is currently unreliable (often
// absent), so this file does NOT use it. Instead it derives the species taxon
// from the proteome itself and shows the pan proteome only when a preview FTP
// directory exists for that taxon (see `ftpUrls.panProteomesPreview`).
//
// To revert to the normal, metadata-driven behaviour:
//   1. PanProteome.tsx  — restore the component to take `proteome` and derive
//      the species from `proteome.panproteomeTaxon.taxonId` (matched against
//      `taxonLineage`), HEADing `ftpUrls.panProteomes(taxonId)` for the FASTA
//      link. Drop `usePanProteomePreview` and the `PanProteomePreview` type.
//   2. Overview.tsx     — restore
//        content: data.panproteomeTaxon && <PanProteome proteome={data} />
//      and remove the `usePanProteomePreview(data)` call/import.
//   3. ftpUrls.ts       — remove the `panProteomesPreview` helper.
//   4. PanProteome.spec.tsx — restore the metadata-driven tests.
// The simplest path is to `git revert` the commit that introduced this block.
// ============================================================================

import { type Method } from 'axios';

import ftpUrls from '../../../shared/config/ftpUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { type ProteomesUIModel } from '../../adapters/proteomesConverter';

const headOptions: { method: Method } = { method: 'HEAD' };

export type PanProteomePreview = {
  scientificName?: string;
  fastaUrl: string;
};

// Temporary ad hoc solution (data sync issue): `panproteomeTaxon` in the release
// data is currently unreliable, so we ignore it and instead surface the pan
// proteome only when its preview FTP directory exists.
//
// Pan proteomes are built at the species level, so the relevant taxon is the
// species-rank ancestor in the lineage (when the organism is below species, e.g.
// a strain); otherwise the organism's own taxon is the species.
//
// Returns the data needed to render the section, or undefined when it should be
// hidden.
export const usePanProteomePreview = (
  proteome: ProteomesUIModel
): PanProteomePreview | undefined => {
  const species =
    proteome.taxonLineage?.find((taxon) => taxon.rank === 'species') ??
    proteome.taxonomy;

  const previewUrl = ftpUrls.panProteomesPreview(species.taxonId);
  const { status } = useDataApi(previewUrl, headOptions);

  if (!previewUrl || status !== 200) {
    return undefined;
  }

  return {
    scientificName: species.scientificName,
    fastaUrl: `${previewUrl}pp${species.taxonId}.fa.gz`,
  };
};

export const PanProteome = ({
  scientificName,
  fastaUrl,
}: PanProteomePreview) => (
  <>
    {'This proteome is part of the '}
    {scientificName}
    {' pan proteome ('}
    <a href={fastaUrl}>FASTA</a>)
  </>
);
