import React, { Fragment, useState, FC } from 'react';
import { Loader } from 'franklin-sites';
import { Link } from 'react-router-dom';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import pim from '../../adapters/pim';
import getExponentialContrast from '../../utils/getExponentialContrast';

import useDataApi from '../../../../shared/hooks/useDataApi';

import toolsURLs from '../../../config/urls';

import { JobTypes } from '../../../types/toolsJobTypes';

import './styles/AlignResultPIM.scss';

const alignURLs = toolsURLs(JobTypes.ALIGN);

const NameWithPossibleAccession: FC<{
  accession?: string;
  children: string;
}> = ({ accession, children }) => {
  if (!accession) {
    return <>{children}</>;
  }

  // separate text by chunks where we find the accession string
  const [before, ...after] = children.split(accession);

  return (
    <>
      {before}
      {/* inject a link to the entry page */}
      <Link to={`/uniprotkb/${accession}`}>{accession}</Link>
      {after.join(accession)}
    </>
  );
};

const DEFAULT_CONTRAST = 2; // need to be >1
const WAVE_EFFECT_TIME = 250; // in ms

const AlignResultPIM: FC<{ id: string }> = ({ id }) => {
  const [contrast, setContrast] = useState(DEFAULT_CONTRAST);
  const { loading, data, error, status } = useDataApi<string>(
    alignURLs.resultUrl(id, 'pim')
  );

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorHandler status={status} />;
  }

  const parsed = pim(data);

  if (!parsed.length) {
    return <ErrorHandler status={404} />;
  }

  return (
    <section className="align-result-pim">
      <h5>Percent Identity Matrix</h5>
      <div
        className="align-result-pim__matrix"
        style={{
          //                    name column|value columns (as many as needed)
          gridTemplateColumns: `min-content repeat(${parsed[0].values.length},1fr)`,
        }}
      >
        {/* for every sequence in the alignment */}
        {parsed.map(({ name, accession, values }, indexRow) => (
          <Fragment
            key={indexRow} // eslint-disable-line react/no-array-index-key
          >
            <span className="align-result-pim__name">
              <NameWithPossibleAccession accession={accession}>
                {name}
              </NameWithPossibleAccession>
            </span>
            {/* for each of the sequences this one is measured against */}
            {values.map((value, indexCol) => {
              const opacity = getExponentialContrast(value / 100, contrast);
              // sequence against which this one is compared
              const vsSequence = parsed[indexCol];
              const delay =
                (WAVE_EFFECT_TIME * (indexCol + indexRow)) /
                (parsed.length + parsed.length - 2);
              return (
                <span
                  key={indexCol} // eslint-disable-line react/no-array-index-key
                  className="align-result-pim__cell"
                  title={`${accession || name} vs ${
                    vsSequence.accession || vsSequence.name
                  }: ${value}%`}
                  style={{
                    // effect from top left to bottom right on mount
                    animationDelay: `${delay}ms`,
                    // effect from bottom right to top left on update because it
                    // looks like the effect start from where the button is
                    transitionDelay: `${WAVE_EFFECT_TIME - delay}ms`,
                    backgroundColor: `rgba(1,67,113,${opacity})`,
                    color: opacity < 0.5 ? 'black' : 'white',
                  }}
                >
                  <span>{value.toFixed(2)}%</span>
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
