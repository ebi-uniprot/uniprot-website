import {
  useState,
  useCallback,
  FormEventHandler,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { v1 } from 'uuid';

import useDataApi from '../../shared/hooks/useDataApi';

import apiUrls from '../../shared/config/apiUrls';
import fetchData from '../../shared/utils/fetchData';
import { addMessage } from '../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
} from '../../messages/types/messagesTypes';
import { Location, LocationToPath } from '../../app/config/urls';

export const getToken = async (key: string) => {
  const searchParams = new URLSearchParams({ key });
  const response = await fetchData<{ token: string }>(
    `${apiUrls.contact.token}?${searchParams}`
  );
  return response.data?.token;
};

export const modifyFormData = (formData: FormData, token: string) => {
  const output = new FormData();
  output.set('token_id', token);
  output.set('email', formData.get('email') || '');
  output.set('subject', formData.get('subject') || '');
  output.set('requiredForRobots', formData.get('requiredForRobots') || '');
  output.set(
    'message',
    `${formData.get('message')}\n\nName: ${formData.get(
      'name'
    )}\nReferred from: ${formData.get('referrer')}\nBrowser: ${
      navigator.userAgent
    }\nGit commit: ${GIT_COMMIT_HASH}` || ''
  );
  return output;
};

const postContactForm = async (contactFormData: FormData) => {
  const subject = contactFormData.get('subject');
  /* istanbul ignore if */
  if (!subject || typeof subject !== 'string') {
    // Shouldn't happen thanks to previous form validation
    throw new Error('No subject available');
  }
  const token = await getToken(subject);

  const sentFormData = modifyFormData(contactFormData, token);

  console.log(token, Object.fromEntries(sentFormData));

  // return axios.post(apiUrls.contact.send, sentFormData);
};

export default postContactForm;

export type UseFormLogicReturnType = {
  sending: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

export const useFormLogic = (): UseFormLogicReturnType => {
  const dispatch = useDispatch();
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
    // Debug
    modifiedFormData.set('token_id', 'wrongtoken');

    console.log(modifiedFormData.get('message'));
    // eslint-disable-next-line consistent-return
    return {
      method: 'POST',
      data: modifiedFormData,
    };
  }, [formData, token]);

  const sendData = useDataApi(postData ? apiUrls.contact.send : null, postData);

  console.log(sendData, sendData.data);

  const loading = tokenData.loading || sendData.loading;
  const error = tokenData.error || sendData.error;

  // Error behaviour
  useEffect(() => {
    if (error) {
      // Pop up message for the user
      dispatch(
        addMessage({
          id: v1(),
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
          id: v1(),
          format: MessageFormat.POP_UP,
          level: MessageLevel.SUCCESS,
          content: 'Your message has succesfully been sent to our team.',
        })
      );
      // Navigate the user back, or to the homepage if not possible
      if (history.length > 1) {
        history.goBack();
      } else {
        history.push(LocationToPath[Location.Home]);
      }
    }
  }, [error, sendData.data, dispatch, history]);

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
