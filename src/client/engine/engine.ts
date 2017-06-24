
// importing managers
import {AppManager} from "./managers/AppManager";
import {actionDispatcher} from "./core/index";
import {AppState} from "./AppState";

// Stores
export const appState:AppState = new AppState();
// managers
export const appManager:AppManager = new AppManager(appState, actionDispatcher);
