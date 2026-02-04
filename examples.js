/**
 * Real-World Usage Examples
 * 
 * Practical demonstrations of the ShoppingCart in various scenarios
 */

// Import ShoppingCart class
const ShoppingCart = require('./ShoppingCart.js');

console.log('🛍️  REAL-WORLD SHOPPING CART EXAMPLES\n');
console.log('='.repeat(60));

// ============================================================================
// EXAMPLE 1: Online Electronics Store
// ============================================================================
console.log('\n📱 EXAMPLE 1: Electronics Store Purchase');
console.log('-'.repeat(60));

const electronicsCart = new ShoppingCart();

// Customer adds items
electronicsCart.addItem('iPhone 15 Pro', 1099.99, 1);
electronicsCart.addItem('AirPods Pro', 249.99, 1);
electronicsCart.addItem('Apple Watch', 399.99, 1);
electronicsCart.addItem('USB-C Cable', 19.99, 2);

console.log('Customer: "I want to buy these electronics items"');
console.log(electronicsCart.getSummary());

// Customer finds a discount code
console.log('\n💬 Customer: "I have a SAVE20 discount code!"');
if (electronicsCart.applyDiscount('SAVE20')) {
    console.log('✓ Discount code applied successfully!');
    console.log(electronicsCart.getSummary());
} else {
    console.log('✗ Discount code invalid');
}

// ============================================================================
// EXAMPLE 2: Clothing Retail
// ============================================================================
console.log('\n\n👕 EXAMPLE 2: Clothing Store - Dynamic Cart Updates');
console.log('-'.repeat(60));

const clothingCart = new ShoppingCart();

console.log('Customer shopping journey:');
console.log('\n1️⃣  Customer adds 2 shirts');
clothingCart.addItem('T-Shirt', 19.99, 2);

console.log('2️⃣  Customer adds jeans');
clothingCart.addItem('Jeans', 59.99, 1);

console.log('3️⃣  Customer changes mind, wants 3 jeans');
clothingCart.updateQuantity('Jeans', 3);

console.log('4️⃣  Customer adds socks');
clothingCart.addItem('Socks', 9.99, 4);

console.log('5️⃣  Customer removes socks');
clothingCart.removeItem('Socks');

console.log('\n📊 Final Cart:');
console.log(clothingCart.getSummary());

// ============================================================================
// EXAMPLE 3: Grocery Shopping with Mixed Quantities
// ============================================================================
console.log('\n\n🛒 EXAMPLE 3: Grocery Store - Mixed Items');
console.log('-'.repeat(60));

const groceryCart = new ShoppingCart();

// Bulk shopping
groceryCart.addItem('Milk (1L)', 3.99, 2);
groceryCart.addItem('Bread', 2.49, 1);
groceryCart.addItem('Apples (per lb)', 1.99, 5);
groceryCart.addItem('Chicken (per lb)', 7.99, 3);
groceryCart.addItem('Rice (5lb)', 12.99, 1);

console.log('Grocery list added to cart');
console.log(groceryCart.getSummary());

// ============================================================================
// EXAMPLE 4: Online Food Delivery
// ============================================================================
console.log('\n\n🍔 EXAMPLE 4: Restaurant Order');
console.log('-'.repeat(60));

const foodCart = new ShoppingCart();

console.log('Customer ordering food for a group:');
foodCart.addItem('Burger Combo', 12.99, 3);
foodCart.addItem('Pizza (Large)', 18.99, 2);
foodCart.addItem('Fries', 4.99, 2);
foodCart.addItem('Soda (2L)', 2.99, 2);
foodCart.addItem('Dessert', 7.99, 1);

console.log('\nOrder Summary before discount:');
console.log(`Items: ${foodCart.getItemCount()}`);
console.log(`Subtotal: $${foodCart.getSubtotal().toFixed(2)}`);

// Apply discount
console.log('\n🎟️  Applying SAVE10 promotional code...');
foodCart.applyDiscount('SAVE10');

