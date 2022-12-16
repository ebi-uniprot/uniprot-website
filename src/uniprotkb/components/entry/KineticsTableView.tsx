import useCustomElement from '../../../shared/hooks/useCustomElement';

import { RichText, TextView } from '../protein-data-views/FreeTextView';
import UniProtKBEvidenceTag from '../protein-data-views/UniProtKBEvidenceTag';

import { KineticParameters } from '../../adapters/functionConverter';
import { Evidence } from '../../types/modelTypes';

import styles from '../../../shared/styles/helper.module.scss';

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
        <table>
          <thead>
            <tr>
              {columns.map((name) => (
                <th key={name} className={styles['no-text-transform']}>
                  {' '}
                  {name}{' '}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((value) => (
              <tr key={value.key}>
                <td className={styles['no-wrap']}>
                  <RichText>{value.constant}</RichText>
                </td>
                {hasSubstrate && <td>{value.substrate}</td>}
                <td>{value.ph}</td>
                <td>{value.temp}</td>
                <td>{value.notes}</td>
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
  const kcats: KinecticsTableRow[] = [];
  const additionalNotes: string[] = [];

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

      const [substrateInfo, condition] = mv.enzyme.split('(');
      let notes = substrateInfo.split('enzyme')?.[1];
      if (condition) {
        const match =
          `(${condition}`.match(captureWordsInParanthesis)?.[1] || condition;
        if (['pH', 'degrees'].some((e) => match.includes(e))) {
          notes += excludePhTemp(match);
        } else {
          // Add the additional info to the Notes column
          notes += match;
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
    const kcatRegEx = /\.\s/;
    // From the curation manual: kcat is expressed per unit of time, in sec(-1), min(-1) or h(-1).
    const kcatConstantRegEx = /([0-9]*[.])?[0-9]+\s?[sec|min|h]+\s?\(-1\)/gi;

    data.note?.texts.forEach((text) => {
      if (text.value.includes('kcat')) {
        const kcatValues = text.value.split(kcatRegEx);
        const evidencesForWhole = text.evidences;
        const kcatsFreeText: string[] = [];

        kcatValues.forEach((value) => {
          const constants = value.match(kcatConstantRegEx);
          if (constants && constants?.length > 1) {
            const [pubMed] = value.match(/\(pubmed:\d+\)/i) || [null];

            // Exceptional case like P45470, B0F481
            if (
              value.includes('respectively') ||
              (value.match(/and/g)?.length || 0) > 1
            ) {
              additionalNotes.push(value);
            } else {
              const substrates = value.split(/and/);
              substrates?.forEach((v) => {
                kcatsFreeText.push(pubMed ? `${v}${pubMed}` : v);
              });
            }
          } else {
            kcatsFreeText.push(value);
          }
        });

        kcatsFreeText.forEach((value) => {
          const [constant] = value.match(kcatConstantRegEx) || [''];

          if (constant.length > 0) {
            const brokenSentence = value.split(kcatConstantRegEx);
            let substrateInfo = '';
            brokenSentence.forEach((s) => {
              if (!s?.includes('kcat') || !kcatConstantRegEx.test(s)) {
                substrateInfo = s;
              }
            });

            const [info, pubMed] = substrateInfo.split('(PubMed:');

            let substrateNotes = info.split('(at')?.[0];
            const phTempNotes = info.split('(at')?.[1];

            const evidences: Evidence[] = [];
            if (evidencesForWhole && pubMed) {
              evidencesForWhole.forEach((e: Evidence) => {
                if (e.id && pubMed.includes(e.id)) {
                  evidences.push(e);
                }
              });
            }
            const ph = phTempNotes?.match(pHRegEx)?.[1];
            const temp = phTempNotes?.match(tempRegEx)?.[1];

            if (phTempNotes) {
              const match =
                `(${phTempNotes}`.match(captureWordsInParanthesis)?.[1] ||
                phTempNotes;
              if (['pH', 'degrees'].some((e) => match.includes(e))) {
                substrateNotes += excludePhTemp(match);
              } else {
                // Add the additional info to the Notes column
                substrateNotes += match;
              }
            }

            kcats.push({
              key: `kcat${constant}`,
              constant,
              notes: substrateNotes !== '.' ? substrateNotes.trim() : undefined,
              ph,
              temp,
              evidences,
            });
          } else {
            additionalNotes.push(value);
          }
        });
      }
      if (!text.value.includes('kcat')) {
        additionalNotes.push(text.value);
      }
    });
  }

  return { km, vmax, kcats, additionalNotes };
};

export const KineticsTableView = ({ data }: { data: KineticParameters }) => {
  const { km, vmax, kcats, additionalNotes } = extractFromFreeText(data);
  const columns = ['pH', 'TEMPERATURE[C]', 'NOTES', 'EVIDENCE'];

  return (
    <>
      <KineticsTable columns={['KM', 'SUBSTRATE', ...columns]} data={km} />
      <KineticsTable columns={['Vmax', ...columns]} data={vmax} />
      <KineticsTable columns={['kcat', ...columns]} data={kcats} />

      {additionalNotes.map((note) => (
        <TextView key={note} comments={[{ value: note }]} />
      ))}
    </>
  );
};

export default KineticsTableView;
