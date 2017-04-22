"use strict";

//var targetPages = "https://httpbin.org/*";
var targetPages = "*://*/*";
//		"http://*",
//		"https://*"
//];

/*
Set UA string to Opera 12
*/
var ua = "";
//var ua = "Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16";

var headers = [];

/*
Rewrite the User-Agent header to "ua".
*/
function rewriteUserAgentHeader(e) {
  headers = e.requestHeaders;
  if(ua === "") return;
  console.log("Rewrite user-agent");
  for (var header of e.requestHeaders) {
    if (header.name.toLowerCase() === "user-agent") {
      header.value = ua;
    }
  }
  return {requestHeaders: e.requestHeaders};
}

/*
Add rewriteUserAgentHeader as a listener to onBeforeSendHeaders,
only for the target page.

Make it "blocking" so we can modify the headers.
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
Update ua to a new value, mapped from the uaString parameter.
*/
function setUaString(uaString) {
  ua = uaString;
}
