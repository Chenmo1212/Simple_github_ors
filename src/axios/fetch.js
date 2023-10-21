import axios from 'axios';

// Replace 'YOUR_ACCESS_TOKEN' with your actual GitHub personal access token
const githubToken = "YOUR_ACCESS_TOKEN"
export const api = (baseUrl='https://api.github.com') => axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `token ${githubToken}`,
  },
  timeout: 60 * 1000,
});