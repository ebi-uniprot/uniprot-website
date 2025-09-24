import { AxiosRequestConfig } from 'axios';
import { debounce } from 'lodash-es';
import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Location, LocationToPath } from '../../app/config/urls';
import { addMessage } from '../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
} from '../../messages/types/messagesTypes';
import useDataApi from '../../shared/hooks/useDataApi';
import useMessagesDispatch from '../../shared/hooks/useMessagesDispatch';
import { stringifyUrl } from '../../shared/utils/url';
import apiUrls from '../config/apiUrls';

export const modifyFormData = (formData: FormData, token: string) => {
  const output = new FormData();
  output.set('token', token);
  output.set('email', formData.get('email') || '');
  output.set('subject', `[uuw] ${formData.get('subject') || ''}`);
  output.set('requiredForRobots', formData.get('requiredForRobots') || '');
  const message = `${formData.get('message') || ''}

Name: ${formData.get('name')}

--------------- prefilled context details ---------------

${formData.get('context') || ''}`;
  output.set('message', message);
  return output;
};

const DEBOUNCE_TIME = 1_000;

export type Suggestion =
  | 'update'
  | 'PDB'
  | 'buy'
  | 'blast'
  | 'align'
  | 'id mapping'
  | 'peptide search'
  | 'not English';
const entryUpdateRegExp = /entry update request/i;
const pdbRegExp = /(structure)|(pdb)/i;
const buyRegExp = /(buy)|(purchas)|(ship)|(cost)|(quote)/i;
const blastRegExp = /blast/i;
const alignRegExp = /(clustal)|(align)/i;
const idMappingRegExp = /(map)/i;
const peptideSearchRegExp = /(peptide search)|(search peptide)/i;
// anything not outside the printable ASCII range
// eslint-disable-next-line no-control-regex
let nonLatin = /[^\x00-\x7F]/;
try {
  // any Unicode letter minus characters whose Script Extensions include Latin
  // α: true, 東: true, t: false, é: false
  nonLatin = /[\p{L}--\p{scx=Latin}]/v;
} catch {
  /* */
}

export const getSuggestion = debounce(
  (
    callback: Dispatch<SetStateAction<Suggestion[] | undefined>>,
    subject: string = '',
    message: string = ''
  ): void => {
    const suggestions: Suggestion[] = [];
    if (entryUpdateRegExp.test(subject)) {
      // A bit specific, only test the subject as it would have been added by
      // the link from entry page to suggest an update
      suggestions.push('update');
    }
    if (pdbRegExp.test(subject) || pdbRegExp.test(message)) {
      suggestions.push('PDB');
    }
    if (buyRegExp.test(subject) || buyRegExp.test(message)) {
      suggestions.push('buy');
    }
    if (blastRegExp.test(subject) || blastRegExp.test(message)) {
      suggestions.push('blast');
    }
    if (alignRegExp.test(subject) || alignRegExp.test(message)) {
      suggestions.push('align');
    }
    if (idMappingRegExp.test(subject) || idMappingRegExp.test(message)) {
      suggestions.push('id mapping');
    }
    if (
      peptideSearchRegExp.test(subject) ||
      peptideSearchRegExp.test(message)
    ) {
      suggestions.push('peptide search');
    }
    if (nonLatin.test(message)) {
      suggestions.push('not English');
    }
    if (!suggestions.length) {
      callback(undefined);
    } else {
      callback(suggestions);
    }
  },
  DEBOUNCE_TIME
);

export type UseFormLogicReturnType = {
  sending: boolean;
  suggestions: undefined | Suggestion[];
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: FormEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export const useFormLogic = (referrer?: string): UseFormLogicReturnType => {
  const dispatch = useMessagesDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState<undefined | FormData>();
  const [suggestions, setSuggestions] = useState<undefined | Suggestion[]>(
    undefined
  );

  const subject = formData?.get('subject') as undefined | string;

  const tokenData = useDataApi<{ token: string }>(
    subject ? stringifyUrl(apiUrls.token, { key: subject }) : null
  );
  const token = tokenData.data?.token;

  // Generate configuration to POST data to the contact send endpoint
  const postData: undefined | AxiosRequestConfig<FormData> = useMemo(() => {
    if (!formData || !token) {
      return;
    }
    const modifiedFormData = modifyFormData(formData, token);

    return {
      method: 'POST',
      data: modifiedFormData,
    };
  }, [formData, token]);

  const sendData = useDataApi(postData ? apiUrls.send : null, postData);

  const loading = tokenData.loading || sendData.loading;
  const error = tokenData.error || sendData.error;

  // Error behaviour
  useEffect(() => {
    if (error) {
      // Pop up message for the user
      dispatch(
        addMessage({
          format: MessageFormat.POP_UP,
          level: MessageLevel.FAILURE,
          content: 'Error while sending your message. Please try again later.',
        })
      );
    }
  }, [error, dispatch]);

  // Success behaviour
  useEffect(() => {
    if (sendData.data) {
      // Pop up message for the user
      dispatch(
        addMessage({
          format: MessageFormat.POP_UP,
          level: MessageLevel.SUCCESS,
          content: 'Your message has been succesfully sent to our team.',
        })
      );
      // Clear the current form (just in case)
      document.querySelector<HTMLFormElement>('main form')?.reset();
      // Navigate the user to previous page, or to the homepage if not possible
      navigate(referrer || LocationToPath[Location.Home]);
    }
  }, [sendData.data, dispatch, navigate, referrer]);

  const previousLoading = useRef(loading);
  // Reset custom hook form data (to retry sending if needed)
  useEffect(() => {
    if (previousLoading.current && !loading) {
      setFormData(undefined);
    }
    previousLoading.current = loading;
  }, [loading]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      const form = event.target;
      event.preventDefault();
      if (!(form instanceof HTMLFormElement) || loading) {
        return; // Shouldn't happen, but just in case
      }
      setFormData(new FormData(form));
    },
    [loading]
  );

  // on unmount, cancel any pending suggestion calculation
  useEffect(() => getSuggestion.cancel, []);

  const handleChange: FormEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const element = event.target;
    if (
      !(
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement
      ) ||
      loading
    ) {
      return;
    }
    getSuggestion(
      setSuggestions,
      element.form?.subject?.value,
      element.form?.message?.value
    );
    navigate('.', {
      replace: true,
      state: {
        ...state,
        formValues: {
          ...(state?.formValues || {}),
          [element.name]: element.value,
        },
      },
    });
  };

  return { sending: loading, suggestions, handleSubmit, handleChange };
};
