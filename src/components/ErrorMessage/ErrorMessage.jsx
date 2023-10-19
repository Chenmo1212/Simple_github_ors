import React from 'react';
import './ErrorMessage.css'

const ErrorMessage = ({message}) => {
    return (
        <>
            <div className="message">
                <p className="message-content" title={message}>{message}</p>
            </div>
        </>);
};

export default ErrorMessage;
