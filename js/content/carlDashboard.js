
function createReactionRoles(serverId, channelId, messageId, messageUnique) {
    chrome.runtime.sendMessage({ id: "getData", key: "pairs" }, (response) => {
        if (response.content) {
            fetch(`https://carl.gg/api/v1/servers/${serverId}/reactionroles`, {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "content-type": "application/json",
                    "x-csrf-token": ""
                },
                "referrer": `https://carl.gg/dashboard/${serverId}/reactionroles`,
                "body": JSON.stringify({
                    "channel_id": channelId,
                    "content": "",
                    "embed": {
                        "color": 5198940
                    },
                    "pairs": response.content,
                    "whitelist": [],
                    "blacklist": [],
                    "reaction_role_limit": 0,
                    "mode": 1,
                    "type": {
                        "name": (messageUnique) ? "unique" : "normal",
                        "description": "Hands out roles when you click on them, does what you'd expect"
                    },
                    "message_id": messageId
                }),
                "method": "PUT",
                "mode": "cors",
                "credentials": "include"
            });
        }
    })
}

let serverId = document.location.href.match(/\d+/g)
let channelId = null
let messageId = prompt("Input the message id of the embed")
let messageUnique = prompt("should users only pick up one of the roles from the message (leave empty for no)")
chrome.runtime.sendMessage({ id: "getData", key: "serverData" }, (resp) => {
    channelId = resp.content.channelId
    createReactionRoles(serverId,channelId,messageId,messageUnique)
})



