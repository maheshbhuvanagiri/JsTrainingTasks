/**
 * Created by Mahesh on 4/19/2017.
 */
var myApp = myApp || {};
myApp.youtubeService = (function (ajax) {
    var STATISTICS_API = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDc3C5q7k3JHC-GW5ViwoqeeFFyrzTnvYY',
        SEARCH_API = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDc3C5q7k3JHC-GW5ViwoqeeFFyrzTnvYY';


    function generateYoutubeStatistics(Ids) {
        return ajax.get(STATISTICS_API + '&part=statistics,snippet&id=' + Ids.join());
    }

    function searchYoutubeVideo(searchKey) {
        var videosList = [], 
            Ids = [];
        return ajax.get(SEARCH_API + '&part=snippet&maxResults=15&q=' + searchKey).then(function (response) {
            videosList = JSON.parse(response);
            videosList.items.forEach(function (item) {
                Ids.push(item.id.videoId);
            });
            return generateYoutubeStatistics(Ids);
        }).then(function (response) {
            var statisticsResult = JSON.parse(response);
            videosList.items.forEach(function (item) {
                statisticsResult.items.forEach(function (stats) {
                    if (stats.id == item.id.videoId) {
                        item.statistics = stats.statistics;
                        return;
                    }
                });
            });
            return videosList;
        });
    }

    return {
        search: searchYoutubeVideo
    }
})(myApp.ajax);
