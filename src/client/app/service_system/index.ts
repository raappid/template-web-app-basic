

//importing managers
import {MyStore} from "./stores/MyStore";
import {MyManager} from "./managers/MyManager";
import {IMyManager} from "./interfaces/managers/IMyManager";

//Stores
export const myStore:IMyStore = new MyStore();

//managers
export const myManager:IMyManager = new MyManager();
