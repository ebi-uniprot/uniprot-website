import { Card, Chip, Loader, Message, Tab, Tabs } from 'franklin-sites';
import { Fragment, lazy, memo, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import ExternalLink from '../../../shared/components/ExternalLink';
import HTMLHead from '../../../shared/components/HTMLHead';
import { EntryType } from '../../../shared/config/entryTypeIcon';
import externalUrls from '../../../shared/config/externalUrls';
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import helper from '../../../shared/styles/helper.module.scss';
import { hasContent } from '../../../shared/utils/utils';
import { Reference } from '../../../supporting-data/citations/adapters/citationsConverter';
import {
  Absorption,
  BioPhysicoChemicalProperties,
  FunctionUIModel,
  KineticParameters,
} from '../../adapters/functionConverter';
import {
  CatalyticActivityComment,
  CofactorComment,
  FreeTextComment,
} from '../../types/commentTypes';
import EntrySection from '../../types/entrySection';
import { getEntrySectionNameAndId } from '../../utils/entrySection';
import CatalyticActivityView from '../protein-data-views/CatalyticActivityView';
import FreeTextView, {
  RichText,
  TextView,
} from '../protein-data-views/FreeTextView';
import KeywordView from '../protein-data-views/KeywordView';
import UniProtKBEvidenceTag from '../protein-data-views/UniProtKBEvidenceTag';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';
import XRefView from '../protein-data-views/XRefView';
import CommunityCuration from './CommunityCuration';
import KineticsTableView from './KineticsTableView';

const GoRibbon = lazy(
  () => import(/* webpackChunkName: "go-ribbon" */ './GoRibbon')
);

const GoCam = lazy(() => import(/* webpackChunkName: "go-cam" */ './GoCam'));

export const AbsorptionView = ({ data }: { data: Absorption }) => (
  <>
    <section className="text-block">
      Abs(max) = {data.approximate && '~'}
      {data.max}nm
    </section>
    <section className="text-block">
      {data.note && <TextView comments={data.note.texts} />}
      <UniProtKBEvidenceTag evidences={data.evidences} />
    </section>
  </>
);

export const KineticsView = ({ data }: { data: KineticParameters }) => (
  <>
    <section className="text-block">
      {data.michaelisConstants && (
        <ul className="no-bullet">
          {data.michaelisConstants.map((km) => (
            <li key={`${km.constant}-${km.substrate}`}>
              K<sub>M</sub>
              {`=${km.constant}${km.unit.replace('uM', 'μM')} for ${
                km.substrate
              } `}
              <UniProtKBEvidenceTag evidences={km.evidences} />
            </li>
          ))}
        </ul>
      )}
      {data.maximumVelocities && (
        <ul className="no-bullet">
          {data.maximumVelocities.map((mv) => (
            <li key={`${mv.velocity}-${mv.enzyme}`}>
              V<sub>max</sub>
              {`=${mv.velocity}${mv.unit} ${mv.enzyme} `}
              <UniProtKBEvidenceTag evidences={mv.evidences} />
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
          <h3 data-article-id="biophysicochemical_properties#1-absorption">
            Absorption
          </h3>
          <AbsorptionView data={data.absorption} />
        </>
      )}
      {data.kinetics && (
        <>
          <h3 data-article-id="biophysicochemical_properties#2-kinetic-parameters">
            Kinetics
          </h3>
          {Object.entries(data.kinetics).map(([key, value]) => (
            <Fragment key={key}>
              {key !== 'canonical' && (
                <h4 className="tiny">
                  <a href={`#${key.replaceAll(' ', '_')}`}>{key}</a>
                </h4>
              )}
              <KineticsTableView data={value} />
            </Fragment>
          ))}
        </>
      )}
      {data.pHDependence && (
        <>
          <h3 data-article-id="biophysicochemical_properties#3-ph-dependence">
            pH Dependence
          </h3>
          <TextView comments={data.pHDependence} />
        </>
      )}
      {data.redoxPotential && (
        <>
          <h3 data-article-id="biophysicochemical_properties#4-rodex-potential">
            Redox Potential
          </h3>
          <TextView comments={data.redoxPotential} />
        </>
      )}
      {data.temperatureDependence && (
        <>
          <h3 data-article-id="biophysicochemical_properties#5-temperature-dependence">
            Temperature Dependence
          </h3>
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
      {title && <h3 data-article-id="cofactor">{title}</h3>}
      {cofactors.length > 1 && (
        <div className="text-block">
          Protein has several cofactor binding sites:
        </div>
      )}
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
              <Fragment key={cofactor.name}>
                <span>
                  <RichText>{cofactor.name}</RichText>{' '}
                  {cofactor.cofactorCrossReference &&
                    cofactor.cofactorCrossReference.database === 'ChEBI' &&
                    cofactor.cofactorCrossReference.id && (
                      <>
                        {' ('}
                        <Link
                          to={{
                            pathname: LocationToPath[Location.UniProtKBResults],
                            search: `query=cc_cofactor_chebi:"${cofactor.cofactorCrossReference.id}"`,
                          }}
                        >
                          UniProtKB
                        </Link>{' '}
                        |{' '}
                        <ExternalLink
                          url={externalUrls.RheaSearch(
                            cofactor.cofactorCrossReference.id
                          )}
                        >
                          Rhea
                        </ExternalLink>
                        |{' '}
                        <ExternalLink
                          url={externalUrls.ChEBI(
                            cofactor.cofactorCrossReference.id
                          )}
                        >
                          {cofactor.cofactorCrossReference.id}
                        </ExternalLink>{' '}
                        )
                      </>
                    )}
                  <UniProtKBEvidenceTag evidences={cofactor.evidences} />
                </span>
                <br />
              </Fragment>
            ))}
          {cofactorComment.note && (
            <TextView comments={cofactorComment.note.texts}>Note: </TextView>
          )}
        </section>
      ))}
    </>
  );
};

