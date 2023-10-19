import React from "react";

const PRListHeader = ({username, setUsername, selectedRepo, handleRepoChange, repos}) => {
    return (<div className="pr-list-header">
        <h3>Pull Requests page from</h3>
        <div className="input-group">
            <label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub Username"
                />
            </label>
            <label>
                <select value={selectedRepo} onChange={handleRepoChange}>
                    <option value="">Select a repository</option>
                    {repos.map((repoName) => (<option key={repoName} value={repoName}>
                        {repoName}
                    </option>))}
                </select>
            </label>
        </div>
    </div>);
};

export default PRListHeader;