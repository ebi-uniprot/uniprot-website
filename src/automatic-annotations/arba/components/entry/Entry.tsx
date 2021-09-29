import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card } from 'franklin-sites';
import cn from 'classnames';

import HTMLHead from '../../../../shared/components/HTMLHead';
import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import { MapToDropdown } from '../../../../shared/components/MapTo';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import apiUrls from '../../../../shared/config/apiUrls';

import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import { ARBAAPIModel } from '../../adapters/arbaConverter';

import helper from '../../../../shared/styles/helper.module.scss';
import entryPageStyles from '../../../shared/styles/entry-page.module.scss';

const UniRuleEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const { data, loading, error, status, progress, isStale } =
    useDataApiWithStale<ARBAAPIModel>(apiUrls.entry(accession, Namespace.arba));

  if (error || !accession || (!loading && !data)) {
    return <ErrorHandler status={status} />;
  }

  if (!data) {
    return <Loader progress={progress} />;
  }

  return (
    <SingleColumnLayout>
      <HTMLHead
        title={[data.uniRuleId, searchableNamespaceLabels[Namespace.arba]]}
      />
      {/* Here we don't want to use the full label atm */}
      <h1 className="big">
        {searchableNamespaceLabels[Namespace.arba]} - {data.uniRuleId}
      </h1>
      <Card className={cn(entryPageStyles.card, { [helper.stale]: isStale })}>
        <div className="button-group">
          <MapToDropdown
            statistics={data.statistics}
            accession={data.uniRuleId}
          />
        </div>
      </Card>
    </SingleColumnLayout>
  );
};

export default UniRuleEntry;
