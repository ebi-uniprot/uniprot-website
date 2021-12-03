import { Loader } from 'franklin-sites';

import useCustomElement from '../../../shared/hooks/useCustomElement';

const StructureView = ({ primaryAccession }: { primaryAccession: string }) => {
  const structureElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-uniprot" */ 'protvista-uniprot'
      ).then((module) => ({ default: module.ProtvistaUniprotStructure })),
    'protvista-uniprot-structure'
  );

  if (!structureElement.defined) {
    return <Loader />;
  }
  return <protvista-uniprot-structure accession={primaryAccession} />;
};

export default StructureView;
