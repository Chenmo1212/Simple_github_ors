import { api } from './fetch';

export const fetchPullRequests = (page) => {
  return api().get('/repos/facebook/react/pulls?page=' + page);
};

export const fetchCommentCount = (url) => {
  return api(url).get(url);
}