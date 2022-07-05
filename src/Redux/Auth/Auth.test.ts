import {actionsAuth, authReducer, authStateType} from "./Auth";


let state:authStateType

beforeEach(()=>{
    state={
        id:null,
        login:null,
        email:null,
        isAuth:false,

    }
})
test('authData should be updated',()=>{
    let action= actionsAuth.setAuthData(1,'azaza','email',true)
    let newState= authReducer(state,action)
    expect(newState.id).toBe(1)
    expect(newState.email).toBe('email')
    expect(newState.login).toBe('azaza')
    expect(newState.isAuth).toBeTruthy()

})