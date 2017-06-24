import {ModelBase} from "../core/ModelBase";
import {handleAction} from "../core/decorators";
import {UserActions} from "../constants/actions/user-action-constants";

export class UserModel extends ModelBase {

    user: IUser;

    userValue:string = "userValue";

    constructor(user:IUser) {
        super();
        this.user = user;
    }

    @handleAction(UserActions.UPDATE_USER_VALUE)
    handleUserValueUpdated(value:string):void {
        this.userValue = value;
    }
}