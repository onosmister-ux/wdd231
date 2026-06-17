const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modal-body");
const closeBtn = document.querySelector("#close-modal");

export function openModal(food) {
    modalBody.innerHTML = `
        <h2>${food.name}</h2>
        <p><strong>Price:</strong> ${food.price}</p>
        <p><strong>Market:</strong> ${food.market}</p>
        <p><strong>Location:</strong> ${food.location}</p>
        <p><strong>Category:</strong> ${food.category}</p>
        <p><strong>Updated:</strong> ${food.updated}</p>
    `;

    modal.classList.remove("hidden");
}

function closeModal() {
    modal.classList.add("hidden");
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});