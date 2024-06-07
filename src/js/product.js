import { loadFruits} from "./product_listing";
import { dynamicHeaderFooter, hideElement, setLocalStorage } from "./utils.mjs";
import productData from "./ProductData.mjs";
//import {saveToLocalStorage} from "./tocart";

dynamicHeaderFooter()
//loadFruits("#fruits", "Fruits")


document.addEventListener("DOMContentLoaded", async () => {
    await loadFruits('#fruits', 'Fruits');
    addEventListenersToButtons();
});

function addEventListenersToButtons() {
    console.log("Attaching event listeners");

    const addToCartButtons = document.querySelectorAll(".addToCart");
    console.log(`Found ${addToCartButtons.length} elements with the class 'addToCart'`);

    addToCartButtons.forEach(button => {
        button.addEventListener("click", addToCart);
        console.log(`Event listener attached to button with data-id: ${button.getAttribute('data-id')}`);
    });
}

export async function addToCart(event) {
    console.log("Button clicked");

    const productId = event.target.getAttribute("data-id");
    console.log("Product ID:", productId);

    const data = new productData();
    const productDataById = await data.getDataByProductId(productId);
    console.log("Product Data by ID:", productDataById);

    setLocalStorage("gw", productDataById);
    console.log("Local Storage Data:", localStorage.getItem("gw"));
}












/*document.addEventListener("DOMContentLoaded", ()=>{

    console.log("its started")
    saveToLocalStorage()
})
*/
//hideElement("#removeFromCart")

// i want to start this afresh,
//i am going to build all things in one function
// first i am going to need to get the id for the button i am going to set the eventlistener to
//second i am going to set the eventlistener to that button
//third i am going to need to get the attribute of data-id setting it to productId
//fourth i am going to use that id to get the data that matches that productId
//fifth i am going to get that data and convert it to an object or list then set it to local storage
// these are the steps i want to try, one by one as i check
