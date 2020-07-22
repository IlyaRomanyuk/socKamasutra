import React from 'react';
import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deActivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }

    setLocalValue = (e) => {
        this.setState({
            status: e.target.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "------"}</span>
                    </div>
                }

                {this.state.editMode &&
                    <div>
                        <input onChange={this.setLocalValue} autoFocus={true} 
                        onBlur={this.deActivateEditMode} type="text" value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }

}

export default ProfileStatus