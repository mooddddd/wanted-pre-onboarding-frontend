import axios from 'axios';

export const request = axios.create({
  // baseURL: 'https://www.pre-onboarding-selection-task.shop',
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});
