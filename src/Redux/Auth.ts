
 export type   authStateType={
     id:string|null
     login:string|null,
     isAuth:boolean
 }
let initialState:authStateType={
    id:null,
    login:null,
    isAuth:false
}

export const authReducer = (state=initialState,action:actionsType) => {
  switch (action.type) {
      case 'GET-AUTH-DATA':
          console.dir(action)
          return{
              ...state,
              id: action.id,
              login:action.login,
              isAuth: action.isAuth
          }
      default: return state
  }
}
type actionsType= ReturnType<typeof getAuth>
const GET_AUTH='GET-AUTH-DATA'
export const getAuth = ( id:string,login:string, isAuth:boolean)=> ({type:GET_AUTH,id,login,isAuth} as const)