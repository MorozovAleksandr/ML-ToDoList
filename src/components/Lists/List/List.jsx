import React from "react";
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from '@material-ui/core/Fade';
import './List.css';
import EditListItem from "./EditListItem/EditListItem";
import { myEvents } from '../../../events';

class List extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            showFormEditListItem: false
        }
    }

    componentDidMount() {
        myEvents.addListener("EcloseFormEditListItem", this.closeFormEditListItem);
    }

    componentWillUnmount() {
        myEvents.removeListener("EcloseFormEditListItem", this.closeFormEditListItem);
    }

    handleClick = (e) => {
        e.stopPropagation();
        this.setState({
            anchorEl: e.currentTarget
        })
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    };

    onClickDeleteItem = (e) => {
        e.stopPropagation();
        myEvents.emit('EdeleteToDoList', this.props.id);
        this.handleClose();
    }

    onClickEditItem = (e) => {
        e.stopPropagation();
        this.setState({
            showFormEditListItem: true
        })
        this.handleClose();
    }

    closeFormEditListItem = () => {
        this.setState({
            showFormEditListItem: false
        })
    }

    render() {
        const open = Boolean(this.state.anchorEl);
        return (
            <div>
                <ListItem className="list__item" onClick={() => { myEvents.emit('EupdateActiveTodoListId', this.props.id); }} button>
                    <div>
                        {this.props.label}
                        {
                            this.props.needsDone !== 0 &&
                            <span className="list__item_needsDone">{this.props.needsDone}</span>
                        }
                    </div>
                    <div className="list__wrapper__list__buttonMenu">
                        <IconButton className="list__buttonMenu" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={open}
                            onClose={this.handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={this.onClickEditItem}>Редактировать</MenuItem>
                            <MenuItem onClick={this.onClickDeleteItem}>Удалить</MenuItem>
                        </Menu>
                    </div>
                </ListItem>

                {
                    this.state.showFormEditListItem &&
                    <EditListItem id={this.props.id} label={this.props.label} />
                }
            </div>
        )
    }
}

export default List;