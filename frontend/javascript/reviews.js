
const API_URL = "https://psychic-orbit-779gxwwq799r3wqqj-5000.app.github.dev";

// ================= LOAD REVIEWS =================

async function loadReviews() {

    const container = document.getElementById("reviewContainer");

    if (!container) return;

    try {

        const response = await fetch(`${API_URL}/api/reviews`);

        const reviews = await response.json();

        container.innerHTML = "";

        reviews.forEach(review => {

            container.innerHTML += `

                <div class="col-lg-4 col-md-6 mb-4">

                    <div class="card listing-card h-100">

                        <div class="card-body">

                            <h4>⭐ ${review.rating}/5</h4>

                            <p>

                                <strong>Reviewer ID:</strong>

                                ${review.reviewer_id}

                            </p>

                            <p>

                                <strong>Reviewed User:</strong>

                                ${review.reviewed_user_id}

                            </p>

                            <p>

                                ${review.comment}

                            </p>

                            <div class="d-grid gap-2 mt-3">

                                <button
                                    class="btn btn-warning"
                                    onclick='openEditModal(
                                        ${review.review_id},
                                        ${review.rating},
                                        ${JSON.stringify(review.comment)}
                                    )'>

                                    Edit

                                </button>

                                <button
                                    class="btn btn-outline-danger"
                                    onclick="deleteReview(${review.review_id})">

                                    Delete

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `

            <div class="alert alert-danger">

                Failed to load reviews.

            </div>

        `;

    }

}

// ================= ADD REVIEW =================

const reviewForm = document.getElementById("reviewForm");

if (reviewForm) {

    reviewForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const review = {

            reviewer_id: document.getElementById("reviewer_id").value,

            reviewed_user_id: document.getElementById("reviewed_user_id").value,

            rating: document.getElementById("rating").value,

            comment: document.getElementById("comment").value

        };

        try {

            const response = await fetch(`${API_URL}/api/reviews`, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(review)

            });

            if (response.ok) {

                alert("Review Added Successfully!");

                reviewForm.reset();

                loadReviews();

            }

            else {

                alert("Failed to add review.");

            }

        } catch (error) {

            console.error(error);

            alert("Server Error");

        }

    });

}

// ================= EDIT MODAL =================

function openEditModal(id, rating, comment) {

    document.getElementById("edit_review_id").value = id;

    document.getElementById("edit_rating").value = rating;

    document.getElementById("edit_comment").value = comment;

    const modal = new bootstrap.Modal(

        document.getElementById("editReviewModal")

    );

    modal.show();

}

// ================= UPDATE REVIEW =================

const editReviewForm = document.getElementById("editReviewForm");

if (editReviewForm) {

    editReviewForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const id = document.getElementById("edit_review_id").value;

        const updatedReview = {

            rating: document.getElementById("edit_rating").value,

            comment: document.getElementById("edit_comment").value

        };

        try {

            const response = await fetch(`${API_URL}/api/reviews/${id}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(updatedReview)

            });

            if (response.ok) {

                alert("Review Updated Successfully!");

                bootstrap.Modal.getInstance(

                    document.getElementById("editReviewModal")

                ).hide();

                loadReviews();

            }

            else {

                alert("Failed to update review.");

            }

        } catch (error) {

            console.error(error);

            alert("Server Error");

        }

    });

}

// ================= DELETE REVIEW =================

async function deleteReview(id) {

    if (!confirm("Are you sure you want to delete this review?")) return;

    try {

        const response = await fetch(`${API_URL}/api/reviews/${id}`, {

            method: "DELETE"

        });

        if (response.ok) {

            alert("Review Deleted Successfully!");

            loadReviews();

        }

        else {

            alert("Failed to delete review.");

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

}

// ================= START =================

loadReviews();