import { Loader, Tab, Tabs } from 'franklin-sites';

import externalUrls from '../../../shared/config/externalUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { AgrOrthologs } from '../../types/agrOrthologs';
import { XrefUIModel } from '../../utils/xrefUtils';
import AgrOrthology from './AgrOrthology';

export const getAgrId = (xrefs: XrefUIModel[]) => {
  const hgncXref = xrefs[0].databases.find((xref) => xref.database === 'AGR');
  return hgncXref?.xrefs.find((xref) => xref.database === 'AGR');
};

type Props = {
  xrefs: XrefUIModel[];
};

const AgrHomology = ({ xrefs }: Props) => {
  const agrXref = getAgrId(xrefs);
  const agrOrthologsResponse = useDataApi<AgrOrthologs>(
    agrXref?.id ? externalUrls.AgrOrthologs(agrXref.id) : null
  );

  if (agrOrthologsResponse.loading) {
    return <Loader />;
  }

  const tabs = [];

  if (
    agrXref &&
    !agrOrthologsResponse.error &&
    agrOrthologsResponse?.data?.results?.length
  ) {
    tabs.push(
      <Tab id="agr-orthology" title="Orthologs" key="agr-orthology">
        <AgrOrthology
          data={agrOrthologsResponse.data.results}
          agrXref={agrXref}
        />
      </Tab>
    );
  }
  return !tabs.length ? null : (
    <div>
      <h3 data-article-id="TODO">Homology</h3>
      <Tabs bordered>{tabs}</Tabs>
    </div>
  );
};

export default AgrHomology;
