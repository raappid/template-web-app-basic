
import {Application} from "./app/view_system";

require("core-js/shim");

let appNode:HTMLDivElement = document.getElementById("app") as HTMLDivElement;

let application:Application = new Application(appNode);

application.initialize();