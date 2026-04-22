# About this extension
So this is an awesome (not really) discord extension that should help with self-roles

# Requirements
- Must have admin permissions on the server
- Must have carl-bot on the server
- [Discord dev mode](https://help.mee6.xyz/support/solutions/articles/101000482629-how-to-enable-developer-mode) enabled 

# How to use
1) CTRL+click emojis from the emoji picker to get emojis id
2) CTRL+click roles from the roles tab of the server to get the roles id
2) Copy the webhook url from the channel you intend to create the self-role to
3) go on [discohook.org](https://discohook.org/?data=eyJtZXNzYWdlcyI6W3siZGF0YSI6eyJjb250ZW50IjpudWxsLCJlbWJlZHMiOlt7ImNvbG9yIjpudWxsfV0sImF0dGFjaG1lbnRzIjpbXX19XX0)
4) create your embed, basically click on any text area and then you can simply click on the buttons and the text will appear there
5) send the embed and copy the message id from it (this part could be removed by monkey-patching fetch on discord)
6) go on [carl.gg](https://carl.gg/servers) and click on the server you copied the webhook from
7) insert the message id you copied and answer if all the roles should be pickable from the message (empty for no)
8) you are done :D now the reaction roles should work!

# How to install and use
### Clone the repo
```
git clone https://github.com/256kib/discord-chrome-extension.git
```
### [Load discord-chrome-extension as an unpacked extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?#load-unpacked)

# Note

For now this extension does not support default discord emojis

you can only use emojis from server carl-bot is into, and they can be emojis from server that are different from the one you own
