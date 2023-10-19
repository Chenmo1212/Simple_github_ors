import PRItem from "../../components/PRItem/PRItem";
import React from "react";
import EmptySvg from "../../components/EmptySvg/EmptySvg";

const PRItems = ({prs}) => {
    return prs.length ? (
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
    ) : <EmptySvg message="test"/>;
};

export default PRItems;