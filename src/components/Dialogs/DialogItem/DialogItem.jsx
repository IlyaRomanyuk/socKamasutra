import React from 'react';
import s from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
    const { name, id } = props;
    const path = '/dialogs/' + id;

    return (
        <div>
            <NavLink to={path}>{name}</NavLink>
        </div>
    )
}

export default DialogItem