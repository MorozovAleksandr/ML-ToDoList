import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './Lists.css'
import CreateList from "./CreateList/CreateList";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import IconButton from '@material-ui/core/IconButton';

class Lists extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showFormAddList: false
        }
    }

    onClickAddList = () => {
        this.setState({
            showFormAddList: true
        })
    }

    onCloseAddListForm = () => {
        this.setState({
            showFormAddList: false
        })
    }

    onClickAddList = () => {
        this.setState({ showFormAddList: true })
    }

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
                {/* <button onClick={this.onClickAddList}> */}
                <div className="lists__addListButton" onClick={this.onClickAddList}>
                    <IconButton color="inherit" aria-label="add List">
                        <PlaylistAddIcon fontSize="medium" />
                    </IconButton>
                    <span>Добавить список</span>
                </div>

                {
                    this.state.showFormAddList &&
                    <CreateList cbAddTodoList={this.props.cbAddTodoList} cbOnCloseAddListForm={this.onCloseAddListForm} />
                }
            </div>
        )
    }
}

export default Lists;