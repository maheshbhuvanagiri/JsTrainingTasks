(function (app) {
    "use strict";
    app.controller('catViewerController', function ($filter, catService) {
        var vm = this;
        vm.searchOrder = false;
        vm.orderBy = [{
            value: false,
            text: 'Ascending'
        }, {
            value: true,
            text: 'Descendig'
        }];
        vm.activeCat = {};

        vm.onLabelClick = function (index) {
            vm.searchResult.map(function (cat) {
                if (cat.id == index) {
                    vm.activeCat = cat;
                    cat.hasViewed = true;
                }
            });
            vm.activeCat.count = 0;
        }

        vm.onImageClick = function () {
            vm.activeCat.count++;
        }

        vm.voter = function (value) {
            vm.activeCat.voteCount += value;
            vm.cats[vm.activeCat.id].voteCount = vm.activeCat.voteCount;
        }

        vm.search = function () {
            vm.activeCat = null;
            vm.searchResult = [];
            if (vm.searchTxt) {
                catService.searchCat(vm.searchTxt).then(function (result) {
                    vm.searchResult = result;
                });
            }
        }

    });

})(angular.module('myApp'))