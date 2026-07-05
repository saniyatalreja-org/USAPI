const API_URL = "https://psychic-orbit-779gxwwq799r3wqqj-5000.app.github.dev";

// LOAD MESSAGES

async function loadMessages() {

    const container = document.getElementById("messageContainer");

    if (!container) return;

    try {

        const response = await fetch(`${API_URL}/api/messages`);

        const messages = await response.json();

        container.innerHTML = "";

        messages.forEach(msg => {

            container.innerHTML += `

            <div class="col-lg-4 col-md-6 mb-4">

                <div class="card listing-card h-100">

                    <div class="card-body">

                        <h5>Sender: ${msg.sender_id}</h5>

                        <p><strong>Receiver:</strong> ${msg.receiver_id}</p>

                        <p>${msg.message}</p>

                        <div class="d-grid gap-2">

                            <button
                                class="btn btn-warning"
                                onclick='openEditModal(${msg.message_id}, ${JSON.stringify(msg.message)})'>

                                Edit

                            </button>

                            <button
                                class="btn btn-outline-danger"
                                onclick="deleteMessage(${msg.message_id})">

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
                Failed to load messages.
            </div>
        `;

    }

}

// ADD MESSAGE

const messageForm = document.getElementById("messageForm");

if (messageForm) {

    messageForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const message = {

            sender_id: document.getElementById("sender_id").value,

            receiver_id: document.getElementById("receiver_id").value,

            message: document.getElementById("message").value

        };

        const response = await fetch(`${API_URL}/api/messages`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(message)

        });

        if (response.ok) {

            alert("Message Sent!");

            messageForm.reset();

            loadMessages();

        }

    });

}

// OPEN EDIT MODAL

function openEditModal(id, message) {

    document.getElementById("edit_message_id").value = id;

    document.getElementById("edit_message").value = message;

    new bootstrap.Modal(

        document.getElementById("editMessageModal")

    ).show();

}

// UPDATE MESSAGE

const editMessageForm = document.getElementById("editMessageForm");

if (editMessageForm) {

    editMessageForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const id = document.getElementById("edit_message_id").value;

        const updated = {

            message: document.getElementById("edit_message").value

        };

        const response = await fetch(`${API_URL}/api/messages/${id}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(updated)

        });

        if (response.ok) {

            alert("Message Updated!");

            bootstrap.Modal.getInstance(

                document.getElementById("editMessageModal")

            ).hide();

            loadMessages();

        }

    });

}

// DELETE MESSAGE

async function deleteMessage(id) {

    if (!confirm("Delete this message?")) return;

    const response = await fetch(`${API_URL}/api/messages/${id}`, {

        method: "DELETE"

    });

    if (response.ok) {

        alert("Message Deleted!");

        loadMessages();

    }

}

// START

loadMessages();