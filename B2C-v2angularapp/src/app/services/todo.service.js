"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var TodoService = (function () {
    function TodoService(http) {
        this.http = http;
    }
    TodoService.prototype.getItems = function (config) {
        return this.http
            .get('https://aadb2cplayground.azurewebsites.net/api/Tasks', config);
    };
    TodoService.prototype.postItem = function (item, config) {
        return this.http
            .post('https://aadb2cplayground.azurewebsites.net/api/Tasks/', item, config);
    };
    TodoService.prototype.deleteItem = function (id, config) {
        return this.http
            .delete('https://aadb2cplayground.azurewebsites.net/api/Tasks/' + id, config);
    };
    TodoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TodoService);
    return TodoService;
}());
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map