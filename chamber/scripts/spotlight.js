const spotlightContainer = document.getElementById("spotlightContainer");

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Could not load member data.");

        const members = await response.json();
        const qualified = members.filter(member =>
            member.membershipLevel === 2 || member.membershipLevel === 3
        );

        const randomSelection = shuffleArray(qualified).slice(0, 3);
        spotlightContainer.innerHTML = "";

        randomSelection.forEach(member => {
            const level = member.membershipLevel === 3 ? "Gold" : "Silver";

            const card = document.createElement("div");
            card.classList.add("spotlight");

            card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.description}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <a href="${member.website}" target="_blank">${member.website}</a>
        <p><strong>Membership Level:</strong> ${level}</p>
      `;

            spotlightContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading spotlight members:", error);
    }
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

loadSpotlights();
