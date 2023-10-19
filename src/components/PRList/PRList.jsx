import React, {useState, useEffect} from 'react';
import {fetchCommentCount, fetchPullRequests} from '../../axios/api';
import PRItem from "./PRItem";
import Pagination from "./Pagination";
import './PRList.css';
import LoadingIndicator from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const PRList = () => {
    const [prs, setPRs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch PR data from the GitHub API
    useEffect(() => {
        (async () => {
            try {
                const response = await fetchPullRequests(page);
                const prData = response.data;
                const prsWithCommentCountPromises = prData.map(async (pr) => {
                    const comments = await fetchCommentCount(pr["comments_url"]);
                    const commentCount = comments.data.length
                    return {
                        id: pr.id,
                        title: pr.title || 'Title Not Available',
                        url: pr["html_url"] || '/',
                        author: pr.user["login"] || 'Author Not Available',
                        authorUrl: pr.user["html_url"] || '/',
                        commentsUrl: pr["comments_url"] || '/',
                        comments: commentCount || 0,
                    };
                });
                const prsWithCommentCount = await Promise.all(prsWithCommentCountPromises);
                setPRs(prsWithCommentCount);

                const linkHeader = response.headers['link'];
                if (linkHeader) {
                    if (linkHeader.match(/page=(\d+)>; rel="last"/)) {
                        // Extract the last page number from the Link header
                        const lastPage = parseInt(linkHeader.match(/page=(\d+)>; rel="last"/)[1]);
                        setTotalPages(lastPage);
                    } else {
                        const prevPage = parseInt(linkHeader.match(/page=(\d+)>; rel="prev"/)[1]);
                        setTotalPages(prevPage + 1);
                    }
                }
            } catch (err) {
                if (err.response.status === 401) {
                    setError("Please check githubToken and try again!");
                } else {
                    setError(err.response.data.message);
                }
            } finally {
                const timeId = setTimeout(() => {
                    setLoading(false);
                    clearTimeout(timeId);
                }, 300);
            }
        })();
    }, [page]);

    // Bind keyboard event to control navigation
    useEffect(() => {
        const handleKeyboardNavigation = (event) => {
            if (event.key === 'ArrowLeft' && page > 1) {
                onPageChange(page - 1);
            } else if (event.key === 'ArrowRight' && page < totalPages) {
                onPageChange(page + 1);
            }
        };

        document.addEventListener('keydown', handleKeyboardNavigation);
        return () => document.removeEventListener('keydown', handleKeyboardNavigation);
    }, [page, totalPages]);

    // Pagination functions
    const onPageChange = (page) => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        setLoading(true);
        setPage(page);
    };

    return (
        <div className="pr-list">
            <h2>Pull Requests</h2>
            {loading && <LoadingIndicator/>}
            {error && <ErrorMessage message={error}/>}
            <div className={(loading || error) ? "blur": ""}>
                <ul>
                    {prs.map((pr) => (
                        <li key={pr.id}>
                            <PRItem
                                title={pr.title}
                                author={pr.author}
                                url={pr.url}
                                authorUrl={pr.authorUrl}
                                comments={pr.comments}
                                commentsUrl={pr.commentsUrl}
                            />
                        </li>))
                    }
                </ul>
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default PRList;
