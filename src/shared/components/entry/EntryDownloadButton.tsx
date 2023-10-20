import { Button, DownloadIcon } from 'franklin-sites';
import lazy from '../../utils/lazy';

const EntryDownloadComponent = lazy(
  /* istanbul ignore next */
  () => import(/* webpackChunkName: "entry-download" */ './EntryDownload')
);

const EntryDownloadButton = ({
  handleToggle,
}: {
  handleToggle: () => void;
}) => (
  <Button
    variant="tertiary"
    onPointerOver={EntryDownloadComponent.preload}
    onFocus={EntryDownloadComponent.preload}
    onClick={handleToggle}
  >
    <DownloadIcon />
    Download
  </Button>
);

export default EntryDownloadButton;
