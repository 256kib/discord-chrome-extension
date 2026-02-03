hideMultipleElements("#roles")
hideMultipleElements("#emojis")

let rolesContainer = document.querySelector(".body__category#roles")
let emojisContainer = document.querySelector(".body__category#emojis")
let webhookInfo = document.querySelector(".webhook")

chrome.storage.session.get("serverData",(data)=>{
    webhookInfo.textContent = Boolean(data["serverData"])
})

// the functions are from js\libs\DOMFunctionsNM.js
chrome.storage.session.get(['emojiinfo','roleinfo'],(data)=>{
    formatRolesToHTML(data['roleinfo'],rolesContainer)
    formatEmojisToHTML(data['emojiinfo'],emojisContainer)

    let containers = [rolesContainer,emojisContainer]
    //converts nodelist into array so i can use the flat method on it 
    let elements = containers.map((container)=>[...container.querySelectorAll(".role, .emoji")]).flat() 

    //makes the emojis removable on click
    for(let element of elements){
        element.addEventListener("click",()=>{
            let id = element.getAttribute('id') || element.getAttribute('roleid')

            chrome.runtime.sendMessage({
                id: "removeElement",
                key:(element.getAttribute('roleid'))?"roleinfo" : "emojiinfo",
                ID: id

            })
            //after deletion remove it from the screen
            hideElement(element)
            
        })
    }



})