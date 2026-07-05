const API_URL = "https://psychic-orbit-779gxwwq799r3wqqj-5000.app.github.dev";

// ================= LOAD LISTINGS =================

async function loadListings() {

    const container = document.getElementById("listingContainer");

    try {

        const response = await fetch(`${API_URL}/api/listings`);

        const listings = await response.json();
        const params = new URLSearchParams(window.location.search);

const selectedCategory = params.get("category");

let filteredListings = listings;

if (selectedCategory) {

    filteredListings = listings.filter(
        listing => listing.category_id == selectedCategory
    );

}

        container.innerHTML = "";

        filteredListings.forEach(listing => {

            const card = `
                <div class="col-lg-4 col-md-6 mb-4">

                    <div class="card listing-card h-100">

                        <div class="card-body">

                            <h4>${listing.title}</h4>

                            <p>${listing.description}</p>

                            <h5 class="text-primary">
                                Rs. ${listing.price}
                            </h5>

                            <p>
                                <strong>Condition:</strong>
                                ${listing.item_condition}
                            </p>

                            <p>
                                <strong>Location:</strong>
                                ${listing.location}
                            </p>

                            <div class="d-grid gap-2 mt-3">

                                <button class="btn btn-primary">
                                    View Details
                                </button>

                                <button
                                class="btn btn-warning"
                                onclick='openEditModal(
                                    ${listing.listing_id},
                                    ${listing.category_id},
                                    ${JSON.stringify(listing.title)},
                                    ${JSON.stringify(listing.description)},
                                    ${listing.price},
                                    ${JSON.stringify(listing.item_condition)},
                                    ${JSON.stringify(listing.location)}
                                )'>

                                Edit

                            </button>

                                <button
                                    class="btn btn-outline-danger"
                                    onclick="deleteListing(${listing.listing_id})">

                                    Delete

                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            `;

            container.insertAdjacentHTML("beforeend", card);

        });

    } catch (err) {

        console.error(err);

        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    Failed to load listings.
                </div>
            </div>
        `;

    }

}

// ================= ADD LISTING =================

const listingForm = document.getElementById("listingForm");

if (listingForm) {

    listingForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const listing = {

            user_id: 1,

            category_id: document.getElementById("category_id").value,

            title: document.getElementById("title").value,

            description: document.getElementById("description").value,

            price: document.getElementById("price").value,

            listing_type: document.getElementById("listing_type").value,

            item_condition: document.getElementById("condition").value,

            location: document.getElementById("location").value

        };

        try {

            const response = await fetch(`${API_URL}/api/listings`, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(listing)

            });

            if (response.ok) {

                alert("Listing Added Successfully!");

                location.reload();

            } else {

                alert("Failed to add listing.");

            }

        } catch (error) {

            console.error(error);

            alert("Server Error");

        }

    });


}

const editListingForm = document.getElementById("editListingForm");

if (editListingForm) {

    editListingForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const id = document.getElementById("edit_listing_id").value;

        const updatedListing = {

            category_id: document.getElementById("edit_category_id").value,

            title: document.getElementById("edit_title").value,

            description: document.getElementById("edit_description").value,

            price: document.getElementById("edit_price").value,

            listing_type: "Sale",

            item_condition: document.getElementById("edit_condition").value,

            location: document.getElementById("edit_location").value,

            status: "Available"

        };

        try {

            const response = await fetch(`${API_URL}/api/listings/${id}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(updatedListing)

            });

            if (response.ok) {

    alert("Listing updated successfully!");

    bootstrap.Modal.getInstance(
        document.getElementById("editListingModal")
    ).hide();

    location.reload();

} else {

    alert("Failed to update listing.");

}

        } catch (error) {

            console.error(error);

            alert("Server Error");

        }

    });

}

function openEditModal(
    id,
    categoryId,
    title,
    description,
    price,
    condition,
    location
){
    document.getElementById("edit_category_id").value = categoryId;

    document.getElementById("edit_listing_id").value = id;

    document.getElementById("edit_title").value = title;

    document.getElementById("edit_description").value = description;

    document.getElementById("edit_price").value = price;

    document.getElementById("edit_condition").value = condition;

    document.getElementById("edit_location").value = location;

    const modal = new bootstrap.Modal(
        document.getElementById("editListingModal")
    );

    modal.show();

}

// ================= DELETE LISTING =================

async function deleteListing(id) {

    const confirmDelete = confirm("Are you sure you want to delete this listing?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`${API_URL}/api/listings/${id}`, {

            method: "DELETE"

        });

        if (response.ok) {

            alert("Listing deleted successfully!");

            loadListings();

        } else {

            alert("Failed to delete listing.");

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

}

// ================= START =================

loadListings();