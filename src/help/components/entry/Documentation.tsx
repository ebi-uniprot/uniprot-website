import { useCallback, useEffect, useMemo, useState } from 'react';
import { generatePath, useHistory, useRouteMatch } from 'react-router-dom';
import { Location as HistoryLocation } from 'history';
import { Card, Loader } from 'franklin-sites';
import SwaggerUI from 'swagger-ui-react';
import { frame } from 'timing-functions';
import { OpenAPIV3 } from 'openapi-types';

import HTMLHead from '../../../shared/components/HTMLHead';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import InPageNav from '../../../shared/components/InPageNav';

import useDataApi from '../../../shared/hooks/useDataApi';

import { LocationToPath, Location } from '../../../app/config/urls';
import { apiDocsDefinitionToString } from '../../config/apiDocumentation';
import apiUrls from '../../config/apiUrls';

import 'swagger-ui-react/swagger-ui.css';
import styles from './styles/api-documentation.module.scss';

import { ApiDocsDefinition } from '../../types/apiDocumentation';

const getIdToOperation = (paths: OpenAPIV3.PathItemObject) =>
  new Map(
    Object.entries(paths).flatMap(([path, methods]) =>
      Object.values(methods).map((method) => {
        const tag = method.tags?.[0];
        const operationId = method.operationId;
        return [
          `operations-${tag.replaceAll(' ', '_')}-${operationId}`,
          {
            path,
            tag,
            operationId,
          },
        ];
      })
    )
  );

const OperationTag = ({ tagObj, children }: any) => {
  const tagDetails = tagObj.get('tagDetails');
  return (
    <div className={styles['operation-tag']}>
      <h1 className="medium">{tagDetails.get('name')}</h1>
      <p>{tagDetails.get('description')}</p>
      <hr />
      {children}
    </div>
  );
};

const AugmentingLayout = ({ getComponent, dispatch, spec: getSpec }: any) => {
  const history = useHistory();
  const BaseLayout = getComponent('BaseLayout', true);
  const spec = getSpec();
  const idToOperation = useMemo(
    () => getIdToOperation(spec.get('json').get('paths').toJSON()),
    [spec]
  );

  const openOperationAtLocation = useCallback(
    (location: HistoryLocation) => {
      const operation = idToOperation.get(location.hash.replace('#', ''));
      if (operation?.tag && operation?.operationId) {
        dispatch({
          type: 'layout_show',
          payload: {
            thing: ['operations', operation.tag, operation.operationId],
            shown: true,
          },
        });
      }
    },
    [spec]
  );

  useEffect(() => openOperationAtLocation(history.location), []);
  useEffect(() => {
    const unlisten = history.listen((location) =>
      frame().then(() => openOperationAtLocation(location))
    );
    return unlisten;
  }, [history]);

  return (
    <SidebarLayout sidebar={<Sidebar />}>
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

const Sidebar = () => {
  const history = useHistory();
  const match = useRouteMatch<{ definition: ApiDocsDefinition }>(
    LocationToPath[Location.Documentation]
  );
  const definition = match?.params.definition;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const definition = e.target.value;
    history.push(
      generatePath(LocationToPath[Location.Documentation], {
        definition,
      })
    );
  };

  // It is possible to get this from the spec file but the order is different
  // from what is actually rendered by swagger-ui-react
  const sections = Array.from(document.querySelectorAll('.opblock')).map(
    (el) => ({
      id: el.id,
      label: el.querySelector('.opblock-summary-path')?.textContent || el.id,
    })
  );
  return (
    <div className={styles.sidebar}>
      <fieldset>
        <label htmlFor="definition-select">
          Select a definition
          <select
            id="definition-select"
            onChange={handleChange}
            value={definition}
          >
            {Array.from(apiDocsDefinitionToString).map(([d, label]) => (
              <option key={d} value={d}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
      <hr />
      {sections.length && <InPageNav sections={sections} />}
    </div>
  );
};

const Documentation = () => {
  const history = useHistory();
  const match = useRouteMatch<{ definition: ApiDocsDefinition }>(
    LocationToPath[Location.Documentation]
  );
  const definition = match?.params.definition;
  useEffect(() => {
    if (!definition) {
      history.replace({
        pathname: generatePath(LocationToPath[Location.Documentation], {
          definition: ApiDocsDefinition.uniprotkb,
        }),
      });
    }
  }, [definition]);

  const data = useDataApi<OpenAPIV3.Document>(
    definition && apiUrls.apiDocumnentationDefinition(definition)
  );

  if (data.loading) {
    return <Loader progress={data.progress} />;
  }

  if (data.error || !data.data) {
    return <ErrorHandler status={data.status} error={data.error} fullPage />;
  }

  // useEffect(() => {
  //   if (ref.current) {
  //     SwaggerUI({
  //       plugins: [AugmentingLayoutPlugin],
  //       layout: 'AugmentingLayout',
  //       requestSnippets: {
  //         // generators: {
  //         //   curl_bash: {
  //         //     title: 'cURL (bash)',
  //         //     syntax: 'bash',
  //         //   },
  //         //   curl_powershell: {
  //         //     title: 'cURL (PowerShell)',
  //         //     syntax: 'powershell',
  //         //   },
  //         //   curl_cmd: {
  //         //     title: 'cURL (CMD)',
  //         //     syntax: 'bash',
  //         //   },
  //         //   python_requests: {
  //         //     title: 'Python (requests)',
  //         //     syntax: 'python',
  //         //   },
  //         // },
  //       },
  //     });
  //   }
  // }, []);

  return (
    definition && (
      <SwaggerUI
        spec={data.data}
        plugins={[AugmentingLayoutPlugin]}
        layout="AugmentingLayout"
      />
    )
  );
};

export default Documentation;
