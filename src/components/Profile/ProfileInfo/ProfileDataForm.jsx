import React from 'react';
import { createField, Input, Textarea } from '../../common/Preloader/Textarea';
import { reduxForm } from 'redux-form';
import style from './../../Login/Login.module.css'

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <button>save</button>
            { 
                error && <div className={style.formError}>{error}</div>
            }
            <div>
                <b>Full Name: </b>
                {createField('full name', 'fullName', [], Input)}
            </div>

            <div>
                <b>Looking job? </b>
                {createField('Looking job', 'lookingForAJob', [], Input, { type: 'checkbox' })}
            </div>

            <div>
                <b>My professional skills: </b>
                {createField('Skills', 'lookingForAJobDescription', [], Textarea)}
            </div>


            <div>
                <b>About me: </b>
                {createField('AboutMe', 'aboutMe', [], Textarea)}
            </div>

            <div>
                <b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
                    return <div key={key}>
                        <b>{key}:</b> {createField(key, 'contacts.' + key, [], Input)}
                    </div>
                })}
            </div> 
        </form>
    )
}

const ProfileDataReduxForm = reduxForm({ form: "profileData" })(ProfileDataForm)

export default ProfileDataReduxForm;
