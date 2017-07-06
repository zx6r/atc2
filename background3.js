//Herşey burda başlıyor

//alert("OLDU1");



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    alert("OLDU_BG1");


    var xhr = new XMLHttpRequest();
    xhr.open("GET", request.greeting, true);
    //alert(request.greeting);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            alert(xhr.responseText);
            //sendResponse(JSON.parse(xhr.responseText));
            sendResponse(JSON.parse(xhr.responseText));
        }
    };
    xhr.send();
    return true;
});


chrome.tabs.onUpdated.addListener(function () {
  //  alert('updated from background ');
   // alert(document.URL);
    
});