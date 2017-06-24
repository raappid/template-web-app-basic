
import {AppActions} from "./constants/actions/app-action-constants";
import {handleAction, State} from "./core/decorators";
import {ModelBase} from "./core/ModelBase";
import {UserModel} from "./models/UserModel";
import {EventDispatcher} from "./core/EventDispatcher";

@State
export class AppState extends ModelBase {

    helloValue:string = "hummm";
    currentUser:UserModel;

    @handleAction(AppActions.UPDATE_HELLO_MESSAGE)
    private handleChangeStateToHello(value:string):void {
        this.helloValue = value;
    }

    @handleAction(AppActions.UPDATE_CURRENT_USER)
    private updateCurrentUser(user:IUser):void {

        if (user) {
            this.currentUser = new UserModel(user);
        }
        else {
            this.currentUser = null;
        }
    }

}