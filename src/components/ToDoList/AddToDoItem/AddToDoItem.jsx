import React from "react";
import TextField from '@material-ui/core/TextField';
import './AddToDoItem.css'
import Button from '@material-ui/core/Button';
import { myEvents } from '../../../events';


class AddToDoItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            label: ''
        }
    }

    onLabelChange = (e) => {
        this.setState({ label: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.label) {
            myEvents.emit('EaddItem', this.state.label);
            this.setState({ label: '' });
        }
    }

    render() {
        return (
            <form className="addToDoItem" onSubmit={this.onSubmit}>
                <TextField className="addToDoItem__input" autoComplete="off" onChange={this.onLabelChange} id="standard-basic" value={this.state.label} label="Что должно быть сделано" />
                <Button className="addToDoItem__button" type='submit' variant="contained" color="primary">
                    Добавить
                </Button>
            </form>
        )
    }
}

export default AddToDoItem;