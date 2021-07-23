import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card } from 'franklin-sites';
import marked from 'marked';
import cn from 'classnames';

import SingleColumnLayout from '../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { help as helpURL } from '../../../shared/config/apiUrls';
import cleanText, {
  cleanTextDefaultOptions,
} from '../../../shared/utils/cleanText';

import { HelpEntryResponse } from '../../adapters/helpConverter';

import helper from '../../../shared/styles/helper.module.scss';

// TODO: probably need to play with the options here in order to make it look OK
const cleanTextOptions = {
  ...cleanTextDefaultOptions,
};

const HelpEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const { data, loading, error, status, progress, isStale } =
    useDataApiWithStale<HelpEntryResponse>(helpURL.accession(accession));

  if (loading && !data) {
    return <Loader progress={progress} />;
  }

  if (error || !data) {
    return <ErrorHandler status={status} />;
  }

  return (
    <SingleColumnLayout>
      <h1 className="big">{data.title}</h1>
      <Card className={cn({ [helper.stale]: isStale })}>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: cleanText(marked(data.content), cleanTextOptions),
          }}
        />
      </Card>
    </SingleColumnLayout>
  );
};

export default HelpEntry;
