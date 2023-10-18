import { api } from './fetch';
import axios from 'axios';

export const fetchPullRequests = () => {
  return api.get('/repos/facebook/react/pulls');
};

export const fetchCommentCount = (url) => {
  return axios.get(url);
}