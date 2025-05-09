import { Card } from 'franklin-sites';
import { lazy, memo, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SetRequired } from 'type-fest/source/set-required';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import ExternalLink from '../../../shared/components/ExternalLink';
import LazyComponent from '../../../shared/components/LazyComponent';
import TableFromData, {
  TableFromDataColumn,
} from '../../../shared/components/table/TableFromData';
import externalUrls, {
  getIntActQueryUrl,
} from '../../../shared/config/externalUrls';
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import { Xref } from '../../../shared/types/apiModel';
import { Namespace } from '../../../shared/types/namespaces';
import { stringifyQuery } from '../../../shared/utils/url';
import { hasContent } from '../../../shared/utils/utils';
import { UIModel } from '../../adapters/sectionConverter';
import {
  FreeTextComment,
  Interaction,
  InteractionComment,
} from '../../types/commentTypes';
import EntrySection from '../../types/entrySection';
import { getEntrySectionNameAndId } from '../../utils/entrySection';
import FreeTextView from '../protein-data-views/FreeTextView';
import XRefView from '../protein-data-views/XRefView';
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

const getRowId = (data: Interaction) =>
  `${data.interactantOne.intActId}${data.interactantTwo.intActId}`;

const columns: TableFromDataColumn<Interaction>[] = [
  {
    id: 'type',
    label: 'Type',
    render: (data) => (data.organismDiffer ? 'XENO' : 'BINARY'), // NOTE: Add 'SELF'
    filter: (data, input) =>
      (data.organismDiffer ? 'XENO' : 'BINARY') === input,
  },
  {
    id: 'entry-1',
    label: 'Entry 1',
    render: (data) =>
      data.interactantOne.uniProtKBAccession ? (
        <Link
          to={getEntryPath(
            Namespace.uniprotkb,
            data.interactantOne.uniProtKBAccession
          )}
        >
          {data.interactantOne.geneName} {data.interactantOne.chainId}{' '}
          {data.interactantOne.uniProtKBAccession}
        </Link>
      ) : (
        <>
          {data.interactantOne.geneName} {data.interactantOne.chainId}
        </>
      ),
    getOption: (data) => data.interactantOne.uniProtKBAccession || 'Other',
    filter: (data, input) =>
      (data.interactantOne.uniProtKBAccession || 'Other') === input,
  },
  {
    id: 'entry-2',
    label: 'Entry 2',
    render: (data) =>
      data.interactantTwo.uniProtKBAccession ? (
        <Link
          to={getEntryPath(
            Namespace.uniprotkb,
            data.interactantTwo.uniProtKBAccession
          )}
        >
          {data.interactantTwo.geneName} {data.interactantTwo.chainId}{' '}
          {data.interactantTwo.uniProtKBAccession}
        </Link>
      ) : (
        <>
          {data.interactantTwo.geneName} {data.interactantTwo.chainId}
        </>
      ),
  },
  {
    id: 'number-of-experiments',
    label: 'Number of experiments',
    render: (data) => data.numberOfExperiments,
  },
  {
    id: 'intact',
    label: <span translate="no">IntAct</span>,
    render: (data) => (
      <ExternalLink
        url={getIntActQueryUrl(
          data.interactantOne.intActId,
          data.interactantTwo.intActId,
          data.interactantOne.uniProtKBAccession
        )}
      >
        {data.interactantOne.intActId}, {data.interactantTwo.intActId}
      </ExternalLink>
    ),
  },
];

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

  const complexId = viewerID || Array.from(complexPortalXrefs.keys())[0];

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
          <TableFromData
            columns={columns}
            data={tableData}
            getRowId={getRowId}
            noTranslateBody
          />
        </>
      ) : null}

      {complexPortalXrefs.size > 0 && !isSmallScreen && (
        <>
          <h3 data-article-id="complex_viewer">Complex viewer</h3>
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
        </>
      )}
      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default memo(InteractionSection);
