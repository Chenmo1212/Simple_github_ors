import React from 'react';
import "./PRItem.css"
import commentSvg from "../../assets/images/comment.svg"

const PRItem = ({title, url, author, authorUrl, comments}) => {
    return (
        <div className="pr-item">
            <div className="pr-item-header">
                <h3 className="pr-title" title={title || 'Title Not Available'}>
                    <a href={url}>{title || 'Title Not Available'}</a>
                </h3>
                <p className="pr-author">Created by <a href={authorUrl}>{author || 'Author Not Available'}</a></p>
            </div>
            {
                comments ?
                    (<p className="pr-item-comment">
                        <img src={commentSvg} className="comment-icon" alt="comment-icon"/>
                        <span className="comment-amount" title={comments}>{comments > 99 ? "99+": comments || 0}</span>
                    </p>)
                    : ""
            }

        </div>
    );
};
export default PRItem;