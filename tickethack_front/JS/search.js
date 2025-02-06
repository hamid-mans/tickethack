document.querySelector("#search-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const departure = document.querySelector("#departure").value;
    const arrival = document.querySelector("#arrival").value;
    const date = document.querySelector("#date").value;

    const response = await fetch(`/api/trips?departure=${departure}&arrival=${arrival}&date=${date}`);
    const trips = await response.json();

    const resultsContainer = document.querySelector("#results");
    resultsContainer.innerHTML = "";

    trips.forEach(trip => {
        const tripElement = document.createElement("div");
        tripElement.innerHTML = `
            <p>${trip.departure} → ${trip.arrival} (${trip.date}) - ${trip.price}€</p>
            <button onclick="addToCart(${trip.id}, '${trip.departure}', '${trip.arrival}', '${trip.date}', ${trip.price})">Ajouter au panier</button>
        `;
        resultsContainer.appendChild(tripElement);
    });
});

async function addToCart(id, departure, arrival, date, price) {
    await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, departure, arrival, date, price })
    });
    alert("Ajouté au panier !");
}
