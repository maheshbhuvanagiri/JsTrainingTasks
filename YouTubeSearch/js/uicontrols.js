/**
 * Created by Mahesh on 4/19/2017.

 */
var myApp = myApp || {};
myApp.ui = (function (document) {
    var pageCount = 0,
        startIndex = 0,
        endIndex = 0,
        swipeStartX = 0,
        options = {
            totalItems: [],
            pageSize: 4,
            currentPageIndex: 0
        },
        tabResolution = {
            MIN_WIDTH: 450,
            MAX_WIDTH: 750
        },
        mobResolution ={
            MAX_WIDTH: 450,
            MIN_WIDTH: 0
        },
        width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

    window.addEventListener("resize", function () {
        initiatePaging();
    });

    window.addEventListener("touchstart", function (event) {
        swipeStartX = event.changedTouches[0].screenX;
    }, false);

    window.addEventListener("touchend", function (event) {
        swipeEndX = event.changedTouches[0].screenX;
        onSwipeEnd();
    }, false);

    function initiatePaging(){
        width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        if (width < tabResolution.MAX_WIDTH && width > tabResolution.MIN_WIDTH) {
            options.pageSize = 2;
        } else if (width < tabResolution.MAX_WIDTH) {
            options.pageSize = 1;
        } else {
            options.pageSize = 4;
        }
        displayTiles();
    }

    function onSwipeEnd() {
        var swipeIndex;
        if (swipeStartX > swipeEndX) {
            swipeIndex = options.currentPageIndex + 1;
            if (swipeIndex > pagecount) {
                options.currentPageIndex = 0;
            } else {
                options.currentPageIndex = swipeIndex;
            }
        } else {
            swipeIndex = options.currentPageIndex - 1;
            if (swipeIndex > -1) {
                options.currentPageIndex = swipeIndex;
            } else {
                options.currentPageIndex = pagecount - 1
            }
        }
        displayTiles();
    }

    function createRoller() {
        var body = document.body,
            rollerTemplate = document.querySelector("#rollerTemplate"),
            container = rollerTemplate.content.querySelector("#container"),
            tiles = container.querySelector('.tiles'),
            list = options.totalItems,
            divElement = document.getElementById("container");

        while (tiles.hasChildNodes()) {
            tiles.removeChild(tiles.lastChild);
        }

        list.forEach(function (item) {
            tiles.appendChild(createTile(item));
        });

        if (divElement) {
            body.removeChild(divElement);
        }
        body.appendChild(document.importNode(rollerTemplate.content, true));
        initiatePaging();  
    }

    function displayTiles(){
        var container = document.getElementById("container"),
            tiles = container.querySelector('.tiles'),
            prePageIndex = startIndex;

        startIndex = (options.currentPageIndex * options.pageSize);
        if (startIndex > options.totalItems.length) {
            startIndex = 0;
            options.currentPageIndex = 0;
        }
        endIndex = startIndex + options.pageSize;

        tiles.querySelectorAll("li").forEach(function (ele, index) {
            if (index >= startIndex && index < endIndex) {
                ele.classList.remove("hide");
            } else {
                ele.classList.add("hide");
            }
        });
        createPager();
    }

    function createTile(item) {
        var tileTemp = document.querySelector('#tileTemplate'),
            tile = tileTemp.content.querySelector('.tile'),
            content = tileTemp.content.querySelector('.content'),
            img = content.querySelector('.youtubeImg'),
            title = content.querySelector('.title'),
            publishedDate = content.querySelector('.publishedDate'),
            viewsCount = content.querySelector('.viewsCount'),
            description = content.querySelector('.description');

        img.src = item.imgUrl;
        title.textContent = item.title;
        publishedDate.textContent = getDateString(item.publishedDate);
        viewsCount.textContent = item.viewsCount;
        description.textContent = item.description;

        return document.importNode(tileTemp.content, true);
    }

    function getDateString(date){
        var dateObj = new Date(date);
        return dateObj.getFullYear() + '-' + (dateObj.getUTCMonth()+1) + '-' + dateObj.getUTCDate();
    }

    function createSearchDiv(onSearch) {
        var body = document.body,
            div = document.createElement("div"),
            inputTxt = document.createElement("input"),
            inputBtn = document.createElement("input");

        inputTxt.setAttribute("type", "text");
        inputTxt.setAttribute("id", "searchTxt");

        inputBtn.setAttribute("type", "button");
        inputBtn.setAttribute("value", "Search");
        inputBtn.appendChild(document.createTextNode("Search"));

        inputBtn.addEventListener("click", function (e) {
            onSearch(inputTxt.value);
        });

        div.className = "searchDiv";
        div.appendChild(inputTxt);
        div.appendChild(inputBtn);
        body.appendChild(div);
    }

    function createPager() {
        var body = document.body,
            ul = document.createElement('ul'),
            pagerDiv = document.getElementById('pages'),
            li = null;
        
        pagecount = Math.round(options.totalItems.length / options.pageSize);
        
        for (var i = 0; i < pagecount; i++) {
            li = document.createElement("li");
            li.setAttribute("pageindex", i)
            li.appendChild(document.createTextNode(i + 1));
            li.addEventListener('click', function (event) {
                event.target.parentNode.childNodes.forEach(function (element) {
                    element.classList.remove("selected");
                });
                event.target.classList.add("selected");
                options.currentPageIndex = parseInt(event.target.attributes["pageindex"].value);
                displayTiles();
            });
            ul.appendChild(li);
        }

        ul.className = "pager";
        ul.childNodes.forEach(function (childNode) {
            if (childNode.attributes["pageindex"].value == options.currentPageIndex) {
                childNode.classList.add("selected");
                return;
            }
        });

        if (pagerDiv != null) {
            while (pagerDiv.firstChild) {
                pagerDiv.removeChild(pagerDiv.firstChild);
            }
            pagerDiv.appendChild(ul);
        } else {
            pagerDiv = document.createElement("div");
            pagerDiv.id = "pages";
            pagerDiv.appendChild(ul);
        }
        body.appendChild(pagerDiv);
    }

    function initialize(opt) {
        options.pageSize = opt.pageSize || options.pageSize;
        options.totalItems = opt.totalResults || options.totalItems;
        createRoller();
    }

    return {
        createSearch: createSearchDiv,
        roller: initialize
    }
})(document);