import React, {useState, useEffect} from 'react';
import {fetchCommentCount, fetchPullRequests, fetchUserRepos} from '../../axios/api';
import Pagination from "../../components/Pagination/Pagination";
import './PRList.css';
import LoadingIndicator from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PRItems from "./PRItems";
import PRListHeader from "./PRListHeader";

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
    return 0;
};

const PRList = () => {
    const [prs, setPRs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('facebook');
    const [repos, setRepos] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState('react');

    // Fetch PR data from the GitHub API
    const fetchPRData = async () => {
        try {
            setPRs([])
            const response = await fetchPullRequests({page, username, selectedRepo});
            const prData = response.data;
            const prsWithCommentCount = await addCommentCountToPRs(prData);
            setPRs(prsWithCommentCount);
            setTotalPages(calculateTotalPages(response.headers.link));
        } catch (err) {
            handleError(err);
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
    };

    const setLoadingIndicator = () => {
        const timeId = setTimeout(() => {
            setLoading(false);
            clearTimeout(timeId);
        }, 300);
    };

    useEffect(() => {
        fetchPRData();
    }, [page, selectedRepo, username]);


    useEffect(() => {
        if (username) {
            fetchUserRepos(username)
                .then((res) => {
                    const repoNames = res.data.map((repo) => repo.name);
                    setRepos(repoNames);
                })
                .catch((error) => {
                    console.error('Error fetching user repositories:', error);
                });
        }
    }, [username]);

    const handleUsernameChange = (value) => {
        setLoading(true);
        setUsername(value);
    };

    const handleRepoChange = (e) => {
        setLoading(true);
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
