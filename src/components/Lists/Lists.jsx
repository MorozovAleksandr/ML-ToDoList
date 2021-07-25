import React from "react";
import CreateListItem from "./CreateListItem/CreateListItem";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import IconButton from '@material-ui/core/IconButton';
import './Lists.css'
import List from "./List/List";
import { myEvents } from '../../events';

class Lists extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showFormAddList: false
        }
    }

    componentDidMount() {
        myEvents.addListener("EonCloseAddListForm", this.onCloseAddListForm);
    }

    componentWillUnmount() {
        myEvents.removeListener("EonCloseAddListForm", this.onCloseAddListForm);
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

    render() {
        const myLists = this.props.lists.map(item => {
            return (
                <List id={item.id} label={item.label} key={item.id} />
            )
        });
        return (
            <div className="lists">
                <h1 className="lists__title">Списки:</h1>
                {myLists}
                <div className="lists__addListButton" onClick={this.onClickAddList}>
                    <IconButton color="inherit" aria-label="add List">
                        <PlaylistAddIcon fontSize="medium" />
                    </IconButton>
                    <span>Добавить список</span>
                </div>

                {
                    this.state.showFormAddList &&
                    <CreateListItem />
                }
            </div>
        )
    }
}

export default Lists;