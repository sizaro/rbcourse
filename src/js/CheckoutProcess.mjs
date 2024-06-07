export default class CheckoutProcess {
    constructor(cartItems) {
        this.cartItems = cartItems;
        this.taxRate = 0.06; // 6% sales tax
        this.baseShippingCost = 10; // $10 for the first item
        this.additionalShippingCost = 2; // $2 for each additional item
    }

    calculateSubtotal() {
        return this.cartItems.reduce((total, item) => total + item.price, 0);
    }

    calculateShipping() {
        if (this.cartItems.length === 0) return 0;
        return this.baseShippingCost + (this.cartItems.length - 1) * this.additionalShippingCost;
    }

    calculateTax(subtotal) {
        return subtotal * this.taxRate;
    }

    calculateTotal(subtotal, shipping, tax) {
        return subtotal + shipping + tax;
    }

    displaySubtotal() {
        const subtotal = this.calculateSubtotal();
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    }

    displayOrderSummary() {
        const subtotal = this.calculateSubtotal();
        const shipping = this.calculateShipping();
        const tax = this.calculateTax(subtotal);
        const total = this.calculateTotal(subtotal, shipping, tax);

        document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    updateOrderSummaryOnZipChange() {
        const zipCodeInput = document.getElementById('zipCode');
        zipCodeInput.addEventListener('input', () => {
            if (zipCodeInput.value.length === 5) { // Assuming zip code is valid when it has 5 characters
                this.displayOrderSummary();
            }
        });
    }
}
