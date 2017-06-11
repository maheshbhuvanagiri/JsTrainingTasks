(function(){
    angular.module('catView',[]);
    angular.module('catView').run(function ($httpBackend, catService, currentObj) {
        $httpBackend.whenGET('cat/cat.html').passThrough();
        $httpBackend.whenGET('cat/views/add.html').passThrough();
        $httpBackend.whenGET('cat/views/search.html').passThrough();
        
        $httpBackend.whenGET('/getCats').respond(function () {
            return [200, currentObj.catDb, {}];
        });

    });
})();