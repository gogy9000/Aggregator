
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

export const authReducer = (state=initialState,action:actionsType) => {
  switch (action.type) {
      case 'GET-AUTH-DATA':
          console.dir(action)
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
type actionsType= ReturnType<typeof getAuth>
const GET_AUTH='GET-AUTH-DATA'
export const getAuth = ( id:string,login:string, email:string)=> ({type:GET_AUTH,id,login,email} as const)