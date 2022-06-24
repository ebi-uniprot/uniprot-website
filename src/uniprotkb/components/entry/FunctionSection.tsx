import { lazy, Suspense } from 'react';
import { Card, Loader, Message } from 'franklin-sites';

import useCustomElement from '../../../shared/hooks/useCustomElement';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import HTMLHead from '../../../shared/components/HTMLHead';
import FreeTextView, { TextView } from '../protein-data-views/FreeTextView';
import CatalyticActivityView from '../protein-data-views/CatalyticActivityView';
import KeywordView from '../protein-data-views/KeywordView';
import XRefView from '../protein-data-views/XRefView';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';
import UniProtKBEvidenceTag from '../protein-data-views/UniProtKBEvidenceTag';

import { hasContent } from '../../../shared/utils/utils';
import {
  FunctionUIModel,
  BioPhysicoChemicalProperties,
  Absorption,
  KineticParameters,
} from '../../adapters/functionConverter';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import {
  CatalyticActivityComment,
  CofactorComment,
  FreeTextComment,
} from '../../types/commentTypes';

import helper from '../../../shared/styles/helper.module.scss';

const GoRibbon = lazy(
  () => import(/* webpackChunkName: "go-ribbon" */ './GoRibbon')
);

export const AbsorptionView = ({ data }: { data: Absorption }) => (
  <>
    <section className="text-block">
      {`Abs(max) = ${data.approximate && '~'}${data.max}nm`}
    </section>
    <section className="text-block">
      {data.note && <TextView comments={data.note.texts} />}
      {data.evidences && <UniProtKBEvidenceTag evidences={data.evidences} />}
    </section>
  </>
);

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

export const KineticsView = ({ data }: { data: KineticParameters }) => {
  const pHRegEX = /pH\s([0-9]+)/;
  const tempRegEx = /([0-9]+)\sdegrees/;

  let km = [];
  let vmax = [];
  let kcats = [];
  let additionalNotes = false;

  if (data.michaelisConstants) {
    km = data.michaelisConstants.map((km) => {
      const [substrate] = km.substrate.split('(at');
      const [, ph] = km.substrate.match(pHRegEX)
        ? km.substrate.match(pHRegEX)
        : [, null];
      const [, temp] = km.substrate.match(tempRegEx)
        ? km.substrate.match(tempRegEx)
        : [, null];

      return {
        key: `${km.constant}${km.substrate}`,
        constant: `${km.constant}${km.unit.replace('uM', 'μM')}`,
        substrate: substrate.trim(),
        ph,
        temp, // TODO Take care of notes
        evidences: km.evidences,
      };
    });
  }

  if (data.maximumVelocities) {
    vmax = data.maximumVelocities.map((mv) => {
      const [, ph] = mv.enzyme.match(pHRegEX)
        ? mv.enzyme.match(pHRegEX)
        : [, null];
      const [, temp] = mv.enzyme.match(tempRegEx)
        ? mv.enzyme.match(tempRegEx)
        : [, null];
      const [substrateInfo] = mv.enzyme.split('(at');
      const [, substrate] = substrateInfo.split('enzyme');

      return {
        key: `${mv.velocity}-${mv.enzyme}`,
        constant: `${mv.velocity}${mv.unit}`,
        ph,
        temp,
        notes: substrate.trim(),
        evidences: mv.evidences,
      };
    });
  }

  if (data.note?.texts) {
    const kcatRegEx = /\)\.\s/;
    const kcatConstantRegEx = /([0-9]*[.])?[0-9]+\ssec\(-1\)/;

    data.note?.texts.forEach((text) => {
      if (text.value.startsWith('kcat')) {
        const kcatValues = text.value.split(kcatRegEx);
        const evidencesForWhole = text.evidences;
        kcats = kcatValues.map((value) => {
          const [constant] = value.match(kcatConstantRegEx);
          const [notes, phTemp, pubMed] = value
            .substring(value.indexOf('with'))
            .split('(');
          const evidences = [];
          if (evidencesForWhole) {
            evidencesForWhole.forEach((e) => {
              if (pubMed.includes(e.id)) {
                evidences.push(e);
              }
            });
          }
          const [, ph] = phTemp.match(pHRegEX);
          const [, temp] = phTemp.match(tempRegEx);
          return {
            key: `kcat${constant}`,
            constant,
            notes,
            ph,
            temp,
            evidences,
          };
        });
      }
      if (!text.value.startsWith('kcat')) {
        additionalNotes = true;
      }
    });
  }

  const columns = ['pH', 'TEMPERATURE[C]', 'NOTES', 'EVIDENCE'];
  return (
    <>
      <KineticsTable columns={['KM', 'SUBSTRATE', ...columns]} data={km} />
      <KineticsTable columns={['Vmax', ...columns]} data={vmax} />
      <KineticsTable columns={['kcat', ...columns]} data={kcats} />

      {additionalNotes && (
        <section className="text-block">
          {data.note && <TextView comments={data.note.texts} />}
        </section>
      )}
    </>
  );
};

