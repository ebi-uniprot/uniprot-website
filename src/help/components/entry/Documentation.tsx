import { useEffect, useRef } from 'react';
import { Card } from 'franklin-sites';
import SwaggerUI from 'swagger-ui';

import HTMLHead from '../../../shared/components/HTMLHead';
import { SingleColumnLayout } from '../../../shared/components/layouts/SingleColumnLayout';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import 'swagger-ui/dist/swagger-ui.css';
import styles from './styles/entry.module.scss';

import uniProtKBOpenAPI from './uniprotkb-open-api.json';

// Create the layout component
const AugmentingLayout = (system) => {
  console.log(system);
  const BaseLayout = system.getComponent('BaseLayout', true);
  return (
    <div>
      <h1>Custom header above Swagger-UI!</h1>
      <BaseLayout />
    </div>
  );
};

// const InfoContainer = (system) => {
//   // const BaseInfoContainer = system.getComponent('InfoContainer');
//   return <h1>title</h1>;
// };

// Create the plugin that provides our layout component
const AugmentingLayoutPlugin = () => ({
  components: {
    AugmentingLayout,
    // InfoContainer,
    // BaseLayout: () => <p>base layout</p>,
  },
});

const Documentation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      SwaggerUI({
        domNode: ref.current,
        spec: uniProtKBOpenAPI,
        plugins: [AugmentingLayoutPlugin],
        layout: 'AugmentingLayout',
        requestSnippets: {
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
        },
      });
    }
  }, []);

  return (
    <SingleColumnLayout>
      <HTMLHead title="UniProt website API documentation">
        <meta name="robots" content="noindex" />
      </HTMLHead>
      <h1>UniProt website API documentation</h1>
      <Card className={styles.content}>
        <ErrorBoundary>
          <div ref={ref} />
        </ErrorBoundary>
      </Card>
    </SingleColumnLayout>
  );
};

export default Documentation;
