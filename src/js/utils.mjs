
// return data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// store data to local storage
export function setLocalStorage(key, newData) {
  try {
    // Get existing data from local storage
    let existingData = localStorage.getItem(key);

    // Parse existing data from JSON format
    existingData = existingData ? JSON.parse(existingData) : [];

    // If existingData is not an array, convert it into an array
    if (!Array.isArray(existingData)) {
      existingData = [existingData]; // Convert to array with existing data
    }

    // Append the new data to the existing data
    existingData.push(newData);

    // Save the updated data back to local storage
    localStorage.setItem(key, JSON.stringify(existingData));
  } catch (error) {
    console.error('Error in setLocalStorage:', error);
  }
}
// set a listener for both touchend and click
export function setClick(selector, callback) {

  console.log("its still on track", selector)
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
      element.addEventListener("touchend", (event) => {
        console.log("i have the element", element)
          event.preventDefault();
          callback(event);
      });
      element.addEventListener("click", callback);
  });
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

export function showElement(element, parent=document){
  parent.querySelector(element).classList.remove("hide")
  parent.querySelector(element).classList.add("show")
}

export function hideElement(elements, parent = document) {
  parent.querySelectorAll(elements).forEach(element => {
      element.classList.remove(".show");
      element.classList.add(".hide");
  });
}



