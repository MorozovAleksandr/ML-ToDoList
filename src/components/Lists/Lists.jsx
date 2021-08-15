import React, { useState } from "react";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import IconButton from '@material-ui/core/IconButton';
import { addToDoListAC } from '../../redux/action/action';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { connect } from "react-redux";
import EditForm from "../EditForm/EditForm";
import List from './List/List';
import './Lists.css'
import crypto from "crypto";
import { Fragment } from "react";

const Lists = ({ lists, addToDoListAC }) => {
    let width = window.innerWidth;

    const [showFormAddList, setShowFormAddList] = useState(false);

    const [mobileButton, setMobileButton] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMobileButton(open);
    };

    const createTodoList = (label, list) => {
        return {
            id: crypto.randomBytes(3).toString("hex"),
            label: label,
            toDoList: list
        }
    }

    const onClickAddList = () => {
        setShowFormAddList(true);
    }

    const onCloseAddListForm = () => {
        setShowFormAddList(false);
    }

    const onSaveAddList = (label) => {
        addToDoListAC(createTodoList(label, []));
        onCloseAddListForm();
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

const mapStateToProps = ({ lists }) => {
    return {
        lists
    }
}

const mapDispatchToProps = {
    addToDoListAC
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Lists));