// Handling pet submission
document.querySelector("#petForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const petData = {
        petName: document.querySelector("#petName").value,
        petBreed: document.querySelector("#petBreed").value,
        petColor: document.querySelector("#petColor").value,
        petLocation: document.querySelector("#petLocation").value,
        petAge: document.querySelector("#petAge").value,
        petPrice: document.querySelector("#petPrice").value,
        petDescription: document.querySelector("#petDescription").value,
        petVaccinated: document.querySelector("#vaccinatedFilter").value,
        petContact: document.querySelector("#petContact").value,
    };

    const response = await fetch("http://localhost:5000/pets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(petData)
    });

    const result = await response.json();
    console.log(result);
    alert("Pet added successfully!");
});


// Handling search functionality
document.querySelector("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get search input values
    const searchQuery = document.querySelector("#searchQuery").value;
    const color = document.querySelector("#colorFilter").value;
    const age = document.querySelector("#ageFilter").value;
    const price = document.querySelector("#priceFilter").value;

    // Create URL parameters
    const queryParams = new URLSearchParams({
        query: searchQuery,
        color: color,
        age: age,
        price: price
    });

    // Redirect to search results page with filters in URL
    window.location.href = `searchResults.html?${queryParams.toString()}`;
});

const resultsContainer = document.querySelector("#results");
resultsContainer.innerHTML = filteredPets.map(pet => `<div>${pet.petName}</div>`).join('');

