
// importing managers
import {AppManager} from "./managers/AppManager";
import {actionDispatcher} from "./core/index";
import {AppState} from "./AppState";
import {UserManager} from "./managers/UserManager";

// Stores
export const appState:AppState = new AppState();
// managers
export const appManager:AppManager = new AppManager(appState, actionDispatcher);
export const userManager:UserManager = new UserManager(appState, actionDispatcher);
