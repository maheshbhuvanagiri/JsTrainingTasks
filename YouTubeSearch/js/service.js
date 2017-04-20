/**
 * Created by Mahesh on 4/19/2017.
 */
var myApp = myApp || {};
myApp.service = (function (ajax) {
    var statsApi = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDc3C5q7k3JHC-GW5ViwoqeeFFyrzTnvYY',
        searchApi = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDc3C5q7k3JHC-GW5ViwoqeeFFyrzTnvYY';

    function generateYoutubeInfo(Ids) {
        return ajax.get(statsApi + '&part=statistics,snippet&id=' + Ids.join());
    }

    function searchYoutube(searchKey) {
        return ajax.get(searchApi + '&part=snippet&maxResults=15&q=' + searchKey).then(function (response) {
            var videosList = JSON.parse(response);
            var Ids = [];
            videosList.items.forEach(function (item) {
                Ids.push(item.id.videoId);
            });
            return generateYoutubeInfo(Ids).then(function (response) {
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
        });
    }

    return {
        search: searchYoutube
    }
})(myApp.ajax);
