import React, { useState, useEffect } from 'react';
import { fetchCommentCount, fetchPullRequests } from '../../axios/api';
import PRItem from "./PRItem";
import Pagination from "./Pagination";
import './PRList.css';

const PRList = () => {
    const [prs, setPRs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        // Fetch PR data from the GitHub API
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
                    // Extract the last page number from the Link header
                    const lastPage = parseInt(linkHeader.match(/page=(\d+)>; rel="last"/)[1]);
                    setTotalPages(lastPage);
                }
            } catch (err) {
                console.error('Error fetching PRs and comment counts:', err);
            }
        })();
    }, [page]);

    // Pagination functions
    const onPageChange = (page) => {
        setPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="pr-list">
            <h2>Pull Requests</h2>
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
    );
};

export default PRList;
