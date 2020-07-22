import { apiFunc } from "./../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IN_FOLLOWING_PROGRESS = 'TOGGLE_IN_FOLLOWING_PROGRESS';


let initialState = {
    users: [],
    pageSize: 35,
    pageCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    fake: 10
}

let usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FAKE":
            return {
                ...state,
                fake: state.fake + 1
            }
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id == action.userId) {
                        return { ...user, followed: true }
                    }
                    return user
                })
            }
        }

        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id == action.userId) {
                        return { ...user, followed: false }
                    }
                    return user
                })
            }
        }

        case SET_USERS: {
            return {
                ...state, users: action.users
            }
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.currentPage
            }
        }

        case SET_TOTAL_COUNT: {
            return {
                ...state, pageCount: action.totalCount
            }
        }

        case TOGGLE_IS_FETCHING: {
            return {
                ...state, isFetching: action.isFetching
            }
        }

        case TOGGLE_IN_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)

            }
        }

        default:
            return state
    }

}

export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });
export const setCurrentPageAC = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalCountAC = (totalCount) => ({ type: SET_TOTAL_COUNT, totalCount });
export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgressAC = (isFetching, userId) => ({ type: TOGGLE_IN_FOLLOWING_PROGRESS, isFetching, userId });

export const getUsersAC = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true));
        apiFunc.getUsers(currentPage, pageSize).then(data => {
            dispatch(setCurrentPageAC(currentPage));
            dispatch(setUsersAC(data.items));
            dispatch(setTotalCountAC(data.totalCount));
            dispatch(toggleIsFetchingAC(false));
        })
    }
}

export const unfollowSuccessAC = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgressAC(true, userId))
        apiFunc.unfollow(userId)
            .then(data => {
                if (data.resultCode == 0) {
                    dispatch(unfollowAC(userId))
                }
                dispatch(toggleFollowingProgressAC(false, userId))
            })
    }
}

export const followSuccessAC = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgressAC(true, userId))
        apiFunc.follow(userId)
            .then(data => {
                if (data.resultCode == 0) {
                    dispatch(followAC(userId))
                }
                dispatch(toggleFollowingProgressAC(false, userId))
            })
    }
}

export default usersReducer