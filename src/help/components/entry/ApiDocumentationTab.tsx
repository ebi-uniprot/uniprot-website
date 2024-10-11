import { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Location as HistoryLocation } from 'history';
import { Card, Loader } from 'franklin-sites';
import SwaggerUI from 'swagger-ui-react';
import { frame } from 'timing-functions';
import type { OpenAPIV3 } from 'openapi-types';

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
  SCHEMAS_ID,
  tagNameToId,
} from '../../utils/apiDocumentation';
import { requestSnippets, snippetPlugins } from '../../utils/apiSnippets';

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
  wrapComponents: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Models: (Original) => (props) => (
      <div id={SCHEMAS_ID}>
        <Original {...props} />
      </div>
    ),
  },
});

const MAX_ITEMS_FOR_STREAM = 25;

/**
 * Loading from 'stream' directly in the browser can be a problem
 * First: check from HEAD on 'search' how many items will be returned,
 * If <= 25 (default search page size): let the query go through
 * Else: Display message instead, but show return headers and status code
 */
const HandleTryItOutStreamPlugin = () => ({
  afterLoad() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const originalFetch = this.fn.fetch;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wrappedFetch = async (request: any, ...rest: unknown[]) => {
      const { url } = request;
      if (new URL(url).pathname.includes('stream')) {
        // Do a pre-check before to see if the browser can handle it
        // Copy the initial request, but change the method
        const headRequest = {
          ...request,
          url: url.replace('/stream', '/search'),
          method: 'HEAD',
        };
        const headResponse = await originalFetch(headRequest, ...rest);
        if (headResponse.ok) {
          // Check how many items it will contain
          const totalHeader = headResponse.headers['x-total-results'];
          if (totalHeader && +totalHeader > MAX_ITEMS_FOR_STREAM) {
            // If too many, modify for Swagger to display message
            headResponse.text = `This request is valid but was not made because it returns too many entries to display in this page (${totalHeader}).`;
            // Headers will be displayed, so remove headers that are in the
            // search endpoint but that would not be in the stream endpoint
            delete headResponse.headers['x-total-results'];
            delete headResponse.headers.link;
            delete headResponse.headers['content-length'];
            return headResponse;
          }
        }
      }
      // Otherwise, just execute and return the original fetch
      const response = await originalFetch(request, ...rest);
      return response;
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.fn.fetch = wrappedFetch;
  },
});

const plugins = [
  AugmentingLayoutPlugin,
  HandleTryItOutStreamPlugin,
  ...snippetPlugins,
];

type Props = {
  id: ApiDocsDefinition;
};

const ApiDocumentationTab = ({ id }: Props) => {
  const containerRef = useRef(null);
  const data = useDataApi<OpenAPIV3.Document>(
    apiUrls.apiDocumentationDefinition(id)
  );

  if (data.loading) {
    return <Loader progress={data.progress} />;
  }

  if (data.error || !data.data) {
    return <ErrorHandler status={data.status} error={data.error} fullPage />;
  }

  return (
    <div ref={containerRef}>
      <SwaggerUI
        spec={data.data}
        plugins={plugins}
        layout="AugmentingLayout"
        requestSnippetsEnabled
        requestSnippets={requestSnippets}
      />
    </div>
  );
};

export default ApiDocumentationTab;
