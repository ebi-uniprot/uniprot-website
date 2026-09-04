import axios from 'axios';
import { memo, useEffect, useState } from 'react';

import LazyComponent from '../../../shared/components/LazyComponent';
import externalUrls from '../../../shared/config/externalUrls';
import fetchData from '../../../shared/utils/fetchData';
import styles from './styles/seqhub-view.module.scss';

const SeqhubEmbed = ({ sequence }: { sequence: string }) => {
  const url = externalUrls.SeqhubEmbed(sequence);
  const [available, setAvailable] = useState<boolean>();

  // Reachability probe. NOTE: this does not detect whether SeqHub has data for
  // this sequence — /embed/search-list is a Next.js SPA shell that answers 200
  // for any q (including an empty one), and does the lookup client-side. So all
  // this really catches is the endpoint being down, blocked, or refusing the
  // URL. Kept as a fail-closed guard rather than a data check.
  // Deliberately not `useDataApi`: that hook pops a user-visible error toast on
  // 400 and reports every non-404 status to Sentry. SeqHub is third-party, so
  // we don't control its status codes, and an absent embed must stay invisible
  // rather than surface as an error to the user.
  // Keep this a CORS *simple* request: seqhub.org advertises OPTIONS in
  // access-control-allow-methods but actually answers it with 405, so adding a
  // non-safelisted header here would trigger a preflight that fails, and the
  // embed would silently disappear for everyone.
  useEffect(() => {
    setAvailable(undefined);
    // eslint-disable-next-line import/no-named-as-default-member
    const source = axios.CancelToken.source();
    let didCancel = false;
    fetchData(url, source.token, { method: 'HEAD' }).then(
      (response) => {
        if (!didCancel) {
          setAvailable(response.status === 200);
        }
      },
      () => {
        if (!didCancel) {
          setAvailable(false);
        }
      }
    );
    return () => {
      didCancel = true;
      source.cancel();
    };
  }, [url]);

  if (!available) {
    return null;
  }

  return (
    <>
      <h3
        className={styles.heading}
        data-article-id="genomic-context-similarity"
      >
        Genomic context similarity
      </h3>
      {/* Third-party origin: sandbox it so the embed can run its own scripts and
      reach its own backend, but cannot navigate the top-level page or open
      popups. `allow-same-origin` is safe here precisely because seqhub.org is
      cross-origin — it grants the frame its own origin, not ours. */}
      <iframe
        title="Genomic context similarity"
        src={url}
        width="100%"
        height="526"
        className={styles.seqhub}
        // eslint-disable-next-line @eslint-react/dom-no-unsafe-iframe-sandbox -- cross-origin frame, see comment above
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="no-referrer"
      />
    </>
  );
};

// UniProt lineages are ordered broadest→narrowest, so the top-level entry is
// the domain/superkingdom. SeqHub only covers prokaryotes (Bacteria/Archaea).
export const isProkaryote = ([superkingdom]: string[] = []) =>
  superkingdom === 'Bacteria' || superkingdom === 'Archaea';

// SeqHub takes the whole sequence in the query string, so entry length is URL
// length. Measured against the live endpoint, it answers 200 up to ~16,100
// residues and 431 (request line over Node's 16kB header cap) beyond that. Cap
// well below the cliff so intermediate proxies with tighter limits stay happy;
// this is an optional display affordance, and the handful of prokaryotic
// proteins longer than this simply don't get the embed.
const MAX_SEQUENCE_LENGTH = 8_000;

type Props = {
  sequence?: string;
  lineage?: string[];
};

const SeqhubView = ({ sequence, lineage }: Props) => {
  // SeqHub is prokaryote-only, and can't take an arbitrarily long sequence in a
  // URL; bail out before the probe for everything else.
  if (
    !sequence ||
    sequence.length > MAX_SEQUENCE_LENGTH ||
    !isProkaryote(lineage)
  ) {
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
