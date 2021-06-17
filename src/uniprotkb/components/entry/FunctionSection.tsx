import { lazy, Suspense } from 'react';
import { Card, Loader, Message } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

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

export const KineticsView = ({ data }: { data: KineticParameters }) => (
  <>
    <section className="text-block">
      {data.michaelisConstants && (
        <ul className="no-bullet">
          {data.michaelisConstants.map((km) => (
            <li key={km.constant}>
              K<sub>M</sub>
              {`=${km.constant}${km.unit} for ${km.substrate} `}
              <UniProtKBEvidenceTag evidences={km.evidences} />
            </li>
          ))}
        </ul>
      )}
    </section>
    <section className="text-block">
      {data.note && <TextView comments={data.note.texts} />}
    </section>
  </>
);

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
  if (!cofactors || !cofactors.length) {
    return null;
  }
  return (
    <>
      {title && <h3>{title}</h3>}
      {cofactors.map((cofactorComment, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <section className="text-block" key={index}>
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
  return (
    <Card
      header={<h2>{getEntrySectionNameAndId(EntrySection.Function).name}</h2>}
      id={EntrySection.Function}
      data-entry-section
    >
      {data.commentsData.get('CAUTION')?.length ? (
        <Message level="warning">
          <h4>Caution</h4>
          <FreeTextView
            comments={data.commentsData.get('CAUTION') as FreeTextComment[]}
          />
        </Message>
      ) : undefined}
      <FreeTextView
        comments={data.commentsData.get('FUNCTION') as FreeTextComment[]}
      />
      <CatalyticActivityView
        comments={
          data.commentsData.get(
            'CATALYTIC ACTIVITY'
          ) as CatalyticActivityComment[]
        }
        title="catalytic activity"
      />
      <CofactorView
        cofactors={data.commentsData.get('COFACTOR') as CofactorComment[]}
        title="cofactor"
      />
      <FreeTextView
        comments={data.commentsData.get('PATHWAY') as FreeTextComment[]}
        title="pathway"
      />
      <FreeTextView
        comments={data.commentsData.get('MISCELLANEOUS') as FreeTextComment[]}
        title="miscellaneous"
      />
      <FreeTextView
        comments={data.commentsData.get('BIOTECHNOLOGY') as FreeTextComment[]}
        title="biotechnology"
      />
      <BioPhysicoChemicalPropertiesView
        data={data.bioPhysicoChemicalProperties}
      />
      <FreeTextView
        comments={data.commentsData.get('PATHWAY') as FreeTextComment[]}
        title="pathway"
      />
      <FreeTextView
        comments={
          data.commentsData.get('ACTIVITY REGULATION') as FreeTextComment[]
        }
        title="activity regulation"
      />
      <FeaturesView features={data.featuresData} sequence={sequence} />
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <GoRibbon primaryAccession={primaryAccession} />
        </Suspense>
      </ErrorBoundary>
      {/* {data.goTerms && <GOView data={data.goTerms} />} removed for now */}
      <KeywordView keywords={data.keywordData} />
      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default FunctionSection;
