import {
  useState,
  useCallback,
  FormEventHandler,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';

import useDataApi from '../../shared/hooks/useDataApi';
import { useMessagesDispatch } from '../../shared/contexts/Messages';

import apiUrls from '../../shared/config/apiUrls';
import { addMessage } from '../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
} from '../../messages/types/messagesTypes';
import { Location, LocationToPath } from '../../app/config/urls';

export const modifyFormData = (formData: FormData, token: string) => {
  const output = new FormData();
  output.set('token', token);
  output.set('email', formData.get('email') || '');
  output.set(
    'subject',
    `[uuw${globalThis.location.hostname.includes('beta') ? '-beta' : ''}] ${
      formData.get('subject') || ''
    }`
  );
  output.set('requiredForRobots', formData.get('requiredForRobots') || '');
  output.set(
    'message',
    `${formData.get('message')}\r\n\r\nName: ${formData.get(
      'name'
    )}\r\nReferred from: ${globalThis.location.origin}${formData.get(
      'referrer'
    )}\r\nBrowser: ${navigator.userAgent}\r\nGit commit: ${GIT_COMMIT_HASH}` ||
      ''
  );
  return output;
};

export type UseFormLogicReturnType = {
  sending: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

export const useFormLogic = (referrer?: string): UseFormLogicReturnType => {
  const dispatch = useMessagesDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState<undefined | FormData>();

  const subject = formData?.get('subject') as undefined | string;

  const tokenData = useDataApi<{ token: string }>(
    subject
      ? `${apiUrls.contact.token}?${new URLSearchParams({ key: subject })}`
      : null
  );
  const token = tokenData.data?.token;

  // Generate configuration to POST data to the contact send endpoint
  const postData: undefined | AxiosRequestConfig<FormData> = useMemo(() => {
    if (!formData || !token) {
      return;
    }
    const modifiedFormData = modifyFormData(formData, token);

    // eslint-disable-next-line consistent-return
    return {
      method: 'POST',
      data: modifiedFormData,
    };
  }, [formData, token]);

  const sendData = useDataApi(postData ? apiUrls.contact.send : null, postData);

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
      // eslint-disable-next-line uniprot-website/use-config-location
      history.push(referrer || LocationToPath[Location.Home]);
    }
  }, [sendData.data, dispatch, history, referrer]);

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

  return { sending: loading, handleSubmit };
};
