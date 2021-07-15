import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './Lists.css'

const Lists = React.memo((props) => {
    const updateActiveTodoListId = (id) => {
        props.cbUpdateActiveTodoListId(id);
    }

    const myLists = props.lists.map(item => {
        return (
            <ListItem onClick={() => { updateActiveTodoListId(item.id) }} key={item.id} button>
                <ListItemText primary={item.label} />
            </ListItem>
        )
    });

    return (
        <div className="lists">
            <h1 className="lists__title">Списки:</h1>
            {myLists}
        </div>
    )
});

export default Lists;