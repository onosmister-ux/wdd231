const url = 'data/members.json';
const cards = document.querySelector('#members');

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

const displayMembers = (members) => {
    cards.innerHTML = '';
    
    members.forEach((member) => {
        let card = document.createElement('section');
        let logo = document.createElement('img');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let membership = document.createElement('p');

        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        website.textContent = 'Website';
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');
        
        let memberLevel = '';
        if (member.membership === 1) memberLevel = 'Member';
        if (member.membership === 2) memberLevel = 'Silver';
        if (member.membership === 3) memberLevel = 'Gold';
        membership.textContent = `Membership: ${memberLevel}`;

        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `Logo of ${member.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '200');
        logo.setAttribute('height', '150');

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);

        cards.appendChild(card);
    });
}

getMemberData();

// Grid/List Toggle
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#members");

gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
});