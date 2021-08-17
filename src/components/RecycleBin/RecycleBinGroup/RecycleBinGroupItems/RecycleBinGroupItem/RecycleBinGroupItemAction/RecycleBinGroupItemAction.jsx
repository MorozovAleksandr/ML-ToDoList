import React from 'react';
import { connect } from 'react-redux';
import './RecycleBinGroupItemAction.css';
import { restoreItemAC, destroyItemAC } from '../../../../../../redux/action/action';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import RestoreIcon from '@material-ui/icons/Restore';

const RecycleBinGroupItemAction = ({ item, type, restoreItemAC, destroyItemAC }) => {

    const restoreItem = () => {
        restoreItemAC(item, type);
    }

    const destroyItem = () => {
        destroyItemAC(item, type);
    }

    return (
        <div className="RecycleBinGroupItemAction">
            <IconButton className="ToDoListItem__button" onClick={restoreItem} color="inherit" aria-label="restore">
                <RestoreIcon fontSize="medium" />
            </IconButton>
            <IconButton className="ToDoListItem__button" onClick={destroyItem} color="inherit" aria-label="delete">
                <HighlightOffIcon fontSize="medium" />
            </IconButton>
        </div>
    );
};

const mapDispatchToProps = {
    restoreItemAC,
    destroyItemAC
}

export default connect(null, mapDispatchToProps)(RecycleBinGroupItemAction);