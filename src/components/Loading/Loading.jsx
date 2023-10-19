import React from 'react';
import './Loading.css'

const LoadingIndicator = () => {
    return (
        <>
            <div className="loading-indicator">
                <div>
                    <div className="loading-circle" data-testid="loading-circle"></div>
                    <div className="loading-circle" data-testid="loading-circle"></div>
                    <div className="loading-circle" data-testid="loading-circle"></div>
                    <div className="loading-shadow"></div>
                    <div className="loading-shadow"></div>
                    <div className="loading-shadow"></div>
                </div>
                <div className="loading-text">Loading...</div>
            </div>
        </>
    );
};

export default LoadingIndicator;