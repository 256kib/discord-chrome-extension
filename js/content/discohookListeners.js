/// <reference path="js\libs\DOMFunctionsNM.js">

//setup clickable roles n stuff
let lastClickedTextArea = null

function statusUpdate(text) {
    let status = document.querySelector(".status__text")
    status.textContent = text
}




// setups the emojis and roles clickable behavior
waitForElement([".container#roles"], () => {
    let containers = document.querySelectorAll(".container#roles, .container#emojis");
    for (let container of containers) {
        let childElements = container.querySelectorAll(".role, .emoji");
        for (let child of childElements) {
            child.addEventListener("click", (event) => {
                if (!lastClickedTextArea) return;
                let formattedVersion = child.getAttribute("roleid") ? `<@&${child.getAttribute("roleid")}>`: child.getAttribute("formattedversion");
                if (child.getAttribute("used")) {
                    child.removeAttribute("used");
                    child.style.border = '';
                    lastClickedTextArea.value = lastClickedTextArea.value.replaceAll(formattedVersion, '');
                } else {
                    child.setAttribute("used", "true");
                    child.style.border = "1px solid green";
                    lastClickedTextArea.value += formattedVersion;
                }
            });
        }
    }
    console.log("Event listeners have been set up successfully.");
});



function extractFirstGroup(pattern, string) {
    const regex = new RegExp(pattern, 'g');
    const matches = [...string.matchAll(regex)];
    return matches.map(match => match[1]); // Extract the first group from each match
}

function makePairs(emojisIds, rolesIds) {
    let pairs = []
    if (emojisIds.length === rolesIds.length) {
        for (let i = 0; i < emojisIds.length; i++) {
            pairs.push({
                emoji: emojisIds[i],
                roles: [{ id: rolesIds[i] }]
            })
        }
    }
    return pairs
}

let matchEmojis = null;
let matchRoles = null;
document.body.addEventListener('click', (event) => {
    if (event.target.tagName === "TEXTAREA") {
        lastClickedTextArea = event.target;
        matchEmojis = extractFirstGroup(/<a?:.*?(\d+).*?>/, lastClickedTextArea.value);
        console.log(matchEmojis);
        matchRoles = extractFirstGroup(/<@&(\d+)>/, lastClickedTextArea.value);
        console.log(matchRoles);
        let pairs = makePairs(matchEmojis, matchRoles)
        if (pairs) {
            chrome.runtime.sendMessage({ id: "saveDataOverwrite", key: "pairs", content: pairs })
        }
        console.log("setup text area");
    }
});
