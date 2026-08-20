import { memo } from 'react';

import LazyComponent from '../../../shared/components/LazyComponent';
import externalUrls from '../../../shared/config/externalUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import styles from './styles/seqhub-view.module.scss';

const SeqhubEmbed = ({ sequence }: { sequence: string }) => {
  const url = externalUrls.SeqhubEmbed(sequence);
  // Cheap availability probe: only embed SeqHub when it has data for this
  // sequence. Fails closed (hidden) on non-200, error, or CORS block.
  const { loading, status } = useDataApi(url, { method: 'HEAD' });

  if (loading || status !== 200) {
    return null;
  }

  return (
    <>
      <h3 className={styles.heading}>Genomic context similarity</h3>
      <iframe
        title="Genomic context similarity"
        src={url}
        width="100%"
        height="526"
        className={styles.seqhub}
      />
    </>
  );
};

// UniProt lineages are ordered broadest→narrowest and the top-level entry is the
// domain/superkingdom. SeqHub only covers prokaryotes (Bacteria/Archaea).
export const isProkaryote = (lineage?: string[]) =>
  Boolean(
    lineage?.some((taxon) => taxon === 'Bacteria' || taxon === 'Archaea')
  );

type Props = {
  sequence?: string;
  lineage?: string[];
};

const SeqhubView = ({ sequence, lineage }: Props) => {
  // SeqHub is prokaryote-only; bail out before the probe for everything else.
  if (!sequence || !isProkaryote(lineage)) {
    return null;
  }
  // Defer both the availability probe and the iframe until the section nears the
  // viewport. Entry sections all mount on load, so without this the HEAD probe
  // would fire on every entry view. `fallback={null}` keeps the placeholder empty
  // (no phantom loader/heading) for entries where SeqHub has nothing.
  return (
    <LazyComponent fallback={null}>
      <SeqhubEmbed sequence={sequence} />
    </LazyComponent>
  );
};

export default memo(SeqhubView);
