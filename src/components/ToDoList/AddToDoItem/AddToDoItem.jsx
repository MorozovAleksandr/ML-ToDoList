import React from "react";
import TextField from '@material-ui/core/TextField';
import './AddToDoItem.css'
import Button from '@material-ui/core/Button';
import { addTaskAC } from '../../../redux/action/action';
import { connect } from "react-redux";


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
            if ((this.state.label.split(' ').length - 1) !== this.state.label.length) {
                this.props.addTaskAC(this.state.label);
                this.setState({ label: '' });
            }
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

const mapDispatchToProps = {
    addTaskAC
}

export default connect(null, mapDispatchToProps)(AddToDoItem);