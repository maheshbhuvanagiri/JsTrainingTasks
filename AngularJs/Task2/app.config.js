(function (app) {
    "use strict"
    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('about', {
                url: '/',
                views: {
                    '': { templateUrl: "about/about.html" }
                }
            })
            .state('catviewer', {
                url: '/cats',
                                resolve: {
                    catresults: ['catService', function (catService) {
                        return catService.getCats();
                    }]
                },
                templateUrl: 'catViewer/catViewer.html',
                controller: 'catViewerController as ctrl'
            })
            .state('addCat', {
                url: '/add',
                templateUrl: 'catAdd/catAdd.html'
            }).state('updateCat', {
                url: '/update/:id',
                templateUrl: 'catAdd/catAdd.html'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

})(angular.module("myApp"));