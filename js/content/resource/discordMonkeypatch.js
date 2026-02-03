let originalClipboard = navigator.clipboard.writeText
navigator.clipboard.writeText = async(args) => {
    console.log(args)
    if(args.match(/webhooks/)){
        let documentLocation = document.location.href
        let Ids = documentLocation.match(/\d+/g)
        let serverId = Ids[0]
        let channelId = Ids[1]
        document.dispatchEvent(new CustomEvent("serverData",{
            bubbles: true,
            detail:{serverId:serverId,
                channelId: channelId,
                webhookUrl: args
            }
        }))
        console.log(`channelId: ${channelId}\nserverId: ${serverId}`)
    }
    return await originalClipboard.call(navigator.clipboard,args)
}