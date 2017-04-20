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

    function createRoller(items, startIndex, pageSize) {
        var body = document.body,
            divElement = document.getElementById("container"),
            ul = document.createElement('ul');
        var list = items.slice(startIndex, pageSize);
        
        list.forEach(function (item) {
            ul.appendChild(createTile(item));
        });

        ul.className = "tiles";

        if (divElement != null) {
            while (divElement.firstChild) {
                divElement.removeChild(divElement.firstChild);
            }
            divElement.appendChild(ul);
        } else {
            divElement = document.createElement('div');
            divElement.id = "container";
            divElement.appendChild(ul);
            body.appendChild(divElement);
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

    function createPager(totalItems, pageSize) {
        var body = document.body,
            ul = document.createElement('ul'),
            pagerDiv = document.getElementById('pages'),
            pagecount = Math.round(totalItems / pageSize),
            li = null;

        for (var i = 1; i <= pagecount; i++) {
            li = document.createElement("li");
            li.appendChild(document.createTextNode(i));
            li.addEventListener('click', onPageClick);
            ul.appendChild(li);
        }

        ul.className = "pager";
        ul.firstChild.classList.add("selected");

        if (pagerDiv != null) {
            while (pagerDiv.firstChild) {
                pagerDiv.removeChild(divElement.firstChild);
            }
            pagerDiv.appendChild(ul);
        } else {
            pagerDiv = document.createElement("div");
            pagerDiv.id = "pages";
            pagerDiv.appendChild(ul);
        }
        body.appendChild(pagerDiv);
    }
    
    function onPageClick(event) {
        var pageNumber = parseInt(event.target.textContent),
            startIndex = ((pageNumber - 1) * searchResult.defaultPageSize);

        event.target.parentNode.childNodes.forEach(function (element) {
            element.classList.remove("selected");
        });
        event.target.classList.add("selected");
        createRoller(searchResult.totalResults.items, startIndex, startIndex + searchResult.defaultPageSize);
    }


    function performSearch(value) {
        apiService.search(value).then(function (response) {
            searchResult.totalResults = response;
            createRoller(searchResult.totalResults.items, 0, searchResult.defaultPageSize);
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