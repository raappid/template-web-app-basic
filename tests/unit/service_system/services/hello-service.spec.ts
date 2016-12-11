
import helloService = require("../../../../src/client/app/service_system/services/hello-service");
import Spy = jasmine.Spy;

describe("hello-service Test cases", () => {

    describe("sayHello", () => {

        it("should return hello", () => {

            let logSpy:Spy = spyOn(console, "log");

            let result:string = helloService.sayHello();
            expect(result).toEqual("hello");
            expect(logSpy).toHaveBeenCalledWith("hello-service saying hello...");
        });

    });
});