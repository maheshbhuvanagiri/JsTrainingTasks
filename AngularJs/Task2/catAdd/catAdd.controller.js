(function (app) {

    app.controller('catAddController', function (catService) {
        var vm = this;
        vm.cat = {};
        vm.submit = function (isValid) {
            if (isValid) {
                catService.addCat(vm.cat).then(function (isAdded) {
                    if (isAdded) {
                        alert("cat added successfully");
                        vm.cat = {};
                    } else {
                        alert("Failed to add cat");
                    }
                });
            } else {
                alert("Form Not Valid");
            }
        };

    });

})(angular.module("myApp"))