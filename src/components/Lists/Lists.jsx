import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Lists extends React.Component {

    updateActiveTodoListId = (id) => {
        this.props.cbUpdateActiveTodoListId(id);
    }

    render() {
        const myLists = this.props.lists.map(item => {
            return (
                <ListItem onClick={() => { this.updateActiveTodoListId(item.id) }} key={item.id} button>
                    <ListItemText primary={item.name} />
                </ListItem>
            )
        })
        return (
            <div>
                <h1>Списки:</h1>
                {myLists}
            </div>
        );
    }
}

export default Lists;