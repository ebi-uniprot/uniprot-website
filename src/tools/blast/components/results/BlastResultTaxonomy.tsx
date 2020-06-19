import React, { FC, useMemo, useState } from 'react';
import { DoughnutChart, ChevronDownIcon } from 'franklin-sites';

import { EnrichedData } from './BlastResult';

import arrayOfLineagesToTree, {
  TaxNode,
} from '../../adapters/arrayOfLineagesToTree';

import './styles/blast-result-taxonomy.scss';

type TaxItemProps = {
  taxNode: TaxNode;
  ratio: number;
};

const TaxItem: FC<TaxItemProps> = ({ taxNode, ratio }) => {
  const [open, setOpen] = useState(true);

  let chevronMaybe = null;
  if (taxNode.children.length) {
    chevronMaybe = (
      <ChevronDownIcon width="1ch" className={open ? undefined : 'closed'} />
    );
  }

  // eslint-disable-next-line no-shadow
  const handleClick = () => setOpen((open) => !open);

  return (
    <>
      <button type="button" onClick={handleClick}>
        {<DoughnutChart size="small" percent={Math.round(ratio * 100)} />}{' '}
        {taxNode.name} ({taxNode.count}) {chevronMaybe}
      </button>
      <ul>
        {open &&
          taxNode.children.map((child) => (
            <li key={child.name}>
              <TaxItem taxNode={child} ratio={child.count / taxNode.count} />
            </li>
          ))}
      </ul>
    </>
  );
};

const BlastResultToolInput: FC<{ data: EnrichedData | null }> = ({ data }) => {
  const tree = useMemo(
    () =>
      arrayOfLineagesToTree(
        ((data || {}).hits || [])
          // extract lineages and do copy (to not mess up the original)
          .map((hit) => Array.from(hit?.extra?.organism?.lineage ?? []))
          // filter out no data
          .filter((lineage) => lineage.length)
      ),
    [data]
  );

  if (!tree) {
    return null;
  }

  return (
    <section className="blast-taxonomy">
      Taxonomy tree of the results:
      <ul>
        <li>
          <TaxItem taxNode={tree} ratio={1} />
        </li>
      </ul>
    </section>
  );
};

export default BlastResultToolInput;
