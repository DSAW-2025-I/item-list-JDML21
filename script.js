document.addEventListener("DOMContentLoaded", function () {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");

    let cart = {};

    // Función para agregar productos al carrito
    window.addToCart = function (name, price) {
        if (!cart[name]) {
            cart[name] = { name, price, quantity: 1 };
        } else {
            cart[name].quantity += 1;
        }
        updateCart();
    };

    // Función para actualizar el carrito
    function updateCart() {
        cartList.innerHTML = "";
        let totalPrice = 0;

        Object.values(cart).forEach(item => {
            cartList.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${item.name} (${item.quantity})
                    <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="btn btn-sm btn-danger" onclick="removeItem('${item.name}')">❌</button>
                </li>
            `;
            totalPrice += item.price * item.quantity;
        });

        cartTotal.textContent = totalPrice.toFixed(2);
    }

    // Función para eliminar un producto del carrito
    window.removeItem = function (name) {
        delete cart[name];
        updateCart();
    };

    // Función para confirmar pedido
    window.confirmOrder = function () {
        if (Object.keys(cart).length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }
        alert("¡Pedido confirmado!");
        resetCart();
    };

    // Función para reiniciar el carrito
    window.resetCart = function () {
        cart = {};
        updateCart();
    };
});
