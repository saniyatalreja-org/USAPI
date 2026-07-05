const API_URL = "https://psychic-orbit-779gxwwq799r3wqqj-5000.app.github.dev";

// ================= LOAD TRANSACTIONS =================

async function loadTransactions() {

    const container = document.getElementById("transactionContainer");

    try {

        const response = await fetch(`${API_URL}/api/transaction`);

        const transactions = await response.json();

        container.innerHTML = "";

        if (transactions.length === 0) {

            container.innerHTML = `

                <div class="col-12">

                    <div class="alert alert-info text-center">

                        No transactions found.

                    </div>

                </div>

            `;

            return;

        }

        transactions.forEach(transaction => {

            container.innerHTML += `

                <div class="col-lg-4 col-md-6 mb-4">

                    <div class="card listing-card h-100">

                        <div class="card-body">

                            <h5>Transaction #${transaction.transaction_id}</h5>

                            <p><strong>Listing:</strong> ${transaction.listing_id}</p>

                            <p><strong>Buyer:</strong> ${transaction.buyer_id}</p>

                            <p><strong>Seller:</strong> ${transaction.seller_id}</p>

                            <h5 class="text-primary">
                                Rs. ${transaction.amount}
                            </h5>

                            <p>
                                <strong>Payment:</strong>
                                ${transaction.payment_method}
                            </p>

                            <p>
                                <strong>Status:</strong>
                                ${transaction.status}
                            </p>

                            <p>
                                <strong>Type:</strong>
                                ${transaction.transaction_type}
                            </p>
                
                        <button
                            class="btn btn-warning mb-2"
                            onclick='openEditModal(
                                ${transaction.transaction_id},
                                ${transaction.amount},
                                ${JSON.stringify(transaction.payment_method)},
                                ${JSON.stringify(transaction.status)}
                            )'>

                            Edit

                        </button>

                            <button
                                class="btn btn-outline-danger w-100 mt-2"
                                onclick="deleteTransaction(${transaction.transaction_id})">

                                Delete

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

                Failed to load transactions.

            </div>

        `;

    }

}

// ================= ADD TRANSACTION =================

const transactionForm = document.getElementById("transactionForm");

if (transactionForm) {

    transactionForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const transaction = {

            listing_id: document.getElementById("listing_id").value,

            buyer_id: document.getElementById("buyer_id").value,

            seller_id: document.getElementById("seller_id").value,

            amount: document.getElementById("amount").value,

            payment_method: document.getElementById("payment_method").value,

            status: "Completed",

            transaction_type: document.getElementById("transaction_type").value

        };

        try {

            const response = await fetch(`${API_URL}/api/transaction`, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(transaction)

            });

            if (response.ok) {

                alert("Transaction Added Successfully!");

                transactionForm.reset();

                loadTransactions();

            } else {

                alert("Failed to add transaction.");

            }

        } catch (error) {

            console.error(error);

            alert("Server Error");

        }

    });

}

// ================= DELETE =================

async function deleteTransaction(id) {

    if (!confirm("Delete this transaction?")) return;

    try {

        const response = await fetch(`${API_URL}/api/transaction/${id}`, {

            method: "DELETE"

        });

        if (response.ok) {

            alert("Transaction Deleted Successfully!");

            loadTransactions();

        } else {

            alert("Failed to delete transaction.");

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

}

// ================= OPEN EDIT MODAL =================

function openEditModal(id, amount, paymentMethod, status) {

    document.getElementById("edit_transaction_id").value = id;
    document.getElementById("edit_amount").value = amount;
    document.getElementById("edit_payment_method").value = paymentMethod;
    document.getElementById("edit_status").value = status;

    const modal = new bootstrap.Modal(
        document.getElementById("editTransactionModal")
    );

    modal.show();

}

// ================= UPDATE TRANSACTION =================

const editTransactionForm = document.getElementById("editTransactionForm");

if (editTransactionForm) {

    editTransactionForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const id = document.getElementById("edit_transaction_id").value;

        const updatedTransaction = {

            amount: document.getElementById("edit_amount").value,

            payment_method: document.getElementById("edit_payment_method").value,

            status: document.getElementById("edit_status").value

        };

        try {

            const response = await fetch(`${API_URL}/api/transaction/${id}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(updatedTransaction)

            });

            if (response.ok) {

                alert("Transaction Updated Successfully!");

                bootstrap.Modal.getInstance(
                    document.getElementById("editTransactionModal")
                ).hide();

                loadTransactions();

            } else {

                alert("Failed to update transaction.");

            }

        } catch (error) {

            console.error(error);

            alert("Server Error");

        }

    });

}

// ================= START =================

loadTransactions();