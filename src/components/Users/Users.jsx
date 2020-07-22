import React, { useState } from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.jpg';
import { NavLink } from 'react-router-dom';
import { apiFunc } from '../../api/api';

const Users = (props) => {
    let pages = [];
    let pagesCount = Math.ceil(props.pageCount / props.pageSize);
    let portionSize = 10;

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = (portionNumber - 1) * portionSize + portionSize;

    return (
        <div className={styles.content}>
            <div className={styles.buttonNavigation}>
                {portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1) }}>Prev</button>}
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                        return <span onClick={() => { props.onChangePage(p) }} className={props.currentPage === p && styles.currentPage}>{p}</span>
                    })}
                {portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>Next</button>}
            </div>
            {props.users.map(user => {
                return (
                    <div key={user.id} className={styles.item}>
                        <div className={styles.person}>
                            <NavLink to={`profile/${user.id}`}>
                                <img src={user.photos.small ? user.photos.small : userPhoto} alt="" />
                            </NavLink>
                            {user.followed ?
                                <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                    props.unfollow(user.id)
                                }}>Unfollow</button> :
                                <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                    props.follow(user.id)
                                }}>Follow</button>}
                        </div>
                        <div className={styles.personAbout}>
                            <div className={styles.firstBlock}>
                                <div>{user.name}</div>
                                <div>{user.status}</div>
                            </div>

                            <div className={styles.secondBlock}>
                                <div>{"user.location.country"}</div>
                                <div>{"user.location.city"}</div>
                            </div>
                        </div>
                    </div>

                )
            })
            }</div >

    )

}

export default Users;