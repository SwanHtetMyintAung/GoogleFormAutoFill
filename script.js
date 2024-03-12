console.log("mingalarbar");
const name_input = document.querySelector("#name");
const email_input = document.querySelector("#email");

const init_button = document.querySelector("#initial-button");

//to load data from the momoent the page is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();                                                                                            

})
//function to get the data from the storage
async function loadData(){
    try{
        let data = await browser.storage.local.get();
        if(data){
            name_input.value = data.user_name || "";
            email_input.value = data.email || "";
        }else{
            console.log("no data for now!");
        }
    }catch(error){
        console.log("error on loading data:",error);
    }
}
//triggered when the button is pressed
init_button.addEventListener('click', async () => {
    let user_name = name_input.value;
    let email = email_input.value;
    if(user_name || email){
        await updateData(user_name,email);
    }
});

async function updateData(user_name,email) {
    //get the data from input fields
    // let user_name = name_input.value;
    // let email = email_input.value;
    try {
        //try setting datas to storage local
        await browser.storage.local.set({ user_name, email });
        console.log("Data updated successfully.");
    } catch (err) {
        console.error("Error updating data: ", err);
    }
}
