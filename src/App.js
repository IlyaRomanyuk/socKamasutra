import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { setAuthUserDataAC } from './redux/auth-reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initialezedTC } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';

class App extends React.Component {

  componentDidMount() {
    this.props.inithialized()
  }

  render() {
    if(!this.props.inithialize) {
      return <Preloader />
    }

    return (
        <div className='app-wrapper'>
          <HeaderContainer />
          <Navbar />
          <div className="app-wrapper-content">
            <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
            <Route path='/dialogs' render={() => <DialogsContainer />} />
            <Route path='/users' render={() => <UsersContainer />} />
            <Route path='/login' render={() => <Login />} />
            <Route path='/news' component={News} />
            <Route path='/music' component={Music} />
            <Route path='/settings' component={Settings} />
          </div>
        </div>
    );
  }

}

let mapStateToProps = (state) => ({
    inithialize: state.app.initialized
  }
)
let mapDispatchToProps = (dispatch) => ({
  inithialized: () => {
    dispatch(initialezedTC())
  }
})

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
