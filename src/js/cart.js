import { dynamicHeaderFooter } from "./utils.mjs";
dynamicHeaderFooter()


class CheckoutProcess {
  constructor(cartItems) {
    this.cartItems = cartItems;
    this.taxRate = 0.06; // 6% sales tax
    this.baseShippingCost = 10; // $10 for the first item
    this.additionalShippingCost = 2; // $2 for each additional item
  }

  // Methods handling calculations

  calculateSubtotal() {
    console.log("Cart Items in Subtotal Calculation:", this.cartItems);
    return this.cartItems.reduce((total, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 1;
      console.log(`Item: ${item.Name}, Price: ${price}, Quantity: ${quantity}`);
      return total + price * quantity;
    }, 0);
  }

  calculateShipping() {
    if (this.cartItems.length === 0) return 0;
    return (
      this.baseShippingCost +
      (this.cartItems.length - 1) * this.additionalShippingCost
    );
  }

  calculateTax(subtotal) {
    return subtotal * this.taxRate;
  }

  calculateTotal(subtotal, shipping, tax) {
    return subtotal + shipping + tax;
  }

  displayOrderSummary() {
    const subtotal = this.calculateSubtotal();
    const shipping = this.calculateShipping();
    const tax = this.calculateTax(subtotal);
    const total = this.calculateTotal(subtotal, shipping, tax);

    console.log("Subtotal:", subtotal);
    console.log("Shipping:", shipping);
    console.log("Tax:", tax);
    console.log("Total:", total);

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("shipping").textContent = `$${shipping.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("gw")) || [];
  console.log("Cart Items from Local Storage:", cartItems);

  if (cartItems.length === 0) {
    document.getElementById("order-summary").textContent = "Your cart is empty.";
    return;
  }

  function removeFromCart(event) {
    const productId = event.target.getAttribute('data-id');
    console.log('Removing product with ID:', productId); // Check if the correct ID is being retrieved

    const indexToRemove = cartItems.findIndex(item => item.Id === productId);
    if (indexToRemove !== -1) {
      cartItems.splice(indexToRemove, 1); // Remove the item from the array
    }

    console.log('Updated cart items after removal:', cartItems); // Check the updated cart items

    // Update local storage
    localStorage.setItem('gw', JSON.stringify(cartItems));

    // Remove the corresponding HTML element from the page
    const cartItemElement = event.target.closest('.cart-item');
    if (cartItemElement) {
      cartItemElement.remove();
    }

    // Re-render the order summary
    const checkoutProcess = new CheckoutProcess(cartItems);
    checkoutProcess.displayOrderSummary();
  }

  // Displaying cart items in the summary
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = cartItems
    .map(
      (item) => `
        <div class="cart-item">
            <p>${item.Name}</p>
            <img src="${item.ImageUrl}" alt="${item.Name}"/>
            <p>Price: $${item.price}</p>
            <div class="buttons">
            <button class="removeFromCart" data-id="${item.Id}">Remove From Cart</button>
            </div>
        </div>
    `
    )
    .join("");

  // Attach event listeners to remove from cart buttons
  const removeButtons = document.querySelectorAll('.removeFromCart');
  removeButtons.forEach(button => {
    button.addEventListener('click', removeFromCart);
  });

  // Initialize and display the order summary
  const checkoutProcess = new CheckoutProcess(cartItems);
  checkoutProcess.displayOrderSummary();
});
