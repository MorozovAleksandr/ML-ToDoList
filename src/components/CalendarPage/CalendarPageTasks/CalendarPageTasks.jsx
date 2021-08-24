import React from 'react';
import CalendarPageTask from './CalendarPageTask/CalendarPageTask';
import './CalendarPageTasks.css';

const CalendarPageTasks = ({ date, tasks }) => {

    const currentDate = date[0] > 9 ? date[0] : `0${date[0]}`;
    const currentMonth = (date[1] + 1) > 9 ? (date[1] + 1) : `0${(date[1] + 1)}`;

    const elements = tasks.filter(task => {
        return (new Date(task.date).getMonth() === date[1]) && (new Date(task.date).getDate() === date[0]) && (new Date(task.date).getFullYear() === date[2]);
    });


    const renderElements = elements.map(item => <CalendarPageTask key={item.id} item={item} />);
    return (
        <div className="CalendarPageTasks">
            <h1>{currentDate}.{currentMonth}.{date[2]} </h1>
            {renderElements}
        </div>
    );
};

export default CalendarPageTasks;