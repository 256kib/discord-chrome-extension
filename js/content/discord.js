let waitForContent = new Promise((resolve, reject) => {
    let intervalID = setInterval(() => {
        let layer = document.querySelectorAll(".layerContainer__59d0d")
        if (layer.length) {
            clearInterval(intervalID)
            resolve(layer[1])
        }
    }, 300);
})

//monkey-patching clipboard to easily get channel and serverId
let scriptTag = document.createElement("script")
scriptTag.src = chrome.runtime.getURL("js/content/resource/discordMonkeypatch.js")
document.body.appendChild(scriptTag)

//add an event listener for the monkey patch (apparently chrome.runtime is not avaible in web_resources)
document.addEventListener("serverData",(event)=>{
    chrome.runtime.sendMessage({id:"saveDataOverwrite",key:"serverData",content:event.detail})
})


function dispatchInfo(idOfInfo,data){
    document.dispatchEvent(new CustomEvent(idOfInfo,{
        detail: data
    }))
}

let role = {}
document.addEventListener("roleinfo", (event) => {
    role = { ...role, ...event.detail }
    //should contain
    //.id,.name,.color
    /*
    color can be either a hexcode (good ending) or a background color already formatted (style)[bad ending]
    */
    if (role.id && role.name && role.color) {
        console.log(role)
        chrome.runtime.sendMessage({ id: "saveData", key: "roleinfo", content: role })
        role = {}
    }
})

document.addEventListener("emojiinfo", (event) => {
    chrome.runtime.sendMessage({ id: "saveData", key: "emojiinfo", content: event.detail })
})



//formats emojis
//this shit still does not support normal discord emojis cuz they are written in a homosexual way
function formatEmoji(target) {
    let listAncestor = target.closest('li[aria-colindex]')
    if (!listAncestor) return
    let emojiButton = listAncestor.querySelector("button[data-id], button[data-surrogates]")
    let emojiId = emojiButton.getAttribute("data-id")
    let emojiName = emojiButton.getAttribute("data-name")
    let emojiImg = emojiButton.querySelector("img, div")
    let emojiUrl = emojiImg.getAttribute('src') ?? emojiImg.getAttribute('style')
    let discordFormatted = (emojiId&&!emojiUrl.includes("animated")) ? `<:${emojiName}:${emojiId}>` : `<a:${emojiName}:${emojiId}>`
    if (emojiUrl[0] !== "h") {
        console.log("work in progess")
        return
    }
    if (emojiButton) {
        dispatchInfo('emojiinfo', {
            name: emojiName,
            id: emojiId,
            formattedVersion: discordFormatted,
            url: emojiUrl,
        })
    }


}

//formats roles
function formatRole(target) {
    let roleRow = target.closest('[data-dnd-name], [class*="row"]');
    if (!roleRow) return
    let svgPath = roleRow.querySelector('svg[class*="role"] [fill], [style]');

    dispatchInfo('roleinfo', {
        name: roleRow.getAttribute('data-dnd-name') ?? roleRow.getAttribute('aria-label'),
        color: svgPath.getAttribute('fill') ?? svgPath.getAttribute('style')
    })
}
let ctrlKeyClicked = false
waitForContent.then(content => {
    let observer = new MutationObserver((mutations, observer) => {
        for (let mutation of mutations) {
            if (!ctrlKeyClicked) break
            if (mutation.addedNodes.length) {
                for (let node of mutation.addedNodes) {
                    let copyRoleIdButton = node.querySelector('[id*="role-context-devmode-copy-id"]') //this mess handles copying roles id
                    if (copyRoleIdButton) {
                        let roleId = copyRoleIdButton.id.split("-")
                        roleId = roleId[roleId.length - 1]
                        document.dispatchEvent(new CustomEvent('roleinfo', {
                            detail: { id: roleId }
                        }))
                    }
                    document.querySelector('[class*="trapClicks"]').click() //clickes that shit clicktrap thing gang
                    ctrlKeyClicked = false
                }
            }
        }
    }).observe(content, { subtree: true, childList: true })
})


//ctrl + right click to opencontext menu, infos get copied in observer and then closes the menu
document.addEventListener("contextmenu", (event) => {
    event.preventDefault()
    if (event.ctrlKey) {
        ctrlKeyClicked = true
        formatRole(event.target)
        formatEmoji(event.target)
    }
}, true)


