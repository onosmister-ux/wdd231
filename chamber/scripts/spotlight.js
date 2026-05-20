const spotlightContainer =
    document.querySelector("#spotlight-container");

async function getSpotlights() {

    const response =
        await fetch("data/members.json");

    const data =
        await response.json();

    const members =
        data.filter(member =>
            member.membership === 2 ||
            member.membership === 3
        );

    const randomMembers =
        members.sort(() => 0.5 - Math.random())
               .slice(0, 3);

    displaySpotlights(randomMembers);
}

function displaySpotlights(members) {

    members.forEach(member => {

        const card =
            document.createElement("section");

        card.classList.add("spotlight-card");

        let membershipLevel = "";

        if (member.membership === 2) {
            membershipLevel = "Silver Member";
        }

        if (member.membership === 3) {
            membershipLevel = "Gold Member";
        }

        card.innerHTML = `
            <h3>${member.name}</h3>

            <img src="${member.image}"
                 alt="Logo of ${member.name}"
                 loading="lazy"
                 width="150"
                 height="150">

            <p>${member.phone}</p>

            <p>${member.address}</p>

            <a href="${member.website}" target="_blank">
                Visit Website
            </a>

            <p>${membershipLevel}</p>
        `;

        spotlightContainer.appendChild(card);
    });
}

getSpotlights();