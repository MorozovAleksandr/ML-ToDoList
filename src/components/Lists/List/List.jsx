import React, { useState } from "react";
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from '@material-ui/core/Fade';
import './List.css';
import withTodoListService from '../../hoc/withTodoListService';
import { connect } from "react-redux";
import { updateActiveTodoListId, updateToDoListLabel, deleteToDoList } from '../../../redux/action/action-functions'
import EditForm from "../../EditForm/EditForm";

const List = ({ needsDone, label, id, lists, user, activeToDoListId, updateToDoListLabel, deleteToDoList, updateActiveTodoListId, toggleDrawer }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [showFormEditListItem, setShowFormEditListItem] = useState(false);

    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClickDeleteItem = (e) => {
        e.stopPropagation();
        deleteToDoList(id, lists, user, activeToDoListId)
        handleClose();
    }

    const onClickEditItem = (e) => {
        e.stopPropagation();
        setShowFormEditListItem(true);
        handleClose();
    }

    const onSaveEdit = (label) => {
        updateToDoListLabel(id, label, user, lists)
        closeFormEditListItem()
    }

    const closeFormEditListItem = () => {
        setShowFormEditListItem(false);
    }

    const updateActiveList = (e) => {
        toggleDrawer(false)(e);
        updateActiveTodoListId(id, user);
    }

    return (
        <div>
            <ListItem className="list__item" onClick={updateActiveList} button>
                <div>
                    {label}
                    {
                        needsDone !== 0 &&
                        <span className="list__item_needsDone">{needsDone}</span>
                    }
                </div>
                <div className="list__wrapper__list__buttonMenu">
                    <IconButton className="list__buttonMenu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={onClickEditItem}>Редактировать</MenuItem>
                        <MenuItem onClick={onClickDeleteItem}>Удалить</MenuItem>
                    </Menu>
                </div>
            </ListItem>

            {
                showFormEditListItem &&
                <EditForm initialLabel={label} title="Редактирование списка" text="Название списка" eventSave={onSaveEdit} eventClose={closeFormEditListItem} />
            }
        </div>
    )
}

const mapStateToProps = ({ user, activeToDoListId, lists }) => {
    return {
        user,
        activeToDoListId,
        lists
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { todolistService } = ownProps;
    return {
        updateActiveTodoListId: (id, user) => {
            return updateActiveTodoListId(todolistService, dispatch, user, id)
        },
        deleteToDoList: (id, lists, user, activeToDoListId) => {
            return deleteToDoList(todolistService, id, lists, user, activeToDoListId, dispatch)
        },
        updateToDoListLabel: (id, label, user, lists) => {
            return updateToDoListLabel(todolistService, id, label, user, lists, dispatch)
        }
    }
}

export default withTodoListService()(connect(mapStateToProps, mapDispatchToProps)(List));