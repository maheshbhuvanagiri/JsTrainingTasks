(function (app) {

    app.controller('catAddController', ['$state', 'catService',function ($state, catService) {
        var vm = this;
        vm.cat = {};
        vm.submit = function (isValid) {
            if (isValid) {
                catService.addCat(vm.cat).then(function (isAdded) {
                    if (isAdded) {
                        alert("Cat added successfully");
                        $state.go('catviewer');
                    } else {
                        alert("Failed to add cat");
                    }
                });
            } else {
                alert("Form Not Valid");
            }
        };
        vm.clear = function(){
            vm.cat ={};
        }
    }]);

})(angular.module("myApp"))