import React from "react";
import {connect} from "react-redux";
import {getAllUsersApi} from "../../Api/Api";
import {FriendsPage} from "./FriendsPage";
import {actionsApp} from "../../Redux/App/AppReducer";
import {actions} from "../../Redux/ProfilePage/ProfilePageReducer";




class FriendsPageClassComponents extends React.Component<any, any> {

    constructor(props: any) {
        super(props);


    }

    getUsersCallBack = (userName: string, isFollow:string) => {
        this.props.dispatch(actionsApp.toggleIsFetching(true))
        getAllUsersApi( 1, userName,isFollow).then((data:any)=>{
            this.props.dispatch(actions.getUsersAC(data.items,1));
            this.props. dispatch(actionsApp.toggleIsFetching(false))
        }
)
    }

    componentDidMount() {
        getAllUsersApi()

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



