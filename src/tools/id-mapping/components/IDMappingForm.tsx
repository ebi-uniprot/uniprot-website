import { PageIntro } from 'franklin-sites';

import infoMappings from '../../../shared/config/InfoMappings';

import { JobTypes } from '../../types/toolsJobTypes';

const IDMappingForm = () => {
  const { name, links, info } = infoMappings[JobTypes.ID_MAPPING];
  return (
    <>
      <PageIntro title={name} links={links}>
        {info}
      </PageIntro>
    </>
  );
};

export default IDMappingForm;
