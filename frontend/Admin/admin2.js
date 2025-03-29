// Display the admin name
document.addEventListener("DOMContentLoaded", function () {
    const adminName = localStorage.getItem("adminname");
    if (adminName) {
        document.getElementById("adminName").textContent = adminName;
    } else {
        // Redirect to login page if admin name is not found
        window.location.href = "AdminLogin.html";
    }

    // Fetch and display the list of doctors
    fetchDoctors();
});

// Handle logout
function handleLogout() {
    localStorage.removeItem("adminname");
    window.location.href = "AdminLogin.html";
}

document.getElementById("logoutBtn").addEventListener("click", handleLogout);

document.getElementById("doctorForm2").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    const formData = new FormData();
    formData.append("doctor", JSON.stringify({
        name: document.getElementById("doctorName").value,
        specialization: document.getElementById("doctorSpecialization").value,
        email: document.getElementById("doctorEmail").value,
        phone: document.getElementById("doctorPhone").value,
        qualification: document.getElementById("doctorQualification").value,
        experience: document.getElementById("doctorExperience").value,
        availability: Array.from(document.querySelectorAll('input[name="availability"]:checked')).map(el => el.value).join(', '),
        startTime: document.getElementById("doctorStartTime").value,
        endTime: document.getElementById("doctorEndTime").value,
        bio: document.getElementById("doctorBio").value
    }));
    formData.append("image", document.getElementById("doctorImage").files[0]);

    try {
        const response = await fetch("http://localhost:8081/api/doctors/add", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            alert("Doctor added successfully!");
            // Optionally, refresh the doctor list or close the modal
            await fetchDoctors();
        } else {
            alert("Failed to add doctor. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});

async function fetchDoctors() {
    try {
        const response = await fetch("http://localhost:8081/api/doctors/getdoctors");
        const doctors = await response.json();

        const doctorTableBody = document.getElementById("doctorTableBody");
        doctorTableBody.innerHTML = ""; // Clear existing rows

        doctors.forEach(doctor => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${doctor.id}</td>
                <td>
                    <div class="user-info">
                        <img src="${doctor.imageUrl}" alt="${doctor.name}">
                        <div>
                            <p class="user-name">${doctor.name}</p>
                            <p class="user-email">${doctor.email}</p>
                        </div>
                    </div>
                </td>
                <td>${doctor.specialization}</td>
                <td>${doctor.phone}</td>
                <td>${doctor.availability}</td>
                <td><span class="status-badge active">Active</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn icon-btn edit-doctor" data-id="${doctor.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn icon-btn delete-doctor" data-id="${doctor.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            doctorTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching doctors:", error);
    }
}



//


// Fetch and display the list of doctors
async function fetchDoctors() {
    try {
        const response = await fetch("http://localhost:8081/api/doctors/getdoctors");
        const doctors = await response.json();

        const doctorTableBody = document.querySelector(".doctor-list .data-table tbody");
        doctorTableBody.innerHTML = ""; // Clear existing rows

        doctors.forEach(doctor => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${doctor.id}</td>
                <td>${doctor.name}</td>
                <td>${doctor.specialization}</td>
                <td>${doctor.phone}</td>
                <td>${doctor.availability}</td>
                <td>
                    <button class="btn edit-btn" data-id="${doctor.id}">Edit</button>
                    <button class="btn delete-btn" data-id="${doctor.id}">Delete</button>
                </td>
            `;
            doctorTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching doctors:", error);
    }
}

// Call fetchDoctors when the page loads
document.addEventListener("DOMContentLoaded", function () {
    fetchDoctors();
});




/////////
