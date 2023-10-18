import React, { useState, useEffect } from 'react';
import { fetchPullRequests } from '../../axios/api';

const PRList = () => {
    const [prs, setPRs] = useState([]);

    useEffect(() => {
        // Fetch PR data from the GitHub API
        fetchPullRequests()
            .then((res) => {
                setPRs(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                console.log("Fetch Pull PR Data Done!")
            });
    }, []);

    return (
        <div>
            <h2>Pull Requests</h2>
            <ul>
                {prs.map((pr) => (
                    <li key={pr.id}>
                        {pr.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PRList;
