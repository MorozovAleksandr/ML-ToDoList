import React from "react";

class ToDoListItem extends React.Component {
    render() {
        return (
            <div>{this.props.item.label}</div>
        )
    }
}

export default ToDoListItem;