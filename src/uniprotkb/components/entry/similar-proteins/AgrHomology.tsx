import { Tab, Tabs } from 'franklin-sites';

import { XrefUIModel } from '../../../utils/xrefUtils';
import AgrOrthology from './AgrOrthology';
import AgrParalogy from './AgrParalogy';

export const getAgrId = (xrefs: XrefUIModel[]) => {
  const hgncXref = xrefs[0].databases.find((xref) => xref.database === 'AGR');
  return hgncXref?.xrefs.find((xref) => xref.database === 'AGR');
};

type Props = {
  xrefs: XrefUIModel[];
};

const AgrHomology = ({ xrefs }: Props) => {
  const agrXref = getAgrId(xrefs);

  if (!agrXref?.id) {
    return 'No Orthology or Paralogy data is available from the Alliance of Genome Resources.';
  }

  return (
    <Tabs bordered>
      <Tab id="orthologs" title="Orthologs" key="orthologs">
        <AgrOrthology agrId={agrXref.id} />
      </Tab>
      <Tab id="paralogs" title="Paralogs" key="paralogs">
        <AgrParalogy agrId={agrXref.id} />
      </Tab>
    </Tabs>
  );
};

export default AgrHomology;
