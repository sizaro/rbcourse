
// return data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// store data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function loadTemplateWithParent(template, parentElement){
  parentElement.insertAdjacentHTML("afterbegin", template)
}

export async function dynamicHeaderFooter(){
  const elementHeader = await getTemplate("../partials/header.html")
  const selectorHeader = document.querySelector("#main-header")

  const elementFooter = await getTemplate("../partials/footer.html")
  const selectorFooter = document.querySelector("#main-footer")

  loadTemplateWithParent(elementHeader, selectorHeader)
  loadTemplateWithParent(elementFooter, selectorFooter)

}

export async function getTemplate(url){
  const data = await fetch(url)
  const response = await data.text()
  return response

}

export function qs(selector, parent = document){
  return parent.querySelector(selector)
}


