import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { setUserProfileAC, setStatusTC, updateStatusTC, savePhotoTC, saveProfileTC} from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import withRedirectComponent from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


class ProfileContainer extends React.Component {
  refresh() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.userId

      if(!userId){
        this.props.history.push("/login")
      }
    }
    this.props.setUserProfile(userId)
    this.props.setStatus(userId)
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.match.params.userId != prevProps.match.params.userId) {
      this.refresh();
    }
  }

  render() {
    return <Profile saveProfile={this.props.saveProfile} isOwner={this.props.match.params.userId}  {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.userProfile,
  status: state.profilePage.status,
  userId: state.auth.id
})

let mapDispatchToProps = (dispatch) => ({
  setUserProfile: (userId) => {
    dispatch(setUserProfileAC(userId))
  },

  setStatus: (userId) => {
    dispatch(setStatusTC(userId))
  }, 

  updateStatus:(status) => {
    dispatch(updateStatusTC(status))
  },

  savePhoto: (photo) => {
    dispatch(savePhotoTC(photo))
  },

  saveProfile: (formData) => {
    dispatch(saveProfileTC(formData))
  }
})

/*let withAuthRedirect = withRedirectComponent(ProfileContainer)
let WithRouterProfileContainer = withRouter(withAuthRedirect)
connect(mapStateToProps, mapDispatchToProps)(WithRouterProfileContainer)
*/

export default compose(connect(mapStateToProps, mapDispatchToProps),
  withRouter)(ProfileContainer)