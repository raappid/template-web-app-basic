
import Promise = require("bluebird");

declare interface IMyManager
{
    sayHello():Promise<any>;
}