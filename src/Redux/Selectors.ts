import {AppRootStateType} from "./Redux-store";

export const getIsFetching = (state:AppRootStateType) => {
  return state.AppReducer.isFetching
}
export const getProfile = (state:AppRootStateType) => {
  return state.profilePage.profile
}
export const getUsers = (state:AppRootStateType) => {
  return state.profilePage.users
}