const API_URL = "https://psychic-orbit-779gxwwq799r3wqqj-5000.app.github.dev";

// LOAD

async function loadExchangeRequests() {

    const container = document.getElementById("exchangeRequestContainer");

    if (!container) return;

    try {

        const response = await fetch(`${API_URL}/api/exchange-requests`);

        const requests = await response.json();

        container.innerHTML = "";

        requests.forEach(request => {

            container.innerHTML += `

            <div class="col-lg-4 col-md-6 mb-4">

                <div class="card listing-card h-100">

                    <div class="card-body">

                        <h5>Listing #${request.listing_id}</h5>

                        <p><strong>Sender:</strong> ${request.sender_id}</p>

                        <p><strong>Receiver:</strong> ${request.receiver_id}</p>

                        <p>${request.message}</p>

                        <p><strong>Status:</strong> ${request.status}</p>

                        <div class="d-grid gap-2">

                            <button
                                class="btn btn-warning"
                                onclick='openEditModal(${request.request_id}, ${JSON.stringify(request.message)}, "${request.status}")'>

                                Edit

                            </button>

                            <button
                                class="btn btn-outline-danger"
                                onclick="deleteExchangeRequest(${request.request_id})">

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

    }

}

// ADD

const exchangeRequestForm = document.getElementById("exchangeRequestForm");

if (exchangeRequestForm) {

exchangeRequestForm.addEventListener("submit", async (e) => {

e.preventDefault();

const request = {

listing_id: document.getElementById("listing_id").value,

sender_id: document.getElementById("sender_id").value,

receiver_id: document.getElementById("receiver_id").value,

message: document.getElementById("message").value,

status: document.getElementById("status").value

};

const response = await fetch(`${API_URL}/api/exchange-requests`, {

method: "POST",

headers: {

"Content-Type": "application/json"

},

body: JSON.stringify(request)

});

if (response.ok) {

alert("Exchange Request Sent!");

exchangeRequestForm.reset();

loadExchangeRequests();

}

});

}

// EDIT

function openEditModal(id, message, status) {

document.getElementById("edit_request_id").value = id;

document.getElementById("edit_message").value = message;

document.getElementById("edit_status").value = status;

new bootstrap.Modal(

document.getElementById("editExchangeModal")

).show();

}

// UPDATE

const editExchangeForm = document.getElementById("editExchangeForm");

if (editExchangeForm) {

editExchangeForm.addEventListener("submit", async (e) => {

e.preventDefault();

const id = document.getElementById("edit_request_id").value;

const updated = {

message: document.getElementById("edit_message").value,

status: document.getElementById("edit_status").value

};

const response = await fetch(`${API_URL}/api/exchange-requests/${id}`, {

method: "PUT",

headers: {

"Content-Type": "application/json"

},

body: JSON.stringify(updated)

});

if (response.ok) {

alert("Exchange Request Updated!");

bootstrap.Modal.getInstance(

document.getElementById("editExchangeModal")

).hide();

loadExchangeRequests();

}

});

}

// DELETE

async function deleteExchangeRequest(id) {

if (!confirm("Delete this exchange request?")) return;

const response = await fetch(`${API_URL}/api/exchange-requests/${id}`, {

method: "DELETE"

});

if (response.ok) {

alert("Exchange Request Deleted!");

loadExchangeRequests();

}

}

// START

loadExchangeRequests();