import { api } from './fetch';

export const fetchPullRequests = () => {
  return api.get('/repos/facebook/react/pulls');
};