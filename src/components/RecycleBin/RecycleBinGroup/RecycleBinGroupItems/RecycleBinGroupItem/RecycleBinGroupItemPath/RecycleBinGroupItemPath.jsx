import React from 'react';
import './RecycleBinGroupItemPath.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const RecycleBinGroupItemPath = ({ path }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="RecycleBinGroupItemPath">

            <Button className="addToDoItem__button" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Увидеть путь
            </Button>
            <StyledMenu
                className="RecycleBinGroupItemPath__path"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    path.list &&
                    <div className="RecycleBinGroupItemPath__path_item RecycleBinGroupItemPath__path_list">Список - {path.list}</div>
                }

                {
                    path.task &&

                    <div className="RecycleBinGroupItemPath__path_item RecycleBinGroupItemPath__path_task">
                        <KeyboardArrowDownIcon />
                        <div>Задача - {path.task}</div>
                    </div>
                }

                {
                    path.subtask &&
                    <div className="RecycleBinGroupItemPath__path_item RecycleBinGroupItemPath__path_subtask">
                        <KeyboardArrowDownIcon />
                        <div>Подзадача - {path.subtask}</div>
                    </div>
                }

            </StyledMenu>
        </div>
    );
};

export default RecycleBinGroupItemPath;