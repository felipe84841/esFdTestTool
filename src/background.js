"use strict";

var targetPageDefault = true;
var pageType = "*://";
var pageAdress = "*";
var pageEnd = "/*";

/*
Set UA string to __default__ ( will not change the agent)
*/
var ua = "__default__";

var headers = [];

function getTargetPages() {
	return pageType+pageAdress+pageEnd;
};

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
};

/*
* Add rewriteUserAgentHeader as a listener to onBeforeSendHeaders,
* only for the target page.
* 
* Make it "blocking" so we can modify the headers.
*/
function addListenerHeader() {
	if(browser.webRequest.onBeforeSendHeaders.hasListener(rewriteUserAgentHeader) === true) browser.webRequest.onBeforeSendHeaders.removeListener(rewriteUserAgentHeader);
	browser.webRequest.onBeforeSendHeaders.addListener(
	  rewriteUserAgentHeader,
	  {urls: [getTargetPages()]},
	  ["blocking", "requestHeaders"]
	);
};

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
  {urls: [getTargetPages()]}
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

/*
* Update pageType to a new value
*/
function setpageType(type) {
  pageType = type;
};

/*
* Get pageType
*/
function getpageType() {
  return pageType;
};

/*
* Update pageAdress to a new value
*/
function setpageAdress(name) {
  pageAdress = name;
};

/*
* Get pageAdress
*/
function getpageAdress() {
  return pageAdress;
};


// main
addListenerHeader();
