import { Fragment, useState, FC } from 'react';
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

export const SequenceInfo: FC<{
  isoformId: string;
  isoformSequence?: SequenceData;
  lastUpdateDate?: string | null;
  isCanonical?: boolean;
}> = ({ isoformId, isoformSequence, lastUpdateDate, isCanonical = false }) => {
  const [isoformToFetch, setIsoformToFetch] = useState<string>();

  const history = useHistory();

  const { data, loading } = useDataApi<UniProtkbAPIModel>(
    isoformToFetch && apiUrls.entry(isoformToFetch, Namespace.uniprotkb)
  );

  const dataToDisplay = data?.sequence || isoformSequence;

  const infoData = [
    {
      title: 'Length',
      content: dataToDisplay && dataToDisplay.length,
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
      title: 'Checksum',
      content: dataToDisplay && dataToDisplay.crc64,
    },
  ];

  return (
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
      isCollapsible={!isCanonical}
      isLoading={loading}
    />
  );
};

export const IsoformInfo: FC<{
  isoformData: Isoform;
  canonicalAccession: string;
  isoformNotes?: IsoformNotes;
}> = ({ isoformData, canonicalAccession, isoformNotes }) => {
  let note;
  const regex = new RegExp(isoformData.name.value, 'gi');
  for (const key in isoformNotes) {
    if (key.match(regex)) {
      note = isoformNotes[key];
      break;
    }
  }

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
      title: 'Differences from canonical',
      content: isoformData.varSeqs && !!isoformData.varSeqs.length && (
        <ul className="no-bullet">
          {isoformData.varSeqs.map(
            ({ location, alternativeSequence, evidences }) => (
              <li key={`${location.start.value}-${location.end.value}`}>
                <Link
                  to={{
                    pathname: LocationToPath[Location.Blast],
                    // TODO: this needs to be implemented on the BLAST form page
                    search: `about=${canonicalAccession}[${location.start.value}-${location.end.value}]`,
                  }}
                >{`${location.start.value}-${location.end.value}: `}</Link>
                {alternativeSequence && alternativeSequence.originalSequence
                  ? `${alternativeSequence.originalSequence}  → ${
                      alternativeSequence.alternativeSequences &&
                      alternativeSequence.alternativeSequences.join(', ')
                    }`
                  : 'Missing'}
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

export const SequenceCautionView: FC<{
  data: SequenceCautionComment[];
}> = ({ data }) => (
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

export const MassSpectrometryView: FC<{
  data: MassSpectrometryComment[];
}> = ({ data }) => (
  <>
    {data.map((item) => (
      <section className="text-block" key={`${item.molWeight}${item.method}`}>
        {item.molecule && <h3>{item.molecule}</h3>}
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

export const RNAEditingView: FC<{ data: RNAEditingComment[] }> = ({ data }) => (
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

export const IsoformView: FC<{
  alternativeProducts: AlternativeProductsComment;
  canonicalComponent?: JSX.Element;
  includeSequences?: boolean;
  canonicalAccession: string;
  isoformNotes?: IsoformNotes;
}> = ({
  alternativeProducts,
  canonicalComponent,
  includeSequences = true,
  canonicalAccession,
  isoformNotes,
}) => {
  let isoformCountNode;
  const { isoforms, events } = alternativeProducts;
  if (isoforms && events) {
    isoformCountNode = (
      <p>
        {`This entry describes `}
        <strong>{isoforms.length}</strong>
        {` isoforms produced by `}
        <strong>{events.join(' & ')}</strong>.
      </p>
    );
  }

  let notesNode;
  const texts = alternativeProducts.note?.texts;
  if (texts) {
    notesNode = <p>{texts.map((text) => text.value).join(' ')}</p>;
  }

  let isoformsNode;
  if (isoforms) {
    isoformsNode = isoforms.map((isoform) => {
      const isoformComponent = (
        <SequenceInfo isoformId={isoform.isoformIds[0]} />
      );
      return (
        <Fragment key={isoform.isoformIds.join('')}>
          <IsoformInfo
            isoformData={isoform}
            canonicalAccession={canonicalAccession}
            isoformNotes={isoformNotes}
          />
          {includeSequences && isoform.isoformSequenceStatus !== 'External' && (
            <>
              {canonicalComponent &&
              isoform.isoformSequenceStatus === 'Displayed'
                ? canonicalComponent
                : isoformComponent}
            </>
          )}
        </Fragment>
      );
    });
  }
  return (
    <>
      {isoformCountNode}
      {notesNode}
      {isoformsNode}
    </>
  );
};

const SequenceView: FC<SequenceViewProps> = ({ accession, data }) => {
  const sequenceInfoData = [
    {
      title: 'Sequence status',
      content: data.status,
    },
    {
      title: 'Sequence processing',
      content: data.processing,
    },
  ];

  // Every entry should have a sequence
  if (!data.sequence) {
    return null;
  }

  const canonicalComponent = (
    <SequenceInfo
      isoformId={accession}
      isoformSequence={data.sequence}
      lastUpdateDate={data.lastUpdateDate}
      isCanonical
    />
  );

  if (!data.alternativeProducts && data.sequence) {
    return canonicalComponent;
  }

  if (!data.alternativeProducts) {
    return null;
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

      <InfoList infoData={sequenceInfoData} columns />
      <IsoformView
        alternativeProducts={data.alternativeProducts}
        canonicalComponent={canonicalComponent}
        canonicalAccession={accession}
        isoformNotes={data.isoformNotes}
      />
    </>
  );
};

export default SequenceView;
