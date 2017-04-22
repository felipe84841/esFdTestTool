function RefreshItem(e) {
	console.log("Refresh is on");
	var backgroundPage = browser.extension.getBackgroundPage();
	var headers = backgroundPage.getCurrentHeaders();
	  for (var header of headers) {
	  console.log(header.name);
	  console.log(header.value);
	  document.getElementById("demo").textContent = header.name;
     };
};

/* 
*  Combobox select item event
*/
function clickSelectAgent(e) {
	var chosenAgent = e.target.value;
    var backgroundPage = browser.extension.getBackgroundPage();
	console.log("Setting the agent to "+chosenAgent);
    backgroundPage.setUaString(chosenAgent);
};

function setDefault() {
	var here = document.getElementById('site_check').checked;
	console.log("Setting site custom to "+ here);
	document.getElementById('site_types').disabled = here;
	document.getElementById('site_name').disabled = here;
	if(here) {
		var backgroundPage = browser.extension.getBackgroundPage();
		var chosenType = "*://";
		var chosenName = "*";
		document.getElementById('site_types').value = chosenType;
		document.getElementById('site_name').value = chosenName;
		backgroundPage.setpageType(chosenType);
		backgroundPage.setpageAdress(chosenName);
	    //
	    backgroundPage.addListenerHeader();
	}	
	return here;
};

/* 
*  Load page event
*/
function LoadPage() {
	console.log("Load page.");
	var backgroundPage = browser.extension.getBackgroundPage();
	// Load User Agent 
	var ua = backgroundPage.getUaString();
	document.getElementById('agents').value = ua;
	// Load targetPageDefault
	var defaultType = backgroundPage.targetPageDefault;
	console.log("defaultType? "+defaultType);
	document.getElementById('site_check').checked = defaultType;
	setDefault();
	// Load Page Type
	var ptype = backgroundPage.getpageType();
	document.getElementById('site_types').value = ptype;
	// Load Page Adress
	var pa = backgroundPage.getpageAdress();
	document.getElementById('site_name').value = pa;
};

// main

/* 
*  Enter point of all ckick events
*/
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("agent")) {
	clickSelectAgent(e);
    return;
  };
  
  if(e.target.classList.contains("refresh-button")) {
	  RefreshItem(e);
	  return;
  };
  
   if(e.target.classList.contains("All_site")) {
	  var backgroundPage = browser.extension.getBackgroundPage();	  
	  backgroundPage.targetPageDefault = setDefault();
	  return;
  };
  
  if (e.target.classList.contains("site_type")) {
	var chosenType = e.target.value;
    var backgroundPage = browser.extension.getBackgroundPage();
	console.log("Setting the type to "+chosenType);
    backgroundPage.setpageType(chosenType);
	//
	backgroundPage.addListenerHeader();
	return;
  };
  
});

/*
* Set the onChange on site Name to save it
*/
var elementSiteName = document.getElementById('site_name');
elementSiteName.onchange = function(e) {
  if (e.target.classList.contains("site_name")) {
	var chosenName = e.target.value;
    var backgroundPage = browser.extension.getBackgroundPage();
	console.log("Setting the URL name to "+chosenName);
    backgroundPage.setpageAdress(chosenName);
	//
	backgroundPage.addListenerHeader();
	return;
  }
}

LoadPage(); // Load Page occurs here