console.log('\n📦 Final Order:');
console.log(foodCart.getSummary());

// ============================================================================
// EXAMPLE 5: Cart Analysis Function
// ============================================================================
console.log('\n\n📊 EXAMPLE 5: Cart Analysis Tool');
console.log('-'.repeat(60));

function analyzeCart(cart) {
    const items = cart.getCartItems();
    const itemCount = cart.getItemCount();

    console.log('\n🔍 CART ANALYSIS:');
    console.log(`\n├─ Total Items: ${itemCount}`);

    // Find most expensive item
    const mostExpensive = items.reduce((max, item) =>
        item.price > max.price ? item : max
    );
    console.log(`├─ Most Expensive: ${mostExpensive.product} ($${mostExpensive.price.toFixed(2)})`);

    // Find highest quantity item
    const highestQty = items.reduce((max, item) =>
        item.quantity > max.quantity ? item : max
    );
    console.log(`├─ Highest Quantity: ${highestQty.product} (${highestQty.quantity} units)`);

    // Calculate average item price
    const avgPrice = cart.getSubtotal() / items.reduce((sum, item) => sum + item.quantity, 0);
    console.log(`├─ Average Price per Unit: $${avgPrice.toFixed(2)}`);

    // Calculate total tax
    console.log(`├─ Total Tax: $${cart.getTax().toFixed(2)}`);

    // Calculate savings with discount
    const savings = cart.getDiscount();
    if (savings > 0) {
        const savingsPercent = (savings / cart.getSubtotal() * 100).toFixed(1);
        console.log(`├─ Total Savings: $${savings.toFixed(2)} (${savingsPercent}%)`);
    } else {
        console.log(`├─ No Discount Applied`);
    }

    console.log(`└─ Final Total: $${cart.getTotal().toFixed(2)}`);
}

const analysisCart = new ShoppingCart();
analysisCart.addItem('Premium Headphones', 299.99, 1);
analysisCart.addItem('Phone Case', 24.99, 3);
analysisCart.addItem('Screen Protector', 9.99, 5);
analysisCart.applyDiscount('SAVE10');

analyzeCart(analysisCart);

// ============================================================================
// EXAMPLE 6: Input Validation Showcase
// ============================================================================
console.log('\n\n🔐 EXAMPLE 6: Input Validation - Error Handling');
console.log('-'.repeat(60));

const validationCart = new ShoppingCart();

console.log('\n1️⃣  Testing invalid inputs:');

console.log('\n  ❌ Attempt: Add item with negative price');
const r1 = validationCart.addItem('Product', -50, 1);
console.log(`    Result: ${r1 ? 'Accepted (ERROR!)' : 'Rejected (Correct) ✓'}`);

console.log('\n  ❌ Attempt: Add item with zero quantity');
const r2 = validationCart.addItem('Product', 50, 0);
console.log(`    Result: ${r2 ? 'Accepted (ERROR!)' : 'Rejected (Correct) ✓'}`);

console.log('\n  ✓ Attempt: Add valid item');
const r3 = validationCart.addItem('Valid Product', 50, 1);
console.log(`    Result: ${r3 ? 'Accepted (Correct) ✓' : 'Rejected (ERROR!)'}`);

console.log('\n2️⃣  Testing cart operations on non-existent items:');

console.log('\n  ❌ Attempt: Remove non-existent item');
const r4 = validationCart.removeItem('NonExistent');
console.log(`    Result: ${r4 ? 'Removed (ERROR!)' : 'Failed to remove (Correct) ✓'}`);

console.log('\n  ❌ Attempt: Update non-existent item');
const r5 = validationCart.updateQuantity('NonExistent', 5);
console.log(`    Result: ${r5 ? 'Updated (ERROR!)' : 'Failed to update (Correct) ✓'}`);

console.log('\n3️⃣  Testing invalid discount codes:');

