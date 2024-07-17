import { useEffect } from 'react';
import { generatePath, useHistory, useRouteMatch } from 'react-router-dom';
import { Card, Loader } from 'franklin-sites';
import SwaggerUI from 'swagger-ui-react';

import HTMLHead from '../../../shared/components/HTMLHead';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';

import useDataApi from '../../../shared/hooks/useDataApi';

import { LocationToPath, Location } from '../../../app/config/urls';
import { apiDocsDefinitionToString } from '../../config/apiDocumentation';
import apiUrls from '../../config/apiUrls';

import 'swagger-ui-react/swagger-ui.css';
import styles from './styles/api-documentation.module.scss';

import { ApiDocsDefinition } from '../../types/apiDocumentation';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

// Create the layout component
// const AugmentingLayout = (system) => {
//   console.log(system);
//   const BaseLayout = system.getComponent('BaseLayout', true);
//   return (
//     <div>
//       <h1>Custom header above Swagger-UI!</h1>
//       <BaseLayout />
//     </div>
//   );
// };

// // const InfoContainer = (system) => {
// //   // const BaseInfoContainer = system.getComponent('InfoContainer');
// //   return <h1>title</h1>;
// // };

// // Create the plugin that provides our layout component
// const AugmentingLayoutPlugin = () => ({
//   components: {
//     AugmentingLayout,
//     // InfoContainer,
//     // BaseLayout: () => <p>base layout</p>,
//   },
// });

const HidePlugin = () => ({
  components: {
    Schemes: () => null,
    InfoContainer: () => null,
    ServersContainer: () => null,
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

  const data = useDataApi(
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
    <SidebarLayout sidebar={<Sidebar />}>
      <HTMLHead title="UniProt website API documentation">
        <meta name="robots" content="noindex" />
      </HTMLHead>
      <Card className={styles.content}>
        <ErrorBoundary>
          <SwaggerUI spec={data.data} plugins={[HidePlugin]} />
        </ErrorBoundary>
      </Card>
    </SidebarLayout>
  );
};

export default Documentation;
