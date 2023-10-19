import React, {useState, useEffect} from 'react';
import {fetchCommentCount, fetchPullRequests, fetchUserRepos} from '../../axios/api';
import Pagination from "../../components/Pagination/Pagination";
import './PRList.css';
import LoadingIndicator from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PRItems from "./PRItems";
import PRListHeader from "./PRListHeader";
import {debounce} from 'lodash';

const PRListContent = ({prs, loading, onPageChange, page, totalPages}) => {
    return (<div className={loading ? "blur" : ""}>
        <PRItems prs={prs} />
        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange}/>
    </div>);
};

const addCommentCountToPRs = async (prData) => {
    const prsWithCommentCountPromises = prData.map(async (pr) => {
        const comments = await fetchCommentCount(pr.comments_url);
        const commentCount = comments.data.length;
        return {
            id: pr.id,
            title: pr.title || 'Title Not Available',
            url: pr.html_url || '/',
            author: pr.user.login || 'Author Not Available',
            authorUrl: pr.user.html_url || '/',
            commentsUrl: pr.comments_url || '/',
            comments: commentCount || 0,
        };
    });
    return await Promise.all(prsWithCommentCountPromises);
};

const calculateTotalPages = (linkHeader) => {
    if (linkHeader) {
        if (linkHeader.match(/page=(\d+)>; rel="last"/)) {
            return parseInt(linkHeader.match(/page=(\d+)>; rel="last"/)[1]);
        } else {
            return parseInt(linkHeader.match(/page=(\d+)>; rel="prev"/)[1]) + 1;
        }
    }
    return 1;
};

const PRList = () => {
    const [prs, setPRs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('facebook');
    const [repos, setRepos] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState('react');

    const DELAY_TIME = 500;
    const EXTRA_LOADING_TIME = 300;
    const ERROR_REMOVE_TIME = 3000;

    // Fetch PR data from the GitHub API
    const fetchPRData = async () => {
        try {
            setLoading(true);
            const response = await fetchPullRequests({page, username, selectedRepo});
            const prData = response.data;
            const prsWithCommentCount = await addCommentCountToPRs(prData);
            setPRs(prsWithCommentCount);
            setTotalPages(calculateTotalPages(response.headers.link));
        } catch (err) {
            handleError(err);
            setPRs([]);
            setTotalPages(1);
        } finally {
            setLoadingIndicator(false);
        }
    };

    const handleError = (err) => {
        if (err.response) {
            if (err.response.status === 401) {
                setError("Please check githubToken and try again!");
            } else {
                setError(err.response.data.message);
            }
        } else {
            setError('Failed to fetch PR data.');
        }
        const timer = setTimeout(() => {
            setError(null);
            clearTimeout(timer);
        }, ERROR_REMOVE_TIME);
    };

    const setLoadingIndicator = () => {
        const timeId = setTimeout(() => {
            setLoading(false);
            clearTimeout(timeId);
        }, EXTRA_LOADING_TIME);
    };

    useEffect(() => {
        const delayedFetchPRData = debounce(fetchPRData, DELAY_TIME);
        delayedFetchPRData();
        return () => {
            delayedFetchPRData.cancel();
        };
    }, [page, selectedRepo, username]);


    useEffect(() => {
        const delayedSearch = debounce((searchTerm) => {
            fetchUserRepos(searchTerm)
                .then((res) => {
                    const repoNames = res.data.map((repo) => repo.name);
                    setRepos(repoNames);
                    setSelectedRepo(repoNames[0])
                })
                .catch((err) => {
                    handleError(err);
                    setRepos([]);
                });
        }, DELAY_TIME);

        delayedSearch(username);

        return () => {
            delayedSearch.cancel();
        };
    }, [username]);

    const handleUsernameChange = (value) => {
        setPage(1);
        setUsername(value);
    };

    const handleRepoChange = (e) => {
        setPage(1);
        const selectedRepo = e.target.value;
        setSelectedRepo(selectedRepo);
    };

    // Pagination functions
    const onPageChange = (page) => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        setLoading(true);
        setPage(page);
    };

    return (
        <div className="pr-list" role="region" aria-label="Pull Requests List">
            <PRListHeader
                username={username}
                setUsername={handleUsernameChange}
                selectedRepo={selectedRepo}
                handleRepoChange={handleRepoChange}
                repos={repos}
                loading={loading}
                error={error}
            />
            {loading && <LoadingIndicator/>}
            {error && <ErrorMessage message={error}/>}
            <PRListContent
                prs={prs}
                loading={loading}
                onPageChange={onPageChange}
                page={page}
                totalPages={totalPages}
            />
        </div>
    );
};

export default PRList;
