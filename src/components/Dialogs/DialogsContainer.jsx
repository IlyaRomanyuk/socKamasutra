import React from 'react';
import { addMessageCreator } from './../../redux/dialogs-reducer'
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import withRedirectComponent from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSendMessage: (message) => {
            dispatch(addMessageCreator(message));
        }
    }
}

/*let withAuthRedirect = withRedirectComponent(Dialogs)
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect)*/
export default compose(connect(mapStateToProps, mapDispatchToProps),withRedirectComponent)(Dialogs)