document.addEventListener("DOMContentLoaded", async () => {
    const resultsContainer = document.querySelector("#resultsContainer");

    // Get search filters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("query") || "";
    const color = urlParams.get("color") || "";
    const age = urlParams.get("age") || "";
    const price = urlParams.get("price") || "";

    console.log(urlParams,"urlparams")

    try {
        // Fetch all pets from the backend
        const url = `http://localhost:5000/search?query=${searchQuery}&color=${color}&age=${age}&price=${price}`;
        console.log(url,"url")

    // Fetch the pets based on search criteria
        const response = await fetch(url);
        console.log(response,"response")
        const pets = await response.json();
        console.log(pets,"pets")
        // Filter pets based on search criteria
        const filteredPets = pets.filter(pet => {
            return (
                (searchQuery === "" || pet.petName.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (color === "" || pet.petColor.toLowerCase() === color.toLowerCase()) &&
                (age === "" || pet.petAge.toLowerCase() === age.toLowerCase()) &&
                (price === "" || pet.petPrice <= parseInt(price))
            );
        });

        // Show filtered results or an error message
        if (filteredPets.length === 0) {
            resultsContainer.innerHTML = "<p>No pets found matching your criteria.</p>";
        } else {
            resultsContainer.innerHTML = filteredPets.map(pet => `
                <div class="pet-card">
                    <h3>${pet.petName}</h3>
                    <p><strong>Breed:</strong> ${pet.petBreed}</p>
                    <p><strong>Color:</strong> ${pet.petColor}</p>
                    <p><strong>Location:</strong> ${pet.petLocation}</p>
                    <p><strong>Age:</strong> ${pet.petAge}</p>
                    <p><strong>Price:</strong> $${pet.petPrice}</p>
                    <p><strong>Description:</strong> ${pet.petDescription}</p>
                     <p><strong>Contact:</strong> ${pet.petContact}</p>
                </div>
            `).join("");
        }
    } catch (error) {
        resultsContainer.innerHTML = "<p>Error loading search results.</p>";
        console.error("Error fetching pets:", error);
    }
});