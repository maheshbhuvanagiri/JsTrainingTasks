(function (app) {
    "use strict";
    app.controller('multiCatClicker', function () {
        var vm = this;
            
        vm.activeCat = {};

        vm.cats = [{
            name: 'cat1',
            src: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/138.jpg',
        },
        {
            name: 'cat2',
            src: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/286.jpg',
        }, {
            name: 'cat3',
            src: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/286.jpg',
        },
        {
            name: 'cat4',
            src: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/286.jpg',
        },
        {
            name: 'cat5',
            src: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/286.jpg',
        }];

        vm.onLabelClick = function (index) {
            vm.activeCat = vm.cats[index];
            vm.activeCat.count = 0;
        }

        vm.onImageClick = function(){
            vm.activeCat.count++;
        }

    });

})(angular.module('myApp'))