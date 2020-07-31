import React, { FC, Fragment, lazy, Suspense } from 'react';
import { v1 } from 'uuid';
import { Card, Loader } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import FreeTextView, { TextView } from '../protein-data-views/FreeTextView';
import CatalyticActivityView from '../protein-data-views/CatalyticActivityView';
import KeywordView from '../protein-data-views/KeywordView';
import XRefView from '../protein-data-views/XRefView';
import FeaturesView from '../protein-data-views/FeaturesView';
import UniProtKBEvidenceTag from '../protein-data-views/UniProtKBEvidenceTag';

import { hasContent } from '../../utils';
import {
  FunctionUIModel,
  BioPhysicoChemicalProperties,
  Absorption,
  KineticParameters,
  CofactorComment,
} from '../../adapters/functionConverter';

import EntrySection from '../../types/entrySection';
import {
  CommentType,
  CatalyticActivityComment,
  FreeTextComment,
} from '../../types/commentTypes';

const GoRibbon = lazy(() =>
  import(/* webpackChunkName: "go-ribbon" */ './GoRibbon')
);

export const AbsorptionView: FC<{ data: Absorption }> = ({ data }) => {
  return (
    <Fragment>
      <section className="text-block">
        {`Abs(max) = ${data.approximate && '~'}${data.max}nm`}
      </section>
      <section className="text-block">
        {data.note && <TextView comments={data.note.texts} />}
        {data.evidences && <UniProtKBEvidenceTag evidences={data.evidences} />}
      </section>
    </Fragment>
  );
};

export const KineticsView: FC<{ data: KineticParameters }> = ({ data }) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

const BioPhysicoChemicalPropertiesView: FC<{
  data: BioPhysicoChemicalProperties;
}> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      {data.absorption && (
        <Fragment>
          <h3>Absorption</h3>
          <AbsorptionView data={data.absorption} />
        </Fragment>
      )}
      {data.kinetics && (
        <Fragment>
          <h3>Kinetics</h3>
          <KineticsView data={data.kinetics} />
        </Fragment>
      )}
      {data.pHDependence && (
        <Fragment>
          <h3>pH Dependence</h3>
          <TextView comments={data.pHDependence} />
        </Fragment>
      )}
      {data.redoxPotential && (
        <Fragment>
          <h3>Redox Potential</h3>
          <TextView comments={data.redoxPotential} />
        </Fragment>
      )}
      {data.temperatureDependence && (
        <Fragment>
          <h3>Temperature Dependence</h3>
          <TextView comments={data.temperatureDependence} />
        </Fragment>
      )}
    </Fragment>
  );
};

export const CofactorView: FC<{
  cofactors?: CofactorComment[];
  title?: string;
}> = ({ cofactors, title }) => {
  if (!cofactors || !cofactors.length) {
    return null;
  }
  return (
    <Fragment>
      {title && <h3>{title}</h3>}
      {cofactors.map((cofactorComment) => (
        <section className="text-block" key={v1()}>
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
    </Fragment>
  );
};

const FunctionSection: FC<{
  data: FunctionUIModel;
  sequence: string;
  primaryAccession: string;
}> = ({ data, sequence, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.Function}>
      <Card title={EntrySection.Function}>
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.FUNCTION) as FreeTextComment[]
          }
        />
        <CatalyticActivityView
          comments={
            data.commentsData.get(
              CommentType.CATALYTIC_ACTIVITY
            ) as CatalyticActivityComment[]
          }
          title={CommentType.CATALYTIC_ACTIVITY.toLocaleLowerCase()}
        />
        <CofactorView
          cofactors={
            data.commentsData.get(CommentType.COFACTOR) as CofactorComment[]
          }
          title={CommentType.COFACTOR.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.PATHWAY) as FreeTextComment[]
          }
          title={CommentType.PATHWAY.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(
              CommentType.MISCELLANEOUS
            ) as FreeTextComment[]
          }
          title={CommentType.MISCELLANEOUS.toLowerCase()}
        />
        <BioPhysicoChemicalPropertiesView
          data={data.bioPhysicoChemicalProperties}
        />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.PATHWAY) as FreeTextComment[]
          }
          title={CommentType.PATHWAY.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(
              CommentType.ACTIVITY_REGULATION
            ) as FreeTextComment[]
          }
          title={CommentType.ACTIVITY_REGULATION.toLowerCase()}
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
    </div>
  );
};

export default FunctionSection;
