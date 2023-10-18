import React, { useState } from 'react';

const PRList = () => {
    const [prs] = useState([]);

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
