/**
 * Created by Mahesh on 4/19/2017.
 */
var myApp = myApp || {};
myApp.ajax = (function(){

    function httpGetAsync(url){
        return new Promise(function(resolve, reject){
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, true);
            xmlHttp.onload = function(){
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    resolve(xmlHttp.responseText);
                }else{
                    reject(xmlHttp.statusText);
                }
            };
            xmlHttp.onerror = function(){
                reject(xmlHttp.statusText);
            };
            xmlHttp.send();
        });
    }

    return {
        get: httpGetAsync
    }
})();