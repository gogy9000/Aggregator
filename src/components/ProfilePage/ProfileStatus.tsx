import React, {ChangeEvent} from "react";
import {compose, Dispatch} from "redux";
import {connect, DispatchProp} from "react-redux";
import {AppStateType} from "../../Redux/Redux-store";
import {actions} from "../../Redux/ProfilePage/ProfilePageReducer";

type ProfileStatusType = {
    profileStatus: string
    dispatch:Dispatch
}
type ProfileStatusStateType = {
    editMode: boolean,
    newStatus: string
    error:string
}

export class ProfileStatus extends React.Component<ProfileStatusType, ProfileStatusStateType> {

    state = {
        editMode: false,
        newStatus: this.props.profileStatus,
        error:''

    }


    toggleEditMode() {
        this.setState({editMode: !this.state.editMode})
    }

    changeStatus(e: ChangeEvent<HTMLInputElement>) {
        this.setState({newStatus: e.currentTarget.value})
    }

    fetchStatus() {
        if (!this.state.newStatus.trim().length){
            this.setState({error:'все плохо,  переписывай...'})
            return
        }

        this.props.dispatch(actions.changeProfileStatus(this.state.newStatus.trim()))
        this.toggleEditMode()
        this.setState({newStatus:''})

    }
    clearError(){
      if (this.state.error) {
          this.setState({error: ''})
      }
    }


    render() {

        return (
            <>
                {this.state.editMode
                    ?
                    <input autoFocus
                           value={this.state.error?this.state.error:this.state.newStatus}
                           onFocus={this.clearError.bind(this)}
                           onChange={this.changeStatus.bind(this)}
                           onBlur={this.fetchStatus.bind(this)}/>
                    :
                    <span onDoubleClick={this.toggleEditMode.bind(this)}>
                        {this.props.profileStatus}
                    </span>

                }
            </>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    profileStatus: state.profilePage.profileStatus
})

export const ProfileStatusCompose = compose(connect(mapStateToProps))(ProfileStatus)