const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const user = {

        full_name: document.getElementById("full_name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value,
        batch: document.getElementById("batch").value

    };

    try {

        const response = await fetch("/api/auth/register", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(user)

        });

        const data = await response.json();

        if(response.ok){

            alert("Registration Successful!");

            window.location.href = "login.html";

        }else{

            alert(data.message);

        }

    }catch(error){

        alert("Server Error");

    }

});