import React, { useState, useEffect } from 'react';
import { fetchCommentCount, fetchPullRequests } from '../../axios/api';
import PRItem from "./PRItem";
import './PRList.css';

const PRList = () => {
    const [prs, setPRs] = useState([]);

    useEffect(() => {
        // Fetch PR data from the GitHub API
        (async () => {
            try {
                const response = await fetchPullRequests();
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
            } catch (err) {
                console.error('Error fetching PRs and comment counts:', err);
            }
        })();
    }, []);

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
        </div>
    );
};

export default PRList;
