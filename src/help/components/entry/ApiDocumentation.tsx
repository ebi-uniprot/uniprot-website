import { Tab, Tabs } from 'franklin-sites';
import { useEffect } from 'react';
import { generatePath, Link, useMatch, useNavigate } from 'react-router';

import { Location, LocationToPath } from '../../../app/config/urls';
import { apiDocsDefinitionToString } from '../../config/apiDocumentation';
import { ApiDocsDefinition } from '../../types/apiDocumentation';
import DocumentationTab from './ApiDocumentationTab';

const ApiDocumentation = () => {
  const navigate = useNavigate();
  const match = useMatch(LocationToPath[Location.Documentation]);
  const definition = match?.params.definition as ApiDocsDefinition | undefined;
  const validDefinition =
    definition && apiDocsDefinitionToString.has(definition);

  useEffect(() => {
    if (!validDefinition) {
      navigate(
        {
          pathname: generatePath(LocationToPath[Location.Documentation], {
            definition: ApiDocsDefinition.uniprotkb,
          }),
        },
        { replace: true }
      );
    }
  }, [navigate, definition, validDefinition]);

  return !validDefinition ? null : (
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
          <DocumentationTab id={id} />
        </Tab>
      ))}
    </Tabs>
  );
};

export default ApiDocumentation;
