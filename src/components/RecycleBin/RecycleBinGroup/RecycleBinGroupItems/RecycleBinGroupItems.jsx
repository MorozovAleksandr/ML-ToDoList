import React from 'react';
import RecycleBinGroupItem from './RecycleBinGroupItem/RecycleBinGroupItem'
import './RecycleBinGroupItems.css';

const RecycleBinGroupItems = ({ label, items, type }) => {

    const renderItems = items.map(item => {
        return <RecycleBinGroupItem key={item.id} item={item} type={type} />
    })
    return (
        <div className="RecycleBinGroupItems">
            <div className="RecycleBinGroup__label">{label}:</div>
            <div className="RecycleBinGroup__items">
                {renderItems}
            </div>
        </div>
    );
};

export default RecycleBinGroupItems;