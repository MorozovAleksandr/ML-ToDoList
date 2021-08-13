import React, { useState } from "react";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import IconButton from '@material-ui/core/IconButton';
import { addToDoList } from '../../redux/action/action';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { connect } from "react-redux";
import withTodoListService from "../hoc/withTodoListService";
import EditForm from "../EditForm/EditForm";
import List from './List/List';

import Button from '@material-ui/core/Button';
import './Lists.css'
import { Fragment } from "react";

const Lists = ({ lists, addToDoList, user }) => {

    let width = window.innerWidth;

    const [showFormAddList, setShowFormAddList] = useState(false);

    const [mobileButton, setMobileButton] = React.useState(false);

    const toggleDrawer = (open) => (event) => {

        console.log(open);
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMobileButton(open);
    };

    const onClickAddList = () => {
        setShowFormAddList(true);
    }

    const onCloseAddListForm = () => {
        setShowFormAddList(false);
    }

    const onSaveAddList = (label) => {
        addToDoList(user, lists, label);
        onCloseAddListForm()
    }

    const myLists = lists.map(item => {
        let needsDone = 0;
        item.toDoList.forEach(task => {
            if (!task.done) needsDone += 1;
        })
        return (
            <List id={item.id} toggleDrawer={toggleDrawer} needsDone={needsDone} label={item.label} key={item.id} />
        )
    });

    if (width > 768) {
        return (
            <div className="lists" >
                <h1 className="lists__title">Списки:</h1>
                {myLists}
                <div className="lists__addListButton" onClick={onClickAddList} >
                    <IconButton color="inherit" aria-label="add List">
                        <PlaylistAddIcon fontSize="medium" />
                    </IconButton>
                    <span>Добавить список</span>
                </div>

                {
                    showFormAddList &&
                    <EditForm initialLabel={''} title="Новый список" text="Название списка" eventSave={onSaveAddList} eventClose={onCloseAddListForm} />
                }
            </div>
        )
    }

    if (width <= 768) {
        return (
            <Fragment>
                <MenuIcon className="toggleMenu" onClick={toggleDrawer(true)} />
                <Drawer className="lists__wrapper" anchor="left" open={mobileButton} onClose={toggleDrawer(false)}>
                    <div className="lists" >
                        <h1 className="lists__title">Списки:</h1>
                        {myLists}
                        <div className="lists__addListButton" onClick={onClickAddList} >
                            <IconButton color="inherit" aria-label="add List">
                                <PlaylistAddIcon fontSize="medium" />
                            </IconButton>
                            <span>Добавить список</span>
                        </div>

                        {
                            showFormAddList &&
                            <EditForm initialLabel={''} title="Новый список" text="Название списка" eventSave={onSaveAddList} eventClose={onCloseAddListForm} />
                        }
                    </div>
                </Drawer>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ user, lists }) => {
    return {
        user,
        lists
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { todolistService } = ownProps;
    return {
        addToDoList: (user, lists, label) => {
            return addToDoList(todolistService, label, user, lists, dispatch)
        }
    }
}


export default withTodoListService()(connect(mapStateToProps, mapDispatchToProps)(Lists));