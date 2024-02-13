import { Fragment, ReactNode, useState } from 'react';
import { InfoList, Sequence, Button, LongNumber } from 'franklin-sites';
import { Link, useHistory } from 'react-router-dom';

import ExternalLink from '../ExternalLink';
import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';
import FreeTextView from '../../../uniprotkb/components/protein-data-views/FreeTextView';
import AlignButton from '../action-buttons/Align';
import AddToBasketButton from '../action-buttons/AddToBasket';
import LazyComponent from '../LazyComponent';

import useDataApi from '../../hooks/useDataApi';
import useDatabaseInfoMaps from '../../hooks/useDatabaseInfoMaps';

import { pluralise } from '../../utils/utils';
import { sendGtagEventCopyFastaClick } from '../../utils/gtagEvents';
import { getUrlFromDatabaseInfo } from '../../utils/xrefs';

import apiUrls from '../../config/apiUrls/apiUrls';

import {
  Isoform,
  SequenceCautionComment,
  MassSpectrometryComment,
  RNAEditingComment,
  AlternativeProductsComment,
  TextWithEvidence,
} from '../../../uniprotkb/types/commentTypes';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import {
  Location,
  LocationToPath,
  getEntryPath,
} from '../../../app/config/urls';
import {
  IsoformNotes,
  SequenceUIModel,
} from '../../../uniprotkb/adapters/sequenceConverter';
import { Namespace } from '../../types/namespaces';

import styles from './styles/sequence-view.module.css';

export type SequenceData = {
  value: string;
  length: number;
  molWeight: number;
  crc64: string;
  md5: string;
};

type SequenceViewProps = {
  accession: string;
  data: SequenceUIModel;
};

type SequenceInfoProps = {
  isoformId: string;
  isoformSequence?: SequenceData;
  lastUpdateDate?: string | null;
  showSequence?: boolean;
  openByDefault?: boolean;
};

const SequenceInfo = ({
  isoformId,
  isoformSequence,
  lastUpdateDate,
  showSequence = true,
  openByDefault = false,
}: SequenceInfoProps) => {
  const [isoformToFetch, setIsoformToFetch] = useState<string>();

  const history = useHistory();

  const { data, loading } = useDataApi<UniProtkbAPIModel>(
    isoformToFetch && apiUrls.entry.entry(isoformToFetch, Namespace.uniprotkb)
  );

  const dataToDisplay = data?.sequence || isoformSequence;

  const infoData = [
    {
      title: 'Length',
      content: dataToDisplay && <LongNumber>{dataToDisplay.length}</LongNumber>,
    },
    {
      title: 'Mass (Da)',
      content: dataToDisplay?.molWeight && (
        <LongNumber>{dataToDisplay.molWeight}</LongNumber>
      ),
    },
    {
      title: 'Last updated',
      content: lastUpdateDate,
    },
    {
      title: <span data-article-id="checksum">Checksum</span>,
      content: dataToDisplay && dataToDisplay.crc64,
    },
  ];

  return (
    <LazyComponent
      fallback={
        <div className={styles['lazy-fallback']}>
          <InfoList infoData={infoData} />
          {(openByDefault && dataToDisplay?.value) || null}
        </div>
      }
    >
      {showSequence ? (
        <Sequence
          sequence={dataToDisplay?.value}
          onShowSequence={() => setIsoformToFetch(isoformId)}
          infoData={infoData}
          accession={isoformId}
          downloadUrl={apiUrls.entry.sequenceFasta(isoformId)}
          onBlastClick={() =>
            history.push(LocationToPath[Location.Blast], {
              parameters: { sequence: dataToDisplay?.value },
            })
          }
          addToBasketButton={<AddToBasketButton selectedEntries={isoformId} />}
          isCollapsible={!openByDefault}
          isLoading={loading}
          onCopy={() => sendGtagEventCopyFastaClick(isoformId)}
        />
      ) : (
        <p>Sequence is not available</p>
      )}
    </LazyComponent>
  );
};

const firstIsoformRE = /-1$/;

const SeeAlso = ({ isoform }: { isoform: string }) => (
  <>
    sequence in{' '}
    <Link
      to={{
        pathname: LocationToPath[Location.UniParcResults],
        search: `query=(isoform:${isoform})&direct`,
      }}
    >
      UniParc
    </Link>{' '}
    or sequence clusters in{' '}
    <Link
      to={{
        pathname: LocationToPath[Location.UniRefResults],
        search: `query=(uniprot_id:${isoform.replace(firstIsoformRE, '')})`,
      }}
    >
      UniRef
    </Link>
  </>
);

const Synonyms = ({ synonyms }: { synonyms: TextWithEvidence[] }) => (
  <>
    {synonyms.map((synonym, index) => (
      <Fragment key={synonym.value}>
        {synonym.value}
        {synonym.evidences && (
          <UniProtKBEvidenceTag evidences={synonym.evidences} />
        )}
        {index !== synonyms.length - 1 && ', '}
      </Fragment>
    ))}
  </>
);

