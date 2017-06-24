
import {appManager, appState} from "../engine/engine";
import {subscribeToResult} from "rxjs/util/subscribeToResult";

export class Application {

    private appNode:HTMLElement;

    private sayHiButton:HTMLButtonElement;
    private sayHiResponseLabel:HTMLSpanElement;
    private uservalueLabel:HTMLSpanElement;
    /*
     * This Is an application
     * */
    constructor(appNode:HTMLElement) {
        this.appNode = appNode;
        this.sayHiButton = document.getElementById("sayHiButton") as HTMLButtonElement;
        this.sayHiResponseLabel = document.getElementById("sayHiResponseLabel") as HTMLSpanElement;
        this.uservalueLabel = document.getElementById("uservalueLabel");

    }

    initialize():void {

        this.sayHiResponseLabel.textContent = appState.helloValue;

        appState.subscribeTo("helloValue", (result) => {
            this.sayHiResponseLabel.textContent = appState.helloValue;
            console.log(" AppState updated: " + result);
        });

        appState.subscribeTo("currentUser", (result) => {

            this.uservalueLabel.textContent = appState.currentUser.userValue;

            appState.currentUser.subscribeTo("userValue", (result) => {
                this.uservalueLabel.textContent = appState.currentUser.userValue;
            });

            console.log(appState.currentUser.userValue);

        });

/*        appState.helloValue.subscribe((result) => {
            this.sayHiResponseLabel.textContent = result;
            console.log("My Store data updated: " + result);
        });*/

        this.sayHiButton.addEventListener("click", () => {

            // performing an action by calling the manager
            appManager.sayHelloHi();
        });
    }
}