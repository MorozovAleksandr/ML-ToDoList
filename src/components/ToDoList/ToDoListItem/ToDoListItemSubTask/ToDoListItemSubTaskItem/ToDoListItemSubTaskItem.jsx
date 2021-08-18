import React, { useState } from 'react'; import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import StarIcon from '@material-ui/icons/Star';
import { updateDateOrTimeSubTaskAC, workWithSubTaskAC } from '../../../../../redux/action/action';
import './ToDoListItemSubTaskItem.css';
import { connect } from 'react-redux';
import EditForm from '../../../../EditForm/EditForm';
import DatePicker from '../../../../DatePicker/DatePicker';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ToDoListItemSubTaskItem = ({ done, important, date, time, label, id, taskId, workWithSubTaskAC, updateDateOrTimeSubTaskAC }) => {

    const [showFormEdit, setShowFormEdit] = useState(false);
    const [showMenuButtons, setShowMenuButtons] = useState(false);

    const onClickDone = (e) => {
        e.stopPropagation();
        workWithSubTaskAC(id, taskId, 'done');
    }

    const onClickImportant = (e) => {
        e.stopPropagation();
        workWithSubTaskAC(id, taskId, 'important');
    }

    const onClickDelete = (e) => {
        e.stopPropagation();
        workWithSubTaskAC(id, taskId);
    }

    const onClickEdit = (e) => {
        e.stopPropagation();
        setShowFormEdit(true);
    }

    const onCloseEdit = () => {
        setShowFormEdit(false);
    }

    const onSaveEdit = (label) => {
        workWithSubTaskAC(id, taskId, null, label);
        onCloseEdit();
    }

    const onSaveDateOrTime = (date, time) => {
        updateDateOrTimeSubTaskAC(id, taskId, date, time);
    }

    const toggleMenuButtons = (e) => {
        e.stopPropagation();
        setShowMenuButtons(!showMenuButtons);
    }
    return (
        <div className={`ToDoListItem ToDoListItemSubTask ${done ? `done` : null} ${important ? `important_wrapper` : null}`} >
            <div className="ToDoListItem__leftBlock">
                <IconButton className="ToDoListItem__button ToDoListItem__buttonDone" onClick={onClickDone} color="inherit" aria-label="delete">
                    <CheckIcon fontSize="small" />
                </IconButton>
                {label}
            </div>

            <IconButton className="list__buttonMenu ToDoListItem__button_menu" aria-controls="simple-menu" aria-haspopup="true" onClick={toggleMenuButtons}>
                <MoreVertIcon />
            </IconButton>

            <div className={`ToDoListItem__buttons ${showMenuButtons ? `ToDoListItem__buttons_mobile` : null}`}>
                <DatePicker eventSaveDateOrTime={onSaveDateOrTime} date={date ? date : null} time={time ? time : null} />
                <IconButton className={`ToDoListItem__button ToDoListItem__button_marginRight ${important ? `important` : ``}`} onClick={onClickImportant} color="inherit" aria-label="edit">
                    <StarIcon fontSize="medium" />
                </IconButton>
                <IconButton className="ToDoListItem__button ToDoListItem__button_marginRight" onClick={onClickEdit} color="inherit" aria-label="edit">
                    <EditIcon fontSize="medium" />
                </IconButton>
                <IconButton className="ToDoListItem__button" onClick={onClickDelete} color="inherit" aria-label="delete">
                    <DeleteOutlinedIcon fontSize="medium" />
                </IconButton>
            </div>
            {
                showFormEdit &&
                <EditForm initialLabel={label} title="Редактирование подзадачи" text="Подзадача" eventSave={onSaveEdit} eventClose={onCloseEdit} maxLength="40" />
            }
        </div>
    );
};

const mapDispatchToProps = {
    workWithSubTaskAC,
    updateDateOrTimeSubTaskAC
}


export default connect(null, mapDispatchToProps)(React.memo(ToDoListItemSubTaskItem));