import React from 'react';
import './RecycleBinGroupItemLabel.css';

const RecycleBinGroupItemLabel = ({ label }) => {
    return (
        <div className="RecycleBinGroupItemLabel">
            {label}
        </div>
    );
};

export default RecycleBinGroupItemLabel;