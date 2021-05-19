import { combineReducers } from "redux"
import songReducer from "./songReducer"

const rootReducer = combineReducers(
  { songReducer: songReducer }
)

export default rootReducer