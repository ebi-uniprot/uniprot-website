import React, { FC } from 'react';
import { Loader, CodeBlock } from 'franklin-sites';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import { UseDataAPIState } from '../../../../shared/hooks/useDataApi';
import { PublicServerParameters } from '../../types/blastServerParameters';

type Props = {
  id: string;
  inputParamsData: Partial<UseDataAPIState<PublicServerParameters>>;
};

const BlastResultToolInput: FC<Props> = ({ id, inputParamsData }) => {
  const { loading, data, error, status } = inputParamsData;

  if (loading) return <Loader />;

  if (error || !data) return <ErrorHandler status={status} />;

  return (
    <section>
      <p>
        The job with UUID {id} has been submitted with these raw input values:
      </p>
      <ul>
        {Object.entries(data).map(([key, value]) => {
          return (
            <li key={key}>
              {key}:<br />
              <CodeBlock>{value}</CodeBlock>
            </li>
          );
        })}
      </ul>
      <p>
        You can refer to the documentation for these values on the{' '}
        <a href="https://www.ebi.ac.uk/seqdb/confluence/pages/viewpage.action?pageId=94147939#NCBIBLAST+HelpandDocumentation-RESTAPI">
          API documentation page
        </a>
      </p>
    </section>
  );
};

export default BlastResultToolInput;
