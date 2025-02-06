async function loadCart() {
    const response = await fetch("http://localhost:3000/carts");
    const cart = await response.json();

    const cartContainer = document.querySelector("#items");
    cartContainer.innerHTML = "";

    let compteur = 0;

    cart.carts.forEach(trip => {

        compteur += trip.price
        cartContainer.innerHTML += `
            <p>${trip.departure} → ${trip.arrival} (${trip.dateDeparture}) - ${trip.price}€</p>
            <button title="${trip._id}" onclick="removeFromCart('${trip._id}')">Supprimer</button>
        `;
    });

}

async function removeFromCart(id) {
    await fetch(`http://localhost:3000/cart/${id}`, { method: "DELETE" });
    loadCart();
}

async function pay() {
    await fetch("http://localhost:3000/carts", { method: "PUT" });
    alert("Paiement réussi !");
    window.location.href = "Booking.html";
}

document.addEventListener("DOMContentLoaded", loadCart);
