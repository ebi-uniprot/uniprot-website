import { Fragment, useState, FC } from 'react';
import { Loader } from 'franklin-sites';
import cn from 'classnames';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import AlignLabel from './AlignLabel';

import pim from '../../adapters/pim';
import getExponentialContrast from '../../utils/getExponentialContrast';

import useDataApi from '../../../../shared/hooks/useDataApi';

import toolsURLs from '../../../config/urls';

import { JobTypes } from '../../../types/toolsJobTypes';
import { SequenceInfo } from '../../utils/useSequenceInfo';

import './styles/AlignResultPIM.scss';

const alignURLs = toolsURLs(JobTypes.ALIGN);

const DEFAULT_CONTRAST = 2; // need to be >1
const WAVE_EFFECT_TIME = 250; // in ms

type AlignResultPIMProps = {
  id: string;
  sequenceInfo: SequenceInfo;
  selectedEntries: string[];
  handleEntrySelection: (rowId: string) => void;
};

const AlignResultPIM: FC<AlignResultPIMProps> = ({
  id,
  sequenceInfo,
  selectedEntries,
  handleEntrySelection,
}) => {
  const [hovered, setHovered] = useState<number[]>([]);
  const [contrast, setContrast] = useState(DEFAULT_CONTRAST);

  const { loading, data, error, status } = useDataApi<string>(
    alignURLs.resultUrl(id, { format: 'pim' })
  );

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorHandler status={status} error={error} />;
  }

  const parsed = pim(data);

  if (!parsed.length) {
    return <ErrorHandler status={404} error={error} />;
  }

  return (
    <section className="align-result-pim">
      <h5>Percent Identity Matrix</h5>
      <div
        className="align-result-pim__matrix"
        style={{
          //                    name column|value columns (as many as needed)
          gridTemplateColumns: `max-content repeat(${parsed[0].values.length},fit-content(8ch))`,
        }}
      >
        {/* for every sequence in the alignment */}
        {parsed.map(({ name, accession, values }, indexRow) => (
          <Fragment
            key={indexRow} // eslint-disable-line react/no-array-index-key
          >
            <span
              className={cn('align-result-pim__name', {
                'align-result-pim__name--hovered': hovered.includes(indexRow),
              })}
            >
              <AlignLabel
                accession={accession}
                info={sequenceInfo.data.get(accession || '')}
                loading={sequenceInfo.loading}
                checked={Boolean(
                  accession && selectedEntries?.includes(accession)
                )}
                onSequenceChecked={handleEntrySelection}
              >
                {name}
              </AlignLabel>
            </span>
            {/* for each of the sequences this one is measured against */}
            {values.map((value, indexCol) => {
              // sequence against which this one is compared
              const vsSequence = parsed[indexCol];

              let stringValue;
              let opacity = 0;
              if (Number.isNaN(value)) {
                stringValue = `Not a Number`;
              } else {
                stringValue = `${value.toFixed(2)}%`;
                opacity = getExponentialContrast(value / 100, contrast);
              }

              const isHovered =
                // is hovered cell in down left triangle
                (hovered[0] === indexRow && hovered[1] === indexCol) ||
                // or is corresponding cell in up right triangle
                (hovered[1] === indexRow && hovered[0] === indexCol);

              const delay =
                (WAVE_EFFECT_TIME * (indexCol + indexRow)) /
                (parsed.length + parsed.length - 2);
              return (
                <span
                  key={indexCol} // eslint-disable-line react/no-array-index-key
                  className={cn('align-result-pim__cell', {
                    'align-result-pim__cell--hovered': isHovered,
                    'align-result-pim__cell--dark': opacity < 0.5,
                  })}
                  title={`${accession || name} vs ${
                    vsSequence.accession || vsSequence.name
                  }: ${stringValue}`}
                  onPointerEnter={() => setHovered([indexRow, indexCol])}
                  onPointerLeave={() => setHovered([])}
                  style={{
                    // effect from top left to bottom right on mount
                    animationDelay: `${delay}ms`,
                    // effect from bottom right to top left on update because it
                    // looks like the effect start from where the button is
                    transitionDelay: `${WAVE_EFFECT_TIME - delay}ms`,
                    backgroundColor: `rgba(1,67,113,${opacity})`,
                  }}
                >
                  <span>{stringValue}</span>
                </span>
              );
            })}
          </Fragment>
        ))}
      </div>
      <fieldset>
        <label>
          Contrast:{' '}
          <input
            type="range"
            min={1} // keep minimum to 1 to not divide by 0 later
            max={50}
            step={0.1}
            value={contrast}
            onChange={(event) => setContrast(+event.target.value)}
          />
        </label>
      </fieldset>
    </section>
  );
};

export default AlignResultPIM;
