

import {actionDispatcher} from "./app/index";

import {EventConstants, Actions} from "./app/service_system/constants";
import {myStore, myManager} from "./app/service_system/index";


myStore.addEventListener(EventConstants.MyStore.HI_HELLO,(result)=>{
    console.log("My Store data updated: " + result)
});

//performing an action
myManager.sayHello();