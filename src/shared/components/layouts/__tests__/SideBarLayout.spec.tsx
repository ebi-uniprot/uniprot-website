import customRender from '../../../__test-helpers__/customRender';
import {
  useEarlySidebarCollapseScreen,
  useSmallScreen,
} from '../../../hooks/useMatchMedia';
import { SidebarLayout } from '../SideBarLayout';

jest.mock('../../../hooks/useMatchMedia', () => ({
  ...jest.requireActual('../../../hooks/useMatchMedia'),
  useSmallScreen: jest.fn(() => false),
  useEarlySidebarCollapseScreen: jest.fn(() => false),
}));

jest.mock('../UniProtFooter', () => ({
  __esModule: true,
  default: () => '{{ UniProtFooter }}',
}));

const useSmallScreenMock = useSmallScreen as jest.Mock;
const useEarlySidebarMock = useEarlySidebarCollapseScreen as jest.Mock;

const Sidebar = () => <nav>{'{{ Sidebar }}'}</nav>;

const renderLayout = (
  props: Partial<React.ComponentProps<typeof SidebarLayout>> = {}
) =>
  customRender(
    <SidebarLayout sidebar={<Sidebar />} {...props}>
      {'{{ Main Content }}'}
    </SidebarLayout>
  );

describe('SidebarLayout', () => {
  beforeEach(() => {
    useSmallScreenMock.mockReturnValue(false);
    useEarlySidebarMock.mockReturnValue(false);
  });

  it('renders the sidebar at typical desktop widths', () => {
    const { queryByText } = renderLayout();
    expect(queryByText('{{ Sidebar }}')).toBeInTheDocument();
    expect(queryByText('{{ Main Content }}')).toBeInTheDocument();
  });

  it('hides the sidebar below the Franklin small breakpoint', () => {
    useSmallScreenMock.mockReturnValue(true);
    const { queryByText } = renderLayout();
    expect(queryByText('{{ Sidebar }}')).not.toBeInTheDocument();
    expect(queryByText('{{ Main Content }}')).toBeInTheDocument();
  });

  describe('collapseSidebarEarly', () => {
    it('hides the sidebar at the early-collapse breakpoint when opted in', () => {
      // Between small (640px) and early-collapse (768px): small=false,
      // early=true. Without the opt-in, the sidebar would still show.
      useSmallScreenMock.mockReturnValue(false);
      useEarlySidebarMock.mockReturnValue(true);
      const { queryByText } = renderLayout({ collapseSidebarEarly: true });
      expect(queryByText('{{ Sidebar }}')).not.toBeInTheDocument();
    });

    it('ignores the early-collapse signal when not opted in', () => {
      useSmallScreenMock.mockReturnValue(false);
      useEarlySidebarMock.mockReturnValue(true);
      const { queryByText } = renderLayout();
      expect(queryByText('{{ Sidebar }}')).toBeInTheDocument();
    });

    it('still hides the sidebar below the small breakpoint when opted in', () => {
      useSmallScreenMock.mockReturnValue(true);
      useEarlySidebarMock.mockReturnValue(true);
      const { queryByText } = renderLayout({ collapseSidebarEarly: true });
      expect(queryByText('{{ Sidebar }}')).not.toBeInTheDocument();
    });
  });
});
