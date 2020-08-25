import React, { FC, useState } from 'react';
import { Loader } from 'franklin-sites';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import PhyloTree from './PhyloTree';

import useDataApi from '../../../../shared/hooks/useDataApi';

import toolsURLs from '../../../config/urls';

import { JobTypes } from '../../../types/toolsJobTypes';
import { SequenceInfo } from '../../utils/useSequenceInfo';

import './styles/AlignResultPhyloTree.scss';

const alignURLs = toolsURLs(JobTypes.ALIGN);

type Props = {
  id: string;
  sequenceInfo: SequenceInfo;
};

const AlignResultPhyloTree: FC<Props> = ({ id, sequenceInfo }) => {
  const [showDistance, setShowDistance] = useState(true);
  const [alignLabels, setAlignLabels] = useState(true);
  const [circularLayout, setCircularLayout] = useState(false);

  const { loading, data, error, status } = useDataApi<string>(
    alignURLs.resultUrl(id, 'phylotree')
  );

  if (error || !(loading || data)) {
    return <ErrorHandler status={status} />;
  }

  return (
    <section className="align-result-phylotree">
      <h5>Phylogenetic tree</h5>
      <section className="controls">
        <fieldset>
          Layout:
          <label>
            <input
              aria-label="horizontal layout"
              name="layout"
              type="radio"
              checked={!circularLayout}
              onChange={() => setCircularLayout(false)}
            />
            Horizontal
          </label>
          <label>
            <input
              aria-label="circular layout"
              name="layout"
              type="radio"
              checked={circularLayout}
              onChange={() => setCircularLayout(true)}
            />
            Circular
          </label>
        </fieldset>
        <fieldset>
          Branch length:
          <label title="Branch lengths are proportional to calculated distances, labels are aligned">
            <input
              aria-label="phylotree view (with distance), with aligned labels"
              name="distance"
              type="radio"
              checked={showDistance && alignLabels}
              onChange={() => {
                setShowDistance(true);
                setAlignLabels(true);
              }}
            />
            Phylogram with aligned labels
          </label>
          <label title="Branch lengths are proportional to calculated distances">
            <input
              aria-label="phylotree view (with distance)"
              name="distance"
              type="radio"
              checked={showDistance && !alignLabels}
              onChange={() => {
                setShowDistance(true);
                setAlignLabels(false);
              }}
            />
            Phylogram
          </label>
          <label title="Branch lengths are not proportional to calculated distances">
            <input
              aria-label="cladogram view (without distance)"
              name="distance"
              type="radio"
              checked={!showDistance}
              onChange={() => setShowDistance(false)}
            />
            Cladogram
          </label>
        </fieldset>
      </section>
      {loading ? (
        <Loader />
      ) : (
        <PhyloTree
          newick={data}
          showDistance={showDistance}
          alignLabels={alignLabels}
          circularLayout={circularLayout}
          sequenceInfo={sequenceInfo}
        />
      )}
    </section>
  );
};

export default AlignResultPhyloTree;
