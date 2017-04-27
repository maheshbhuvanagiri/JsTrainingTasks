/**
 * Created by Mahesh on 4/19/2017.

 */
var myApp = myApp || {};
myApp.main = (function (apiService, ui) {
    var searchResult = {
        totalResults: [],
        defaultPageSize: 4,
    };

    //Building common details object from url response
    function createData(data) {
        data.items.forEach(function (element) {
            searchResult.totalResults.push({
                videoId: element.id.videoId,
                title: element.snippet.title,
                description: element.snippet.description,
                publishedDate: element.snippet.publishedAt,
                imgUrl: element.snippet.thumbnails.medium.url,
                viewsCount: element.statistics ? element.statistics.viewCount: 0,
            });
        });
    }

    function performSearch(value) {
        apiService.search(value).then(function (response) {
            createData(response);
            ui.roller({
                totalResults: searchResult.totalResults,
                pageSize: searchResult.defaultPageSize
            });
        });
    }

    function init() {
        ui.createSearch(performSearch)
    }
    
    init();
})(myApp.service, myApp.ui);