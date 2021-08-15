import React, { useState } from "react";
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from '@material-ui/core/Fade';
import './List.css';
import { connect } from "react-redux";
import { updateActiveTodoListIdAC, deleteToDoListAC, updateToDoListLabelAC } from '../../../redux/action/action';
import EditForm from "../../EditForm/EditForm";

const List = ({ needsDone, label, id, toggleDrawer, updateActiveTodoListIdAC, updateToDoListLabelAC, deleteToDoListAC }) => {
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
        deleteToDoListAC(id);
        handleClose();
    }

    const onClickEditItem = (e) => {
        e.stopPropagation();
        setShowFormEditListItem(true);
        handleClose();
    }

    const onSaveEdit = (label) => {
        updateToDoListLabelAC(id, label);
        closeFormEditListItem();
    }

    const closeFormEditListItem = () => {
        setShowFormEditListItem(false);
    }

    const updateActiveList = (e) => {
        toggleDrawer(false)(e);
        updateActiveTodoListIdAC(id);
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

const mapDispatchToProps = {
    updateToDoListLabelAC,
    updateActiveTodoListIdAC,
    deleteToDoListAC
}

export default connect(null, mapDispatchToProps)(React.memo(List));