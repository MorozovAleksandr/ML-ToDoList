import React from 'react';
import './RecycleBin.css';
import { NavLink } from 'react-router-dom';
import RecycleBinGroup from './RecycleBinGroup/RecycleBinGroup';
import Button from '@material-ui/core/Button';

const RecycleBin = () => {
    return (
        <div className="RecycleBin">
            <NavLink to="/">
                <Button className="RecycleBin_back" variant="contained" color="primary">
                    Назад
                </Button>
            </NavLink>

            <RecycleBinGroup />
        </div>
    )
}

export default RecycleBin;