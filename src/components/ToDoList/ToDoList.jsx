import React from "react";

class ToDoList extends React.Component {
    render() {
        return (
            <h1>
                ToDo List {
                    this.props.activeToDoList &&
                    this.props.activeToDoList.name
                }
            </h1>
        );
    }
}

export default ToDoList;