import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logoutTC } from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />
    }
}

let mapStateToProps = (state) =>({
    login: state.auth.login,
    isAuth: state.auth.isAuth
})

let mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(logoutTC())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)