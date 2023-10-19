import React from 'react';
import './EmptySvg.css';

const EmptySvg = () => {
    return (
        <div className="empty">
            <div className="draw">
                <div className="cactus">
                    <div className="arm"></div>
                    <div className="arm"></div>
                </div>
                <div className="cactus">
                    <div className="arm"></div>
                    <div className="arm"></div>
                </div>
                <div className="cactus">
                    <div className="arm"></div>
                    <div className="arm"></div>
                </div>
                <div className="sky">
                    <div className="montain"></div>
                    <div className="montain two"></div>
                    <div className="sun"></div>
                </div>
            </div>
            <p className="no-items-text">Nothing found in this repository.</p>
        </div>
    );
};

export default EmptySvg;