import { AxiosRequestConfig } from 'axios';
import { LocationDescriptor } from 'history';
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

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

export type ContactLocationState =
  | undefined
  | {
      referrer?: LocationDescriptor;
      formValues?: Record<string, string>;
    };

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
  const message = `${formData.get('message') || ''}

Name: ${formData.get('name')}

--------------- prefilled context details ---------------

${formData.get('context') || ''}`;
  output.set('message', message);
  return output;
};

export type UseFormLogicReturnType = {
  sending: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: FormEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export const useFormLogic = (referrer?: string): UseFormLogicReturnType => {
  const dispatch = useMessagesDispatch();
  const history = useHistory<ContactLocationState>();
  const [formData, setFormData] = useState<undefined | FormData>();

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

  const handleChange: FormEventHandler<HTMLInputElement | HTMLTextAreaElement> =
    useCallback(
      (event) => {
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
        history.replace({
          ...history.location,
          state: {
            ...history.location.state,
            formValues: {
              ...(history.location.state?.formValues || {}),
              [element.name]: element.value,
            },
          },
        });
      },
      [loading, history]
    );

  return { sending: loading, handleSubmit, handleChange };
};