type IsoformInfoProps = {
  isoformData: Isoform;
  canonicalAccession: string;
  isoformNotes?: IsoformNotes;
};

const IsoformInfo = ({
  isoformData,
  canonicalAccession,
  isoformNotes,
}: IsoformInfoProps) => {
  const regex = new RegExp(isoformData.name.value, 'gi');
  const note =
    isoformNotes &&
    Object.entries(isoformNotes).find(([key]) => key.match(regex))?.[1];

  const infoListData = [
    {
      title: 'Name',
      content: isoformData.name.value,
    },
    {
      title: 'Synonyms',
      content: isoformData.synonyms && (
        <Synonyms synonyms={isoformData.synonyms} />
      ),
    },
    {
      title: 'Note',
      content: note && <FreeTextView comments={note} showMolecule={false} />,
    },
    {
      title: 'See also',
      content: <SeeAlso isoform={isoformData.isoformIds[0]} />,
    },
    {
      title: 'Differences from canonical',
      content: isoformData.varSeqs && !!isoformData.varSeqs.length && (
        <ul className="no-bullet">
          {isoformData.varSeqs.map(
            ({ location, alternativeSequence, evidences }) => (
              <li key={`${location.start.value}-${location.end.value}`}>
                <Link
                  to={{
                    pathname: LocationToPath[Location.Blast],
                    search: `ids=${canonicalAccession}[${location.start.value}-${location.end.value}]`,
                  }}
                >{`${location.start.value}-${location.end.value}: `}</Link>
                {alternativeSequence && alternativeSequence.originalSequence ? (
                  <span className={styles.modifications}>{`${
                    alternativeSequence.originalSequence
                  } → ${
                    alternativeSequence.alternativeSequences &&
                    alternativeSequence.alternativeSequences.join(', ')
                  }`}</span>
                ) : (
                  'Missing'
                )}
                {evidences && <UniProtKBEvidenceTag evidences={evidences} />}
              </li>
            )
          )}
        </ul>
      ),
    },
    {
      title: 'Note',
      content:
        isoformData.note &&
        isoformData.note.texts.map((note) => note.value).join(', '),
    },
  ];
  const [name] = isoformData.isoformIds;
  return (
    <Fragment key={name}>
      <h3 id={isoformData.name.value && `Isoform_${isoformData.name.value}`}>
        <span id={isoformData.name.value}>
          {' '}
          <span id={name}>{name}</span>
        </span>
      </h3>
      {isoformData.isoformSequenceStatus === 'Displayed' && (
        <p>
          {'This isoform has been chosen as the '}
          <strong>canonical</strong>
          {' sequence. All positional information in '}
          {'this entry refers to it. This is also the sequence '}
          that appears in the downloadable versions of the entry.
        </p>
      )}
      {isoformData.isoformSequenceStatus === 'External' && (
        <section>
          <p>
            The sequence of this isoform can be found in the external entry
            linked below. Isoforms of the same protein are often annotated in
            two different entries if their sequences differ significantly.{' '}
          </p>
          {/* TODO: this is hacky and temporary until we sort out
          external isoforms */}
          <Button
            element={Link}
            variant="secondary"
            to={getEntryPath(
              Namespace.uniprotkb,
              isoformData.isoformIds[0].substring(
                0,
                isoformData.isoformIds[0].length - 2
              )
            )}
          >
            View isoform
          </Button>
        </section>
      )}
      <InfoList infoData={infoListData} columns isCompact />
    </Fragment>
  );
};

export const SequenceCautionView = ({
  data,
}: {
  data: SequenceCautionComment[];
}) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
  return (
    <>
      {data.map(({ sequence, sequenceCautionType, note, evidences }) => (
        <section
          className="text-block"
          key={`${sequenceCautionType}-${sequence}`}
        >
          {`The sequence `}
          <ExternalLink
            url={getUrlFromDatabaseInfo(
              databaseInfoMaps,
              'EMBL',
              { ProteinId: sequence },
              'ProteinId'
            )}
          >
            {sequence}
          </ExternalLink>
          {` differs from that shown. Reason: ${sequenceCautionType} `}
          {note}
          {evidences && <UniProtKBEvidenceTag evidences={evidences} />}
        </section>
      ))}
    </>
  );
};

export const MassSpectrometryView = ({
  data,
}: {
  data: MassSpectrometryComment[];
}) => (
  <>
    {data.map((item) => (
      <section className="text-block" key={`${item.molWeight}${item.method}`}>
        {item.molecule && <h4>{item.molecule}</h4>}
        {`Molecular mass is `}
        <LongNumber>{item.molWeight}</LongNumber>
        {` Da. `}
        {item.method && `Determined by ${item.method}. `}
        {item.note}
        <UniProtKBEvidenceTag evidences={item.evidences} />
      </section>
    ))}
  </>
);

