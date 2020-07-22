import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { setCurrentPageAC, toggleFollowingProgressAC, getUsersAC, unfollowSuccessAC, followSuccessAC } from '../../redux/users-reducer';
import Preloader from './../common/Preloader/Preloader';
import { getUsers, getPageCount, getCurrentPage, getPageSize, getIsFetching, getFollowingInProgress, getUsersSelector } from '../../redux/users-selectors';

class UsersContainer extends React.Component {
    componentDidMount = () => {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onChangePage = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        console.log('Render Users')
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users pageCount={this.props.pageCount}
                pageSize={this.props.pageSize}
                onChangePage={this.onChangePage}
                currentPage={this.props.currentPage}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
                toggleFollowingProgress={this.props.toggleFollowingProgress}

            />
        </>


    }
}

/*let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageCount: state.usersPage.pageCount,
        currentPage: state.usersPage.currentPage,
        pageSize: state.usersPage.pageSize,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}*/

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageCount: getPageCount(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {

        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPageAC(currentPage))
        },

        toggleFollowingProgress: (isFetching, userId) => {
            dispatch(toggleFollowingProgressAC(isFetching, userId))
        },

        getUsers: (currentPage, pageSize) => {
            dispatch(getUsersAC(currentPage, pageSize))
        }, 

        unfollow: (userId) => {
            dispatch(unfollowSuccessAC(userId))
        },

        follow: (userId) => {
            dispatch(followSuccessAC(userId))
        }


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)