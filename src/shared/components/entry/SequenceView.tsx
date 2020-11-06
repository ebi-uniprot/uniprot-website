import React, { Fragment, useState } from 'react';
import { InfoList, Sequence, ExternalLink } from 'franklin-sites';
import { Link, useHistory } from 'react-router-dom';

import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';
import numberView, {
  Unit,
} from '../../../uniprotkb/components/protein-data-views/NumberView';
import FreeTextView from '../../../uniprotkb/components/protein-data-views/FreeTextView';
import BlastButton from '../action-buttons/Blast';
import AlignButton from '../action-buttons/Align';

import { formatLargeNumber } from '../../utils/utils';

import useDataApi from '../../hooks/useDataApi';

import externalUrls from '../../../uniprotkb/config/externalUrls';
import apiUrls from '../../config/apiUrls';

import {
  Isoform,
  SequenceCautionComment,
  MassSpectrometryComment,
  RNAEditingComment,
  AlternativeProductsComment,
} from '../../../uniprotkb/types/commentTypes';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { Location, LocationToPath } from '../../../app/config/urls';
import {
  IsoformNotes,
  SequenceUIModel,
} from '../../../uniprotkb/adapters/sequenceConverter';

export type SequenceData = {
  value: string;
  length: number;
  molWeight: number;
  crc64: string;
};

type SequenceViewProps = {
  accession: string;
  data: SequenceUIModel;
};

export const SequenceInfo: React.FC<{
  isoformId: string;
  isoformSequence?: SequenceData;
  lastUpdateDate?: string | null;
  isCanonical?: boolean;
}> = ({ isoformId, isoformSequence, lastUpdateDate, isCanonical = false }) => {
  const [isoformToFetch, setIsoformToFetch] = useState<string>();

  const history = useHistory();

  const { data, loading } = useDataApi<UniProtkbAPIModel>(
    isoformToFetch && apiUrls.entry(isoformToFetch)
  );

  const dataToDisplay = data?.sequence || isoformSequence;

  const infoData = [
    {
      title: 'Length',
      content: dataToDisplay && dataToDisplay.length,
    },
    {
      title: 'Mass (Da)',
      content: dataToDisplay && formatLargeNumber(dataToDisplay.molWeight),
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
      sequence={dataToDisplay && dataToDisplay.value}
      onShowSequence={() => setIsoformToFetch(isoformId)}
      infoData={infoData}
      accession={isoformId}
      downloadUrl={apiUrls.sequenceFasta(isoformId)}
      onBlastClick={() =>
        history.push(LocationToPath[Location.Blast], {
          parameters: { sequence: dataToDisplay && dataToDisplay.value },
        })
      }
      // This callbacks has been commented out as
      //  the basket is not yet implemented
      // onAddToBasketClick={() => {}}
      isCollapsible={!isCanonical}
      isLoading={loading}
    />
  );
};

export const IsoformInfo: React.FC<{
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
                  to={`/blast/accession/${canonicalAccession}/positions/${location.start.value}-${location.end.value}`}
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
      <hr />
      <h3 id={name}>{name}</h3>
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
          <Link
            className="button secondary"
            to={`/uniprotkb/${isoformData.isoformIds[0].substring(
              0,
              isoformData.isoformIds[0].length - 2
            )}`}
          >
            View isoform
          </Link>
        </section>
      )}
      <InfoList infoData={infoListData} columns isCompact />
    </Fragment>
  );
};

export const SequenceCautionView: React.FC<{
  data: SequenceCautionComment[];
}> = ({ data }) => {
  return (
    <>
      {data.map(({ sequence, sequenceCautionType, note, evidences }) => (
        <section
          className="text-block"
          key={`${sequenceCautionType}-${sequence}`}
        >
          {`The sequence `}
          <ExternalLink url={externalUrls.ENA(sequence)}>
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

export const MassSpectrometryView: React.FC<{
  data: MassSpectrometryComment[];
}> = ({ data }) => (
  <>
    {data.map((item) => (
      <section className="text-block" key={`${item.molWeight}${item.method}`}>
        {item.molecule && <h3>{item.molecule}</h3>}
        {`Molecular mass is ${numberView({
          value: item.molWeight,
          unit: Unit.DA,
        })}. `}
        {item.method && `Determined by ${item.method}. `}
        {item.note}
        <UniProtKBEvidenceTag evidences={item.evidences} />
      </section>
    ))}
  </>
);

export const RNAEditingView: React.FC<{ data: RNAEditingComment[] }> = ({
  data,
}) => (
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
            {'Edited at positions '}
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

export const IsoformView: React.FC<{
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

const SequenceView: React.FC<SequenceViewProps> = ({ accession, data }) => {
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
          textSuffix={`${allIsoformIds.length} isoform${
            allIsoformIds.length === 1 ? '' : 's'
          }`}
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
