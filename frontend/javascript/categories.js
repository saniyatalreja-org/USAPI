const API_URL = "https://psychic-orbit-779gxwwq799r3wqqj-5000.app.github.dev";

async function loadCategories() {

    const container = document.getElementById("categoryContainer");

    try {

        const response = await fetch(`${API_URL}/api/categories`);

        const categories = await response.json();

        container.innerHTML = "";

        categories.forEach(category => {

            let icon = "bi-grid";

            if (category.category_name === "Books")
                icon = "bi-book";

            else if (category.category_name === "Electronics")
                icon = "bi-laptop";

            else if (category.category_name === "Gadgets")
                icon = "bi-phone";

            else if (category.category_name === "Accessories")
                icon = "bi-backpack";

             else if (category.category_name === "Project Components")
                icon = "bi-cpu";

            

            container.innerHTML += `

                <div class="col-lg-4 col-md-6 mb-4">

                    <div class="card category-card h-100">

                        <div class="card-body">

                            <i class="bi ${icon} category-icon"></i>

                            <h4>${category.category_name}</h4>

                            <p class="text-muted">
                                ${category.description}
                            </p>

                            <button
                                class="btn btn-primary w-100"
                                onclick="viewCategory(${category.category_id})">

                                View Listings

                            </button>

                        </div>

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="alert alert-danger">
                Failed to load categories.
            </div>
        `;

    }

}

function viewCategory(categoryId) {

    window.location.href = `listings.html?category=${categoryId}`;

}

loadCategories();