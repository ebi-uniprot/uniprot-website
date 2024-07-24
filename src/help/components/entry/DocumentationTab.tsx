import { useCallback, useEffect, useMemo } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Location as HistoryLocation } from 'history';
import { Card, Loader } from 'franklin-sites';
import SwaggerUI from 'swagger-ui-react';
import { frame } from 'timing-functions';
// Don't know why I need to do this as it's a type
// eslint-disable-next-line import/no-extraneous-dependencies
import { OpenAPIV3 } from 'openapi-types';

import HTMLHead from '../../../shared/components/HTMLHead';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import InPageNav from '../../../shared/components/InPageNav';

import useDataApi from '../../../shared/hooks/useDataApi';

import { LocationToPath, Location } from '../../../app/config/urls';
import apiUrls from '../../config/apiUrls';

import { ApiDocsDefinition } from '../../types/apiDocumentation';

import 'swagger-ui-react/swagger-ui.css';
import styles from './styles/api-documentation.module.scss';

const tagNameToId = (name: string) => name.replaceAll(' ', '_');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OperationTag = ({ tagObj, children }: any) => {
  const tagDetails = tagObj.get('tagDetails');
  return (
    <div className={styles['operation-tag']}>
      <h1 id={tagNameToId(tagDetails.get('name'))} className="medium">
        {tagDetails.get('name')}
      </h1>
      <p>{tagDetails.get('description')}</p>
      <hr />
      {children}
    </div>
  );
};

const getIdToOperation = (paths: OpenAPIV3.PathItemObject) =>
  new Map(
    Object.entries(paths).flatMap(([path, methods]) =>
      Object.values(methods).map((method) => {
        const tag = method.tags?.[0];
        const { operationId } = method;
        const id = `operations-${tag.replaceAll(' ', '_')}-${operationId}`;
        return [id, { path, tag, operationId }];
      })
    )
  );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLayoutAction = (operation: any, shown: any) => ({
  type: 'layout_show',
  payload: {
    thing: ['operations', operation.tag, operation.operationId],
    shown,
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AugmentingLayout = ({ getComponent, dispatch, spec: getSpec }: any) => {
  const history = useHistory();
  const BaseLayout = getComponent('BaseLayout', true);
  const spec = getSpec().get('json');
  const idToOperation = useMemo(
    () => getIdToOperation(spec.get('paths').toJSON()),
    [spec]
  );

  const [tagIds, sections] = useMemo(() => {
    const sections = [];
    const tagIds = new Set<string>();
    for (const tag of spec.get('tags')) {
      const tagName = tag.get('name');
      const tagId = tagNameToId(tagName);
      tagIds.add(tagId);
      sections.push({
        id: tagId,
        label: tagName,
      });
      for (const [id, operation] of idToOperation) {
        if (operation.tag === tagName) {
          sections.push({
            id,
            label: (
              <span className={styles['section-path']}>{operation.path}</span>
            ),
          });
        }
      }
    }
    return [tagIds, sections];
  }, [idToOperation, spec]);
  const openOperationAtLocation = useCallback(
    (location: HistoryLocation) => {
      const id = location.hash.replace('#', '');
      if (tagIds.has(id)) {
        for (const operation of idToOperation.values()) {
          dispatch(getLayoutAction(operation, false));
        }
      } else {
        const operation = idToOperation.get(id);
        if (operation?.tag && operation?.operationId) {
          dispatch(getLayoutAction(operation, true));
        }
      }
    },
    [dispatch, idToOperation, tagIds]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => openOperationAtLocation(history.location), []);
  useEffect(() => {
    const unlisten = history.listen((location) =>
      frame().then(() => openOperationAtLocation(location))
    );
    return unlisten;
  }, [history, openOperationAtLocation]);

  return (
    <SidebarLayout
      sidebar={
        <div className={styles.sidebar}>
          <InPageNav sections={sections} />
        </div>
      }
    >
      <HTMLHead title="UniProt website API documentation">
        <meta name="robots" content="noindex" />
      </HTMLHead>
      <Card className={styles.content}>
        <ErrorBoundary>
          <BaseLayout />
        </ErrorBoundary>
      </Card>
    </SidebarLayout>
  );
};

const AugmentingLayoutPlugin = () => ({
  components: {
    AugmentingLayout,
    Schemes: () => null,
    InfoContainer: () => null,
    ServersContainer: () => null,
    OperationTag,
  },
});

const DocumentationTab = () => {
  const match = useRouteMatch<{ definition: ApiDocsDefinition }>(
    LocationToPath[Location.Documentation]
  );
  const definition = match?.params.definition;

  const data = useDataApi<OpenAPIV3.Document>(
    definition && apiUrls.apiDocumnentationDefinition(definition)
  );

  if (data.loading) {
    return <Loader progress={data.progress} />;
  }

  if (data.error || !data.data) {
    return <ErrorHandler status={data.status} error={data.error} fullPage />;
  }

  // requestSnippets: {
  // generators: {
  //   curl_bash: {
  //     title: 'cURL (bash)',
  //     syntax: 'bash',
  //   },
  //   curl_powershell: {
  //     title: 'cURL (PowerShell)',
  //     syntax: 'powershell',
  //   },
  //   curl_cmd: {
  //     title: 'cURL (CMD)',
  //     syntax: 'bash',
  //   },
  //   python_requests: {
  //     title: 'Python (requests)',
  //     syntax: 'python',
  //   },
  // },

  return !definition ? null : (
    <SwaggerUI
      spec={data.data}
      plugins={[AugmentingLayoutPlugin]}
      layout="AugmentingLayout"
    />
  );
};

export default DocumentationTab;
