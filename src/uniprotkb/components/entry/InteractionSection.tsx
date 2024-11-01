import { lazy, useMemo, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Tab, Tabs, TreeSelect } from 'franklin-sites';

import { SetRequired } from 'type-fest/source/set-required';
import ExternalLink from '../../../shared/components/ExternalLink';
import EntrySection from '../../types/entrySection';
import FreeTextView from '../protein-data-views/FreeTextView';
import XRefView from '../protein-data-views/XRefView';
import LazyComponent from '../../../shared/components/LazyComponent';
import DatatableWrapper from '../../../shared/components/views/DatatableWrapper';

import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';

import { hasContent } from '../../../shared/utils/utils';
import externalUrls, {
  getIntActQueryUrl,
} from '../../../shared/config/externalUrls';
import {
  getEntryPath,
  LocationToPath,
  Location,
} from '../../../app/config/urls';
import { getEntrySectionNameAndId } from '../../utils/entrySection';
import { stringifyQuery } from '../../../shared/utils/url';

import {
  FreeTextComment,
  Interaction,
  InteractionComment,
} from '../../types/commentTypes';
import { UIModel } from '../../adapters/sectionConverter';
import { Namespace } from '../../../shared/types/namespaces';
import { Xref } from '../../../shared/types/apiModel';

import styles from './styles/interaction-section.module.scss';

const interactionSorter = (a: Interaction, b: Interaction) => {
  // Normalise what we'll sort on
  const aOneComparer = (
    a.interactantOne.uniProtKBAccession ||
    a.interactantOne.geneName ||
    a.interactantOne.intActId
  ).toUpperCase();
  const bOneComparer = (
    b.interactantOne.uniProtKBAccession ||
    b.interactantOne.geneName ||
    b.interactantOne.intActId
  ).toUpperCase();
  // In case of interactant 2, we'll display first the gene, so we sort on that
  const aTwoComparer = (
    a.interactantTwo.geneName ||
    a.interactantTwo.uniProtKBAccession ||
    a.interactantTwo.intActId
  ).toUpperCase();
  const bTwoComparer = (
    b.interactantTwo.geneName ||
    b.interactantTwo.uniProtKBAccession ||
    b.interactantTwo.intActId
  ).toUpperCase();
  // Alphabetical order of interactant 1
  if (aOneComparer > bOneComparer) {
    // both are UniProtKB, or none
    if (
      (a.interactantOne.uniProtKBAccession &&
        b.interactantOne.uniProtKBAccession) ||
      (!a.interactantOne.uniProtKBAccession &&
        !b.interactantOne.uniProtKBAccession)
    ) {
      return 1;
    }
    // one of them isn't UniProtKB, bump up the UniProtKB one
    return a.interactantOne.uniProtKBAccession ? -1 : 1;
  }
  if (aOneComparer < bOneComparer) {
    // both are UniProtKB, or none
    if (
      (a.interactantOne.uniProtKBAccession &&
        b.interactantOne.uniProtKBAccession) ||
      (!a.interactantOne.uniProtKBAccession &&
        !b.interactantOne.uniProtKBAccession)
    ) {
      return -1;
    }
    // one of them isn't UniProtKB, bump up the UniProtKB one
    return a.interactantOne.uniProtKBAccession ? -1 : 1;
  }
  // Then, if interactant 1 are the same, alphabetical order of interactant 2
  if (aTwoComparer > bTwoComparer) {
    return 1;
  }
  if (aTwoComparer < bTwoComparer) {
    return -1;
  }
  return 0;
};

type Props = {
  data: UIModel;
  primaryAccession: string;
};

const InteractionViewer = lazy(
  /* istanbul ignore next */
  () =>
    import(/* webpackChunkName: "interaction-viewer" */ './InteractionViewer')
);

const ComplexViewer = lazy(
  /* istanbul ignore next */
  () =>
    import(
      /* webpackChunkName: "complexviewer" */ '../protein-data-views/ComplexViewer'
    )
);

