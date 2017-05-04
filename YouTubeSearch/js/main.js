/**
 * Created by Mahesh on 4/19/2017.

 */
var myApp = myApp || {};
myApp.main = (function (apiService, ui) {
    var totalResults= [],
        DEFAULT_SIZE= 4;
    

    //Building common details object from url response
    function createRoller(data) {
        totalResults = [];
        data.items.forEach(function (element) {
            totalResults.push({
                videoId: element.id.videoId,
                title: element.snippet.channelTitle,
                description: element.snippet.description,
                publishedDate: element.snippet.publishedAt,
                imgUrl: element.snippet.thumbnails.medium.url,
                viewsCount: element.statistics ? element.statistics.viewCount : 0,
            });
        });

        ui.roller({
            totalResults: totalResults,
            pageSize: DEFAULT_SIZE,
        });
    }

    function performSearch(value) {
        apiService.search(value).then(function (response) {
            createRoller(response);
        });
    }

    function init() {
        ui.createSearch(performSearch)
    }

    init();
})(myApp.youtubeService, myApp.ui);