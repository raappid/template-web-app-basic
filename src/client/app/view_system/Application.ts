
import {EventConstants} from "../service_system/constants";
import {myStore, myManager} from "../service_system";


export class Application {

    private appNode:HTMLElement;

    private sayHiButton:HTMLButtonElement;
    private sayHiResponseLabel:HTMLSpanElement;

    /*
     * This Is an application yayayaya
     * */
    constructor(appNode:HTMLElement) {
        this.appNode = appNode;
        this.sayHiButton = document.getElementById("sayHiButton") as HTMLButtonElement;
        this.sayHiResponseLabel = document.getElementById("sayHiResponseLabel") as HTMLSpanElement;

    }

    /*
     * This Is an application yayayaya
     * */
    initialize():void {

        myStore.addEventListener(EventConstants.MyStore.HI_HELLO, (result) => {
            this.sayHiResponseLabel.textContent = result;
            console.log("My Store data updated: " + result);
        });

        this.sayHiButton.addEventListener("click", () => {

            // performing an action
            myManager.sayHello();
        });
    }
}