(function (app) {
    "use strict"

    app.service('catService', function ($q, $http, currentObj) {

        this.getCats = function () {
            return $http.get('/getCats').then(function (response) {
                return response.data;
            });
        };

        this.getCatById = function (id) {
            var defered = $q.defer(),
                cat = currentObj.catDb.filter(function (cat) {
                    return cat.id == id;
                })[0];

            defered.resolve(cat);
            return defered.promise
        }


        this.addUpdateCat = function (cat) {
            var defered = $q.defer();
            if (cat.id) {
                var isUpdate = false;
                currentObj.catDb.map(function (catObj) {
                    if (catObj.id == cat.id && !isUpdate) {
                        catObj.name = cat.name;
                        catObj.url = cat.url;
                        isUpdate = true;
                    }
                });
            } else {
                currentObj.catDb.push({
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
            var searchResult = currentObj.catDb.filter(function (cat) {
                return cat.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
            });
            defered.resolve(searchResult);
            return defered.promise
        };
    });

})(angular.module("catView"));