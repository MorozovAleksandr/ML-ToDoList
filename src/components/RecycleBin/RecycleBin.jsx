import React from 'react';
import './RecycleBin.css';
import { NavLink } from 'react-router-dom';
import RecycleBinGroup from './RecycleBinGroup/RecycleBinGroup';
import Typography from '@material-ui/core/Typography';

const RecycleBin = () => {
    return (
        <div className="RecycleBin">
            <NavLink to="/">
                <Typography className="RecycleBin_back" variant="h4" gutterBottom>
                    Назад
                </Typography>
            </NavLink>

            <RecycleBinGroup />
        </div>
    )
}

export default RecycleBin;