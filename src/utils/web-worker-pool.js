"use strict";

var createWebWorkers = function createWebWorkers (script, number) {
    var workers = [],
        now = Date.now(),
        i;

    for (i = 0; i < number; i++) {
        workers.push(new Worker(script + '?cache=' + now));
    }

    return workers;
};

var WebWorkerPool = function WebWorkerQueue (script, number) {
    this.script = script;
    this.number = number;
    this.callback = function noop () {};

    this.workers = createWebWorkers(this.script, this.number);
    this.iteration = 0;
    this.availableWorkers = [];

    var self = this;

    this.workers.forEach(function workerIteration (worker, id) {
        self.availableWorkers.push(worker);
        worker.task = 0;
        //worker.id = id;

        worker.addEventListener('message', function onMessage (e) {
            worker.task--;

            //console.log('message', worker.task);

            if (worker.task < 1 && self.availableWorkers.indexOf(worker) === -1) {
                self.availableWorkers.push(worker);
            }

            self.callback(e);
        });

        worker.addEventListener('error', function onError (e) {
            worker.task--;

            //console.log('error', worker.task);

            if (worker.task < 1 && self.availableWorkers.indexOf(worker) === -1) {
                self.availableWorkers.push(worker);
            }
        });
    });
};

WebWorkerPool.prototype.getWorker = function () {
    var result = this.availableWorkers.pop();

    if (!result) {
        result = this.workers[this.iteration];
        this.iteration = (this.iteration + 1) % this.workers.length;
    }

    return result;
};

WebWorkerPool.prototype.postMessage = function (aMessage, transferList) {
    var worker = this.getWorker();
    worker.task++;

    //console.log('post', worker.id);

    worker.postMessage(aMessage, transferList);
};

WebWorkerPool.prototype.setCallback = function (callback) {
    this.callback = callback;
};

module.exports = WebWorkerPool;
