function RefreshItem(e) {
	console.log("Refresh is on");
	var backgroundPage = browser.extension.getBackgroundPage();
	var headers = backgroundPage.getCurrentHeaders();
	  for (var header of headers) {
	  console.log(header.name);
	  console.log(header.value);
	  document.getElementById("demo").textContent = header.name;
     }
	
};

/* 
*  Enter point of all ckick events
*/
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("agent")) {
	  
    //var chosenAgent = e.target.textContent;
	var chosenAgent = e.target.value;
    var backgroundPage = browser.extension.getBackgroundPage();
	console.log("Setting the agent to "+chosenAgent);
    backgroundPage.setUaString(chosenAgent);

	
	/*
    browser.tabs.executeScript(null, {
      file: "/content_scripts/beastify.js"
    });
	

    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {beastURL: chosenBeastURL});
    });
  }
  else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();
	*/

    return;
  }
  
  if(e.target.classList.contains("refresh-button")) {
	  RefreshItem(e);
	  return;
  }
  
});
