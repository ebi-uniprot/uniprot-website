import { ReactNode, useCallback, useEffect, useMemo } from 'react';
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

import {
  getIdToOperation,
  getLayoutAction,
  getTagIdsAndSections,
  tagNameToId,
} from '../../utils/apiDocumentation';

import { LocationToPath, Location } from '../../../app/config/urls';
import apiUrls from '../../config/apiUrls';

import { ApiDocsDefinition } from '../../types/apiDocumentation';

import 'swagger-ui-react/swagger-ui.css';
import styles from './styles/api-documentation.module.scss';

const OperationTag = ({
  tagObj,
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tagObj: any;
  children: ReactNode;
}) => {
  const tagDetails = tagObj.get('tagDetails');
  return (
    <div className={styles['operation-tag']}>
      <h1 id={tagNameToId(tagDetails.get('name'))} className="medium">
        {tagDetails.get('name')}
      </h1>
      {/* eslint-disable-next-line react/no-danger */}
      <p dangerouslySetInnerHTML={{ __html: tagDetails.get('description') }} />
      <hr />
      {children}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AugmentingLayout = ({ getComponent, dispatch, spec: getSpec }: any) => {
  const history = useHistory();
  const BaseLayout = getComponent('BaseLayout', true);
  const [tagIds, sections, idToOperation] = useMemo(() => {
    const spec = getSpec().get('json');
    const idToOperation = getIdToOperation(spec.get('paths').toJSON());
    return [
      ...getTagIdsAndSections(spec, idToOperation, styles['section-path']),
      idToOperation,
    ];
  }, [getSpec]);
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

  useEffect(() => {
    const unlisten = history.listen((location) =>
      frame().then(() => openOperationAtLocation(location))
    );
    openOperationAtLocation(history.location);
    return unlisten;
  }, [history, openOperationAtLocation]);

  return (
    <SidebarLayout
      className={styles.wider}
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

const ApiDocumentationTab = () => {
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

  // TODO: enable request snippets eg python. https://www.ebi.ac.uk/panda/jira/browse/TRM-31649
  // Leaving this config here in case it is useful in the future:
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

export default ApiDocumentationTab;
