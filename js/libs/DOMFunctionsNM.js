function getTemplate(selector) {
    let template = document.querySelector(`template${selector}`)
    let imgTag = template.content.querySelector(selector)
    return imgTag.cloneNode(true)
}

function hideElement(element) {
    element.originalDisplayMode = `${element.style.display}`
    element.style.display = "none"
}

function showElement(element) {
    element.style.display = element.originalDisplayMode
    element.removeAttribute('originalDisplayMode')
}

function hideMultipleElements(selector) {
    let elements = document.querySelectorAll(selector)
    for (let element of elements) {
        element.originalDisplayMode = `${element.style.display}`
        element.style.display = "none"
    }
}

function showMultipleElements(selector) {
    let elements = document.querySelectorAll(selector)
    if(!elements) return
    for (let element of elements) {
        element.style.display = element.originalDisplayMode
        element.removeAttribute('originalDisplayMode')
    }
}
function formatRolesToHTML(data,parentTo){
    //should be object hopefully
    //check if color starts with # (hex) or b (background-color)
    if(!data?.length) return
    showMultipleElements("#roles")
    for(let role of data){
        let template = getTemplate(".role")
        template.setAttribute("roleid",role.id)
        //checks if it is an hex or a style already
        let templateColorDot = template.querySelector(".role__color")
        templateColorDot.style = (role.color[0]==="#") ? `background-color:${role.color}`:role.color
        let templateText = template.querySelector(".role__text")
        templateText.textContent = role.name
        parentTo.appendChild(template)

        
    }
}

function formatEmojisToHTML(data,parentTo){
    if(!data?.length) return
    showMultipleElements("#emojis")
    for(let emoji of data){
        let templateEmoji = getTemplate(".emoji")
        
        let style = `background-image: url("${emoji.url}");`
        templateEmoji.setAttribute("style",style)


        templateEmoji.setAttribute('name',emoji.name)
        templateEmoji.setAttribute('alt',emoji.name)
        templateEmoji.setAttribute('formattedversion',emoji.formattedVersion)
        templateEmoji.setAttribute('id',emoji.id)
        parentTo.appendChild(templateEmoji)
    }
}

function waitForElement(selectors, callback) {
  let appendTo = null
  let interval = setInterval(() => {
    for (let selector of selectors) {
      appendTo = document.querySelector(selector)
      if (appendTo) {
        callback(appendTo)
        clearInterval(interval)
        return
      }
    }
  }, 300);
}