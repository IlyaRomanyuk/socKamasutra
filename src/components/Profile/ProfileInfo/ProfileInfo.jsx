import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHook from './ProfileStatus copy';
import userPhoto from './../../../assets/images/user.jpg';
import { profileApi } from '../../../api/api';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = (props) => {
    const [editMode, setEditMode] = useState(false);

    if (props.profile === null) {
        return <Preloader />
    }

    let sectedPhoto = (event) => {
        if(event.target.files.length) {
            props.savePhoto(event.target.files[0])
        }
    } 

    let onSubmit = (formData) => {
        props.saveProfile(formData)
        setEditMode(false)
    }
    
    return (
        <div>
            <div>
                <img src='https://cs8.pikabu.ru/post_img/big/2018/03/08/9/15205200051669284.jpg' />
            </div>
            <div className={s.description}>
                <img className={s.imgDimych} src={props.profile.photos.large || userPhoto} />
                {!props.isOwner && <input type='file' onChange={sectedPhoto} ></input>}
                <br />
                {editMode 
                    ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/> 
                    : <ProfileData isOwner={props.isOwner} profile={props.profile} editChange={() => {setEditMode(true)}} />}
                

                <ProfileStatusWithHook updateStatus={props.updateStatus} status={props.status} />
            </div>
        </div>
    )
}

const ProfileData = ({ profile, editChange, isOwner }) => {
    return (
        <div>
            {!isOwner && <button onClick={editChange}>edit</button>}
            <div>
                <b>Full Name: </b> {profile.fullName}
            </div>

            <div>
                <b>Looking job? </b> {profile.lookingForAJob ? 'yes' : 'no'}
            </div>

            {
                profile.lookingForAJob &&
                <div>
                    <b>My professional skills: </b>{profile.lookingForAJobDescription}
                </div>
            }

            <div>
                <b>About me: </b>{profile.aboutMe}
            </div>

            <div>
                <b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
                    return <ProfileContacts contactKey={key} contactValue={profile.contacts[key]} />
                })}
            </div>
        </div>
    )
}

const ProfileContacts = ({ contactKey, contactValue }) => {
    return (
        <div>
            <b>{contactKey}</b> {contactValue}
        </div>
    )
}

export default ProfileInfo