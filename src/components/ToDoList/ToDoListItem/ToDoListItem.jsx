import React, { useState } from "react";
import './ToDoListItem.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import StarIcon from '@material-ui/icons/Star';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { myEvents } from '../../../events';
import ToDoListItemSubTask from "./ToDoListItemSubTask/ToDoListItemSubTask";
import { deleteTaskAC, togglePropertyTaskAC, updateDateOrTimeTaskAC } from '../../../redux/action/action';
import DatePicker from "../../DatePicker/DatePicker";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { connect } from "react-redux";
import { Fragment } from "react";

const ToDoListItem = ({ item, togglePropertyTaskAC, deleteTaskAC, updateDateOrTimeTaskAC }) => {

    const [showMenuButtons, setShowMenuButtons] = useState(false);

    const onClickDone = (e) => {
        e.stopPropagation();
        togglePropertyTaskAC(item.id, 'done');
    }

    const onClickImportant = (e) => {
        e.stopPropagation();
        togglePropertyTaskAC(item.id, 'important');
    }

    const onClickEdit = (e) => {
        e.stopPropagation();
        myEvents.emit('EupdateEditToDoListItemId', item.id);
    }

    const onClickDelete = (e) => {
        e.stopPropagation();
        deleteTaskAC(item.id);
    }

    const onSaveDateOrTime = (date, time) => {
        updateDateOrTimeTaskAC(item.id, date, time);
    }

    const toggleMenuButtons = (e) => {
        e.stopPropagation();
        setShowMenuButtons(!showMenuButtons);
    }

    const onClickWrapperMobileMenu = () => {
        setShowMenuButtons(false);
    }

    return (
        <Fragment>
            <div onClick={onClickWrapperMobileMenu} className={`todolist__close-wrapper ${showMenuButtons ? `todolist__close-wrapper_mobile` : null}`}></div>
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
                            <IconButton className="ToDoListItem__button ToDoListItem__buttonDone" onClick={onClickDone} color="inherit" aria-label="delete">
                                <CheckIcon fontSize="small" />
                            </IconButton>
                            {item.label}
                        </div>


                        <IconButton className="list__buttonMenu ToDoListItem__button_menu" aria-controls="simple-menu" aria-haspopup="true" onClick={toggleMenuButtons}>
                            <MoreVertIcon />
                        </IconButton>

                        <div className={`ToDoListItem__buttons ${showMenuButtons ? `ToDoListItem__buttons_mobile` : null}`}>
                            <DatePicker eventSaveDateOrTime={onSaveDateOrTime} date={item.date ? item.date : null} time={item.time ? item.time : null} />
                            <IconButton className={`ToDoListItem__button ToDoListItem__button_important  ToDoListItem__button_marginRight ${item.important ? `important` : ``}`} onClick={onClickImportant} color="inherit" aria-label="edit">
                                <StarIcon fontSize="medium" />
                            </IconButton>
                            <IconButton className="ToDoListItem__button ToDoListItem__button_edit ToDoListItem__button_marginRight" onClick={onClickEdit} color="inherit" aria-label="edit">
                                <EditIcon fontSize="medium" />
                            </IconButton>
                            <IconButton className="ToDoListItem__button ToDoListItem__button_delete" onClick={onClickDelete} color="inherit" aria-label="delete">
                                <DeleteOutlinedIcon fontSize="medium" />
                            </IconButton>
                        </div>


                    </div>
                </AccordionSummary>
                <AccordionDetails className="ToDoListItem__details">
                    <ToDoListItemSubTask toDoListItem={item} />
                </AccordionDetails>
            </Accordion>

        </Fragment>
    )
}

const mapDispatchToProps = {
    togglePropertyTaskAC,
    deleteTaskAC,
    updateDateOrTimeTaskAC
}

export default connect(null, mapDispatchToProps)(React.memo(ToDoListItem));