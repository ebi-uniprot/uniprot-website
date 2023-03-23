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
const captureWordsInParanthesis = /\(((.+)(?: \((.+)\))?)\)/;
const removeLeadingTrailingComma = /(^,)|(,$)/g;

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
                  {' '}
                  {name}{' '}
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

export const extractFromFreeText = (data: KineticParameters) => {
  let km: KinecticsTableRow[] = [];
  let vmax: KinecticsTableRow[] = [];
  const notes: string[] = [];

  if (data.michaelisConstants) {
    km = data.michaelisConstants.map((km) => {
      let [substrate] = km.substrate.split(' ('); // Ignore splitting the substrate name when '()' is part of it
      const ph = km.substrate.match(pHRegEx)?.[1];
      const temp = km.substrate.match(tempRegEx)?.[1];

      const [moreInfo] = km.substrate.match(
        new RegExp(captureWordsInParanthesis, 'g')
      ) || [null];

      const additionInfo = moreInfo?.match(/\((.*?)\)/g);
      let notes = '';
      additionInfo?.forEach((str) => {
        if (!substrate.includes(str)) {
          const possibleInfo = ['pH', 'degrees', 'in', 'above', 'below'];
          if (possibleInfo.some((e) => str.includes(e))) {
            const match = str.match(captureWordsInParanthesis)?.[1] || '';
            // Do not include pH and temperature data in notes
            notes = excludePhTemp(match);
          } else {
            // Sometimes the abbreviation of the substrate could be inside paranthesis, it has to be under the substrate column
            substrate += str;
          }
        }
      });

      return {
        key: `${km.constant}${km.substrate}`,
        constant: `${km.constant} ${km.unit.replace(muRegEx, 'μ')}`,
        substrate: substrate.trim(),
        ph,
        temp,
        notes,
        evidences: km.evidences,
      };
    });
  }

  if (data.maximumVelocities) {
    vmax = data.maximumVelocities.map((mv) => {
      const ph = mv.enzyme.match(pHRegEx)?.[1];
      const temp = mv.enzyme.match(tempRegEx)?.[1];

      const [substrateInfo, condition] = mv.enzyme.split(' (');
      let notes = substrateInfo.split('enzyme')?.[1];
      if (condition) {
        const match =
          `(${condition}`.match(captureWordsInParanthesis)?.[1] || '';
        // If anything is inside paranthesis, process it to populate the right column
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
    });
  }

  return { km, vmax, notes };
};

export const KineticsTableView = ({ data }: { data: KineticParameters }) => {
  const { km, vmax, notes } = extractFromFreeText(data);
  const columns = ['pH', 'TEMPERATURE[C]', 'NOTES', 'EVIDENCE'];

  return (
    <>
      <KineticsTable columns={['KM', 'SUBSTRATE', ...columns]} data={km} />
      <KineticsTable columns={['Vmax', ...columns]} data={vmax} />

      {notes.map((note) => (
        <TextView key={note} comments={[{ value: note }]} />
      ))}
    </>
  );
};

export default KineticsTableView;
