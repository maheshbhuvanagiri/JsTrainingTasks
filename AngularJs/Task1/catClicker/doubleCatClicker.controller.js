(function (app) {
    "use strict";
    app.controller('doubleCatClicker', function () {
        var vm = this;

        vm.cats = [{
            name: 'cat1',
            src: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/138.jpg',
            count: 0
        },
        {
            name: 'cat2',
            src: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/286.jpg',
            count: 0
        }]
        vm.count = 0;

        vm.onClick = function (index) {
            vm.cats[index].count++;
        }

    });

})(angular.module('myApp'))