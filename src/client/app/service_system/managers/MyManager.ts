

import {sayHelloAndHi} from "../assistants/my-assistant";
import {actionDispatcher} from "../../comm_system/index";
import {Actions} from "../constants";
import Promise = require("bluebird");
import {IMyManager} from "../interfaces/managers/IMyManager";

export class MyManager implements IMyManager
{
    sayHello():Promise<any>
    {
        return sayHelloAndHi().then((result)=>{
            actionDispatcher.perform(Actions.SAY_HI_AND_HELLO,result);
            return result;
        });
    }
}