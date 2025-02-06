async function loadCart() {
	const response = await fetch("http://localhost:3000/bookings");
	const cart = await response.json();

	const cartContainer = document.querySelector("#items");
	cartContainer.innerHTML = "";

	let compteur = 0;

	cart.bookings.forEach(trip => {

		compteur += 1;

		const departureDate = new Date(trip.dateDeparture);
		const currentDate = new Date();

		const departureTime = departureDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
		const currentTime = currentDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

		// const timeDiff = departureTime - currentTime;

		const timeDiff = departureDate.getTime() - currentDate.getTime();
		const diffHours = timeDiff / (1000 * 60 * 60);

		let heurFloor = Math.floor(diffHours)


		if (diffHours > 0) {
			const diffMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Reste en minutes

			if (diffHours < 1) {
				timeRemainingText = `${diffMinutes}min restantes`;
			} else if(heurFloor > 24) {
				jourFloor = heurFloor / 24
				timeRemainingText = `${Math.floor(jourFloor)} jour(s) et ${heurFloor - 25}h ${diffMinutes}min restantes`;
			} else {
				timeRemainingText = `${heurFloor - 1}h ${diffMinutes}min restantes`;
			}
		} else {
			timeRemainingText = "Départ imminent ou dépassé";
		}

		cartContainer.innerHTML += `
			<div class="items">
				 <div class="row">
					<h2>${trip.departure}</h2> <img class="arrow" src="IMG/fleche.png"> <h2>${trip.arrival}</h2> 
					<h2 class="date2">${timeRemainingText}</h2>
					<h2 class="price2">${trip.price}€</h2>
				</div>
			</div>
           
        `;
	});
	document.getElementById("NbTrajet").textContent = compteur;
}

document.addEventListener("DOMContentLoaded", loadCart);
