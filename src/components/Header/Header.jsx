import React from 'react';
import s from'./Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    let btnPressLogout = () => {
        props.logout()
    }

    return <header className={s.header}>
        <img src="https://www.freelogodesign.org/Content/img/logo-samples/flooop.png" />

        <div className={s.loginBlock}>
            {props.isAuth ? <div> {props.login} <button onClick={btnPressLogout}>LogOut</button></div>  : <NavLink to={"/login"}>Login</NavLink>}
        </div>
    </header>
}

export default Header