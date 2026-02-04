/**
 * ShoppingCart Module
 * 
 * A robust shopping cart system with product management,
 * discount application, and tax calculations.
 * 
 * Features:
 * - Product management (add, remove, update)
 * - Discount code application (case-insensitive)
 * - Tax calculations
 * - Input validation and error handling
 */

class ShoppingCart {
    // Constants
    static TAX_RATE = 0.10; // 10% tax
    static DISCOUNT_CODES = {
        'SAVE10': 0.10, // 10% discount
        'SAVE20': 0.20 // 20% discount
    };

    // Private fields (using # syntax for true encapsulation)
    #items; // Map to store cart items by product name
    #appliedDiscount; // Currently applied discount amount

    constructor() {
        this.#items = new Map();
        this.#appliedDiscount = 0;
    }

    /**
     * Adds an item to the cart or updates quantity if it exists
     * @param {string} product - Product name
     * @param {number} price - Product price
     * @param {number} quantity - Quantity to add (default: 1)
     * @returns {boolean} - True if successful
     * @throws {Error} - If validation fails
     */
    addItem(product, price, quantity = 1) {
        // Validate inputs
        if (!this.#validateInputs(product, price, quantity)) {
            return false;
        }

        // If product exists, update quantity instead
        if (this.#items.has(product)) {
            const currentItem = this.#items.get(product);
            currentItem.quantity += quantity;
        } else {
            // Add new product
            this.#items.set(product, {
                price: parseFloat(price),
                quantity: parseInt(quantity)
            });
        }

        return true;
    }

    /**
     * Removes a product from the cart
     * @param {string} product - Product name to remove
     * @returns {boolean} - True if removed, false if product not found
     */
    removeItem(product) {
        if (!product || typeof product !== 'string') {
            console.error('Invalid product name');
            return false;
        }

        if (!this.#items.has(product)) {
            console.error(`Product "${product}" not found in cart`);
            return false;
        }

        this.#items.delete(product);
        return true;
    }

    /**
     * Updates the quantity of a product in the cart
     * @param {string} product - Product name
     * @param {number} quantity - New quantity
     * @returns {boolean} - True if successful
     */
    updateQuantity(product, quantity) {
        // Validate product name
        if (!product || typeof product !== 'string') {
            console.error('Invalid product name');
            return false;
        }

        // Check if product exists
        if (!this.#items.has(product)) {
            console.error(`Product "${product}" not found in cart`);
            return false;
        }

        // Validate quantity
        if (!Number.isInteger(quantity) || quantity <= 0) {
            console.error('Quantity must be a positive integer');
            return false;
        }

        this.#items.get(product).quantity = quantity;
        return true;
    }

    /**
     * Calculates the subtotal (sum of all items before discount and tax)
     * @returns {number} - Subtotal amount
     */
    getSubtotal() {
        let subtotal = 0;

        for (const item of this.#items.values()) {
            subtotal += item.price * item.quantity;
        }

        return Math.round(subtotal * 100) / 100; // Round to 2 decimal places
    }

    /**
     * Applies a discount code to the cart
     * @param {string} code - Discount code
     * @returns {boolean} - True if valid code applied
     */
    applyDiscount(code) {
        // Validate code input
        if (!code || typeof code !== 'string') {
            console.error('Invalid discount code');
            return false;
        }

        // Make code case-insensitive
        const normalizedCode = code.toUpperCase().trim();

        // Check if code exists
        if (!ShoppingCart.DISCOUNT_CODES.hasOwnProperty(normalizedCode)) {
            console.error(`Invalid discount code: "${code}"`);
            return false;
        }

        // Calculate discount amount
        const discountPercentage = ShoppingCart.DISCOUNT_CODES[normalizedCode];
        this.#appliedDiscount = this.getSubtotal() * discountPercentage;

        return true;
    }

    /**
     * Calculates the final total (subtotal - discount + tax)
     * @returns {number} - Total payable amount
     */
    getTotal() {
        const subtotal = this.getSubtotal();
        const discountedAmount = subtotal - this.#appliedDiscount;
        const tax = discountedAmount * ShoppingCart.TAX_RATE;
        const total = discountedAmount + tax;

        return Math.round(total * 100) / 100; // Round to 2 decimal places
    }

    /**
     * Gets the current discount amount
     * @returns {number} - Discount amount
     */
    getDiscount() {
        return Math.round(this.#appliedDiscount * 100) / 100;
    }

    /**
     * Gets the current tax amount
     * @returns {number} - Tax amount
     */
    getTax() {
        const discountedAmount = this.getSubtotal() - this.#appliedDiscount;
        const tax = discountedAmount * ShoppingCart.TAX_RATE;
        return Math.round(tax * 100) / 100;
    }

    /**
     * Returns all items in the cart
     * @returns {Array} - Array of cart items with product name, price, and quantity
     */
    getCartItems() {
        const items = [];

        for (const [product, details] of this.#items.entries()) {
            items.push({
                product,
                price: details.price,
                quantity: details.quantity,
                itemTotal: Math.round(details.price * details.quantity * 100) / 100
            });
        }

        return items;
    }

    /**
     * Clears all items from the cart
     */
    clearCart() {
        this.#items.clear();
        this.#appliedDiscount = 0;
    }

    /**
     * Gets the number of items in the cart
     * @returns {number} - Number of unique products
     */
    getItemCount() {
        return this.#items.size;
    }

    /**
     * Generates a detailed cart summary
     * @returns {string} - Formatted cart summary
     */
    getSummary() {
        if (this.getItemCount() === 0) {
            return 'Cart is empty';
        }

        const items = this.getCartItems();
        let summary = '=== CART SUMMARY ===\n';

        items.forEach(item => {
            summary += `${item.product}: $${item.price.toFixed(2)} x ${item.quantity} = $${item.itemTotal.toFixed(2)}\n`;
        });

        summary += `\nSubtotal: $${this.getSubtotal().toFixed(2)}\n`;

        if (this.getDiscount() > 0) {
            summary += `Discount: -$${this.getDiscount().toFixed(2)}\n`;
        }

        summary += `Tax (10%): $${this.getTax().toFixed(2)}\n`;
        summary += `==================\n`;
        summary += `TOTAL: $${this.getTotal().toFixed(2)}`;

        return summary;
    }

    // Private helper method for input validation
    #validateInputs(product, price, quantity) {
        // Validate product name
        if (!product || typeof product !== 'string') {
            console.error('Invalid product name');
            return false;
        }

        // Validate price
        if (typeof price !== 'number' || price < 0) {
            console.error('Price must be a non-negative number');
            return false;
        }

        // Validate quantity
        if (!Number.isInteger(quantity) || quantity <= 0) {
            console.error('Quantity must be a positive integer');
            return false;
        }

        return true;
    }
}

// Export for use in Node.js, browsers, and module bundlers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShoppingCart;
}
// Make available in browser global scope
if (typeof window !== 'undefined') {
    window.ShoppingCart = ShoppingCart;
}