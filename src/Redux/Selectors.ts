import {AppStateType} from "./Redux-store";

export const getIsFetching = (state:AppStateType) => {
  return state.AppReducer.isFetching
}
export const getProfile = (state:AppStateType) => {
  return state.profilePage.profile
}
export const getUsers = (state:AppStateType) => {
  return state.profilePage.users
}