import React from "react";
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import StarIcon from '@material-ui/icons/Star';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Fragment } from "react";
import CalendarPageSubTask from "./CalendarPageSubTask/CalendarPageSubTask";

const CalendarPageTask = ({ item }) => {

    let renderSubTask;

    if (item.subtask) {
        renderSubTask = item.subtask.map(item => {
            return <CalendarPageSubTask key={item.id} done={item.done} important={item.important} label={item.label} />
        });
    } else {
        renderSubTask = null;
    }

    return (
        <Fragment>
            <Accordion TransitionProps={{ unmountOnExit: true }}
                className={`ToDoListItem__Accordion ${item.done ? `done` : null} ${item.important ? `important_wrapper` : null}`}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className="ToDoListItem__Accordion_expandIcon" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="ToDoListItem__Accordion_grid"
                >
                    <div className={`ToDoListItem ${item.done ? `done` : null} ${item.important ? `important_wrapper` : null}`} >
                        <div className="ToDoListItem__leftBlock">
                            <IconButton onClick={(e) => e.stopPropagation()} className="ToDoListItem__button ToDoListItem__buttonDone" color="inherit" aria-label="delete">
                                <CheckIcon fontSize="small" />
                            </IconButton>
                            {item.label}
                        </div>

                        <div>
                            <IconButton onClick={(e) => e.stopPropagation()} className={`ToDoListItem__button ToDoListItem__button_important  ToDoListItem__button_marginRight ${item.important ? `important` : ``}`} color="inherit" aria-label="edit">
                                <StarIcon fontSize="medium" />
                            </IconButton>
                        </div>


                    </div>
                </AccordionSummary>
                <AccordionDetails className="ToDoListItem__details">
                    {renderSubTask}
                </AccordionDetails>
            </Accordion>

        </Fragment>
    )
}

export default React.memo(CalendarPageTask);