export async function loadFoods() {
    try {
        const response = await fetch("./data/foods.json");

        if (!response.ok) {
            throw new Error("Failed to load foods.json");
        }

        return await response.json();

    } catch (error) {
        console.error("Error loading data:", error);
        return [];
    }
}