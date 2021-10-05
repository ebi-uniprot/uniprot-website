import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card } from 'franklin-sites';
import cn from 'classnames';

import HTMLHead from '../../../../shared/components/HTMLHead';
import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import TemplateEntries from './TemplateEntries';
import { MapToDropdown } from '../../../../shared/components/MapTo';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import apiUrls from '../../../../shared/config/apiUrls';

import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import { UniRuleAPIModel } from '../../adapters/uniRuleConverter';

import helper from '../../../../shared/styles/helper.module.scss';
import entryPageStyles from '../../../shared/styles/entry-page.module.scss';

const UniRuleEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const { data, loading, error, status, progress, isStale } =
    useDataApiWithStale<UniRuleAPIModel>(
      apiUrls.entry(accession, Namespace.unirule)
    );

  if (error || !accession || (!loading && !data)) {
    return <ErrorHandler status={status} />;
  }

  if (!data) {
    return <Loader progress={progress} />;
  }

  return (
    <SingleColumnLayout>
      <HTMLHead
        title={[data.uniRuleId, searchableNamespaceLabels[Namespace.unirule]]}
      />
      {/* Here we don't want to use the full label atm */}
      <h1 className="big">
        {searchableNamespaceLabels[Namespace.unirule]} - {data.uniRuleId}
      </h1>
      <Card className={cn(entryPageStyles.card, { [helper.stale]: isStale })}>
        <div className="button-group">
          <MapToDropdown
            statistics={data.statistics}
            accession={data.information.oldRuleNum || data.uniRuleId}
          />
        </div>
        <TemplateEntries entries={data.information.uniProtAccessions} />
      </Card>
    </SingleColumnLayout>
  );
};

export default UniRuleEntry;
