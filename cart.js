let cart = [];
let currentProduct = {};

// Elements
const qtyModal = document.getElementById('qtyModal');
const qtyInput = document.getElementById('qtyInput');
const cartModal = document.getElementById('cartModal');
const cartItemsContainer = document.getElementById('cartItems');
const popupMsg = document.getElementById('popupMsg');
const popupText = document.getElementById('popupText');

// Open Quantity Modal
function openQtyModal(name, price) {
    currentProduct = { name, price };
    qtyInput.value = '';
    qtyModal.style.display = 'block';
    qtyInput.focus();
}

// Add to Cart Logic
document.getElementById('qtyOkBtn').addEventListener('click', () => {
    const quantity = qtyInput.value;
    if (quantity && quantity > 0) {
        const item = {
            ...currentProduct,
            quantity: quantity
        };
        cart.push(item);
        qtyModal.style.display = 'none';
        showPopup(`${item.name} (${quantity}) added to cart!`);
    } else {
        alert('Please enter a valid quantity');
    }
});

document.getElementById('qtyCancelBtn').addEventListener('click', () => {
    qtyModal.style.display = 'none';
});

// Show Popup
function showPopup(message) {
    popupText.innerText = message;
    popupMsg.style.display = 'block';
    setTimeout(() => {
        popupMsg.style.display = 'none';
    }, 3000);
}

// View Cart
document.getElementById('viewCartBtn').addEventListener('click', () => {
    renderCart();
    cartModal.style.display = 'block';
});

document.getElementById('closeCart').addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Render Cart Items
function renderCart() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = calculateItemTotal(item.price, item.quantity);
        total += itemTotal;

        const div = document.createElement('div');
        div.style.borderBottom = '1px solid #eee';
        div.style.padding = '10px 0';
        div.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.price} x ${item.quantity}</small>
        </div>
        <div>
          <span>₹${itemTotal}</span>
          <button onclick="removeFromCart(${index})" style="background:red; color:white; border:none; border-radius:5px; padding:2px 6px; margin-left:10px; cursor:pointer;">X</button>
        </div>
      </div>
    `;
        cartItemsContainer.appendChild(div);
    });

    const totalDiv = document.createElement('div');
    totalDiv.style.marginTop = '15px';
    totalDiv.style.fontWeight = 'bold';
    totalDiv.style.textAlign = 'right';
    totalDiv.innerHTML = `Total: ₹${total}`;
    cartItemsContainer.appendChild(totalDiv);
}

// Helper to extract price number
function calculateItemTotal(priceStr, quantity) {
    // Assumes price format like "₹120/kg" or "₹60/dozen"
    const priceNum = parseInt(priceStr.replace(/[^0-9]/g, ''));
    return priceNum * quantity;
}

// Remove from Cart
window.removeFromCart = function (index) {
    cart.splice(index, 1);
    renderCart();
};

// Product Map (Name -> ObjectId)
let productMap = {};

// Fetch Products from Backend to get IDs
async function fetchProductIds() {
    try {
        const res = await fetch('http://localhost:5000/api/products'); // Default GET maps to getAllProducts
        if (res.ok) {
            const products = await res.json();
            products.forEach(p => {
                productMap[p.name] = p._id;
            });
            console.log("Product map loaded:", Object.keys(productMap).length);
        }
    } catch (err) {
        console.error("Failed to fetch product IDs", err);
    }
}
// Init fetch
fetchProductIds();

// Place Order
document.getElementById('placeOrderBtn').addEventListener('click', async () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        alert("Please login to place an order.");
        return; // Stop here if not logged in
    }

    // Prepare invoice data (for Frontend Invoice Page)
    const orderData = cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: parseInt(item.price.replace(/[^0-9]/g, '')),
        totalCost: calculateItemTotal(item.price, item.quantity)
    }));

    // Prepare backend payload
    const backendItems = [];
    cart.forEach(item => {
        const pId = productMap[item.name];
        if (pId) {
            backendItems.push({
                product: pId,
                qty: item.quantity
            });
        }
    });

    if (backendItems.length === 0) {
        // Fallback if no products matched or map failed loading
        console.warn("No matching product IDs found. Order will be local only.");
    } else {
        // Send to Backend
        try {
            const btn = document.getElementById('placeOrderBtn');
            const originalText = btn.innerText;
            btn.innerText = "Processing...";
            btn.disabled = true;

            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ items: backendItems })
            });

            if (!res.ok) {
                const errData = await res.json();
                alert("Order failed: " + (errData.message || "Unknown error"));
                btn.innerText = originalText;
                btn.disabled = false;
                return; // Stop
            }
        } catch (err) {
            console.error(err);
            alert("Network error while placing order.");
            return;
        }
    }

    // If successful or local fallback
    localStorage.setItem("orderData", JSON.stringify(orderData));
    localStorage.setItem("orderTime", new Date().toLocaleString());

    alert('Order placed successfully! Redirecting to invoice...');
    cart = [];
    renderCart();
    cartModal.style.display = 'none';
    window.location.href = "invoice.html";
});
