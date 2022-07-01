import {InferActionsTypes} from "../Redux-store";

export type initStateType={
    isFetching:boolean
}
const initState:initStateType ={
    isFetching:false
}

export type ActionsAppType = InferActionsTypes<typeof actionsApp>

export const AppReducer = (state:initStateType=initState, action:ActionsAppType):initStateType => {
  switch (action.type) {
      case "TOGGLE-IS-FETCHING":
          return {...state,isFetching:action.isFetching}
      default: return state
  }
}

export const actionsApp={

    toggleIsFetching:(isFetching:boolean)=>({type:'TOGGLE-IS-FETCHING',isFetching }as const)
}

