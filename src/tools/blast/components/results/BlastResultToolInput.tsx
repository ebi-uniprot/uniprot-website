import React, { FC } from 'react';
import { Loader, CodeBlock, InfoList } from 'franklin-sites';

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

  const infoData = Object.entries(data).map(([key, value]) => {
    return {
      title: key,
      content: <CodeBlock lightMode>{value}</CodeBlock>,
    };
  });

  return (
    <section>
      <p>
        The job with UUID {id} has been submitted with these raw input values:
      </p>
      <InfoList infoData={infoData} />
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
