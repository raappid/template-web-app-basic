

require("core-js/shim");

import {EventConstants} from "./app/service_system/constants";
import {myStore, myManager} from "./app/service_system/index";

var app:HTMLDivElement = document.getElementById("app") as HTMLDivElement;

var sayHiButton:HTMLButtonElement = document.getElementById("sayHiButton") as HTMLButtonElement;
var sayHiResponseLabel:HTMLSpanElement = document.getElementById("sayHiResponseLabel") as HTMLSpanElement;

myStore.addEventListener(EventConstants.MyStore.HI_HELLO,(result)=>{
    sayHiResponseLabel.textContent = result;
    console.log("My Store data updated: " + result)
});



sayHiButton.addEventListener("click",()=>{

    //performing an action
    myManager.sayHello();
});
