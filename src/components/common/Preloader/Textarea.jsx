import React from 'react';
import styles from './Textarea.module.css';
import { Field } from 'redux-form';

const FormControl = (props) => {
    let hasError = props.meta.touched && props.meta.error
    return (
        <div className={styles.container}>
            {props.children}
            {hasError && <div className={styles.blockError}>{props.meta.error}</div>}
        </div>
    )
}

export const Textarea = (props) => {
    let hasError = props.meta.touched && props.meta.error
    return <FormControl {...props}>
        <textarea placeholder={props.placeholder} {...props.input} className={hasError && styles.error} />
    </FormControl>
}

export const Input = (props) => {
    let hasError = props.meta.touched && props.meta.error
    return <FormControl {...props}>
        <input placeholder={props.placeholder} {...props.input} className={hasError && styles.error} type={props.type} />
    </FormControl>
}

export const createField = (placeholder, name, validators, component, props={}, text='') => {
    return ( <div>
        <Field component={component} placeholder={placeholder} name={name} validate={validators} {...props}/> {text}
    </div>
    )
}
