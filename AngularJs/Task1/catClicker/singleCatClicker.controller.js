(function (app) {
    "use strict";
    app.controller('singleCatClicker', function () {
        var vm = this;

        vm.count = 0;

        vm.onClick = function () {
            vm.count++;
        }

    });

})(angular.module('myApp'))