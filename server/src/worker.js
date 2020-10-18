"use strict";
exports.__esModule = true;
var worker_threads_1 = require("worker_threads");
var intensive_job_1 = require("./intensive-job");
if (worker_threads_1.parentPort) {
    worker_threads_1.parentPort.on('message', function (data) {
        if (!worker_threads_1.parentPort)
            return;
        var result = intensive_job_1.calculate(3, 4);
        worker_threads_1.parentPort.postMessage(result);
    });
}
