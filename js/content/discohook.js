/// <reference path="js/libs/DOMFunctionsNM.js">


//move each template to the body parent to avoid rendering issue
function moveTemplatesToBody() {
  document.querySelectorAll('template').forEach((tag) => {
    document.body.appendChild(tag)
  })
}




fetch(chrome.runtime.getURL('js/content/resource/container.html'))
  .then(response => response.text())
  .then(data => {
    const div = document.createElement('div');
    div.innerHTML = data;
    // .kn3fae-0.knnFwV , [dir="ltr"]
    waitForElement([".kn3fae-0.knnFwV",'[dir="ltr"][class*="text"]'], (appendTo) => {
      console.log("hi")
      appendTo = appendTo.parentElement
      appendTo.appendChild(div)
      moveTemplatesToBody()
      //importing css
      let link = document.createElement("link")
      link.setAttribute("rel", "stylesheet")
      link.setAttribute("href", chrome.runtime.getURL("js/content/resource/container.css"))
      document.body.appendChild(link)


      // importing the emoji data
      chrome.runtime.sendMessage({ id: "getData", key: "emojiinfo" }, (response) => {
        console.log(response.content)
        let parent = document.querySelector(".container#emojis")
        formatEmojisToHTML(response.content, parent)
      })

      // importing the role data
      chrome.runtime.sendMessage({ id: "getData", key: "roleinfo" }, (response) => {
        console.log(response.content)
        let parent = document.querySelector(".container#roles")
        formatRolesToHTML(response.content, parent)
      })
    })

  })

