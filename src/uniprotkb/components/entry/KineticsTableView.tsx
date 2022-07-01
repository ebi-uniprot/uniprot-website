import useCustomElement from '../../../shared/hooks/useCustomElement';

import { TextView } from '../protein-data-views/FreeTextView';
import UniProtKBEvidenceTag from '../protein-data-views/UniProtKBEvidenceTag';

import { KineticParameters } from '../../adapters/functionConverter';

const KineticsTable = ({ columns, data }) => {
  const protvistaDataTableElement = useCustomElement(
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  if (data && data.length) {
    return (
      <protvistaDataTableElement.name>
        <table>
          <thead>
            <tr>
              {columns.map((name) => (
                <th key={name}> {name} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((value) => (
              <tr data-id="row" key={value.key}>
                <td>{value.constant}</td>
                {value.substrate && <td>{value.substrate}</td>}
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
  } else {
    return null;
  }
};

export const KineticsTableView = ({ data }: { data: KineticParameters }) => {
  const pHRegEX = /pH\s(([0-9]*[.])?[0-9]+)/;
  const tempRegEx = /(([0-9]*[.])?[0-9]+)\sdegrees\sCelsius/;
  const captureWordsInParanthesis = /\(((.+)(?: \((.+)\))?)\)/;
  const removeLeadingTrailingChar = /(^,)|(,$)/g;

  let [km, vmax, kcats, additionalNotes] = [[], [], [], []];

  const excludePhTemp = (str: string) => {
    let newStr = str;
    const excludePH = pHRegEX.exec(newStr);
    if (excludePH?.length) {
      newStr =
        newStr?.substring(0, excludePH.index) +
        newStr?.substring(excludePH.index + excludePH[0].length);
    }
    const excludeTemp = tempRegEx.exec(newStr);
    if (excludeTemp?.length) {
      newStr =
        newStr?.substring(0, excludeTemp.index) +
        newStr?.substring(excludeTemp.index + excludeTemp[0].length);
    }
    newStr = newStr.replace(/\bat\b|\band\b/g, '');
    newStr = newStr.trim();
    return newStr?.replace(removeLeadingTrailingChar, '');
  };

  if (data.michaelisConstants) {
    km = data.michaelisConstants.map((km) => {
      let [substrate] = km.substrate.split('(');
      const ph = km.substrate.match(pHRegEX)?.[1];
      const temp = km.substrate.match(tempRegEx)?.[1];

      const moreInfo = km.substrate.match(
        new RegExp(captureWordsInParanthesis, 'g')
      );
      let notes = '';
      moreInfo?.forEach((str) => {
        const possibleInfo = ['pH', 'degrees', 'in', 'above', 'below'];
        if (possibleInfo.some((e) => str.includes(e))) {
          let match = str.match(captureWordsInParanthesis)?.[1] || '';
          // Do not include pH and temperature data in notes
          notes = excludePhTemp(match);
        } else {
          // Sometimes the abbreviation of the substrate could be inside paranthesis, it has to be under the substrate column
          substrate += str;
        }
      });

      return {
        key: `${km.constant}${km.substrate}`,
        constant: `${km.constant} ${km.unit.replace('uM', 'μM')}`,
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
      const ph = mv.enzyme.match(pHRegEX)?.[1];
      const temp = mv.enzyme.match(tempRegEx)?.[1];

      const [substrateInfo, condition] = mv.enzyme.split('(');
      let notes = substrateInfo.split('enzyme')?.[1];
      if (condition) {
        let match =
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
        constant: `${mv.velocity} ${mv.unit}`,
        ph,
        temp,
        notes: notes.trim(),
        evidences: mv.evidences,
      };
    });
  }

  if (data.note?.texts) {
    const kcatRegEx = /\.\s/;
    // From the curation manual: kcat is expressed per unit of time, in sec(-1), min(-1) or h(-1).
    const kcatConstantRegEx = /([0-9]*[.])?[0-9]+\s?[sec|min|h]+\s?\(-1\)/g;

    data.note?.texts.forEach((text) => {
      if (text.value.includes('kcat')) {
        const kcatValues = text.value.split(kcatRegEx);
        const evidencesForWhole = text.evidences;
        const kcatsFreeText = [];

        kcatValues.forEach((value) => {
          const constants = value.match(kcatConstantRegEx);

          if (constants?.length > 1) {
            const [pubMed] = value.match(/\(PubMed:\d+\)/) || [null];

            // Exceptional case P45470
            if (value.includes('respectively')) {
              additionalNotes.push(value);
            } else {
              const substrates = value.split(/and/);
              substrates?.forEach((v) => {
                kcatsFreeText.push(`${v}${pubMed}`);
              });
            }
          } else {
            kcatsFreeText.push(value);
          }
        });

        kcatsFreeText.map((value) => {
          const [constant] = value.match(kcatConstantRegEx) || [0];

          if (constant) {
            const brokenSentence = value.split(kcatConstantRegEx);
            let substrateInfo = '';
            brokenSentence.forEach((s) => {
              if (!s?.includes('kcat') || !kcatConstantRegEx.test(s)) {
                substrateInfo = s;
              }
            });

            const [info, pubMed] = substrateInfo.split('(PubMed:');

            let [substrateNotes, phTempNotes] = info.split('(at');

            const evidences = [];
            if (evidencesForWhole && pubMed) {
              evidencesForWhole.forEach((e) => {
                if (pubMed.includes(e.id)) {
                  evidences.push(e);
                }
              });
            }
            const ph = phTempNotes?.match(pHRegEX)?.[1];
            const temp = phTempNotes?.match(tempRegEx)?.[1];

            if (phTempNotes) {
              let match =
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
              constant: constant,
              notes: substrateNotes,
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

  const columns = ['pH', 'TEMPERATURE[C]', 'NOTES', 'EVIDENCE'];
  return (
    <>
      <KineticsTable columns={['KM', 'SUBSTRATE', ...columns]} data={km} />
      <KineticsTable columns={['Vmax', ...columns]} data={vmax} />
      <KineticsTable columns={['kcat', ...columns]} data={kcats} />

      {additionalNotes.length >= 1 && (
        <section className="text-block">
          {data.note && (
            <TextView comments={[{ value: additionalNotes.join('\r\n') }]} />
          )}
        </section>
      )}
    </>
  );
};

export default KineticsTableView;
