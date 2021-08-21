import React, { useState } from 'react';
import './ToDoListItemSubTask.css';
import Button from '@material-ui/core/Button';
import ToDoListItemSubTaskItem from './ToDoListItemSubTaskItem/ToDoListItemSubTaskItem';
import { connect } from 'react-redux';
import { addSubTaskAC } from '../../../../redux/action/action';
import EditForm from '../../../EditForm/EditForm';

const ToDoListItemSubTask = ({ toDoListItem, addSubTaskAC }) => {

    const [showFormAddSubTask, setshowFormAddSubTask] = useState(false);
    const [taskId] = useState(toDoListItem.id);
    const onCloseAddSubTaskForm = () => {
        setshowFormAddSubTask(false);
    }

    const onSaveAddSubTaskForm = (label) => {
        addSubTaskAC(taskId, label);
        onCloseAddSubTaskForm();
    }

    let renderSubTask;
    if (toDoListItem.subtask) {
        renderSubTask = toDoListItem.subtask.map(item => {
            return <ToDoListItemSubTaskItem key={item.id} date={item.date} time={item.time} taskId={toDoListItem.id} done={item.done} important={item.important} label={item.label} id={item.id} />
        });
    } else {
        renderSubTask = null;
    }

    return (
        <div className="ToDoListItemSubTask_taskblock">
            <div className="ToDoListItemSubTask__renderSubTask">
                {renderSubTask}
            </div>
            <Button className="ToDoListItemSubTaskItem__button" onClick={() => { setshowFormAddSubTask(true) }} variant="contained" color="primary">
                Добавить подзадачу
            </Button>
            {
                showFormAddSubTask &&
                <EditForm initialLabel={''} title="Новая подзадача" text="Имя подзадачи" eventSave={onSaveAddSubTaskForm} eventClose={onCloseAddSubTaskForm} />
            }
        </div>
    );
};

const mapDispatchToProps = {
    addSubTaskAC
}


export default connect(null, mapDispatchToProps)(React.memo(ToDoListItemSubTask));