async function loadCart() {
	const response = await fetch("http://localhost:3000/bookings");
	const cart = await response.json();

	const cartContainer = document.querySelector("#items");
	cartContainer.innerHTML = "";

	cart.bookings.forEach(trip => {
		cartContainer.innerHTML += `
            <p>${trip.departure} → ${trip.arrival} (${trip.dateDeparture}) - ${trip.price}€</p>
        `;
	});
}

document.addEventListener("DOMContentLoaded", loadCart);
