import axios from 'axios';
const baseURL = 'http://127.0.0.1:8000';
// const baseURL = 'https://www.pre-onboarding-selection-task.shop',

export const request = axios.create({
  // baseURL: 'https://www.pre-onboarding-selection-task.shop',
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAccessToken = (token) => {
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const todoRequest = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});
