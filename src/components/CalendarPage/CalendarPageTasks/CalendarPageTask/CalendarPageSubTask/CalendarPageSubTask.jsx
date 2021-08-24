import React from 'react'; import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import StarIcon from '@material-ui/icons/Star';
import './CalendarPageSubTask.css';

const CalendarPageSubTask = ({ done, important, label }) => {

    return (
        <div className={`ToDoListItem ToDoListItemSubTask ${done ? `done` : null} ${important ? `important_wrapper` : null}`} >
            <div className="ToDoListItem__leftBlock">
                <IconButton className="ToDoListItem__button ToDoListItem__buttonDone" onClick={(e) => e.stopPropagation()} color="inherit" aria-label="delete">
                    <CheckIcon fontSize="small" />
                </IconButton>
                {label}
            </div>

            <div className={`CalendarPageSubTaskButtons`}>
                <IconButton className={`ToDoListItem__button ToDoListItem__button_marginRight ${important ? `important` : ``}`} onClick={(e) => e.stopPropagation()} color="inherit" aria-label="edit">
                    <StarIcon fontSize="medium" />
                </IconButton>
            </div>
        </div>
    );
};


export default React.memo(CalendarPageSubTask);