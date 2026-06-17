import { loadFoods } from "./storage.js";
import { openModal } from "./modal.js";

const container = document.querySelector("#food-container");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

let foodsList = [];

/* =========================
   LOCAL STORAGE (FAVORITES)
========================= */

function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function toggleFavorite(food) {
    let favorites = getFavorites();

    const exists = favorites.find(item => item.id === food.id);

    if (exists) {
        favorites = favorites.filter(item => item.id !== food.id);
    } else {
        favorites.push(food);
    }

    saveFavorites(favorites);
    renderFoods(foodsList);
}

/* =========================
   RENDER FOODS
========================= */

function renderFoods(data) {
    const favorites = getFavorites();

    container.innerHTML = "";

    data.forEach(food => {

        const isFav = favorites.some(f => f.id === food.id);

        container.innerHTML += `
            <div class="card">
                <h3>${food.name}</h3>

                <p><strong>Price:</strong> ${food.price}</p>
                <p><strong>Market:</strong> ${food.market}</p>
                <p><strong>Location:</strong> ${food.location}</p>
                <p><strong>Category:</strong> ${food.category}</p>

                <button class="view-btn" data-id="${food.id}">
                    View Details
                </button>

                <button class="fav-btn" data-id="${food.id}">
                    ${isFav ? "★ Remove Favorite" : "☆ Add Favorite"}
                </button>
            </div>
        `;
    });

    /* =========================
       VIEW DETAILS BUTTONS
    ========================= */

    document.querySelectorAll(".view-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = Number(e.target.dataset.id);
            const selected = foodsList.find(f => f.id === id);
            openModal(selected);
        });
    });

    /* =========================
       FAVORITE BUTTONS
    ========================= */

    document.querySelectorAll(".fav-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = Number(e.target.dataset.id);
            const selected = foodsList.find(f => f.id === id);
            toggleFavorite(selected);
        });
    });
}

/* =========================
   SEARCH FUNCTION
========================= */

function handleSearch() {
    const value = searchInput.value.toLowerCase();

    const filtered = foodsList.filter(food =>
        food.name.toLowerCase().includes(value) ||
        food.category.toLowerCase().includes(value) ||
        food.market.toLowerCase().includes(value)
    );

    renderFoods(filtered);
}

/* =========================
   INIT APP
========================= */

async function init() {
    try {
        foodsList = await loadFoods();
        renderFoods(foodsList);
    } catch (error) {
        console.error("Error loading foods:", error);
        container.innerHTML = "<p>Failed to load data</p>";
    }
}

/* =========================
   EVENTS
========================= */

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("input", handleSearch);

/* =========================
   START APP
========================= */

init();