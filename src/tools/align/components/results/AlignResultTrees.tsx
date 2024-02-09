import { FC, useState } from 'react';
import { Loader } from 'franklin-sites';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import NewickTree from './NewickTree';

import useDataApi from '../../../../shared/hooks/useDataApi';

import toolsURLs from '../../../config/urls';

import { JobTypes } from '../../../types/toolsJobTypes';
import { SequenceInfo } from '../../utils/useSequenceInfo';

import './styles/AlignResultTrees.scss';

const alignURLs = toolsURLs(JobTypes.ALIGN);

type AlignResultTreesProps = {
  id: string;
  sequenceInfo: SequenceInfo;
  selectedEntries: string[];
  handleEntrySelection: (rowId: string) => void;
};

const AlignResultTrees: FC<React.PropsWithChildren<AlignResultTreesProps>> = ({
  id,
  sequenceInfo,
  selectedEntries,
  handleEntrySelection,
}) => {
  const [showPhyloTree, setShowPhyloTree] = useState(true);
  const [showDistance, setShowDistance] = useState(true);
  const [alignLabels, setAlignLabels] = useState(true);
  const [circularLayout, setCircularLayout] = useState(false);

  const { loading, data, error, status } = useDataApi<string>(
    alignURLs.resultUrl(id, { format: showPhyloTree ? 'phylotree' : 'tree' })
  );

  if (error || !(loading || data)) {
    return <ErrorHandler status={status} />;
  }

  return (
    <section className="align-result-trees">
      <h2 className="tiny">{showPhyloTree ? 'Phylogenetic' : 'Guide'} tree</h2>
      <section className="controls">
        <fieldset>
          Tree type:
          <label>
            <input
              aria-label="phylogenetic tree"
              name="tree"
              type="radio"
              checked={showPhyloTree}
              onChange={() => setShowPhyloTree(true)}
            />
            Phylogenetic tree
          </label>
          <label>
            <input
              aria-label="guide tree"
              name="tree"
              type="radio"
              checked={!showPhyloTree}
              onChange={() => setShowPhyloTree(false)}
            />
            Guide tree
          </label>
        </fieldset>
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
              aria-label="newicktree view (with distance), with aligned labels"
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
              aria-label="newicktree view (with distance)"
              name="distance"
              type="radio"
              checked={showDistance && !alignLabels}
              // disabled={!showPhyloTree}
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
        <NewickTree
          newick={data}
          showDistance={showDistance}
          alignLabels={alignLabels}
          circularLayout={circularLayout}
          sequenceInfo={sequenceInfo}
          selectedEntries={selectedEntries}
          handleEntrySelection={handleEntrySelection}
        />
      )}
    </section>
  );
};

export default AlignResultTrees;
