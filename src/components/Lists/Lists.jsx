import React, { useState } from "react";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import IconButton from '@material-ui/core/IconButton';
import { addToDoListAC, updateActiveTodoListIdAC } from '../../redux/action/action';
import { connect } from "react-redux";
import EditForm from "../EditForm/EditForm";
import List from './List/List';
import './Lists.css'
import crypto from "crypto";
import HomeIcon from '@material-ui/icons/Home';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { Fragment } from "react";

const Lists = ({ lists, addToDoListAC, updateActiveTodoListIdAC }) => {

    const [showFormAddList, setShowFormAddList] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenNav(false);
    };

    const [openNav, setOpenNav] = useState(false);

    const onClickToggleIcon = () => {
        setOpenNav(!openNav);
    }

    const onClickWrapperMobileMenu = () => {
        setOpenNav(false);
    }


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

    const updateActiveToDoListId = () => {
        setOpenNav(false);
        updateActiveTodoListIdAC(null);
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


    return (
        <Fragment>
            <div onClick={onClickWrapperMobileMenu} className={`lists__close-wrapper ${openNav ? `lists__close-wrapper_mobile` : null}`}></div>
            <div className={`lists ${openNav ? `lists_mobile` : null}`}  >
                <input checked={openNav} readOnly type="checkbox" id="hmt" className="hidden-menu-ticker"></input>
                <label className={`btn-menu toggleMenu ${openNav ? `toggleMenu__mobile` : null}`} htmlFor="hmt" onClick={onClickToggleIcon}>
                    <span className="first"></span>
                    <span className="second"></span>
                    <span className="third"></span>
                </label>
                <h1 className="lists_main" onClick={updateActiveToDoListId}>
                    <HomeIcon />
                    <span>Главная</span>
                </h1>
                <h2 className="lists__title">
                    <FormatListBulletedIcon />
                    <span>
                        Списки:
                    </span>
                </h2>
                <div className={`lists__renderList ${openNav ? `lists__renderList_mobile` : null}`}>
                    {myLists}
                </div>
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
        </Fragment>
    )
}

const mapStateToProps = ({ lists }) => {
    return {
        lists
    }
}

const mapDispatchToProps = {
    addToDoListAC,
    updateActiveTodoListIdAC
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Lists));