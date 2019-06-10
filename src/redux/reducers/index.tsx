import { combineReducers } from 'redux'
import { user } from './user';
import { devices } from './devices';

import { UserInterface } from './user';
import { DevicesInterface } from '../interface/devices.interface';

export interface AppStateInterface {
  user: UserInterface;
  devices: DevicesInterface[];
}

let appState = combineReducers({
  user,
  devices,
});

export default appState;