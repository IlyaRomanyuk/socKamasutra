import { apiFunc, profileApi } from './../api/api';
import { stopSubmit } from 'redux-form';
const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_PHOTO = 'SET_PHOTO';

let initialState = {
    posts: [
        { id: '1', post: 'Hi, it is my first post', likeCount: '15' },
        { id: '2', post: 'Like you', likeCount: '7' },
        { id: '3', post: 'Hello', likeCount: '13' }
    ],
    userProfile: null,
    status: null
}

let profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let addNewPost = {
                id: "4",
                post: action.newPostText,
                likeCount: "3"
            }
            let stateCopy = { ...state };
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(addNewPost);
            return stateCopy;
        }

        case SET_USER_PROFILE: {
            let stateCopy = { ...state };
            stateCopy.userProfile = action.profile;
            return stateCopy;
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }

        case SET_PHOTO: {
            return {
                ...state,
                userProfile: {...state.userProfile, photos: action.photo }
            }
        }
        default:
            return state
    }

}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile: profile });
export const setStatus = (status) => ({ type: SET_STATUS, status: status });
export const setPhoto = (photo) => ({ type: SET_PHOTO, photo });

export const setUserProfileAC = (userId) => {
    return async (dispatch) => {
        let data = await apiFunc.setUserOnProfile(userId)
        
        dispatch(setUserProfile(data))
    }
}

export const setStatusTC = (userId) => {
    return async (dispatch) => {
        let data = await profileApi.setStatus(userId)

        dispatch(setStatus(data))
    }
}

export const updateStatusTC = (status) => {
    return async (dispatch) => {
        let data = await profileApi.updateStatus(status)

        if (data.resultCode == 0) {
            dispatch(setStatus(status))
        }
    }
}

export const savePhotoTC = (photo) => {
    return async (dispatch) => {
        let data = await profileApi.savePhoto(photo)

        if (data.resultCode == 0) {
            dispatch(setPhoto(data.photo))
        }
    }
}

export const saveProfileTC = (formData) => {
    debugger
    return async (dispatch, getState) => {
        const userId = getState().auth.id;

        let data = await profileApi.saveProfile(formData)
        if (data.resultCode == 0) {
            dispatch(setUserProfileAC(userId))
        } else {
            dispatch(stopSubmit("profileData", {_error: data.messages[0]}));
            debugger
            return Promise.reject(data.messages[0]);
        }
    }
}

export default profileReducer