/**
 * Created by Mahesh on 4/19/2017.

 */
var myApp = myApp || {};
myApp.main = (function (apiService, ui) {
    var searchResult = {
        totalResults: [],
        currentPage: 1,
        defaultPageSize: 4,
    };
    
    //Building common details object from url response
    function createData(data) {
        searchResult.totalResults.push({
            url:'',
            description: '',
            author: '',
            publishedDate: '',
            viewsCount: '',
            imgUlr: ''
        });
    }

    function performSearch(value) {
        apiService.search(value).then(function (response) {
            //createData(data);
            ui.roller({
                totalResults: response,
                pageSize: 4
            });
        });
    }

    function init() {
        ui.createSearch(performSearch)
    }

    return {
        init: init
    };
})(myApp.service, myApp.ui);

(function (app) {
    app.main.init();
})(myApp);