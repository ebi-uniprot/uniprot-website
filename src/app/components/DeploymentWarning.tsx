import { Message } from 'franklin-sites';
import style from './styles/deployment-warning.module.scss';

const reUniProtOrg = /^https?:\/\/www\.uniprot\.org/;

const DeploymentWarning = () =>
  !window.location.href.match(reUniProtOrg) &&
  !LIVE_RELOAD && (
    <Message className={style['deployment-warning']} level="warning">
      {`This is a development version of `}
      <a href="https://www.uniprot.org">www.uniprot.org</a>
      {` |  git branch: ${GIT_BRANCH} |  API: ${API_PREFIX}`}
    </Message>
  );

export default DeploymentWarning;