type Props = {
  data: FunctionUIModel;
  sequence?: string;
  primaryAccession: string;
  communityReferences: Reference[];
};

const FunctionSection = ({
  data,
  sequence,
  primaryAccession,
  communityReferences,
}: Props) => {
  const isSmallScreen = useSmallScreen();
  const functionRelatedReferences = communityReferences.filter(
    (reference) => reference.communityAnnotation?.function
  );

  // This state and the following useEffect are used to determine
  // if the GO-CAM tab should be displayed. This is to handle the
  // following situations:
  // 1. User always has small screen: never show GO-CAM tab
  // 2. User had small screen but increased size: show GO-CAM tab
  // 3. User had big screen but reduced it: continue to show GO-CAM tab
  const [showGoCamTab, setShowGoCamTab] = useState(!isSmallScreen);
  useEffect(() => {
    setShowGoCamTab((v) => v || !isSmallScreen);
  }, [isSmallScreen]);

  if (!hasContent(data) && !functionRelatedReferences.length) {
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

  // Remove isoform MISCELLANEOUS comments as they go in the Sequence section
  const miscellaneousComments = data.commentsData
    ?.get('MISCELLANEOUS')
    ?.filter(
      (comment) => !(comment as FreeTextComment).molecule?.includes('Isoform')
    );

  const reviewed = data.entryType === EntryType.REVIEWED;

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
        comments={miscellaneousComments as FreeTextComment[] | undefined}
        title="Miscellaneous"
      />
      {data.commentsData.get('CAUTION')?.length ? (
        <Message level="warning" heading={<h3>Caution</h3>}>
          <small>
            <FreeTextView
              comments={
                data.commentsData.get('CAUTION') as
                  | FreeTextComment[]
                  | undefined
              }
            />
          </small>
        </Message>
      ) : undefined}
      <CatalyticActivityView
        comments={
          data.commentsData.get('CATALYTIC ACTIVITY') as
            | CatalyticActivityComment[]
            | undefined
        }
        title="Catalytic activity"
        defaultHideAllReactions={isSmallScreen}
      />
      <CofactorView
        cofactors={
          data.commentsData.get('COFACTOR') as CofactorComment[] | undefined
        }
        title="Cofactor"
      />
      <FreeTextView
        comments={
          data.commentsData.get('ACTIVITY REGULATION') as
            | FreeTextComment[]
            | undefined
        }
        title="Activity regulation"
        articleId="activity_regulation"
      />
      <FreeTextView
        comments={
          data.commentsData.get('BIOTECHNOLOGY') as
            | FreeTextComment[]
            | undefined
        }
        title="Biotechnology"
        articleId="biotechnological_use"
      />
      <BioPhysicoChemicalPropertiesView
        data={data.bioPhysicoChemicalProperties}
      />
      <FreeTextView
        comments={
          data.commentsData.get('PATHWAY') as FreeTextComment[] | undefined
        }
        title="Pathway"
        articleId="pathway"
      />
      <FeaturesView
        primaryAccession={primaryAccession}
        features={data.featuresData}
        sequence={sequence}
      />
      {
        // If no GO terms then no GO-CAM models. From Antonia Lock:
        // "I assume that any go cams that we display, would also be integrated in the go releases, otherwise I would question the quality of the model"
        !!data.goTerms?.size && (
          <ErrorBoundary>
            <Tabs bordered className={helper['padding-top-small']}>
              <Tab title="GO annotations">
                <Suspense fallback={<Loader />}>
                  <GoRibbon
                    primaryAccession={primaryAccession}
                    goTerms={data.goTerms}
                    geneNamesData={data.geneNamesData}
                    organismData={data.organismData}
                  />
                </Suspense>
              </Tab>
              <Tab
                disabled={!reviewed}
                title={
                  showGoCamTab ? (
                    <span
                      title={
                        reviewed
                          ? 'GO-CAM models from the Gene Ontology knowledgebase may be available for this entry.'
                          : 'GO-CAM models are only available for reviewed entries.'
                      }
                    >
                      GO-CAM models<Chip compact>New</Chip>
                    </span>
                  ) : null
                }
              >
                {showGoCamTab ? (
                  <Suspense fallback={<Loader />}>
                    <GoCam primaryAccession={primaryAccession} />
                  </Suspense>
                ) : null}
              </Tab>
            </Tabs>
          </ErrorBoundary>
        )
      }
      <KeywordView keywords={data.keywordData} />
      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      <CommunityCuration
        accession={primaryAccession}
        section={EntrySection.Function}
        communityReferences={functionRelatedReferences}
      />
    </Card>
  );
};

export default memo(FunctionSection);
