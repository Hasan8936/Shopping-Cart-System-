/**
 * Test Suite for ShoppingCart
 * 
 * Demonstrates all functionality and validates business logic
 */

// Import ShoppingCart class
const ShoppingCart = require('./ShoppingCart.js');

// Test Helper Functions
function runTests() {
    console.log('🧪 SHOPPING CART SYSTEM - TEST SUITE\n');
    console.log('='.repeat(50));

    testBasicOperations();
    testValidation();
    testDiscounts();
    testCalculations();
    testEdgeCases();

    console.log('\n' + '='.repeat(50));
    console.log('✅ All tests completed!\n');
}

// Test 1: Basic Cart Operations
function testBasicOperations() {
    console.log('\n📋 TEST 1: Basic Cart Operations');
    console.log('-'.repeat(50));

    const cart = new ShoppingCart();

    // Add items
    console.log('✓ Adding items to cart...');
    cart.addItem('Laptop', 999.99, 1);
    cart.addItem('Mouse', 29.99, 2);
    cart.addItem('Keyboard', 89.99, 1);

    console.log(`  - Items in cart: ${cart.getItemCount()}`);
    console.log(`  - Subtotal: $${cart.getSubtotal().toFixed(2)}`);

    // Update quantity
    console.log('\n✓ Updating Keyboard quantity from 1 to 2...');
    cart.updateQuantity('Keyboard', 2);
    console.log(`  - New subtotal: $${cart.getSubtotal().toFixed(2)}`);

    // Remove item
    console.log('\n✓ Removing Mouse from cart...');
    cart.removeItem('Mouse');
    console.log(`  - Items in cart: ${cart.getItemCount()}`);
    console.log(`  - New subtotal: $${cart.getSubtotal().toFixed(2)}`);

    // Display cart items
    console.log('\n✓ Cart Contents:');
    const items = cart.getCartItems();
    items.forEach(item => {
        console.log(`  - ${item.product}: $${item.price.toFixed(2)} x ${item.quantity} = $${item.itemTotal.toFixed(2)}`);
    });
}

// Test 2: Input Validation
function testValidation() {
    console.log('\n🔍 TEST 2: Input Validation & Error Handling');
    console.log('-'.repeat(50));

    const cart = new ShoppingCart();

    // Test negative price
    console.log('\n✓ Testing negative price (should fail)...');
    const result1 = cart.addItem('Product', -50, 1);
    console.log(`  - Result: ${result1 ? '❌ FAILED' : '✓ Correctly rejected'}`);

    // Test zero/negative quantity
    console.log('\n✓ Testing zero quantity (should fail)...');
    const result2 = cart.addItem('Product', 50, 0);
    console.log(`  - Result: ${result2 ? '❌ FAILED' : '✓ Correctly rejected'}`);

    // Test removing non-existent item
    console.log('\n✓ Testing remove non-existent item (should fail)...');
    const result3 = cart.removeItem('NonExistent');
    console.log(`  - Result: ${result3 ? '❌ FAILED' : '✓ Correctly rejected'}`);

    // Test updating non-existent item
    console.log('\n✓ Testing update non-existent item (should fail)...');
    const result4 = cart.updateQuantity('NonExistent', 5);
    console.log(`  - Result: ${result4 ? '❌ FAILED' : '✓ Correctly rejected'}`);

    // Test duplicate product (should update, not add)
    console.log('\n✓ Testing duplicate product (should update quantity)...');
    cart.addItem('Laptop', 999.99, 1);
    console.log(`  - Items: ${cart.getItemCount()}`);
    cart.addItem('Laptop', 999.99, 1);
    console.log(`  - Items after duplicate: ${cart.getItemCount()}`);
    const items = cart.getCartItems();
    console.log(`  - Laptop quantity: ${items[0].quantity} (should be 2)`);
}

