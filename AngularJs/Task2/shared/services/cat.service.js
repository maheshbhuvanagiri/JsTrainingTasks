(function (app) {
    "use strict"

    app.service('catService', function ($q) {

        var cats = [{
            id: 0,
            name: 'cat1',
            url: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/138.jpg',
            hasViewed: false,
            voteCount: 0
        }, {
            id: 1,
            name: 'cat2',
            url: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/286.jpg',
            hasViewed: false,
            voteCount: 0
        }, {
            id: 2,
            name: 'cat3',
            url: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/286.jpg',
            hasViewed: false,
            voteCount: 0
        }, {
            id: 3,
            name: 'cat4',
            url: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/286.jpg',
            hasViewed: false,
            voteCount: 0
        }, {
            id: 4,
            name: 'cat5',
            url: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/286.jpg',
            hasViewed: false,
            voteCount: 0
        }];

        this.getCats = function () {
            var defered = $q.defer();
            defered.resolve(cats);
            return defered.promise
        };

        this.getCatById = function (id) {
            var defered = $q.defer(),
                cat = cats.filter(function (cat) {
                    return cat.id == id;
                })[0];

            defered.resolve(cat);
            return defered.promise
        }


        this.addUpdateCat = function (cat) {
            var defered = $q.defer();
            if (cat.id) {
                var isUpdate = false;
                cats.map(function (catObj) {
                    if (catObj.id == cat.id && !isUpdate) {
                        catObj.name = cat.name;
                        catObj.url = cat.url;
                        isUpdate = true;
                    }
                });
            } else {
                cats.push({
                    id: new Date().getTime(),
                    name: cat.name,
                    url: cat.url,
                    hasViewed: false,
                    voteCount: 0
                });
            }
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