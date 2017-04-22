"use strict";

var targetPages = "*://*/*";

/*
Set UA string to __default__ ( will not change the agent)
*/
var ua = "__default__";

var headers = [];

/*
Rewrite the User-Agent header to "ua".
if it is different from "__default__"
*/
function rewriteUserAgentHeader(e) {
  headers = e.requestHeaders;
  if(ua === "__default__") return;
  console.log("Rewrite user-agent");
  for (var header of e.requestHeaders) {
    if (header.name.toLowerCase() === "user-agent") {
      header.value = ua;
    }
  }
  return {requestHeaders: e.requestHeaders};
}

/*
* Add rewriteUserAgentHeader as a listener to onBeforeSendHeaders,
* only for the target page.
* 
* Make it "blocking" so we can modify the headers.
*/
browser.webRequest.onBeforeSendHeaders.addListener(
  rewriteUserAgentHeader,
  {urls: [targetPages]},
  ["blocking", "requestHeaders"]
);

function logResponse(responseDetails) {
  console.log(responseDetails.url);
  console.log(responseDetails.statusCode);
  headers = responseDetails.responseHeaders;
/*
  for (var header of responseDetails.responseHeaders) {
	  console.log(header.name);
	  console.log(header.value);
  }; */
};

browser.webRequest.onCompleted.addListener(
  logResponse,
  {urls: [targetPages]}
);


function getCurrentHeaders() {
  return headers;
};

/*
* Update ua to a new value
*/
function setUaString(uaString) {
  ua = uaString;
};

/*
* Get ua
*/
function getUaString() {
  return ua;
};
