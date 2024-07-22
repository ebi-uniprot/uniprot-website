import { Tabs, Tab } from 'franklin-sites';
import { useEffect } from 'react';
import {
  generatePath,
  Link,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

import DocumentationTab from './DocumentationTab';

import { LocationToPath, Location } from '../../../app/config/urls';
import { apiDocsDefinitionToString } from '../../config/apiDocumentation';

import { ApiDocsDefinition } from '../../types/apiDocumentation';

import 'swagger-ui-react/swagger-ui.css';

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
  }, [definition, history]);
  return (
    <Tabs active={definition}>
      {Array.from(apiDocsDefinitionToString).map(([id, label]) => (
        <Tab
          title={
            <Link
              to={generatePath(LocationToPath[Location.Documentation], {
                definition: id,
              })}
            >
              {label}
            </Link>
          }
          id={id}
          key={id}
        >
          <DocumentationTab />
        </Tab>
      ))}
    </Tabs>
  );
};

export default Documentation;
