import React, { Fragment, useState, useEffect } from 'react';
import { InfoList, Sequence, ExternalLink } from 'franklin-sites';
import idx from 'idx';
import { Link } from 'react-router-dom';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import numberView, { Unit } from './NumberView';

import { formatLargeNumber } from '../../../shared/utils/utils';
import fetchData from '../../../shared/utils/fetchData';

import { SequenceUIModel } from '../../adapters/sequenceConverter';

import externalUrls from '../../config/externalUrls';
import apiUrls from '../../config/apiUrls';

import {
  Isoform,
  SequenceCautionComment,
  MassSpectrometryComment,
  RNAEditingComment,
  AlternativeProductsComment,
} from '../../types/commentTypes';
import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

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
}> = ({ isoformId, isoformSequence, lastUpdateDate }) => {
  const [data, setData] = useState<UniProtkbAPIModel['sequence']>();
  const [isoformToFetch, setIsoformToFetch] = useState('');

  useEffect(() => {
    if (!isoformToFetch) {
      return;
    }
    const fetchIsoformData = async () => {
      const response = await fetchData<UniProtkbAPIModel>(
        `${apiUrls.entry(isoformToFetch)}`
      );
      setData(response.data.sequence);
    };

    fetchIsoformData();
  }, [isoformToFetch]);

  const dataToDisplay = data || isoformSequence;

  if (!dataToDisplay) {
    return (
      <button
        type="button"
        className="button secondary"
        onClick={() => setIsoformToFetch(isoformId)}
      >
        Load sequence
      </button>
    );
  }
  const infoData = [
    {
      title: 'Length',
      content: dataToDisplay.length,
    },
    {
      title: 'Mass (Da)',
      content: formatLargeNumber(dataToDisplay.molWeight),
    },
    {
      title: 'Last updated',
      content: lastUpdateDate,
    },
    {
      title: 'Checksum',
      content: dataToDisplay.crc64,
    },
  ];

  return (
    <Fragment>
      {dataToDisplay && <InfoList infoData={infoData} />}
      <Sequence
        sequence={dataToDisplay.value}
        accession={isoformId}
        downloadUrl={apiUrls.sequenceFasta(isoformId)}
        // These callbacks have been commented out as neither BLAST
        // nor the basket have been implemented
        // onBlastClick={() => {}}
        // onAddToBasketClick={() => {}}
      />
    </Fragment>
  );
};

export const IsoformInfo: React.FC<{
  isoformData: Isoform;
  canonicalAccession: string;
}> = ({ isoformData, canonicalAccession }) => {
  const infoListData = [
    {
      title: 'Name',
      content: isoformData.name.value,
    },
    {
      title: 'Synonyms',
      content: (idx(isoformData, (o) => o.synonyms) || [])
        .map((syn) => syn.value)
        .join(', '),
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
      <InfoList infoData={infoListData} />
    </Fragment>
  );
};

export const SequenceCautionView: React.FC<{
  data: SequenceCautionComment[];
}> = ({ data }) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export const MassSpectrometryView: React.FC<{
  data: MassSpectrometryComment[];
}> = ({ data }) => (
  <Fragment>
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
  </Fragment>
);

export const RNAEditingView: React.FC<{ data: RNAEditingComment[] }> = ({
  data,
}) => (
  <Fragment>
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
  </Fragment>
);

export const IsoformView: React.FC<{
  alternativeProducts: AlternativeProductsComment;
  canonicalComponent?: JSX.Element;
  includeSequences?: boolean;
  canonicalAccession: string;
}> = ({
  alternativeProducts,
  canonicalComponent,
  includeSequences = true,
  canonicalAccession,
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
  const texts = idx(alternativeProducts, (o) => o.note.texts);
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
          />
          {includeSequences && isoform.isoformSequenceStatus !== 'External' && (
            <Fragment>
              {canonicalComponent &&
              isoform.isoformSequenceStatus === 'Displayed'
                ? canonicalComponent
                : isoformComponent}
            </Fragment>
          )}
        </Fragment>
      );
    });
  }
  return (
    <Fragment>
      {isoformCountNode}
      {notesNode}
      {isoformsNode}
    </Fragment>
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
    />
  );

  if (!data.alternativeProducts && data.sequence) {
    return canonicalComponent;
  }

  if (!data.alternativeProducts) {
    return null;
  }

  return (
    <Fragment>
      <InfoList infoData={sequenceInfoData} />
      <IsoformView
        alternativeProducts={data.alternativeProducts}
        canonicalComponent={canonicalComponent}
        canonicalAccession={accession}
      />
    </Fragment>
  );
};

export default SequenceView;
