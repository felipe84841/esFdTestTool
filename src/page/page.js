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
*  Combobox select item event
*/
function clickSelectAgent(e) {
	var chosenAgent = e.target.value;
    var backgroundPage = browser.extension.getBackgroundPage();
	console.log("Setting the agent to "+chosenAgent);
    backgroundPage.setUaString(chosenAgent);
};

/* 
*  Load page event
*/
function LoadPage()
{
	console.log("Load page.");
	var backgroundPage = browser.extension.getBackgroundPage();
	var ua = backgroundPage.getUaString();
	document.getElementById('agents').value = ua;
}

/* 
*  Enter point of all ckick events
*/
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("agent")) {
	clickSelectAgent(e);
    return;
  }
  
  if(e.target.classList.contains("refresh-button")) {
	  RefreshItem(e);
	  return;
  }
  
});


LoadPage(); // Load Page occurs here