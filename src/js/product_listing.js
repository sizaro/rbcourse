import {qs, loadTemplateWithParent, setLocalStorage, getLocalStorage, setClick} from "./utils.mjs";
import productData from "./ProductData.mjs";
import { categoryTemplate, productTemplate } from "./ProductData.mjs";


//function to dynamically load category content

export async function loadCategory(){
    const selector = qs("#grid-container");
    const data = new productData()
    const resultsCategory = await data.getDataByCategory();
    const catTemplate = resultsCategory.map((cat) => categoryTemplate(cat)).join('')
    loadTemplateWithParent(catTemplate, selector)
}

export async function loadFruits(selector, name){
    const querySelector = qs(selector);
    const data = new productData()
    const resultsProduct = await data.getDataByProduct(name);
    const prodTemplate = resultsProduct.map((product) => productTemplate(product)).join('')
    loadTemplateWithParent(prodTemplate, querySelector)
}

//export async function saveToLocalStorage(selector, addToCart){

  //  console.log("its moving", selector)
    /*setClick(selector,addToCart)*/
//}

/*export async function loadToCart(key, element){
    const selector = qs(element)
    const localStorage = await getLocalStorage(key)
    const data =  localStorage.map((product) => productTemplate(product)).join("");
    return loadTemplateWithParent(selector, data)
}


//add an eventListener to the product and the add to cart button

//get the id for that element, and look  for it in the data

//add it to the template then add it to the local storage

*/

/*export async function addToCart(event){
    console.log("its loading")
    const data = new productData()
    const productId = event.target.getAttribute("data-id")
    console.log("here is the data-id", productId)
    const productDataById = await data.getDataByProductId(productId)
    console.log(productDataById)
    setLocalStorage("gw", productDataById)
    console.log(localStorage.getItem("gw"))
}*/

