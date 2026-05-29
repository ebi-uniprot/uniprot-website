import customRender from '../../../../shared/__test-helpers__/customRender';
import UniProtKBFeaturesView from '../UniProtKBFeaturesView';
import FeaturesUIData from './__mocks__/featuresUIData';

type CapturedFeaturesViewProps = {
  noLinkToFullView?: boolean;
  columns?: Array<{ id: string }>;
};
let capturedProps: CapturedFeaturesViewProps = {};

jest.mock('../../../../shared/components/views/FeaturesView', () => ({
  __esModule: true,
  default: (props: CapturedFeaturesViewProps) => {
    capturedProps = props;
    return null;
  },
}));

describe('UniProtKBFeaturesView component', () => {
  beforeEach(() => {
    capturedProps = {};
  });

  it('should render without crashing', () => {
    const { asFragment } = customRender(
      <UniProtKBFeaturesView
        primaryAccession="P05067"
        features={FeaturesUIData}
        sequence="ASDASDASASDASDASDSASD"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('keeps the full-view link enabled by default', () => {
    customRender(
      <UniProtKBFeaturesView
        primaryAccession="P05067"
        features={FeaturesUIData}
        sequence="ASDASDASASDASDASDSASD"
      />
    );
    expect(capturedProps.noLinkToFullView).toBe(false);
  });

  // Regression: a UniParc sub-entry reuses this view but its accession is
  // synthetic, so the accession-keyed affordances must be suppressed —
  // otherwise the "full feature viewer" link is a dead /uniprotkb/... link and
  // the per-feature BLAST/basket tools act on a non-existent accession.
  it('suppresses the full-view link and tools column when isUniProtKBAccession is false', () => {
    customRender(
      <UniProtKBFeaturesView
        primaryAccession="UPI000002A2F6-9606"
        features={FeaturesUIData}
        sequence="ASDASDASASDASDASDSASD"
        isUniProtKBAccession={false}
      />
    );
    expect(capturedProps.noLinkToFullView).toBe(true);
    expect(capturedProps.columns?.some((column) => column.id === 'tools')).toBe(
      false
    );
  });
});
