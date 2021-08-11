import React, { useState } from 'react'; import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import StarIcon from '@material-ui/icons/Star';
import { workWithSubTask } from '../../../../../redux/action/action';

import './ToDoListItemSubTaskItem.css';
import { connect } from 'react-redux';
import withTodoListService from '../../../../hoc/withTodoListService';
import EditForm from '../../../../EditForm/EditForm';

const ToDoListItemSubTaskItem = ({ done, important, label, id, taskId, listId, user, lists, workWithSubTask }) => {

    const [showFormEdit, setShowFormEdit] = useState(false);

    const onClickDone = (e) => {
        e.stopPropagation();
        workWithSubTask(id, taskId, listId, user, lists, 'done');
    }

    const onClickImportant = (e) => {
        e.stopPropagation();
        workWithSubTask(id, taskId, listId, user, lists, 'important');
    }

    const onClickDelete = (e) => {
        e.stopPropagation();
        workWithSubTask(id, taskId, listId, user, lists);

    }

    const onClickEdit = (e) => {
        e.stopPropagation();
        setShowFormEdit(true);
    }

    const onCloseEdit = () => {
        setShowFormEdit(false);
    }

    const onSaveEdit = (label) => {
        workWithSubTask(id, taskId, listId, user, lists, null, label);
        onCloseEdit();
    }

    return (
        <div className={`ToDoListItem ToDoListItemSubTask ${done ? `done` : null} ${important ? `important_wrapper` : null}`} >
            <div className="ToDoListItem__leftBlock">
                <IconButton className="ToDoListItem__button ToDoListItem__buttonDone" onClick={onClickDone} color="inherit" aria-label="delete">
                    <CheckIcon fontSize="small" />
                </IconButton>
                {label}
            </div>
            <div className="ToDoListItem__buttons">
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

const mapStateToProps = ({ user, lists }) => {
    return {
        user,
        lists
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { todolistService } = ownProps;
    return {
        workWithSubTask: (id, taskId, listId, user, lists, property, label) => {
            return workWithSubTask(todolistService, id, taskId, listId, user, lists, dispatch, property, label)
        }
    }
}


export default withTodoListService()(connect(mapStateToProps, mapDispatchToProps)(ToDoListItemSubTaskItem));