import { combineReducers } from "redux"
import { user as userReducer } from "./user"
import { devices as deviceReducer } from "./devices"

let appState = combineReducers({
  user: userReducer,
  devices: deviceReducer,
})

export type AppStateInterface = ReturnType<typeof appState>

export default appState
