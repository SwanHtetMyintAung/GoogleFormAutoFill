const inputs = document.querySelectorAll("input");
const checkbox = document.querySelector("div[role='checkbox']");
var data = {};
// Function to get data from browser storage
function getData() {
    return browser.storage.local.get().then((result) => {
        return result;
    }, (error) => {
        console.error("Error getting data: ", error);
    });
}

// Function to fill form with retrieved data
function fillForm(data) {

    if (data) {
        //click the checkbox
        checkbox && checkbox.dispatchEvent(new Event("click",{bubbles:true}));
        inputs[0].value = data.user_name;
        inputs[0].dispatchEvent(new Event('input',{bubbles:true}));
        inputs[1].value = data.email;
        inputs[1].dispatchEvent(new Event('input',{bubbles:true}));

        console.log("Form has been filled with data from storage.");
    } else {
        console.log("No data found in storage.");
    }
}

// Function to auto-fill form with stored data
function autoFill() {
    getData().then((data) => {
        fillForm(data);
        console.log("yadayadayada")
    });
}

// Event listener to call autoFill when the document is loaded
if(document.readyState == "complete"){
    getData().then((result)=> data=result);
    console.log("document is loaded")
}else{
    document.addEventListener('DOMContentLoaded', () => {
        getData().then((result)=> data=result);
        console.log("document is loaded") 
    });

}

// Event listener for changes in browser storage
browser.storage.onChanged.addListener((changes, area) => {
    console.log("there's some changes")
    if (area === "local") {
        autoFill();
    }
});
