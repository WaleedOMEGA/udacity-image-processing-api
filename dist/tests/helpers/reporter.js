"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../../node_modules/jasmine-spec-reporter/built/main");
class CustomProcessor extends main_1.DisplayProcessor {
    displayJasmineStarted(info, log) {
        return `TypeScript ${log}`;
    }
}
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new main_1.SpecReporter({
    spec: {
        displayStacktrace: main_1.StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessor],
}));
