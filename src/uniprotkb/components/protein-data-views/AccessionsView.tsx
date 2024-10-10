import { Fragment, FC } from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';

import { NamesAndTaxonomyUIModel } from '../../adapters/namesAndTaxonomyConverter';

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
