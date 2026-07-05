const API_URL = "https://psychic-orbit-779gxwwq799r3wqqj-5000.app.github.dev";

// ================= LOAD PROJECT REQUESTS =================

async function loadProjectRequests() {

    const container = document.getElementById("projectRequestContainer");

    if (!container) return;

    try {

        const response = await fetch(`${API_URL}/api/project-requests`);

        const requests = await response.json();

        container.innerHTML = "";

        requests.forEach(request => {

            container.innerHTML += `

                <div class="col-lg-4 col-md-6 mb-4">

                    <div class="card listing-card h-100">

                        <div class="card-body">

                            <h4>${request.project_title}</h4>

                            <p><strong>Category:</strong> ${request.project_category}</p>

                            <p>${request.description}</p>

                            <p><strong>Members Needed:</strong> ${request.required_members}</p>

                            <p><strong>Deadline:</strong> ${request.deadline?.substring(0,10)}</p>

                            <p><strong>Status:</strong> ${request.status}</p>

                            <div class="d-grid gap-2 mt-3">

                                <button
                                    class="btn btn-warning"
                                    onclick='openEditModal(
                                        ${request.request_id},
                                        ${JSON.stringify(request.project_title)},
                                        ${JSON.stringify(request.project_category)},
                                        ${JSON.stringify(request.description)},
                                        ${request.required_members},
                                        "${request.deadline?.substring(0,10)}",
                                        "${request.status}"
                                    )'>

                                    Edit

                                </button>

                                <button
                                    class="btn btn-outline-danger"
                                    onclick="deleteProjectRequest(${request.request_id})">

                                    Delete

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            `;

        });

    }

    catch(error){

        console.error(error);

        container.innerHTML = `

        <div class="alert alert-danger">

            Failed to load project requests.

        </div>

        `;

    }

}

// ================= ADD REQUEST =================

const projectRequestForm = document.getElementById("projectRequestForm");

if(projectRequestForm){

projectRequestForm.addEventListener("submit", async(e)=>{

e.preventDefault();

const request={

user_id:1,

project_title:document.getElementById("project_title").value,

project_category:document.getElementById("project_category").value,

description:document.getElementById("description").value,

required_members:document.getElementById("required_members").value,

deadline:document.getElementById("deadline").value,

status:document.getElementById("status").value

};

try{

const response=await fetch(`${API_URL}/api/project-requests`,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(request)

});

if(response.ok){

alert("Project Request Added Successfully!");

projectRequestForm.reset();

loadProjectRequests();

}

else{

alert("Failed to add request.");

}

}

catch(error){

console.error(error);

alert("Server Error");

}

});

}

// ================= EDIT =================

function openEditModal(id,title,category,description,members,deadline,status){

document.getElementById("edit_request_id").value=id;

document.getElementById("edit_project_title").value=title;

document.getElementById("edit_project_category").value=category;

document.getElementById("edit_description").value=description;

document.getElementById("edit_required_members").value=members;

document.getElementById("edit_deadline").value=deadline;

document.getElementById("edit_status").value=status;

const modal=new bootstrap.Modal(

document.getElementById("editProjectRequestModal")

);

modal.show();

}

// ================= UPDATE =================

const editProjectRequestForm=document.getElementById("editProjectRequestForm");

if(editProjectRequestForm){

editProjectRequestForm.addEventListener("submit",async(e)=>{

e.preventDefault();

const id=document.getElementById("edit_request_id").value;

const updatedRequest={

project_title:document.getElementById("edit_project_title").value,

project_category:document.getElementById("edit_project_category").value,

description:document.getElementById("edit_description").value,

required_members:document.getElementById("edit_required_members").value,

deadline:document.getElementById("edit_deadline").value,

status:document.getElementById("edit_status").value

};

try{

const response=await fetch(`${API_URL}/api/project-requests/${id}`,{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(updatedRequest)

});

if(response.ok){

alert("Project Request Updated Successfully!");

bootstrap.Modal.getInstance(

document.getElementById("editProjectRequestModal")

).hide();

loadProjectRequests();

}

else{

alert("Failed to update request.");

}

}

catch(error){

console.error(error);

alert("Server Error");

}

});

}

// ================= DELETE =================

async function deleteProjectRequest(id){

if(!confirm("Delete this project request?")) return;

try{

const response=await fetch(`${API_URL}/api/project-requests/${id}`,{

method:"DELETE"

});

if(response.ok){

alert("Project Request Deleted Successfully!");

loadProjectRequests();

}

else{

alert("Failed to delete request.");

}

}

catch(error){

console.error(error);

alert("Server Error");

}

}

// ================= START =================

loadProjectRequests();