import { useHistory } from 'react-router-dom';
import { Card } from 'franklin-sites';
import SwaggerUI from 'swagger-ui-react';

import HTMLHead from '../../../shared/components/HTMLHead';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';

import { LocationToPath, Location } from '../../../app/config/urls';
import { apiDocsDefinitionToString } from '../../config/apiDocumentation';

import 'swagger-ui-react/swagger-ui.css';
import styles from './styles/api-documentation.module.scss';

import uniProtKBOpenAPI from './uniprotkb-open-api.json';

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
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const definition = e.target.value;
    history.push(`${LocationToPath[Location.Documentation]}/${definition}`);
  };

  return (
    <div className={styles.sidebar}>
      <fieldset>
        <label htmlFor="definition-select">
          Select a definition
          <select id="definition-select" onChange={handleChange}>
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
  // const ref = useRef<HTMLDivElement>(null);

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
          <SwaggerUI spec={uniProtKBOpenAPI} plugins={[HidePlugin]} />
        </ErrorBoundary>
      </Card>
    </SidebarLayout>
  );
};

export default Documentation;
