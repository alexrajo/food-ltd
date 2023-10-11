import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from 'src/redux/store'

type DispatchFunc = () => AppDispatch
/** USE THIS FOR TYPESCRIPT INSTEAD OF REGULAR USEDISPATCH */
export const useAppDispatch: DispatchFunc = useDispatch
/** USE THIS FOR TYPESCRIPT INSTEAD OF REGULAR USESELECTOR */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
