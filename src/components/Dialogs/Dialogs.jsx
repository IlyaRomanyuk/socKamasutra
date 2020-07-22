import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message'
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../utils/validators';
import { Textarea } from '../common/Preloader/Textarea';


const Dialogs = (props) => { 
    let state = props.dialogsPage;

    let dialogsItems = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
    let messagesItems = state.messages.map(m => <Message message={m.message} />);

    let onSendMessage = (values) => {
        props.onSendMessage(values.message)
    }

    if (!props.isAuth) {
        return <Redirect to={'/login'} />
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsItems}
            </div>

            <div className={s.messages}>
                <div>{messagesItems}</div>
                <DialogsReduxForm onSubmit={onSendMessage}/>
            </div>
        </div>
    )
}

let maxLength = maxLengthCreator(10);

let DialogsReduxForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="message" placeholder="your text"
                    validate={[required, maxLength]} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

DialogsReduxForm = reduxForm({form: "message"})(DialogsReduxForm)

export default Dialogs