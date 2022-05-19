import React from "react";
import {connect} from "react-redux";

import {FriendsPage} from "./FriendsPage";
import {actionsApp} from "../../Redux/App/AppReducer";
import {actions} from "../../Redux/ProfilePage/ProfilePageReducer";
import {userApi} from "../../Api/Api";





class FriendsPageClassComponents extends React.Component<any, any> {

    constructor(props: any) {
        super(props);


    }

    getUsersCallBack = (userName: string, isFollow:string) => {
        this.props.dispatch(actionsApp.toggleIsFetching(true))
        userApi.getAllUsersApi( 1, userName,isFollow).then((data:any)=>{
            this.props.dispatch(actions.getUsersAC(data.items,1));
            this.props. dispatch(actionsApp.toggleIsFetching(false))
        }
)
    }

    componentDidMount() {
        userApi.getAllUsersApi()

    }

    render() {

        return (
            <FriendsPage state={this.props.state}
                         dispatch={this.props.dispatch}
                         getUsersCallBack={this.getUsersCallBack}

            />
        )
    }

}

const mapStateToProps = (state: any) => (

    {state: state.profilePage})



export default connect(mapStateToProps)(FriendsPageClassComponents)



