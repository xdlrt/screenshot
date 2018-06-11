chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var name = document.getElementById("101_star_name")
    && document.getElementById("101_star_name").innerText;
  sendResponse(name);
});