const InteractionSection = ({ data, primaryAccession }: Props) => {
  const isSmallScreen = useSmallScreen();
  const tableData = useMemo(
    () =>
      Array.from(
        (
          data.commentsData.get('INTERACTION') as
            | InteractionComment[]
            | undefined
        )?.[0]?.interactions || []
      ).sort(interactionSorter),
    [data]
  );
  const complexPortalXrefs = useMemo(
    () =>
      new Map(
        data.xrefData
          .flatMap(({ databases }) =>
            databases
              .flatMap(({ xrefs }) => xrefs)
              .filter(
                (xref): xref is SetRequired<Xref, 'id'> =>
                  xref.database === 'ComplexPortal' &&
                  typeof xref.id !== 'undefined'
              )
          )
          .map((xref) => [xref.id, xref])
      ),
    [data.xrefData]
  );

  const [viewerID, setViewerID] = useState<string | null>(null);

  if (!hasContent(data)) {
    return null;
  }

  const comments = data.commentsData.get('SUBUNIT') as
    | FreeTextComment[]
    | undefined;

  const displayVizTab = complexPortalXrefs.size > 0;
  const table = (
    <table>
      <thead>
        <tr>
          <th data-filter="type">Type</th>
          <th data-filter="entry_1">Entry 1</th>
          <th>Entry 2</th>
          <th>Number of experiments</th>
          <th translate="no">Intact</th>
        </tr>
      </thead>
      <tbody translate="no">
        {tableData.map((interaction) => (
          <tr
            key={`${interaction.interactantOne.intActId}${interaction.interactantTwo.intActId}`}
          >
            <td
              data-filter="type"
              data-filter-value={interaction.organismDiffer ? 'XENO' : 'BINARY'}
            >
              {/* NOTE: Add 'SELF' */}
              {interaction.organismDiffer ? 'XENO' : 'BINARY'}
            </td>
            <td
              data-filter="entry_1"
              data-filter-value={
                interaction.interactantOne.uniProtKBAccession || 'Other'
              }
            >
              {interaction.interactantOne.uniProtKBAccession ? (
                <Link
                  to={getEntryPath(
                    Namespace.uniprotkb,
                    interaction.interactantOne.uniProtKBAccession
                  )}
                >
                  {interaction.interactantOne.geneName}{' '}
                  {interaction.interactantOne.chainId}{' '}
                  {interaction.interactantOne.uniProtKBAccession}
                </Link>
              ) : (
                <>
                  {interaction.interactantOne.geneName}{' '}
                  {interaction.interactantOne.chainId}
                </>
              )}
            </td>
            <td>
              {interaction.interactantTwo.uniProtKBAccession ? (
                <Link
                  to={getEntryPath(
                    Namespace.uniprotkb,
                    interaction.interactantTwo.uniProtKBAccession
                  )}
                >
                  {interaction.interactantTwo.geneName}{' '}
                  {interaction.interactantTwo.chainId}{' '}
                  {interaction.interactantTwo.uniProtKBAccession}
                </Link>
              ) : (
                <>
                  {interaction.interactantTwo.geneName}{' '}
                  {interaction.interactantTwo.chainId}
                </>
              )}
            </td>
            <td>{interaction.numberOfExperiments}</td>
            <td>
              <ExternalLink
                url={getIntActQueryUrl(
                  interaction.interactantOne.intActId,
                  interaction.interactantTwo.intActId,
                  interaction.interactantOne.uniProtKBAccession
                )}
              >
                {interaction.interactantOne.intActId},{' '}
                {interaction.interactantTwo.intActId}
              </ExternalLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const complexId = viewerID || Array.from(complexPortalXrefs.keys())[0];
  const complexName =
    complexPortalXrefs.get(complexId)?.properties?.EntryName || '';
  const complexString = `${complexId} ${complexName}`;

  return (
    <Card
      header={
        <h2 data-article-id="interaction_section">
          {getEntrySectionNameAndId(EntrySection.Interaction).name}
        </h2>
      }
      id={EntrySection.Interaction}
      className={styles['interaction-section']}
      data-entry-section
    >
      {comments && (
        <FreeTextView
          comments={comments}
          title="Subunit"
          articleId="subunit_structure"
        />
      )}
      {tableData.length ? (
        <>
          <h3 data-article-id="binary_interactions">Binary interactions</h3>
          <LazyComponent render={isSmallScreen ? false : undefined}>
            <InteractionViewer accession={primaryAccession} />
          </LazyComponent>
          <DatatableWrapper>{table}</DatatableWrapper>
        </>
      ) : null}

      {displayVizTab && !isSmallScreen && (
        <Tabs className={styles['visualisation-tabs']}>
          {complexPortalXrefs.size ? (
            <Tab cache title="Complex viewer">
              <div>
                <label>
                  Select complex
                  <select
                    value={complexId}
                    onChange={(e) => setViewerID(e.target.value)}
                    className={styles['id-select']}
                  >
                    {Array.from(complexPortalXrefs.values()).map(
                      ({ id, properties }) => (
                        <option value={id} key={id}>
                          {`${id} ${properties?.EntryName || ''}`}
                        </option>
                      )
                    )}
                  </select>
                </label>

                <LazyComponent>
                  <ComplexViewer complexID={complexId} />
                </LazyComponent>
                <Link
                  to={{
                    pathname: LocationToPath[Location.UniProtKBResults],
                    search: stringifyQuery({
                      query: `(xref:complexportal-${complexId})`,
                    }),
                  }}
                >
                  View interactors in UniProtKB
                </Link>
              </div>
              <ExternalLink url={externalUrls.ComplexPortal(complexId)}>
                View {complexId} in Complex Portal
              </ExternalLink>
            </Tab>
          ) : null}
        </Tabs>
      )}
      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default memo(InteractionSection);
