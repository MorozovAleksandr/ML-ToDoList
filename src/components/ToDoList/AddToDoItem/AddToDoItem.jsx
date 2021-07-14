import React from "react";
import TextField from '@material-ui/core/TextField';
import './AddToDoItem.css'
import Button from '@material-ui/core/Button';

class AddToDoItem extends React.Component {

    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.cbAddItem(this.state.label);
        this.setState({
            label: ''
        });
    }

    render() {
        return (
            <form className="addToDoItem" onSubmit={this.onSubmit}>
                <TextField className="addToDoItem__input" onChange={this.onLabelChange} id="standard-basic" value={this.state.label} label="What needs to be done" />
                <Button type='submit' variant="contained" color="primary">
                    Add task
                </Button>
            </form>
        )
    }
}

export default AddToDoItem;