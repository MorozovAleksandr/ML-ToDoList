import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './Lists.css'

class Lists extends React.PureComponent {

    updateActiveTodoListId = (id) => {
        this.props.cbUpdateActiveTodoListId(id);
    }

    render() {
        console.log('render Lists');
        const myLists = this.props.lists.map(item => {
            return (
                <ListItem onClick={() => { this.updateActiveTodoListId(item.id) }} key={item.id} button>
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
    }
}

export default Lists;