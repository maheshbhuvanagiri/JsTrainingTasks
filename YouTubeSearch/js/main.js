/**
 * Created by Mahesh on 4/19/2017.

 */
var myApp = myApp || {};
myApp.main = (function (apiService) {
    var searchResult = {
        totalResults: [],
        currentPage: 1,
        defaultPageSize: 4,
    };

    function createRoller(items) {
        var body = document.body,
            divElement = document.getElementById("container"),
            ul = document.createElement('ul'),
            mainDiv;
        ul.className = "tiles";

        items.forEach(function (item) {
            ul.appendChild(createTile(item));
        });

        if (divElement != null) {
            while (divElement.firstChild) {
                divElement.removeChild(divElement.firstChild);
            }
            divElement.appendChild(ul);
        } else {
            mainDiv = document.createElement('div');
            mainDiv.id = "container";
            mainDiv.appendChild(ul);
            body.appendChild(mainDiv);
        }
    }

    function createTile(item) {
        var frag = document.createDocumentFragment(),
            li = document.createElement("li"),
            img = document.createElement("img");

        li.className = "tile";
        img.src = item.snippet.thumbnails.high.url;

        li.appendChild(img);
        frag.appendChild(li);

        return frag;
    }

    function createSearchDiv() {
        var body = document.body,
            frag = document.createDocumentFragment(),
            div = document.createElement("div"),
            inputTxt = document.createElement("input"),
            inputBtn = document.createElement("input");

        inputTxt.setAttribute("type", "text");
        inputTxt.setAttribute("id", "searchTxt");

        inputBtn.setAttribute("type", "button");
        inputBtn.setAttribute("value", "Search");
        inputBtn.appendChild(document.createTextNode("Search"));

        inputBtn.addEventListener("click", function (e) {
            performSearch(inputTxt.value);
        });

        div.className = "searchDiv";
        div.appendChild(inputTxt);
        div.appendChild(inputBtn);
        frag.appendChild(div);
        body.appendChild(frag);
    }

    function createPager(list, pageSize) {
        var pagecount = Math.round(list / pageSize);
        var body = document.body,
            frag = document.createDocumentFragment(),
            div = document.createElement("div"),
            ul = document.createElement('ul');

        ul.className = "pager";

        for (var i = 1; i <= pagecount; i++) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(i));
            li.addEventListener('click', onPageClick);
            ul.appendChild(li);
        }
        body.appendChild(ul);
    }

    function createSlider(startIndex, pageSize) {
        var list = searchResult.totalResults.items.slice(startIndex, pageSize);
        createRoller(list);
    }

    function onPageClick(event) {
        var pageNumber = parseInt(event.target.textContent),
            startIndex = ((pageNumber - 1) * searchResult.defaultPageSize);

        event.target.parentNode.childNodes.forEach(function (element) {
            element.classList.remove("selected");
        });
        event.target.classList.add("selected");
        createSlider(startIndex, startIndex + searchResult.defaultPageSize)
    }

    function performSearch(value) {
        apiService.search(value).then(function (response) {
            searchResult.totalResults = response;
            createSlider(0, searchResult.defaultPageSize);
            createPager(searchResult.totalResults.items.length, searchResult.defaultPageSize);
        });
    }

    function init() {
        createSearchDiv()
    }

    return {
        init: init
    };
})(myApp.service);

(function (app) {
    app.main.init();
})(myApp);