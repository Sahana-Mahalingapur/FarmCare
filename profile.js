document.addEventListener('DOMContentLoaded', () => {
    const profileIcon = document.getElementById('profileIcon');
    const profileMenu = document.getElementById('profileMenu');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const btnLogout = document.getElementById('btnLogout');
    const btnOrderHistory = document.getElementById('btnOrderHistory');
    const historyModal = document.getElementById('historyModal');
    const closeHistory = document.getElementById('closeHistory');
    const orderHistoryContent = document.getElementById('orderHistoryContent');

    // Load User Info
    const userJson = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    let user = null;
    if (userJson) {
        try {
            user = JSON.parse(userJson);
        } catch (e) {
            console.error("Error parsing user data");
        }
    }

    if (user && user.name) {
        userNameDisplay.textContent = user.name;
        // Initials
        const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        profileIcon.textContent = initials;
    } else {
        // Not logged in? Redirect or show login
        userNameDisplay.textContent = "Guest";
        profileIcon.textContent = "?";
        // Optional: Redirect to login if sensitive page
        // window.location.href = 'login.html';
    }

    // Toggle Menu
    profileIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        if (profileMenu.style.display === 'block') {
            profileMenu.style.display = 'none';
        } else {
            profileMenu.style.display = 'block';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', () => {
        if (profileMenu) profileMenu.style.display = 'none';
    });

    // Logout
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        window.location.href = 'index.html'; // or login.html
    });

    // Open History
    btnOrderHistory.addEventListener('click', () => {
        historyModal.style.display = 'block';
        fetchOrders();
    });

    // Close History
    closeHistory.addEventListener('click', () => {
        historyModal.style.display = 'none';
    });

    // Fetch Orders from Backend
    async function fetchOrders() {
        if (!token) {
            orderHistoryContent.innerHTML = '<p>Please login to view history.</p>';
            return;
        }

        orderHistoryContent.innerHTML = '<p style="text-align:center;">Loading...</p>';

        try {
            // Assuming the backend is running on localhost:5000 or relative path /api
            const res = await fetch('http://localhost:5000/api/orders/my-orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error('Failed to fetch orders');

            const orders = await res.json();
            renderOrders(orders);
        } catch (err) {
            console.error(err);
            orderHistoryContent.innerHTML = '<p style="color:red; text-align:center;">Failed to load order history. Backend might be down.</p>';
        }
    }

    function renderOrders(orders) {
        if (!orders || orders.length === 0) {
            orderHistoryContent.innerHTML = `
                <div style="text-align:center; padding: 20px;">
                    <p style="font-size: 50px; margin:0;">🛒</p>
                    <p>No previous orders found.</p>
                </div>
            `;
            return;
        }

        let html = '';
        // Show newest first
        orders.reverse().forEach(order => {
            const date = new Date(order.createdAt).toLocaleDateString();
            const time = new Date(order.createdAt).toLocaleTimeString();

            let itemsHtml = order.items.map(item => {
                // If product was populated
                const pName = item.product ? item.product.name : 'Unknown Product';
                // Calculate item subtotal
                // If price not available in item.product (depends on backend population), fallback
                const pPrice = item.product ? item.product.price : 0;

                return `
                    <div style="display:flex; justify-content:space-between; font-size:14px; color:#555; margin-bottom:4px;">
                        <span>${pName} (x${item.qty})</span>
                        <span>₹${pPrice * item.qty}</span>
                    </div>
                `;
            }).join('');

            html += `
                <div style="border: 1px solid #ddd; border-radius: 10px; padding: 15px; margin-bottom: 15px; background: #f9f9f9;">
                    <div style="display:flex; justify-content:space-between; border-bottom:1px solid #eee; padding-bottom:8px; margin-bottom:8px;">
                        <div>
                            <strong style="color:#2d572c;">Order #${order._id.substring(order._id.length - 6).toUpperCase()}</strong>
                            <br><span style="font-size:12px; color:#888;">${date} • ${time}</span>
                        </div>
                        <div style="text-align:right;">
                            <strong style="color:#000;">₹${order.total}</strong>
                            <br><span style="font-size:12px; background:${getStatusColor(order.status)}; color:white; padding:2px 6px; border-radius:4px;">${order.status}</span>
                        </div>
                    </div>
                    <div>${itemsHtml}</div>
                </div>
            `;
        });

        orderHistoryContent.innerHTML = html;
    }

    function getStatusColor(status) {
        switch (status) {
            case 'pending': return '#f0ad4e'; // Orange
            case 'confirmed': return '#5bc0de'; // Blue
            case 'shipped': return '#0275d8'; // Dark Blue
            case 'delivered': return '#28a745'; // Green
            default: return '#999';
        }
    }
});
