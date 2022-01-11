import axios from 'axios';

import apiUrls from '../../shared/config/apiUrls';

export type ContactFormInputData = {
  email: string;
  message: string;
  subject?: string;
  name?: string;
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

const postContactForm = (contactFormInputData: ContactFormInputData) => {
  // TODO get new token
  const token = 'some_token';

  const formData = generateForm(contactFormInputData, token);

  return axios.post(apiUrls.contactForm, formData);
};

export default postContactForm;
