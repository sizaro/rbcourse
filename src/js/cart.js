class CheckoutProcess {
  constructor(cartItems) {
    this.cartItems = cartItems;
    this.taxRate = 0.06; // 6% sales tax
    this.baseShippingCost = 10; // $10 for the first item
    this.additionalShippingCost = 2; // $2 for each additional item
  }

  calculateSubtotal() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
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

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("shipping").textContent = `$${shipping.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("gw")) || [];

  if (cartItems.length === 0) {
    document.getElementById("order-summary").textContent =
      "Your cart is empty.";
    return;
  }

  // Display cart items in the summary
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = cartItems
    .map(
      (item) => `
        <div class="cart-item">
            <p>${item.Name}</p>
            <img src="${item.ImageUrl}"</p>
            <p>Price: $${item.price}</p>
        </div>
    `,
    )
    .join("");

  // Initialize CheckoutProcess and display order summary
  const checkoutProcess = new CheckoutProcess(cartItems);
  checkoutProcess.displayOrderSummary();
});
