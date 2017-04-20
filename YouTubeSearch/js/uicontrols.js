/**
 * Created by Mahesh on 4/19/2017.

 */
var myApp = myApp || {};
myApp.ui = (function (document) {

    function createRoller(items) {
        var body = document.body,
            divElement = document.getElementById("container"),
            ul = document.createElement('ul');

        items.forEach(function (item) {
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

        inputBtn.addEventListener("click", onSearch);

        div.className = "searchDiv";
        div.appendChild(inputTxt);
        div.appendChild(inputBtn);
        frag.appendChild(div);
        body.appendChild(frag);
    }

    function createPager(totalItemsCount, pageSize, onPageClick) {
        var body = document.body,
            ul = document.createElement('ul'),
            pagerDiv = document.getElementById('pages'),
            pagecount = Math.round(totalItemsCount / pageSize),
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

    return {
        createRoller: createRoller,
        createSearch: createSearchDiv,
        createPager: createPager
    }
})(document);