document.querySelector("#search-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const departure = document.querySelector("#departure").value;
    const arrival = document.querySelector("#arrival").value;
    const date = document.querySelector("#date").value;

    const response = await fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`);
    const trips = await response.json();

    const resultsContainer = document.querySelector("#results");
    resultsContainer.innerHTML = "";

    if (trips.length === 0) {
        resultsContainer.innerHTML =  `
            <img class="ImgWait" src="IMG/remove.png">
            <h3>Aucun trajet trouvé pour cette recherche.</h3>
            `;
    }

    trips.forEach(trip => {

		const dateConversion = new Date(trip.dateDeparture);

		//const time = dateConversion.toISOString().split('T')[1].split('.')[0].slice(0, 5);
		//const hours = dateConversion.getUTCHours().toString().padStart(2, '0');
		//const minutes = dateConversion.getUTCMinutes().toString().padStart(2, '0');

		const time = dateConversion.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
		//const timeStr = `${hours}:${minutes}`;

        const tripElement = document.createElement("div");
        tripElement.innerHTML = `
			<div class="row">
			<h2>${trip.departure}</h2> <img class="arrow" src="IMG/fleche.png"> <h2>${trip.arrival}</h2> 
            <h2 class="date1">${time}</h2>
            <h2 class="price1">${trip.price + " €"}</h2>
            <img class="BtnAddPanier" src="IMG/cart.png" onclick="addToCart('${trip.departure}', '${trip.arrival}', '${trip.dateDeparture}', ${trip.price})">
			</div>
            
        `;
        resultsContainer.appendChild(tripElement);
    });
});

async function addToCart(departure, arrival, dateDeparture, price) {
    await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ departure, arrival, dateDeparture, price })
    });
    alert("Ajouté au panier !");
}





window.addEventListener('DOMContentLoaded', function() {

    var titreBienvenue = document.getElementById('TitrePrestation');


    var mots = ["Il est temps de chercher un trajet", "Il est temps de trouver votre prochain trajet", "Cherchons votre trajet dès maintenant !"];


    var vitesseChangementMot = 6000;

    var indexMotCourant = 0;


    function afficherTexteCaractereParCaractere(texte, element, vitesse, index) {
        if (index < texte.length) {
            element.innerHTML += texte.charAt(index);
            index++;
            setTimeout(function() {
                afficherTexteCaractereParCaractere(texte, element, vitesse, index);
            }, vitesse);
        }
    }


    function changerMot() {
        titreBienvenue.innerHTML = '';
        afficherTexteCaractereParCaractere(mots[indexMotCourant], titreBienvenue, 100, 0);
        indexMotCourant = (indexMotCourant + 1) % mots.length;
        setTimeout(changerMot, vitesseChangementMot);
    }


    changerMot();
});
