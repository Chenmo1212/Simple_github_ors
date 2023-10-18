import React, { useState, useEffect } from 'react';
import { fetchPullRequests } from '../../axios/api';
import PRItem from "./PRItem";
import './PRList.css';

const PRList = () => {
    const [prs, setPRs] = useState([]);

    useEffect(() => {
        // Fetch PR data from the GitHub API
        fetchPullRequests()
            .then((res) => {
                const prData = res.data.map((pr, index) => ({
                    id: pr.id || index,
                    title: pr.title || 'Title Not Available',
                    url: pr.url || '/',
                    author: pr.user['login'] || 'Author Not Available',
                    authorUrl: pr.user['html_url'] || '/',
                    comments: pr.comments || 0
                }));

                setPRs(prData);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                console.log("Fetch Pull PR Data Done!")
            });
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
                            comments={pr.comments || 0}
                        />
                    </li>))
                }
            </ul>
        </div>
    );
};

export default PRList;