const BioPhysicoChemicalPropertiesView = ({
  data,
}: {
  data: BioPhysicoChemicalProperties;
}) => {
  if (!data) {
    return null;
  }
  return (
    <>
      {data.absorption && (
        <>
          <h3>Absorption</h3>
          <AbsorptionView data={data.absorption} />
        </>
      )}
      {data.kinetics && (
        <>
          <h3>Kinetics</h3>
          <KineticsView data={data.kinetics} />
        </>
      )}
      {data.pHDependence && (
        <>
          <h3>pH Dependence</h3>
          <TextView comments={data.pHDependence} />
        </>
      )}
      {data.redoxPotential && (
        <>
          <h3>Redox Potential</h3>
          <TextView comments={data.redoxPotential} />
        </>
      )}
      {data.temperatureDependence && (
        <>
          <h3>Temperature Dependence</h3>
          <TextView comments={data.temperatureDependence} />
        </>
      )}
    </>
  );
};

type CofactorViewProps = {
  cofactors?: CofactorComment[];
  title?: string;
};

export const CofactorView = ({ cofactors, title }: CofactorViewProps) => {
  if (!cofactors?.length) {
    return null;
  }
  return (
    <>
      {title && <h3 className={helper.capitalize}>{title}</h3>}
      {cofactors.map((cofactorComment, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <section className="text-block" key={index}>
          {cofactorComment.molecule && (
            <h4 className="tiny">
              <a href={`#${cofactorComment.molecule.replaceAll(' ', '_')}`}>
                {cofactorComment.molecule}
              </a>
            </h4>
          )}
          {cofactorComment.cofactors &&
            cofactorComment.cofactors.map((cofactor) => (
              <span key={cofactor.name}>
                {cofactor.name}{' '}
                {cofactor.evidences && (
                  <UniProtKBEvidenceTag evidences={cofactor.evidences} />
                )}
              </span>
            ))}
          {cofactorComment.note && (
            <TextView comments={cofactorComment.note.texts} />
          )}
        </section>
      ))}
    </>
  );
};

type Props = {
  data: FunctionUIModel;
  sequence: string;
  primaryAccession: string;
};

const FunctionSection = ({ data, sequence, primaryAccession }: Props) => {
  if (!hasContent(data)) {
    return null;
  }

  /*
    Current site order (eg https://www.uniprot.org/uniprot/P67910)
      General Function
      Miscellaneous
      Caution
      Catalytic activity
      Cofactor
      Activity regulation
      BioPhysicoChemicalBio
      Pathway
  */

  // Use the first available function as a description
  const firstFunction = (
    data.commentsData.get('FUNCTION') as FreeTextComment[] | undefined
  )?.[0]?.texts?.[0]?.value;

  return (
    <Card
      header={
        <h2 data-article-id="function_section">
          {getEntrySectionNameAndId(EntrySection.Function).name}
        </h2>
      }
      id={EntrySection.Function}
      data-entry-section
    >
      {firstFunction && (
        <HTMLHead>
          <meta name="description" content={firstFunction} />
        </HTMLHead>
      )}
      <FreeTextView
        comments={
          data.commentsData.get('FUNCTION') as FreeTextComment[] | undefined
        }
        title={<span className="visually-hidden">function</span>}
      />
      <FreeTextView
        comments={
          data.commentsData.get('MISCELLANEOUS') as
            | FreeTextComment[]
            | undefined
        }
        title="miscellaneous"
      />
      {data.commentsData.get('CAUTION')?.length ? (
        <Message level="warning">
          <FreeTextView
            comments={
              data.commentsData.get('CAUTION') as FreeTextComment[] | undefined
            }
            title="caution"
          />
        </Message>
      ) : undefined}
      <CatalyticActivityView
        comments={
          data.commentsData.get('CATALYTIC ACTIVITY') as
            | CatalyticActivityComment[]
            | undefined
        }
        title="catalytic activity"
      />
      <CofactorView
        cofactors={
          data.commentsData.get('COFACTOR') as CofactorComment[] | undefined
        }
        title="cofactor"
      />
      <FreeTextView
        comments={
          data.commentsData.get('ACTIVITY REGULATION') as
            | FreeTextComment[]
            | undefined
        }
        title="activity regulation"
      />
      <FreeTextView
        comments={
          data.commentsData.get('BIOTECHNOLOGY') as
            | FreeTextComment[]
            | undefined
        }
        title="biotechnology"
      />
      <BioPhysicoChemicalPropertiesView
        data={data.bioPhysicoChemicalProperties}
      />
      <FreeTextView
        comments={
          data.commentsData.get('PATHWAY') as FreeTextComment[] | undefined
        }
        title="pathway"
      />
      <FeaturesView
        primaryAccession={primaryAccession}
        features={data.featuresData}
        sequence={sequence}
      />
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <GoRibbon
            primaryAccession={primaryAccession}
            goTerms={data.goTerms}
            geneNamesData={data.geneNamesData}
            organismData={data.organismData}
          />
        </Suspense>
      </ErrorBoundary>
      <KeywordView keywords={data.keywordData} />
      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default FunctionSection;
