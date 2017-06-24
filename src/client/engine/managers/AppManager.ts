
import {ManagerBase} from "./ManagerBase";
import {AppActions} from "../constants/actions/app-action-constants";
import {sayHi} from "../services/hi-service";
import {sayHello} from "../services/hello-service";
import {UserActions} from "../constants/actions/user-action-constants";

export class AppManager extends ManagerBase {

    sayHelloHi():void {

        let hello:string = sayHello();

        sayHi().then((result) => {
            let newResult = hello + " " + result;
            this.perform(AppActions.UPDATE_HELLO_MESSAGE, newResult);

            this.perform(AppActions.UPDATE_CURRENT_USER, {username:"coolchem"});
            this.perform(UserActions.UPDATE_USER_VALUE, newResult);

            this.perform(AppActions.UPDATE_CURRENT_USER, {username:"coolchem1"});
            this.perform(UserActions.UPDATE_USER_VALUE, newResult + "1");

            return newResult;
        });

    }
}