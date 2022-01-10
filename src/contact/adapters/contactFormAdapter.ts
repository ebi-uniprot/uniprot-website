import axios from 'axios';

import apiUrls from '../../shared/config/apiUrls';

type ContactFormInputData = {
  email: string;
  message: string;
  name?: string;
  subject?: string;
  accession?: string;
  entryType?: string;
};

export const generateForm = (
  contactFormInputData: ContactFormInputData,
  token: string
) => {
  const { email, message, name, subject, accession, entryType } =
    contactFormInputData;
  const formData = new FormData();
  formData.append('email', email);
  formData.append(
    'subject',
    [entryType, accession, subject].filter((d) => d).join(' ')
  );
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
