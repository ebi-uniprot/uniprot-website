import cn from 'classnames';
import { Chip, InfoList } from 'franklin-sites';
import { Link } from 'react-router';

import { getEntryPathFor } from '../../../../../app/config/urls';
import ExternalLink from '../../../../../shared/components/ExternalLink';
import { Namespace } from '../../../../../shared/types/namespaces';
import { processUrlTemplate } from '../../../../../shared/utils/xrefs';
import { DatabaseInfoPoint } from '../../../../types/databaseRefs';
import { TabLocation } from '../../../../types/entry';
import GenomicLoc from './GenomicLoc';
import { FlatGenomicEntry } from './types';

const getEntryPathForUniprotKB = getEntryPathFor(Namespace.uniprotkb);

type IsoformProps = {
  entries: FlatGenomicEntry[];
  xrefInfo?: DatabaseInfoPoint;
  isEnsemblID?: boolean;
  oneIsoformOnly: boolean;
  isCanonical: boolean;
  maneSelect: Set<string>;
};

const Isoform = ({
  entries,
  xrefInfo,
  isEnsemblID,
  oneIsoformOnly,
  isCanonical,
  maneSelect,
}: IsoformProps) => {
  const representativeEntry = entries[0];

  const infoData = [
    {
      title: 'Genomic location',
      content: representativeEntry.gnCoordinate.genomicLocation.start &&
        representativeEntry.gnCoordinate.genomicLocation.end && (
          <GenomicLoc
            genomicLocation={representativeEntry.gnCoordinate.genomicLocation}
            taxID={entries[0].taxid}
            noLink={!isEnsemblID}
          />
        ),
    },
    {
      title: 'Number of exons',
      content: representativeEntry.gnCoordinate.genomicLocation.exon.length,
    },
    {
      title: `${isEnsemblID ? 'Ensembl t' : 'T'}ranscript and translation IDs`,
      content: (
        <>
          {entries.map((entry, index) => {
            const { ensemblTranscriptId, ensemblTranslationId } =
              entry.gnCoordinate;
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <ExternalLink
                  url={
                    (ensemblTranscriptId &&
                      processUrlTemplate(xrefInfo?.uriLink, {
                        id: ensemblTranscriptId,
                      })) ||
                    null
                  }
                >
                  {ensemblTranscriptId}
                </ExternalLink>
                <ExternalLink
                  url={
                    (ensemblTranslationId &&
                      processUrlTemplate(xrefInfo?.uriLink, {
                        id: ensemblTranslationId,
                      })) ||
                    null
                  }
                >
                  {ensemblTranslationId}
                </ExternalLink>
                {ensemblTranscriptId && maneSelect.has(ensemblTranscriptId) && (
                  <Chip compact>MANE-Select</Chip>
                )}
              </div>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <section>
      <h4 className={cn({ 'visually-hidden': oneIsoformOnly })}>
        Isoform:{' '}
        <Link
          to={getEntryPathForUniprotKB(
            representativeEntry.accession,
            TabLocation.Entry
          )}
        >
          {representativeEntry.accession}
        </Link>
        {isCanonical && <Chip compact>canonical</Chip>}
      </h4>
      <InfoList infoData={infoData} columns />
    </section>
  );
};

export default Isoform;
