import axios from 'axios';

import apiUrls from '../../shared/config/apiUrls';
import fetchData from '../../shared/utils/fetchData';

export type ContactFormInputData = {
  email: string;
  message: string;
  subject: string;
  name?: string;
};

export const getToken = async (key: string) => {
  const searchParams = new URLSearchParams({ key });
  const response = await fetchData<{ token: string }>(
    `${apiUrls.contact.token}?${searchParams}`
  );
  return response.data?.token;
};

export const generateForm = (
  contactFormInputData: ContactFormInputData,
  token: string
) => {
  const { email, message, name, subject } = contactFormInputData;
  const formData = new FormData();
  formData.append('email', email);
  formData.append('subject', subject || '');
  formData.append('token_id', token);
  formData.append(
    'message',
    `${message}\n\nName: ${name}\nReferred from: ${navigator.userAgent}\nGit commit: ${GIT_COMMIT_HASH}`
  );
  return formData;
};

const postContactForm = async (contactFormInputData: ContactFormInputData) => {
  const token = await getToken(contactFormInputData.subject);

  const formData = generateForm(contactFormInputData, token);

  console.log(token, formData);

  // return axios.post(apiUrls.contact.send, formData);
};

export default postContactForm;
