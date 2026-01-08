import { ExpandableList, InfoList } from 'franklin-sites';
import { type FC, Fragment } from 'react';

import { type NamesAndTaxonomyUIModel } from '../../adapters/namesAndTaxonomyConverter';

const AccessionsView: FC<
  React.PropsWithChildren<{ data: NamesAndTaxonomyUIModel }>
> = ({ data }) => {
  const secondaryAccessions = data.secondaryAccessions?.map((accession) => (
    <Fragment key={accession}>{accession}</Fragment>
  ));
  return (
    <InfoList
      infoData={[
        {
          title: `Primary accession`,
          content: data.primaryAccession,
        },
        {
          title: `Secondary accessions`,
          content: secondaryAccessions && (
            <ExpandableList descriptionString="accessions">
              {secondaryAccessions}
            </ExpandableList>
          ),
        },
      ]}
    />
  );
};
export default AccessionsView;