// Test 3: Discount Codes
function testDiscounts() {
    console.log('\n🎟️  TEST 3: Discount Code Application');
    console.log('-'.repeat(50));

    const cart = new ShoppingCart();
    cart.addItem('Product A', 100, 1);
    cart.addItem('Product B', 50, 1);

    console.log(`\n✓ Initial subtotal: $${cart.getSubtotal().toFixed(2)}`);

    // Test SAVE10
    console.log('\n✓ Applying SAVE10 discount...');
    cart.applyDiscount('SAVE10');
    console.log(`  - Discount amount: $${cart.getDiscount().toFixed(2)}`);
    console.log(`  - Total with SAVE10: $${cart.getTotal().toFixed(2)}`);

    // Test SAVE20
    console.log('\n✓ Applying SAVE20 discount...');
    cart.applyDiscount('SAVE20');
    console.log(`  - Discount amount: $${cart.getDiscount().toFixed(2)}`);
    console.log(`  - Total with SAVE20: $${cart.getTotal().toFixed(2)}`);

    // Test case-insensitive
    console.log('\n✓ Testing case-insensitive discount (save10)...');
    cart.applyDiscount('save10');
    console.log(`  - Applied successfully: ${cart.getDiscount() > 0 ? '✓' : '❌'}`);

    // Test invalid code
    console.log('\n✓ Testing invalid discount code (should fail)...');
    const result = cart.applyDiscount('INVALID');
    console.log(`  - Result: ${result ? '❌ FAILED' : '✓ Correctly rejected'}`);
}

// Test 4: Calculations (Subtotal, Tax, Total)
function testCalculations() {
    console.log('\n💰 TEST 4: Calculation Accuracy');
    console.log('-'.repeat(50));

    const cart = new ShoppingCart();
    cart.addItem('Item 1', 50.00, 2); // 100
    cart.addItem('Item 2', 75.50, 1); // 75.50
    // Subtotal: 175.50

    console.log('\n✓ Test Setup:');
    console.log('  - Item 1: $50.00 x 2 = $100.00');
    console.log('  - Item 2: $75.50 x 1 = $75.50');
    console.log('  - Subtotal: $175.50');

    console.log('\n✓ Without Discount:');
    console.log(`  - Subtotal: $${cart.getSubtotal().toFixed(2)}`);
    console.log(`  - Tax (10%): $${cart.getTax().toFixed(2)}`);
    console.log(`  - Total: $${cart.getTotal().toFixed(2)}`);
    // Expected: Tax = 17.55, Total = 193.05

    console.log('\n✓ With 10% Discount (SAVE10):');
    cart.applyDiscount('SAVE10');
    const subtotal = cart.getSubtotal();
    const discount = cart.getDiscount();
    const tax = cart.getTax();
    const total = cart.getTotal();

    console.log(`  - Subtotal: $${subtotal.toFixed(2)}`);
    console.log(`  - Discount (10%): -$${discount.toFixed(2)}`);
    console.log(`  - After Discount: $${(subtotal - discount).toFixed(2)}`);
    console.log(`  - Tax (10% on discounted): $${tax.toFixed(2)}`);
    console.log(`  - Total: $${total.toFixed(2)}`);
    // Expected: Discount = 17.55, After = 157.95, Tax = 15.795 ≈ 15.80, Total = 173.75
}

// Test 5: Edge Cases
function testEdgeCases() {
    console.log('\n⚠️  TEST 5: Edge Cases');
    console.log('-'.repeat(50));

    // Empty cart
    console.log('\n✓ Empty cart operations...');
    const cart = new ShoppingCart();
    console.log(`  - Item count: ${cart.getItemCount()}`);
    console.log(`  - Subtotal: $${cart.getSubtotal().toFixed(2)}`);
    console.log(`  - Total: $${cart.getTotal().toFixed(2)}`);
    console.log(`  - Summary: ${cart.getSummary()}`);

    // Large numbers
    console.log('\n✓ Large price values...');
    const cart2 = new ShoppingCart();
    cart2.addItem('Expensive Item', 9999.99, 5);
    console.log(`  - Subtotal: $${cart2.getSubtotal().toFixed(2)}`);
    console.log(`  - Total: $${cart2.getTotal().toFixed(2)}`);

    // Floating point precision
    console.log('\n✓ Floating point precision...');
    const cart3 = new ShoppingCart();
    cart3.addItem('Item', 0.01, 3);
    console.log(`  - Subtotal: $${cart3.getSubtotal().toFixed(2)}`);
    console.log(`  - Total: $${cart3.getTotal().toFixed(2)}`);

    // Clear cart
    console.log('\n✓ Clear cart operation...');
    cart2.clearCart();
    console.log(`  - Items after clear: ${cart2.getItemCount()}`);
}

// Run all tests
runTests();

// Demo: Real-world shopping scenario
console.log('\n🛒 REAL-WORLD EXAMPLE: Electronics Purchase');
console.log('='.repeat(50));

const myCart = new ShoppingCart();
myCart.addItem('MacBook Pro', 1999.99, 1);
myCart.addItem('USB-C Hub', 49.99, 1);
myCart.addItem('Screen Protector', 9.99, 3);

console.log(myCart.getSummary());