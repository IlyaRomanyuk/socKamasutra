import React, { useState, useEffect } from 'react';
import s from './ProfileInfo.module.css';


const ProfileStatusWithHook = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatusLocal] = useState(props.status)
    console.log(status)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const setLocalValue = (e) => {
        setStatusLocal(e.currentTarget.value)
    }

    useEffect(() => {
        setStatusLocal(props.status)
    }, props.status)

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || '-----'}</span>
                </div>
            }

            {editMode &&
                <div>
                    <input value={status}
                        onChange={setLocalValue}
                        onBlur={deActivateEditMode}
                        autoFocus={true} type="text" />
                </div>
            }
        </div>
    )



}

export default ProfileStatusWithHook