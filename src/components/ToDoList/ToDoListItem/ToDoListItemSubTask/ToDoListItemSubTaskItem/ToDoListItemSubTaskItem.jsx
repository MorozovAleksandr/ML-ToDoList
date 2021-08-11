import React from 'react'; import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import StarIcon from '@material-ui/icons/Star';
import { togglePropertyOrDeleteSubTask } from '../../../../../redux/action/action';

import './ToDoListItemSubTaskItem.css';
import { connect } from 'react-redux';
import withTodoListService from '../../../../hoc/withTodoListService';

const ToDoListItemSubTaskItem = ({ done, important, label, id, taskId, listId, user, lists, togglePropertyOrDeleteSubTask }) => {

    const onClickDone = (e) => {
        e.stopPropagation();
        togglePropertyOrDeleteSubTask(id, taskId, listId, user, lists, 'done');
    }

    const onClickImportant = (e) => {
        e.stopPropagation();
        togglePropertyOrDeleteSubTask(id, taskId, listId, user, lists, 'important');
    }

    const onClickDelete = (e) => {
        e.stopPropagation();
        togglePropertyOrDeleteSubTask(id, taskId, listId, user, lists);

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
                <IconButton className="ToDoListItem__button ToDoListItem__button_marginRight" onClick={() => { console.log('EDIT SUBTASK') }} color="inherit" aria-label="edit">
                    <EditIcon fontSize="medium" />
                </IconButton>
                <IconButton className="ToDoListItem__button" onClick={onClickDelete} color="inherit" aria-label="delete">
                    <DeleteOutlinedIcon fontSize="medium" />
                </IconButton>
            </div>
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
        togglePropertyOrDeleteSubTask: (id, taskId, listId, user, lists, property) => {
            return togglePropertyOrDeleteSubTask(todolistService, id, taskId, listId, user, lists, dispatch, property)
        }
    }
}


export default withTodoListService()(connect(mapStateToProps, mapDispatchToProps)(ToDoListItemSubTaskItem));