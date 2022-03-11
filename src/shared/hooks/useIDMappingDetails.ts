import { useContext } from 'react';

import { IDMappingDetailsContext } from '../contexts/IDMappingDetails';

import * as logging from '../utils/logging';

const useIDMappingDetails = () => {
  const context = useContext(IDMappingDetailsContext);
  if (context === undefined) {
    logging.error(
      'useIDMappingDetails must be used within a DatabaseInfoMapsProvider'
    );
  }
  return context;
};

export default useIDMappingDetails;
