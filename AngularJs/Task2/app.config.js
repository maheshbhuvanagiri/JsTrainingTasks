(function (app) {
    "use strict"
    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/about');

        $stateProvider
            .state('about', {
                url: '/about',
                views: {
                    '': { templateUrl: "about/about.html" }
                }
            })
            .state('catviewer', {
                url: '/cats',
                templateUrl: 'catViewer/catViewer.html'
            })
            .state('addCat', {
                url: '/add',
                templateUrl: 'catAdd/catAdd.html'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

})(angular.module("myApp"));