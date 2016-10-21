

import {StoreBase} from "./StoreBase";
import {Actions, EventConstants} from "../constants";

export class MyStore extends StoreBase implements IMyStore
{


    private _sayHiHello: string;


    get sayHiHello(): string {
        return this._sayHiHello;
    }

    protected registerHandlers():void {

        this.registerAction(Actions.SAY_HI_AND_HELLO,this.handleSayHiHello);
    }

    private handleSayHiHello():string
    {
        this._sayHiHello = "Hi and Hello";
        return this._sayHiHello
    }
}