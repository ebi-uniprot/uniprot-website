// import axios from 'axios';

import apiUrls from '../../shared/config/apiUrls';
import fetchData from '../../shared/utils/fetchData';

export const getToken = async (key: string) => {
  const searchParams = new URLSearchParams({ key });
  const response = await fetchData<{ token: string }>(
    `${apiUrls.contact.token}?${searchParams}`
  );
  return response.data?.token;
};

// Not a pure function
export const modifyFormData = (formData: FormData, token: string) => {
  formData.set('token_id', token);
  formData.set(
    'message',
    `${formData.get('message')}\n\nName: ${formData.get(
      'name'
    )}\nReferred from: ${formData.get('referrer')}\nBrowser: ${
      navigator.userAgent
    }\nGit commit: ${GIT_COMMIT_HASH}`
  );
  // Delete the ones we've put in the message body
  formData.delete('name');
  formData.delete('referrer');
  // Ignored by server
  formData.delete('privacy');
};

const postContactForm = async (contactFormData: FormData) => {
  const subject = contactFormData.get('subject');
  /* istanbul ignore if */
  if (!subject || typeof subject !== 'string') {
    // Shouldn't happen thanks to prvious form validation
    throw new Error('No subject available');
  }
  const token = await getToken(subject);

  modifyFormData(contactFormData, token);

  console.log(token, Object.fromEntries(contactFormData));

  // return axios.post(apiUrls.contact.send, contactFormData);
};

export default postContactForm;
