import useCustomElement from '../../../shared/hooks/useCustomElement';

import { RichText, TextView } from '../protein-data-views/FreeTextView';
import UniProtKBEvidenceTag from '../protein-data-views/UniProtKBEvidenceTag';

import { KineticParameters } from '../../adapters/functionConverter';
import { Evidence } from '../../types/modelTypes';

import helper from '../../../shared/styles/helper.module.scss';
import styles from './styles/kinetics-table.module.scss';

const pHRegEx = /pH\s(([0-9]*[.])?[0-9]+-?(([0-9]*[.])?[0-9]+)?)/;
const tempRegEx = /(([0-9]*[.])?[0-9]+)\sdegrees\scelsius/i;
const muRegEx = /^u/;
const captureWordsInParentheses = /\(((.+)(?: \((.+)\))?)\)/;
const removeLeadingTrailingComma = /(^,)|(,$)/g;
// The following regexp matches up to three levels of nested parentheses
// source: https://stackoverflow.com/questions/546433/regular-expression-to-match-balanced-parentheses
const nestedParenthesesRegEx =
  /\([^)(]*(?:\([^)(]*(?:\([^)(]*(?:\([^)(]*\)[^)(]*)*\)[^)(]*)*\)[^)(]*)*\)/g;

const possibleInfo = ['pH', 'degrees', 'in', 'above', 'below'];

type KinecticsTableRow = {
  key: string;
  constant: string;
  substrate?: string;
  ph: string | undefined;
  temp: string | undefined;
  notes?: string;
  evidences?: Evidence[];
};

const KineticsTable = ({
  columns,
  data,
}: {
  columns: string[];
  data: KinecticsTableRow[];
}) => {
  const protvistaDataTableElement = useCustomElement(
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  const hasSubstrate = columns.includes('SUBSTRATE');

  if (data && data.length) {
    return (
      <protvistaDataTableElement.name>
        <table className={styles['kinetics-table']}>
          <thead>
            <tr>
              {columns.map((name) => (
                <th key={name} className={helper['no-text-transform']}>
                  {` ${name} `}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((value) => (
              <tr key={value.key}>
                <td className={helper['no-wrap']}>
                  <RichText>{value.constant}</RichText>
                </td>
                {hasSubstrate && (
                  <td>
                    <RichText>{value.substrate}</RichText>
                  </td>
                )}
                <td>{value.ph}</td>
                <td>{value.temp}</td>
                <td>
                  <RichText>{value.notes}</RichText>
                </td>
                <td>
                  <UniProtKBEvidenceTag evidences={value.evidences} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </protvistaDataTableElement.name>
    );
  }
  return null;
};

const excludePhTemp = (str: string) => {
  let newStr = str;
  const excludePH = pHRegEx.exec(newStr);
  if (excludePH?.length) {
    newStr = `${newStr?.substring(0, excludePH.index)}${newStr?.substring(
      excludePH.index + excludePH[0].length
    )}`;
  }
  const excludeTemp = tempRegEx.exec(newStr);
  if (excludeTemp?.length) {
    newStr = `${newStr?.substring(0, excludeTemp.index)}${newStr?.substring(
      excludeTemp.index + excludeTemp[0].length
    )}`;
  }
  newStr = newStr.replace(/\bat\b|\band\b/g, '');
  newStr = newStr.trim();
  return newStr?.replace(removeLeadingTrailingComma, '');
};

const extractPh = (s: string) => s.match(pHRegEx)?.[1];
const extractTemp = (s: string) => s.match(tempRegEx)?.[1];

export const extractFromFreeText = (data: KineticParameters) => {
  let km: KinecticsTableRow[] = [];
  let vmax: KinecticsTableRow[] = [];
  const notes: string[] = [];
  const kcatEvidences: Evidence[] = [];

  if (data.michaelisConstants) {
    km = data.michaelisConstants.map((mc) => {
      let [substrateColumn] = mc.substrate.split(' ('); // Ignore splitting the substrate name when '()' is part of it
      const ph = extractPh(mc.substrate);
      const temp = extractTemp(mc.substrate);

      // Get any additional info which be included between parentheses at the end of km.substrate
      const [moreInfo] = mc.substrate.match(
        new RegExp(captureWordsInParentheses, 'g')
      ) || [null];
      // Iterate over possibly nested parentheses content
      const parenthesesContent = moreInfo?.match(nestedParenthesesRegEx);
      let notes = '';
      parenthesesContent?.forEach((parenthesisContent) => {
        if (!substrateColumn.includes(parenthesisContent)) {
          if (possibleInfo.some((e) => parenthesisContent.includes(e))) {
            const match =
              parenthesisContent.match(captureWordsInParentheses)?.[1] || '';
            // Do not include pH and temperature data in notes
            notes = excludePhTemp(match);
          } else {
            // Sometimes the abbreviation of the substrate could be inside parenthesis, it has to be under the substrate column
            substrateColumn += ` ${parenthesisContent.trim()}`;
          }
        }
      });

      return {
        key: `${mc.constant}${mc.substrate}`,
        constant: `${mc.constant} ${mc.unit.replace(muRegEx, 'μ')}`,
        substrate: substrateColumn.trim(),
        ph,
        temp,
        notes,
        evidences: mc.evidences,
      };
    });
  }

  if (data.maximumVelocities) {
    vmax = data.maximumVelocities.map((mv) => {
      const ph = extractPh(mv.enzyme);
      const temp = extractTemp(mv.enzyme);

      const [substrateInfo, condition] = mv.enzyme.split(' (');
      let notes = substrateInfo.split('enzyme')?.[1];
      if (condition) {
        const match =
          `(${condition}`.match(captureWordsInParentheses)?.[1] || '';
        // If anything is inside parenthesis, process it to populate the right column
        if (match) {
          if (['pH', 'degrees'].some((e) => match.includes(e))) {
            const additionalInfo = excludePhTemp(match);
            notes += (notes && additionalInfo && `, `) + additionalInfo;
          } else {
            notes += ` (${condition}`;
          }
        }
      }

      return {
        key: `${mv.velocity}-${mv.enzyme}`,
        constant: `${mv.velocity} ${mv.unit.replace(muRegEx, 'μ')}`,
        ph,
        temp,
        notes: notes?.trim(),
        evidences: mv.evidences,
      };
    });
  }

  if (data.note?.texts) {
    data.note?.texts.forEach((text) => {
      notes.push(text.value);
      text.evidences?.forEach((evidence) => kcatEvidences.push(evidence));
    });
  }

  return { km, vmax, notes, kcatEvidences };
};

export const KineticsTableView = ({ data }: { data: KineticParameters }) => {
  const { km, vmax, notes, kcatEvidences } = extractFromFreeText(data);
  const columns = ['pH', 'TEMPERATURE[C]', 'NOTES', 'EVIDENCE'];

  return (
    <>
      <KineticsTable columns={['KM', 'SUBSTRATE', ...columns]} data={km} />
      <KineticsTable columns={['Vmax', ...columns]} data={vmax} />

      {notes.map((note) => (
        <TextView
          key={note}
          comments={[{ value: note, evidences: kcatEvidences }]}
        />
      ))}
    </>
  );
};

export default KineticsTableView;
