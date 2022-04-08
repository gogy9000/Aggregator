import * as axios from 'axios'
import {getUsersAC} from "../Redux/ProfilePage/ProfilePageReducer";



export const getUsersApi=(dispatch:any) => {


   // @ts-ignore
   axios.get('https://social-network.samuraijs.com/api/1.0/users').then(
       (response: any) => {
         dispatch(getUsersAC(response.data.items))




       }
   )

}