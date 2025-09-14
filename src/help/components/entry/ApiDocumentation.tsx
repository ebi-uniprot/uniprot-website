import { Tab, Tabs } from 'franklin-sites';
import { generatePath, Link, Navigate, useParams } from 'react-router';

import { Location, LocationToPath } from '../../../app/config/urls';
import { apiDocsDefinitionToString } from '../../config/apiDocumentation';
import { ApiDocsDefinition } from '../../types/apiDocumentation';
import DocumentationTab from './ApiDocumentationTab';

const ApiDocumentation = () => {
  const { definition } = useParams();
  const validDefinition =
    definition &&
    apiDocsDefinitionToString.has(definition as ApiDocsDefinition);

  if (!validDefinition) {
    return (
      <Navigate
        to={generatePath(LocationToPath[Location.Documentation], {
          definition: ApiDocsDefinition.uniprotkb,
        })}
        replace
      />
    );
  }

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
