import React, { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { BlastResults, BlastHsp, BlastHit } from '../../types/blastResults';

const parseHitDescription = (string: string) => {
  const regex = new RegExp(/(.*)(OS=.*)(OX=.*)(GN=.*)(PE=.*)(SV=.*)/);
  const matches = string.match(regex);
  if (!matches) {
    return {};
  }
  return {
    proteinDescription: matches[1],
    organism: matches[2] && matches[2].substring(3).trim(),
    taxid: matches[3] && matches[3].substring(3).trim(),
    geneName: matches[4] && matches[4].substring(3).trim(),
    proteinExistence: matches[5] && matches[5].substring(3).trim(),
  };
};

const BlastResultsHsp: FC<{ hsp: BlastHsp }> = ({ hsp }) => (
  <section>{`${hsp.hsp_hit_from}-${hsp.hsp_hit_to} bit-score:${hsp.hsp_bit_score}`}</section>
);

const BlastResultTable: FC<{ data: BlastResults }> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      <table className="data-table__table">
        <thead className="data-table__table__header">
          <tr className="data-table__table__header__row">
            <th className="data-table__table__header__row__cell">Entry</th>
            <th className="data-table__table__header__row__cell">
              Protein name
            </th>
            <th className="data-table__table__header__row__cell">Organism</th>
            <th className="data-table__table__header__row__cell">Gene name</th>
            <th className="data-table__table__header__row__cell">Alignment</th>
          </tr>
        </thead>
        <tbody className="data-table__table__body">
          {data &&
            data.hits &&
            data.hits.map((hit: BlastHit) => {
              const {
                proteinDescription,
                organism,
                taxid,
                geneName,
              } = parseHitDescription(hit.hit_desc);
              return (
                <tr key={hit.hit_acc}>
                  <td className="data-table__table__body__cell">
                    <Link to={`/uniprotkb/${hit.hit_acc}`}>{hit.hit_acc}</Link>
                  </td>
                  <td className="data-table__table__body__cell">
                    {proteinDescription}
                  </td>
                  <td className="data-table__table__body__cell">
                    <Link to={`/taxonomy/${taxid}`}>{organism}</Link>
                  </td>
                  <td className="data-table__table__body__cell">{geneName}</td>
                  <td className="data-table__table__body__cell">
                    {hit.hit_hsps.map((hsp) => (
                      <BlastResultsHsp
                        hsp={hsp}
                        key={`${hsp.hsp_hit_from}-${hsp.hsp_hit_to}`}
                      />
                    ))}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default BlastResultTable;
