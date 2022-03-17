import { Fragment, ReactNode, useState } from 'react';
import {
  InfoList,
  Sequence,
  ExternalLink,
  Button,
  LongNumber,
} from 'franklin-sites';
import { Link, useHistory } from 'react-router-dom';

import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';
import FreeTextView from '../../../uniprotkb/components/protein-data-views/FreeTextView';
import BlastButton from '../action-buttons/Blast';
import AlignButton from '../action-buttons/Align';
import AddToBasketButton from '../action-buttons/AddToBasket';
import LazyComponent from '../LazyComponent';

import useDataApi from '../../hooks/useDataApi';

import { pluralise } from '../../utils/utils';

import externalUrls from '../../config/externalUrls';
import apiUrls from '../../config/apiUrls';

import {
  Isoform,
  SequenceCautionComment,
  MassSpectrometryComment,
  RNAEditingComment,
  AlternativeProductsComment,
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
  openByDefault?: boolean;
};

export const SequenceInfo = ({
  isoformId,
  isoformSequence,
  lastUpdateDate,
  openByDefault = false,
}: SequenceInfoProps) => {
  const [isoformToFetch, setIsoformToFetch] = useState<string>();

  const history = useHistory();

  const { data, loading } = useDataApi<UniProtkbAPIModel>(
    isoformToFetch && apiUrls.entry(isoformToFetch, Namespace.uniprotkb)
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
          {dataToDisplay?.value || null}
        </div>
      }
      rootMargin="50px"
    >
      <Sequence
        sequence={dataToDisplay?.value}
        onShowSequence={() => setIsoformToFetch(isoformId)}
        infoData={infoData}
        accession={isoformId}
        downloadUrl={apiUrls.sequenceFasta(isoformId)}
        onBlastClick={() =>
          history.push(LocationToPath[Location.Blast], {
            parameters: { sequence: dataToDisplay?.value },
          })
        }
        addToBasketButton={<AddToBasketButton selectedEntries={isoformId} />}
        isCollapsible={!openByDefault}
        isLoading={loading}
      />
    </LazyComponent>
  );
};

const firstIsoformRE = /-1$/;

type IsoformInfoProps = {
  isoformData: Isoform;
  canonicalAccession: string;
  isoformNotes?: IsoformNotes;
};

export const IsoformInfo = ({
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
      content: (isoformData?.synonyms ?? []).map((syn) => syn.value).join(', '),
    },
    {
      title: 'Note',
      content: note && <FreeTextView comments={note} showMolecule={false} />,
    },
    {
      title: 'See also',
      content: (
        <>
          sequence in{' '}
          <Link
            to={{
              pathname: LocationToPath[Location.UniParcResults],
              search: `query=(isoform:${isoformData.isoformIds[0]})&direct`,
            }}
          >
            UniParc
          </Link>{' '}
          or sequence clusters in{' '}
          <Link
            to={{
              pathname: LocationToPath[Location.UniRefResults],
              search: `query=(uniprot_id:${isoformData.isoformIds[0].replace(
                firstIsoformRE,
                ''
              )})`,
            }}
          >
            UniRef
          </Link>
        </>
      ),
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
                {`${location.start.value}-${location.end.value}: `}
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
  // TODO isoformData.sequenceIds is used to get the features for
  // splice variants - they need to be somehow displayed
  const name = isoformData.isoformIds.join(', ');
  return (
    <Fragment key={isoformData.isoformIds.join('')}>
      <h3 id={`Isoform_${isoformData.name.value || name}`}>{name}</h3>
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
}) => (
  <>
    {data.map(({ sequence, sequenceCautionType, note, evidences }) => (
      <section
        className="text-block"
        key={`${sequenceCautionType}-${sequence}`}
      >
        {`The sequence `}
        <ExternalLink url={externalUrls.ENA(sequence)}>{sequence}</ExternalLink>
        {` differs from that shown. Reason: ${sequenceCautionType} `}
        {note}
        {evidences && <UniProtKBEvidenceTag evidences={evidences} />}
      </section>
    ))}
  </>
);

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
  const isIsoformPage = accession !== canonical;

  const notes: ReactNode[] = [];
  if (isoforms && events) {
    notes.push(
      <Fragment key="this entry describes...">
        {`This entry describes ${isIsoformPage ? 'one of the' : ''} `}
        <strong>{isoforms.length}</strong>
        {` `}
        <span data-article-id="alternative_products">isoforms</span>
        {` produced by `}
        <strong>{events.join(' & ')}</strong>.{' '}
      </Fragment>
    );
    if (isIsoformPage) {
      notes.push(
        <Fragment key="canonical link">
          For the canonical entry page see{' '}
          <Link to={getEntryPath(Namespace.uniprotkb, canonical)}>
            {canonical}
          </Link>
          .{' '}
        </Fragment>
      );
    }
  }
  for (const [index, { value }] of (
    alternativeProducts.note?.texts || []
  ).entries()) {
    notes.push(<Fragment key={index}>{value}</Fragment>);
  }

  let isoformsNode;
  if (isoforms.length) {
    isoformsNode = isoforms.map((isoform) =>
      isIsoformPage && isoform.isoformIds[0] !== accession ? null : (
        <Fragment key={isoform.isoformIds.join('')}>
          <IsoformInfo
            isoformData={isoform}
            canonicalAccession={canonical}
            isoformNotes={isoformNotes}
          />
          {includeSequences && isoform.isoformSequenceStatus !== 'External' && (
            <>
              {isIsoformPage ||
              (canonicalComponent &&
                isoform.isoformSequenceStatus === 'Displayed') ? (
                canonicalComponent
              ) : (
                <SequenceInfo
                  isoformId={isoform.isoformIds[0]}
                  openByDefault={isIsoformPage}
                />
              )}
            </>
          )}
        </Fragment>
      )
    );
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
      openByDefault
    />
  );

  if (!data.alternativeProducts) {
    return (
      <>
        {infoListComponent}
        {canonicalComponent}
      </>
    );
  }

  const allIsoformIds = data.alternativeProducts.isoforms
    .map((isoform) => isoform.isoformIds)
    .flat();

  return (
    <>
      <div className="button-group">
        <BlastButton
          selectedEntries={allIsoformIds}
          textSuffix={`${allIsoformIds.length} ${pluralise(
            'isoform',
            allIsoformIds.length
          )}`}
        />
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
