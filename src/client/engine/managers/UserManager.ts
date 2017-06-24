import {ManagerBase} from "./ManagerBase";
import {AppActions} from "../constants/actions/app-action-constants";

export class UserManager extends ManagerBase {

    changeUser(username: string):void {

       this.perform(AppActions.UPDATE_CURRENT_USER, {username:username});

    }

}