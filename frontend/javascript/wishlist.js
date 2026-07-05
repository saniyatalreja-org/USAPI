const API_URL = "https://psychic-orbit-779gxwwq799r3wqqj-5000.app.github.dev";

const USER_ID = 1;

async function loadWishlist() {

    const container = document.getElementById("wishlistContainer");

    try {

        const response = await fetch(`${API_URL}/api/wishlist/${USER_ID}`);

        const wishlist = await response.json();

        container.innerHTML = "";

        if (wishlist.length === 0) {

            container.innerHTML = `

                <div class="col-12">

                    <div class="alert alert-info text-center">

                        Your wishlist is empty.

                    </div>

                </div>

            `;

            return;

        }

        wishlist.forEach(item => {

            container.innerHTML += `

                <div class="col-lg-4 col-md-6 mb-4">

                    <div class="card listing-card h-100">

                        <div class="card-body">

                            <h4>${item.title}</h4>

                            <p>${item.description}</p>

                            <h5 class="text-primary">

                                Rs. ${item.price}

                            </h5>

                            <p>

                                <strong>Condition:</strong>

                                ${item.item_condition}

                            </p>

                            <p>

                                <strong>Location:</strong>

                                ${item.location}

                            </p>

                            <button
                                class="btn btn-outline-danger w-100 mt-3"
                                onclick="removeWishlist(${item.wishlist_id})">

                                Remove

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

                Failed to load wishlist.

            </div>

        `;

    }

}

async function removeWishlist(id) {

    if (!confirm("Remove this item from wishlist?")) return;

    try {

        const response = await fetch(`${API_URL}/api/wishlist/${id}`, {

            method: "DELETE"

        });

        if (response.ok) {

            alert("Removed Successfully!");

            loadWishlist();

        } else {

            alert("Failed to remove item.");

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

}

loadWishlist();