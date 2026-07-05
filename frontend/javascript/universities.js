const API_URL = "https://psychic-orbit-779gxwwq799r3wqqj-5000.app.github.dev";

// ================= LOAD UNIVERSITIES =================

async function loadUniversities() {

    const container = document.getElementById("universityContainer");

    if (!container) return;

    try {

        const response = await fetch(`${API_URL}/api/universities`);

        if (!response.ok) {
            throw new Error("Failed to fetch universities");
        }

        const universities = await response.json();

        container.innerHTML = "";

        universities.forEach(university => {

            const card = `

                <div class="col-lg-4 col-md-6 mb-4">

                    <div class="card listing-card h-100">

                        <div class="card-body">

                            <h4>${university.university_name}</h4>

                            <p>

                                <strong>City:</strong>
                                ${university.city}

                            </p>

                            <div class="d-grid gap-2 mt-3">

                                <button
                                    class="btn btn-warning"
                                    onclick="openEditModal(
                                        ${university.university_id},
                                        '${university.university_name}',
                                        '${university.city}'
                                    )">

                                    Edit

                                </button>

                                <button
                                    class="btn btn-outline-danger"
                                    onclick="deleteUniversity(${university.university_id})">

                                    Delete

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            `;

            container.insertAdjacentHTML("beforeend", card);

        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `

            <div class="col-12">

                <div class="alert alert-danger">

                    Failed to load universities.

                </div>

            </div>

        `;

    }

}

// ================= ADD UNIVERSITY =================

const universityForm = document.getElementById("universityForm");

if (universityForm) {

    universityForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const university = {

            university_name: document.getElementById("university_name").value,

            city: document.getElementById("city").value

        };

        try {

            const response = await fetch(`${API_URL}/api/universities`, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(university)

            });

            if (response.ok) {

                alert("University Added Successfully!");

                universityForm.reset();

                loadUniversities();

            } else {

                alert("Failed to add university.");

            }

        } catch (error) {

            console.error(error);

            alert("Server Error");

        }

    });

}

// ================= OPEN EDIT MODAL =================

function openEditModal(id, name, city) {

    document.getElementById("edit_university_id").value = id;

    document.getElementById("edit_university_name").value = name;

    document.getElementById("edit_city").value = city;

    const modal = new bootstrap.Modal(

        document.getElementById("editUniversityModal")

    );

    modal.show();

}

// ================= UPDATE UNIVERSITY =================

const editUniversityForm = document.getElementById("editUniversityForm");

if (editUniversityForm) {

    editUniversityForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const id = document.getElementById("edit_university_id").value;

        const updatedUniversity = {

            university_name: document.getElementById("edit_university_name").value,

            city: document.getElementById("edit_city").value

        };

        try {

            const response = await fetch(`${API_URL}/api/universities/${id}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(updatedUniversity)

            });

            if (response.ok) {

                alert("University Updated Successfully!");

                bootstrap.Modal.getInstance(

                    document.getElementById("editUniversityModal")

                ).hide();

                loadUniversities();

            } else {

                alert("Failed to update university.");

            }

        } catch (error) {

            console.error(error);

            alert("Server Error");

        }

    });

}

// ================= DELETE UNIVERSITY =================

async function deleteUniversity(id) {

    if (!confirm("Are you sure you want to delete this university?")) return;

    try {

        const response = await fetch(`${API_URL}/api/universities/${id}`, {

            method: "DELETE"

        });

        if (response.ok) {

            alert("University Deleted Successfully!");

            loadUniversities();

        } else {

            alert("Failed to delete university.");

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

}

// ================= START =================

loadUniversities();