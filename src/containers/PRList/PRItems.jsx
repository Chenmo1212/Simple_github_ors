import PRItem from "../../components/PRItem/PRItem";
import React from "react";

const PRItems = ({prs}) => {
    return (
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
                </li>
            ))}
        </ul>
    );
};

export default PRItems;