console.log('\n  ❌ Attempt: Apply invalid code "SAVE50"');
const r6 = validationCart.applyDiscount('SAVE50');
console.log(`    Result: ${r6 ? 'Applied (ERROR!)' : 'Rejected (Correct) ✓'}`);

console.log('\n  ✓ Attempt: Apply valid code "save10" (case-insensitive)');
const r7 = validationCart.applyDiscount('save10');
console.log(`    Result: ${r7 ? 'Applied (Correct) ✓' : 'Rejected (ERROR!)'}`);

// ============================================================================
// EXAMPLE 7: Special Scenario - Bulk Order Processing
// ============================================================================
console.log('\n\n📦 EXAMPLE 7: Bulk Order - Business Purchase');
console.log('-'.repeat(60));

const bulkCart = new ShoppingCart();

console.log('Business bulk order:');
bulkCart.addItem('Office Chair', 249.99, 10); // 10 chairs
bulkCart.addItem('Desk', 499.99, 5); // 5 desks
bulkCart.addItem('Monitor', 299.99, 15); // 15 monitors
bulkCart.addItem('Keyboard', 89.99, 20); // 20 keyboards
bulkCart.addItem('Mouse', 39.99, 20); // 20 mice

console.log('\nInitial order value:');
console.log(`  Subtotal: $${bulkCart.getSubtotal().toFixed(2)}`);

// Apply business discount
console.log('\nApplying SAVE20 corporate discount...');
bulkCart.applyDiscount('SAVE20');

console.log('\nFinal Invoice:');
console.log(bulkCart.getSummary());

// Detailed breakdown
const bulkItems = bulkCart.getCartItems();
console.log('\nDetailed Breakdown:');
bulkItems.forEach(item => {
    const percent = (item.itemTotal / bulkCart.getSubtotal() * 100).toFixed(1);
    console.log(`  ${item.product.padEnd(20)} | ${item.quantity.toString().padStart(3)} × $${item.price.toFixed(2).padStart(8)} = $${item.itemTotal.toFixed(2).padStart(10)} (${percent}%)`);
});

// ============================================================================
// EXAMPLE 8: Comparing Different Discount Strategies
// ============================================================================
console.log('\n\n💵 EXAMPLE 8: Discount Comparison');
console.log('-'.repeat(60));

console.log('\nScenario: Customer buys items worth $500');

const createComparison = (discount) => {
    const cart = new ShoppingCart();
    cart.addItem('Item Set', 500, 1);

    if (discount) {
        cart.applyDiscount(discount);
    }

    return {
        discount: discount || 'None',
        subtotal: cart.getSubtotal(),
        discountAmount: cart.getDiscount(),
        tax: cart.getTax(),
        total: cart.getTotal()
    };
};

const noDiscount = createComparison(null);
const save10 = createComparison('SAVE10');
const save20 = createComparison('SAVE20');

console.log('\n┌─────────────────────────────────────────────────┐');
console.log('│  Discount Option  │  You Save  │  You Pay   │');
console.log('├─────────────────────────────────────────────────┤');

console.log(`│  No Discount      │   -$0.00   │  $${noDiscount.total.toFixed(2).padStart(8)}  │`);
console.log(`│  SAVE10 (10%)     │  -$${save10.discountAmount.toFixed(2).padStart(6)}   │  $${save10.total.toFixed(2).padStart(8)}  │`);
console.log(`│  SAVE20 (20%)     │  -$${save20.discountAmount.toFixed(2).padStart(6)}   │  $${save20.total.toFixed(2).padStart(8)}  │`);

console.log('└─────────────────────────────────────────────────┘');

const savings = noDiscount.total - save20.total;
console.log(`\n✨ Maximum savings with SAVE20: $${savings.toFixed(2)}`);

// ============================================================================
console.log('\n\n' + '='.repeat(60));
console.log('✅ All examples completed successfully!');
console.log('='.repeat(60) + '\n');