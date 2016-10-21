

import {actionDispatcher} from "./app/index";

import {EventConstants, Actions} from "./app/service_system/constants";

actionDispatcher.addEventListener(EventConstants.HI_HELLO,(result:string)=>{

    console.log("Event Received:\n"+result);
});

//performing an action
actionDispatcher.perform(Actions.SAY_HI_AND_HELLO).then((result:string)=>{
    console.log("Action Performed:\n"+result);
    console.log(result);
});