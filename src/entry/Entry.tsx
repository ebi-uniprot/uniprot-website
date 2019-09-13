import React, { Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Card, InPageNav, DownloadIcon, Loader } from 'franklin-sites';
import useDataApi from '../utils/useDataApi';
import UniProtKBEntryConfig from '../view/uniprotkb/UniProtEntryConfig';
import apiUrls from '../utils/apiUrls';
import { ProteinOverview } from '../view/uniprotkb/components/ProteinOverviewView';
import uniProtKbConverter, {
  UniProtkbUIModel,
} from '../model/uniprotkb/UniProtkbConverter';
import hasContent from '../model/utils/utils';
import SideBarLayout from '../layout/SideBarLayout';
import UniProtTitle from '../view/uniprotkb/components/UniProtTitle';

type MatchParams = {
  accession: string;
};

type EntryProps = RouteComponentProps<MatchParams>;

const Entry: React.FC<EntryProps> = ({ match }) => {
  const url = apiUrls.entry(match.params.accession);
  const entryData = useDataApi(url);
  if (Object.keys(entryData).length === 0) {
    return <Loader />;
  }

  const transformedData: UniProtkbUIModel = uniProtKbConverter(entryData);

  const sections = UniProtKBEntryConfig.map(section => {
    return {
      label: section.name,
      id: section.name,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      disabled: !hasContent((transformedData as any)[section.name]),
    };
  });

  return (
    <Fragment>
      <SideBarLayout
        sidebar={<InPageNav sections={sections} />}
        content={
          <Fragment>
            <div className="button-group">
              <button type="button" className="button link-button">
                Blast
              </button>
              <button type="button" className="button link-button">
                Align
              </button>
              <button type="button" className="button link-button">
                <DownloadIcon />
                Download
              </button>
              <button type="button" className="button link-button">
                Add
              </button>
            </div>
            <Card
              title={
                <UniProtTitle
                  primaryAccession={transformedData.primaryAccession}
                  entryType={transformedData.entryType}
                  uniProtId={transformedData.uniProtId}
                />
              }
            >
              <ProteinOverview transformedData={transformedData} />
            </Card>
            {UniProtKBEntryConfig.map(({ sectionContent }) =>
              sectionContent(transformedData)
            )}
          </Fragment>
        }
      />

      {/* <Card title="Structure">
        <FeaturesView
          data={entryData}
          types={[FeatureTypes.HELIX, FeatureTypes.TURN, FeatureTypes.STRAND]}
        />
      </Card> */}
    </Fragment>
  );
};

export default withRouter(Entry);
