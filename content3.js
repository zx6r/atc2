
alert("ADIM 1");

//get video parameters
var currentVideo  = getVideoParameters();

//check if we have covers for this video
var doWeHaveTheCovers = lookUpAtcDb(currentVideo);

//list all the covers on the page
if (doWeHaveTheCovers)
{
    listAllCovers(currentVideo);
}


//theRealAction(0);
var str = ""


function listAllCovers(currentVideo) {

    str = document.URL.replace("youtube.com/watch", "allthecovers.com/get.asp").replace("https","http");
    str += "&yI=\"" + currentVideo.youtubeId + "\"&vT=" + currentVideo.videoTitle + "&sC=\"" + currentVideo.videoViewCount + "\"&rD=\"" + currentVideo.videoReleaseDate + "\"";

    //atc node u yoksa atc diye bir node oluşturuyoruz.
    if (document.getElementById("atc") == null) {
        var node = document.createElement("div");
        node.style.color = "red";
        node.id = "atc";
        //node.innerHTML = "<input size='250' type=text = value='" + str + "'>"
        node.innerHTML += "</br>"
        node.innerHTML += "<input id='coverName'  size ='125' type=text = value='YoutubeId for this cover'>"
        node.innerHTML += "</br>"
        node.innerHTML += "<input id='coverYoutubeId' size='125' type=text = value=''>"
        node.innerHTML += "</br>"
        node.innerHTML += "<input type='submit' value='Add Cover For this song' onclick='alert(3)'>"


        //olusan node u eow-title node unun altına ekliyoruz.
        document.getElementById("eow-title").appendChild(node);
    }

    //type : 1 demek git get.aspden bak bakalım dbde durum neymiş demek .
    //type : 2 demek git shs dan sarki bilgisi bakin demek . 
    chrome.runtime.sendMessage({
        type: "1",
        greeting: str,
        title: document.getElementById("eow-title").innerHTML,
        showCount: document.getElementsByClassName("watch-view-count")[0].innerHTML
    },

        function (response1) {

           //get.asp'den bakiyoruz bu yI icin kayit var mi ? Varsa bize sakir sakir sonuclar gelcek yoksa shs urlsi gelcek . 
           //    alert(response1.resultId);
           // alert("resultId");
          //  document.getElementById("atc").innerHTML = response1.resultContent;
        }
    );

}

function submitAddCover() {

    //alert(document.getElementById("coverYoutubeId").innerHTML);
    alert("test");

}

function lookUpAtcDb (currentVideo) {
    //check if we have this video in our Db 
    //TO DO go to db with currentVideo.youtubeId and bring all the covers
    return true;
}


function getVideoParameters() {

    var videoTitle = document.getElementById("eow-title").innerHTML;
    var youtubeId = getParameterByName("v");
    var vidoeTitle = document.getElementsByClassName("watch-view-count")[0].innerText;
    var videoReleaseDate = document.getElementsByClassName("watch-time-text")[0].innerText;
    var videoViewCount = document.getElementsByClassName("watch-view-count")[0].innerText;

    var theVideo = { videoTitle : videoTitle , youtubeId : youtubeId , vidoeTitle : vidoeTitle , videoReleaseDate : videoReleaseDate  , videoViewCount  : videoViewCount };
    
    return theVideo;

}

function theRealAction(intSource) {

    alert("ADIM 2");

    //get.asp var bizim serverda ona bu youtube id yi biliyor mu soracağız. onun için parametrleri falan ayarlıyoruz.

    str = document.URL.replace("youtube.com/watch", "allthecovers.com/get.asp");
    str = str.replace("https", "http");

    //videotitle Al 
    var videoTitle = document.getElementById("eow-title").innerHTML
    
    str += "&yI=\"" + getParameterByName("v") + "\"&vT=" + videoTitle + "&sC=\"" + document.getElementsByClassName("watch-view-count")[0].innerText + "\"&rD=\"" + document.getElementsByClassName("watch-time-text")[0].innerText + "\"";


    //atc node u yoksa atc diye bir node oluşturuyoruz.
    if (document.getElementById("atc") == null) {
        var node = document.createElement("div");
        node.style.color = "red";
        node.id = "atc";
      //  node.innerHTML = "<input size='250' type=text = value='" + str + "'>"

        //olusan node u eow-title node unun altına ekliyoruz.
        document.getElementById("eow-title").appendChild(node);
    }


    alert(str);
    //type : 1 demek git get.aspden bak bakalım dbde durum neymiş demek .
    //type : 2 demek git shs dan sarki bilgisi bakin demek . 
    chrome.runtime.sendMessage(        {
            type: "1",
            greeting: str,
            title: document.getElementById("eow-title").innerHTML,
            showCount: document.getElementsByClassName("watch-view-count")[0].innerHTML
        },

        function (response1) {

        //get.asp'den bakiyoruz bu yI icin kayit var mi ? Varsa bize sakir sakir sonuclar gelcek yoksa shs urlsi gelcek . 
        //    alert(response1.resultId);
        alert("resultId");
        document.getElementById("atc").innerHTML = response1.resultContent;
        }
    );


}
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


    chrome.tabs.onUpdated.addListener(
     function (tabId, changeInfo, tab) {
        alert('updated from contentscript');
     }
   );