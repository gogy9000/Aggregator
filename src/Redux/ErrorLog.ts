import {InferActionsTypes} from "./Redux-store";

type InitialStateType = {
    errors: { [id: string]: string }
}
const initialState: InitialStateType = {
    errors: {}
}

export const errorLog = (state = initialState, action: ErrorLogActionsType): InitialStateType => {
    switch (action.type) {
        case "ADD-ERROR":
            return {
                ...state,
                errors: {...state.errors, ...action.payload}
            }

        default:
            return state
    }
}
type ErrorLogActionsType = InferActionsTypes<typeof errorsLogActions>
 export const errorsLogActions = {
    addError: (payload: { [id: string]: string }) => ({type: "ADD-ERROR", payload} as const)
}