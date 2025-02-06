async function loadCart() {
    const response = await fetch("http://localhost:3000/carts");
    const cart = await response.json();

    const cartContainer = document.querySelector("#items");
    cartContainer.innerHTML = "";

    let compteur = 0;

    cart.carts.forEach(trip => {

		const dateConversion = new Date(trip.dateDeparture);
		const time = dateConversion.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

        compteur += trip.price;

        cartContainer.innerHTML += `
            <div class="items">
            <div class="row">
                <h2>${trip.departure}</h2> <img class="arrow" src="IMG/fleche.png"> <h2>${trip.arrival}</h2> 
                <h2 class="date">${time}</h2>
                <h2 class="price">${trip.price}€</h2>
                <img class="delete" src="IMG/delete.png" onclick="removeFromCart('${trip._id}')">
			</div>
                
            </div>
        `;
    });

    document.getElementById("totalprix").textContent = compteur;

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
