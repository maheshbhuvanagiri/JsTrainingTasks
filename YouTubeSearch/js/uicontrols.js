/**
 * Created by Mahesh on 4/19/2017.

 */
var myApp = myApp || {};
myApp.ui = (function (document) {
    var options = {
        totalItems: [],
        pageSize: 4,
        currentPageIndex: 0,
        startIndex: 0,
        endIndex: 0
    };
    var width, height;

    window.addEventListener("resize",function(){
        width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        if (width < 750 && width > 450) {
            options.pageSize = 2;
        } else if (width < 450) {
            options.pageSize = 1;
        }else{
            options.pageSize = 4;
        }
        createRoller();
    });


    function roller(opt) {
        options.pageSize = opt.pageSize || options.pageSize;
        options.totalItems = opt.totalResults || options.totalItems;
        options.currentPageIndex = opt.currentPage || options.currentPageIndex;
        createRoller();
    }

    function createRoller() {
        var body = document.body,
            divElement = document.getElementById("container"),
            ul = document.createElement('ul'), list;
            options.startIndex = (options.currentPageIndex * options.pageSize);
            options.endIndex = options.startIndex + options.pageSize;
            list = options.totalItems.slice(options.startIndex, options.endIndex);
            
        
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
        createPager();
    }

    function createTile(item) {
        var frag = document.createDocumentFragment(),
            li = document.createElement("li"),
            img = document.createElement("img");

        li.className = "tile";
        img.src = item.imgUrl;

        li.appendChild(img);
        frag.appendChild(li);

        return frag;
    }

    function createSearchDiv(onSearch) {
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
            onSearch(inputTxt.value);
        });

        div.className = "searchDiv";
        div.appendChild(inputTxt);
        div.appendChild(inputBtn);
        frag.appendChild(div);
        body.appendChild(frag);
    }

    function createPager() {
        var body = document.body,
            ul = document.createElement('ul'),
            pagerDiv = document.getElementById('pages'),
            pagecount = Math.round(options.totalItems.length / options.pageSize),
            li = null;

        for (var i = 0; i < pagecount; i++) {
            li = document.createElement("li");
            li.setAttribute("pageindex", i)
            li.appendChild(document.createTextNode(i + 1));
            li.addEventListener('click', function (event) {
                var pageIndex = parseInt(event.target.attributes["pageindex"].value),
                    startIndex = (pageIndex * options.pageSize);

                event.target.parentNode.childNodes.forEach(function (element) {
                    element.classList.remove("selected");
                });
                event.target.classList.add("selected");
                options.currentPageIndex = pageIndex;
                createRoller();
            });
            ul.appendChild(li);
        }

        ul.className = "pager";
        ul.childNodes.forEach(function(childNode){
            if(childNode.attributes["pageindex"].value == options.currentPageIndex){
                childNode.classList.add("selected");
            }
        });
        
        //ul.firstChild.classList.add("selected");

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

    return {
        createSearch: createSearchDiv,
        roller: roller
    }
})(document);