/* Parameters of a ID mapping job as required by the server */
import { Namespace } from '../../../shared/types/namespaces';

export type From = string;

export type To = string;

export type IDs = string;

export type ServerParameters = {
  from: From;
  to: To;
  ids: IDs;
};

// same, because no email was provided before
export type PublicServerParameters = ServerParameters;

export type IDMappingTarget =
  | undefined
  | Namespace.uniprotkb
  | Namespace.uniref
  | Namespace.uniparc;