export const RNAEditingView = ({ data }: { data: RNAEditingComment[] }) => (
  <>
    {data.map((item) => (
      <section
        className="text-block"
        key={`${
          item.positions && item.positions.map((pos) => pos.position).join('')
        }`}
      >
        {item.positions && (
          <div>
            {`Edited at ${pluralise('position', item.positions.length)} `}
            {item.positions.map((position) => (
              <span key={position.position}>
                {position.position}{' '}
                <UniProtKBEvidenceTag evidences={position.evidences} />
              </span>
            ))}
          </div>
        )}
        {item.note && (
          <div>
            {item.note.texts.map((text) => (
              <span key={text.value}>
                {text.value}{' '}
                {text.evidences && (
                  <UniProtKBEvidenceTag evidences={text.evidences} />
                )}
              </span>
            ))}
          </div>
        )}
      </section>
    ))}
  </>
);

type IsoformViewProps = {
  alternativeProducts: AlternativeProductsComment;
  canonicalComponent?: JSX.Element;
  includeSequences?: boolean;
  accession: string;
  isoformNotes?: IsoformNotes;
};

export const IsoformView = ({
  alternativeProducts,
  canonicalComponent,
  includeSequences = true,
  accession,
  isoformNotes,
}: IsoformViewProps) => {
  const { isoforms, events } = alternativeProducts;
  const canonical = accession.split('-')[0];

  const notes: ReactNode[] = [];
  if (isoforms && events) {
    notes.push(
      <Fragment key="this entry describes...">
        {`This entry describes `}
        <strong>{isoforms.length}</strong>
        {` `}
        <span data-article-id="alternative_products">isoforms</span>
        {` produced by `}
        <strong>{events.join(' & ')}</strong>.{' '}
      </Fragment>
    );
  }
  for (const [index, { value }] of (
    alternativeProducts.note?.texts || []
  ).entries()) {
    notes.push(<Fragment key={index}>{value}</Fragment>);
  }

  let isoformsNode;
  if (isoforms.length) {
    isoformsNode = isoforms.map((isoform) => (
      <Fragment key={isoform.isoformIds.join('')}>
        <IsoformInfo
          isoformData={isoform}
          canonicalAccession={canonical}
          isoformNotes={isoformNotes}
        />
        {includeSequences && isoform.isoformSequenceStatus !== 'External' && (
          <>
            {canonicalComponent &&
            isoform.isoformSequenceStatus === 'Displayed' ? (
              canonicalComponent
            ) : (
              <SequenceInfo
                isoformId={isoform.isoformIds[0]}
                showSequence={isoform.isoformSequenceStatus !== 'Not described'}
              />
            )}
          </>
        )}
      </Fragment>
    ));
  }
  return (
    <>
      {notes && <p>{notes}</p>}
      {isoformsNode}
    </>
  );
};

const SequenceView = ({ accession, data }: SequenceViewProps) => {
  // Every entry should have a sequence
  if (!data.sequence) {
    return null;
  }

  const sequenceInfoData = [
    {
      title: <span data-article-id="sequence_status">Sequence status</span>,
      content: data.status,
    },
    {
      title: (
        <span data-article-id="sequence_processing">Sequence processing</span>
      ),
      content: data.processing,
    },
  ];

  const infoListComponent = <InfoList infoData={sequenceInfoData} columns />;

  const canonicalComponent = (
    <SequenceInfo
      isoformId={accession}
      isoformSequence={data.sequence}
      lastUpdateDate={data.lastUpdateDate}
      // Only show the sequence by default if the sequence is not too big
      // As of 2024_01: 155,003 entries with more than 4000 aa (0.06%)
      openByDefault={data.sequence.length <= 4_000}
    />
  );

  if (!data.alternativeProducts) {
    return (
      <>
        {infoListComponent}
        <InfoList
          infoData={[
            {
              title: 'See also',
              content: <SeeAlso isoform={accession} />,
            },
          ]}
          isCompact
        />
        {canonicalComponent}
      </>
    );
  }

  const allIsoformIds = data.alternativeProducts.isoforms.map(
    (isoform) => isoform.isoformIds[0]
  );

  return (
    <>
      <div className="button-group">
        <AlignButton
          selectedEntries={allIsoformIds}
          textSuffix={
            allIsoformIds.length === 1
              ? undefined
              : `${allIsoformIds.length} isoforms`
          }
        />
        {/* Missing Add to basket */}
      </div>
      {infoListComponent}
      <IsoformView
        alternativeProducts={data.alternativeProducts}
        canonicalComponent={canonicalComponent}
        accession={accession}
        isoformNotes={data.isoformNotes}
      />
    </>
  );
};

export default SequenceView;
