import {AppDispatchType, AppStateType} from "../Redux/Redux-store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const useDispatchApp: ()=>AppDispatchType = useDispatch
export const useSelectorApp: TypedUseSelectorHook<AppStateType> = useSelector