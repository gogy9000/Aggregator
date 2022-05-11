import {InferActionsTypes} from "./Redux-store";

export type   authStateType={
     id:string|null
     login:string|null
     email:string|null
     isAuth:boolean

 }
let initialState:authStateType={
    id:null,
    login:null,
    email:null,
    isAuth:false
}

export const authReducer = (state=initialState,action:ActionsType) => {
  switch (action.type) {

      case 'GET-AUTH-DATA':
          return{
              ...state,
              id: action.id,
              login:action.login,
              email: action.email,
              isAuth: true
          }

      default: return state
  }
}



type ActionsType= InferActionsTypes<typeof actions>

 export const actions={
     getAuth:( id:string,login:string, email:string)=> ({type:'GET-AUTH-DATA',id,login,email} as const)
 }

