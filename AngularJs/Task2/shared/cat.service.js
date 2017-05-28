(function (app) {
    "use strict"

    app.service('catService', function ($q) {

        var cats = [{
            id: 0,
            name: 'cat1',
            src: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/138.jpg',
            hasViewed: false,
            voteCount: 0
        }, {
            id: 1,
            name: 'cat2',
            src: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/286.jpg',
            hasViewed: false,
            voteCount: 0
        }, {
            id: 2,
            name: 'cat3',
            src: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/286.jpg',
            hasViewed: false,
            voteCount: 0
        }, {
            id: 3,
            name: 'cat4',
            src: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/286.jpg',
            hasViewed: false,
            voteCount: 0
        }, {
            id: 4,
            name: 'cat5',
            src: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/286.jpg',
            hasViewed: false,
            voteCount: 0
        }];

        this.getCats = function () {
            var defered = $q.defer();
            defered.resolve(cats);
            return defered.promise
        };

        this.addCat = function (cat) {
            var defered = $q.defer();
            cats.push({
                id: new Date().getTime(),
                name: cat.name,
                src: cat.url,
                hasViewed: false,
                voteCount: 0
            });
            defered.resolve(true);
            return defered.promise
        };

        this.searchCat = function (name) {
            var defered = $q.defer();
            var searchResult = cats.filter(function (cat) {
                return cat.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
            });
            defered.resolve(searchResult);
            return defered.promise
        };
    });

})(angular.module("myApp"));