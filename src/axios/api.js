import { api } from './fetch';

export const fetchPullRequests = (data) => {
  return api().get(`/repos/${data.username}/${data.selectedRepo}/pulls?page=${data.page}`);
};

export const fetchUserRepos = (githubUsername) => {
  return api().get(`users/${githubUsername}/repos?page=1&per_page=100`);
};

export const fetchCommentCount = (url) => {
  return api(url).get(url);
}