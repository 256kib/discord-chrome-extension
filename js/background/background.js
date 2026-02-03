
//this works for singular data items such as objects that need to be later indexed
function addDataToStorage(key, value) {
    chrome.storage.session.get(key, (data) => {
        const arr = data[key] || [];
        arr.push(value);

        chrome.storage.session.set({ [key]: arr }, () => {
            console.log("data added successfully!");
        });
    });
}
//same thing here. it removes one thing based given one id since emojs and role share the key "id"
function removeDataFromStorage(key, id) {
    chrome.storage.session.get(key, (data) => {
        const arr = data[key] || [];
        // Filter out the item with the specified id
        const filteredArr = arr.filter(item => item.id !== id);

        chrome.storage.session.set({ [key]: filteredArr }, () => {
            console.log("data removed successfully!");
        });
    });
}


function saveDataOverwrite(key,value){
    chrome.storage.session.set({[key]:value})
}


chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
    if(message.id === "saveData"){
        addDataToStorage(message.key,message.content)
    }
    if(message.id === "saveDataOverwrite"){
        saveDataOverwrite(message.key,message.content)
    }

    if(message.id === "getData"){
        chrome.storage.session.get(message.key,(data)=>{
            console.log(data[message.key])
            sendResponse({content:data[message.key]})
        })
        return true
    }

    if(message.id === "removeElement"){
        removeDataFromStorage(message.key,message.ID)
    }
})