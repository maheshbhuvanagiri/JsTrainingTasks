/**
 * Created by Mahesh on 4/19/2017.

 */
var myApp = myApp || {};
myApp.main  = (function(apiService){

    function createRoller(jsonResult){
        var body = document.body,
            divElement = document.getElementById("container"),
            ul = document.createElement('ul'),
            mainDiv;
        ul.className = "tiles";

        jsonResult.items.forEach(function(item){
            ul.appendChild(createTile(item));
        });

        if(divElement != null){
            while(divElement.firstChild){
                divElement.removeChild(divElement.firstChild);
            }
            divElement.appendChild(ul);
        }else{
            mainDiv = document.createElement('div');
            mainDiv.id = "container";
            mainDiv.appendChild(ul);
            body.appendChild(mainDiv);
        }
    }

    function createTile(item){
        var frag = document.createDocumentFragment(),
            li = document.createElement("li"),
            img = document.createElement("img");

        li.className = "tile";
        img.src= item.snippet.thumbnails.high.url;

        li.appendChild(img);
        frag.appendChild(li);

        return frag;
    }

    function createSearchDiv(){
        var body = document.body;
        var frag = document.createDocumentFragment(),
            div = document.createElement("div"),
            inputTxt = document.createElement("input"),
            inputBtn = document.createElement("input");

        inputTxt.setAttribute("type","text");
        inputTxt.setAttribute("id","searchTxt");

        inputBtn.setAttribute("type", "button");
        inputBtn.setAttribute("value", "Search");
        inputBtn.appendChild(document.createTextNode("Search"));

        inputBtn.addEventListener("click", function(e){
            performSearch(inputTxt.value);
        });

        div.className = "searchDiv";
        div.appendChild(inputTxt);
        div.appendChild(inputBtn);
        frag.appendChild(div);
        body.appendChild(frag);
    }

    function performSearch(value){
        apiService.search(value).then(function(response){
            createRoller(response);
        });
    }

    function init (){
        createSearchDiv()
    }

    return {
        init: init
    };
})(myApp.service);

(function(app){
    app.main.init();
})(myApp);