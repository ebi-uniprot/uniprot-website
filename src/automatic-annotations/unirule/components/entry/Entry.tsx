import { RouteChildrenProps } from 'react-router-dom';
import { Loader } from 'franklin-sites';

import HTMLHead from '../../../../shared/components/HTMLHead';
import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import Source from './Source';
import TemplateEntries from './TemplateEntries';
import ConditionsAnnotations from '../../../shared/entry/ConditionsAnnotations';
import { MapToDropdown } from '../../../../shared/components/MapTo';

import useDataApi from '../../../../shared/hooks/useDataApi';

import apiUrls from '../../../../shared/config/apiUrls';

import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import { UniRuleAPIModel } from '../../adapters/uniRuleConverter';

const UniRuleEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const { data, loading, error, status, progress } =
    useDataApi<UniRuleAPIModel>(apiUrls.entry(accession, Namespace.unirule));

  if (loading) {
    return <Loader progress={progress} />;
  }

  if (error || !accession || !data) {
    return <ErrorHandler status={status} />;
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
      <div className="button-group">
        <MapToDropdown
          statistics={data.statistics}
          accession={data.information.oldRuleNum || data.uniRuleId}
        />
      </div>
      <Source source={data.information.oldRuleNum} />
      <TemplateEntries entries={data.information.uniProtAccessions} />
      <ConditionsAnnotations data={data} />
    </SingleColumnLayout>
  );
};

export default UniRuleEntry;
