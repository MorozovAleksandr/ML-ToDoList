import React from "react";
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
import { updateToDoListItemTimeOrDate } from '../../../redux/action/action';
import DatePicker from "../../DatePicker/DatePicker";
import { connect } from "react-redux";
import withTodoListService from "../../hoc/withTodoListService";

class ToDoListItem extends React.PureComponent {

    onClickDone = (e) => {
        e.stopPropagation();
        myEvents.emit('EtogglePropertyItem', this.props.item.id, 'done');
    }

    onClickImportant = (e) => {
        e.stopPropagation();
        myEvents.emit('EtogglePropertyItem', this.props.item.id, 'important');
    }

    onClickEdit = (e) => {
        e.stopPropagation();
        myEvents.emit('EupdateEditToDoListItemId', this.props.item.id);
    }

    onClickDelete = (e) => {
        e.stopPropagation();
        myEvents.emit('EdeleteItem', this.props.item.id);
    }

    onSaveDateOrTime = (date, time) => {
        const { activeToDoListId, user, lists, updateToDoListItemTimeOrDate } = this.props;
        updateToDoListItemTimeOrDate(activeToDoListId, this.props.item.id, user, lists, date, time);
    }

    render() {
        return (
            <Accordion className={`ToDoListItem__Accordion ${this.props.item.done ? `done` : null} ${this.props.item.important ? `important_wrapper` : null}`}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="ToDoListItem__Accordion_grid"
                >
                    <div className={`ToDoListItem ${this.props.item.done ? `done` : null} ${this.props.item.important ? `important_wrapper` : null}`} >
                        <div className="ToDoListItem__leftBlock">
                            <IconButton className="ToDoListItem__button ToDoListItem__buttonDone" onClick={this.onClickDone} color="inherit" aria-label="delete">
                                <CheckIcon fontSize="small" />
                            </IconButton>
                            {this.props.item.label}
                        </div>
                        <div className="ToDoListItem__buttons">
                            <DatePicker eventSaveDateOrTime={this.onSaveDateOrTime} date={this.props.item.date ? this.props.item.date : null} time={this.props.item.time ? this.props.item.time : null} />
                            <IconButton className={`ToDoListItem__button ToDoListItem__button_marginRight ${this.props.item.important ? `important` : ``}`} onClick={this.onClickImportant} color="inherit" aria-label="edit">
                                <StarIcon fontSize="medium" />
                            </IconButton>
                            <IconButton className="ToDoListItem__button ToDoListItem__button_marginRight" onClick={this.onClickEdit} color="inherit" aria-label="edit">
                                <EditIcon fontSize="medium" />
                            </IconButton>
                            <IconButton className="ToDoListItem__button" onClick={this.onClickDelete} color="inherit" aria-label="delete">
                                <DeleteOutlinedIcon fontSize="medium" />
                            </IconButton>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails className="ToDoListItem__details">
                    <ToDoListItemSubTask toDoListItem={this.props.item} />
                </AccordionDetails>
            </Accordion>

        )
    }
}

const mapStateToProps = ({ user, lists, activeToDoListId }) => {
    return {
        user,
        lists,
        activeToDoListId
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { todolistService } = ownProps;
    return {
        updateToDoListItemTimeOrDate: (activeToDoListId, taskId, user, lists, date, time) => {
            return updateToDoListItemTimeOrDate(todolistService, activeToDoListId, taskId, user, lists, dispatch, date, time);
        }

    }
}


export default withTodoListService()(connect(mapStateToProps, mapDispatchToProps)(ToDoListItem));