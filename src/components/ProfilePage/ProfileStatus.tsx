import React, {ChangeEvent} from "react";
import {compose, Dispatch} from "redux";
import {connect, DispatchProp} from "react-redux";
import {AppDispatchType, AppStateType} from "../../Redux/Redux-store";
import {actionsProfile, thunkProfile} from "../../Redux/ProfilePage/ProfilePageReducer";

type ProfileStatusType = {
    state: AppStateType
    dispatch:AppDispatchType
}
type ProfileStatusStateType = {
    editMode: boolean,
    newStatus: string
    error:string
}

export class ProfileStatus extends React.Component<ProfileStatusType, ProfileStatusStateType> {

    state = {
        editMode: false,
        newStatus: this.props.state.profilePage.profileStatus,
        error:''

    }


    toggleEditMode() {
        if(this.props.state.auth.id!==this.props.state.profilePage.profile.userId){return}
        this.setState({editMode: !this.state.editMode})
    }

    changeStatus(e: ChangeEvent<HTMLInputElement>) {
        this.setState({newStatus: e.currentTarget.value})
    }

    // fetchStatus() {
    //     if (!this.state.newStatus.trim().length){
    //         this.setState({error:'все плохо,  переписывай...'})
    //         return
    //     }
    //
    //     this.props.dispatch(thunkProfile.updateProfileStatus(this.state.newStatus.trim()))
    //     this.toggleEditMode()
    //     this.setState({newStatus:''})
    //
    // }
    clearError(){
      if (this.state.error) {
          this.setState({error: ''})
      }
    }
    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<ProfileStatusStateType>, snapshot?: any) {
    if(prevProps.state.profilePage.profileStatus!==this.props.state.profilePage.profileStatus){
        this.setState({newStatus: this.props.state.profilePage.profileStatus})
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
                           // onBlur={this.fetchStatus.bind(this)}
                    />
                    :
                    <span onDoubleClick={this.toggleEditMode.bind(this)}>
                        {this.props.state.profilePage.profileStatus}
                    </span>

                }
            </>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    state: state
})

export const ProfileStatusCompose = compose(connect(mapStateToProps))(ProfileStatus)

