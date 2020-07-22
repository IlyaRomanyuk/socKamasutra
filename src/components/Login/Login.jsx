import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { required } from '../../utils/validators';
import { Input } from './../common/Preloader/Textarea'
import { connect } from 'react-redux';
import { loginTC } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import style from "./Login.module.css";

const LoginForm = (props) => {
    let error = props.error;
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={'email'} placeholder={'email'} validate={[required]}/>
            </div>

            <div>
                <Field component={Input} name={'password'} placeholder={'password'} validate={[required]}/>
            </div>

            <div>
                <Field component={Input} type={'checkbox'} name={'rememberMe'}/>
            </div>
            { 
                error && <div className={style.formError}>{error}</div>
            }

            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: "login"})(LoginForm)

const Login = (props) => {
    let getDataFromForm = (data) => {
        props.login(data.email, data.password, data.rememberMe)
    }

    if(props.isAuth){
        return <Redirect to={"profile"} />
    }
    
    return(
        <div>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={getDataFromForm} />
        </div>
    )
}

let mapStateToProps = (state) => (
    {
       isAuth: state.auth.isAuth
    }
)

let mapDispatchToProps = (dispatch) => (
    {
        login: (email, password, rememberMe) => {
            dispatch(loginTC(email, password, rememberMe))
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Login) 